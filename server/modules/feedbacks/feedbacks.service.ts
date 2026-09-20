import type { Feedback, Heritage, Prisma } from '@prisma/client';
import { prisma } from '../../db.js';
import { BadRequestError, NotFoundError } from '../../core/errors.js';
import type { CreateFeedbackInput, FeedbackStatus, ListFeedbackQuery } from './feedbacks.schema.js';

/** Di sản rút gọn đính kèm mỗi góp ý */
type HeritageBrief = Pick<Heritage, 'id' | 'slug' | 'name_vi' | 'name_en'>;

/**
 * Định dạng trả về cho FeedbackTable.tsx – giữ nguyên như bản cũ:
 * createdAt là chuỗi "YYYY-MM-DD HH:mm", scope là tên di sản, contact là chuỗi rỗng
 * khi du khách không để lại thông tin.
 */
function format(feedback: Feedback & { heritage?: HeritageBrief | null }) {
  return {
    id: feedback.id,
    content: feedback.content,
    rating: feedback.rating,
    status: feedback.status,
    createdAt: feedback.created_at.toISOString().replace('T', ' ').slice(0, 16),
    scope: feedback.heritage?.name_vi || 'Toàn khu vực',
    contact: feedback.user_contact || '',
    heritage_id: feedback.heritage_id,
    heritage: feedback.heritage ?? null,
  };
}

const heritageBriefSelect = {
  select: { id: true, slug: true, name_vi: true, name_en: true },
} as const;

/**
 * Danh sách góp ý cho màn quản trị. Các điều kiện lọc được kết hợp theo AND.
 */
export async function list(query: ListFeedbackQuery) {
  const where: Prisma.FeedbackWhereInput = {};

  if (query.status) where.status = query.status;
  if (query.rating !== undefined) where.rating = query.rating;

  if (query.minRating !== undefined || query.maxRating !== undefined) {
    where.rating = {
      ...(query.rating !== undefined ? { equals: query.rating } : {}),
      ...(query.minRating !== undefined ? { gte: query.minRating } : {}),
      ...(query.maxRating !== undefined ? { lte: query.maxRating } : {}),
    };
  }

  if (query.heritageId === 'general') {
    where.heritage_id = null;
  } else if (query.heritageId) {
    where.heritage = {
      is: {
        OR: [{ id: query.heritageId }, { slug: query.heritageId }],
      },
    };
  }

  const feedbacks = await prisma.feedback.findMany({
    where,
    include: { heritage: heritageBriefSelect },
    orderBy: { created_at: 'desc' },
  });

  return feedbacks.map(format);
}

/** Cập nhật trạng thái xử lý: PENDING → REVIEWED → RESOLVED */
export async function updateStatus(id: string, status: FeedbackStatus) {
  const existing = await prisma.feedback.findUnique({ where: { id } });

  if (!existing) throw new NotFoundError('Không tìm thấy phản hồi cần cập nhật');

  const updated = await prisma.feedback.update({
    where: { id },
    data: { status },
    include: { heritage: heritageBriefSelect },
  });

  return {
    message: `Cập nhật thành công trạng thái thành ${status}`,
    feedback: format(updated),
  };
}

/** Xóa một góp ý */
export async function remove(id: string) {
  const existing = await prisma.feedback.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('Không tìm thấy phản hồi cần xóa');

  await prisma.feedback.delete({ where: { id } });
  return { message: 'Xóa phản hồi thành công', id };
}

/**
 * Tạo góp ý mới (dùng cho API public POST /api/feedbacks).
 * Du khách chọn phạm vi bằng tên di sản (`scope`) nên phải dò ngược ra heritage_id.
 */
export async function create(input: CreateFeedbackInput) {
  let targetHeritageId = input.heritage_id;

  if (!targetHeritageId && input.scope) {
    const found = await prisma.heritage.findFirst({
      where: {
        OR: [
          { name_vi: { contains: input.scope, mode: 'insensitive' } },
          { name_en: { contains: input.scope, mode: 'insensitive' } },
          { slug: input.scope },
        ],
      },
    });
    if (found) targetHeritageId = found.id;
  }

  // TODO(#17): FR-10 sẽ để heritage_id = null cho góp ý "Toàn Đường Sách".
  // Hiện giữ hành vi cũ: gán vào di sản đầu tiên (docs/01 mục 6, lỗi #4).
  if (!targetHeritageId) {
    const defaultHeritage = await prisma.heritage.findFirst({ orderBy: { created_at: 'asc' } });
    targetHeritageId = defaultHeritage?.id;
  }

  if (!targetHeritageId) {
    throw new BadRequestError('Cơ sở dữ liệu chưa có di sản để liên kết phản hồi');
  }

  const created = await prisma.feedback.create({
    data: {
      heritage_id: targetHeritageId,
      content: input.content,
      rating: input.rating,
      status: 'PENDING',
      // Privacy by design: không nhập liên hệ thì lưu null, không lưu chuỗi rỗng
      user_contact: input.contact ? input.contact : null,
    },
    include: { heritage: heritageBriefSelect },
  });

  // Giữ đúng shape cũ mà FeedbackForm.tsx đang nhận (không kèm object heritage)
  const { heritage: _heritage, ...payload } = format(created);

  return {
    message: 'Gửi góp ý thành công',
    feedback: { ...payload, scope: created.heritage?.name_vi || input.scope || 'Toàn khu vực' },
  };
}
