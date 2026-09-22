import type { Feedback, Item, Prisma } from '@prisma/client';
import { prisma } from '../../db.js';
import { NotFoundError } from '../../core/errors.js';
import { getItemCategoryId } from '../../core/items.js';
import type { CreateFeedbackInput, FeedbackStatus, ListFeedbackQuery } from './feedbacks.schema.js';

/** Di sản = Item thuộc ItemCategory có Slug = 'di-san' */
const DI_SAN_SLUG = 'di-san';

/** Di sản rút gọn đính kèm mỗi góp ý */
type ItemBrief = Pick<Item, 'Id' | 'Slug' | 'Name' | 'NameEng'>;

const itemBriefSelect = {
  select: { Id: true, Slug: true, Name: true, NameEng: true },
} as const;

/** Chuyển giờ UTC lưu trong DB sang chuỗi "YYYY-MM-DD HH:mm" theo giờ Việt Nam (UTC+7) */
function formatVNDateTime(date: Date): string {
  const vn = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return vn.toISOString().replace('T', ' ').slice(0, 16);
}

/**
 * Định dạng trả về cho FeedbackTable.tsx – giữ nguyên hợp đồng snake_case cũ:
 * createdAt là chuỗi "YYYY-MM-DD HH:mm" theo giờ Việt Nam, scope là tên di sản hoặc
 * "Toàn Đường Sách", contact là chuỗi rỗng khi du khách không để lại thông tin.
 */
function format(feedback: Feedback & { Item?: ItemBrief | null }) {
  return {
    id: feedback.Id,
    content: feedback.Content,
    rating: feedback.Rating,
    status: feedback.Status,
    createdAt: formatVNDateTime(feedback.DateCreated),
    scope: feedback.Item?.Name || 'Toàn Đường Sách',
    contact: feedback.UserContact || '',
    heritage_id: feedback.ItemId,
    heritage: feedback.Item
      ? { id: feedback.Item.Id, slug: feedback.Item.Slug, name_vi: feedback.Item.Name, name_en: feedback.Item.NameEng }
      : null,
  };
}

/**
 * Danh sách góp ý cho màn quản trị. Các điều kiện lọc được kết hợp theo AND.
 * `heritageId` nhận UUID, slug hoặc `general` (góp ý chung, ItemId NULL).
 */
export async function list(query: ListFeedbackQuery) {
  const where: Prisma.FeedbackWhereInput = {};

  if (query.status) where.Status = query.status;
  if (query.rating !== undefined) where.Rating = query.rating;

  if (query.minRating !== undefined || query.maxRating !== undefined) {
    where.Rating = {
      ...(query.rating !== undefined ? { equals: query.rating } : {}),
      ...(query.minRating !== undefined ? { gte: query.minRating } : {}),
      ...(query.maxRating !== undefined ? { lte: query.maxRating } : {}),
    };
  }

  if (query.heritageId === 'general') {
    where.ItemId = null;
  } else if (query.heritageId) {
    const categoryId = await getItemCategoryId(DI_SAN_SLUG);
    where.Item = {
      is: {
        ItemCategoryId: categoryId,
        OR: [{ Id: query.heritageId }, { Slug: query.heritageId }],
      },
    };
  }

  const feedbacks = await prisma.feedback.findMany({
    where,
    include: { Item: itemBriefSelect },
    orderBy: { DateCreated: 'desc' },
  });

  return feedbacks.map(format);
}

/** Cập nhật trạng thái xử lý: PENDING → REVIEWED → RESOLVED */
export async function updateStatus(id: string, status: FeedbackStatus) {
  const existing = await prisma.feedback.findUnique({ where: { Id: id } });

  if (!existing) throw new NotFoundError('Không tìm thấy phản hồi cần cập nhật');

  const updated = await prisma.feedback.update({
    where: { Id: id },
    data: { Status: status },
    include: { Item: itemBriefSelect },
  });

  return {
    message: `Cập nhật thành công trạng thái thành ${status}`,
    feedback: format(updated),
  };
}

/** Xóa một góp ý */
export async function remove(id: string) {
  const existing = await prisma.feedback.findUnique({ where: { Id: id } });
  if (!existing) throw new NotFoundError('Không tìm thấy phản hồi cần xóa');

  await prisma.feedback.delete({ where: { Id: id } });
  return { message: 'Xóa phản hồi thành công', id };
}

/**
 * Tạo góp ý mới (dùng cho API public POST /api/feedbacks).
 * Du khách chọn phạm vi bằng heritage_id hoặc tên di sản (`scope`); không khớp di sản
 * nào (chưa xóa mềm) thì lưu ItemId = NULL, tức góp ý "Toàn Đường Sách" – không còn
 * gán vào di sản đầu tiên như hành vi cũ (issue #17 đã bỏ, docs/01 mục 6 lỗi #5).
 */
export async function create(input: CreateFeedbackInput) {
  const categoryId = await getItemCategoryId(DI_SAN_SLUG);
  let itemId: string | null = null;

  if (input.heritage_id) {
    const found = await prisma.item.findFirst({
      where: {
        ItemCategoryId: categoryId,
        Deleted: false,
        OR: [{ Id: input.heritage_id }, { Slug: input.heritage_id }],
      },
    });
    itemId = found?.Id ?? null;
  }

  if (!itemId && input.scope) {
    const found = await prisma.item.findFirst({
      where: {
        ItemCategoryId: categoryId,
        Deleted: false,
        OR: [
          { Name: { contains: input.scope } },
          { NameEng: { contains: input.scope } },
          { Slug: input.scope },
        ],
      },
    });
    itemId = found?.Id ?? null;
  }

  const created = await prisma.feedback.create({
    data: {
      ItemId: itemId,
      Content: input.content,
      Rating: input.rating,
      Status: 'PENDING',
      // Privacy by design: không nhập liên hệ thì lưu null, không lưu chuỗi rỗng
      UserContact: input.contact ? input.contact : null,
    },
    include: { Item: itemBriefSelect },
  });

  return { message: 'Gửi góp ý thành công', feedback: format(created) };
}
