import { prisma } from '../../db.js';
import { BadRequestError, NotFoundError } from '../../core/errors.js';
import { uniqueSlug } from '../../core/slug.js';
import { sanitizeHtml } from '../../core/html.js';
import {
  getItemCategoryId,
  itemDetailInclude,
  mainPictureUrl,
  readAttributes,
  setAttributes,
  setMainPicture,
  type ItemWithDetail,
} from '../../core/items.js';
import type { CreateHeritageInput, UpdateHeritageInput } from './heritages.schema.js';

/** Di sản = Item thuộc ItemCategory có Slug = 'di-san' */
const DI_SAN_SLUG = 'di-san';

type ItemWithCount = ItemWithDetail & { _count?: { Feedbacks: number } };

/**
 * Chuyển bản ghi Item (PascalCase) → JSON hợp đồng cũ (snake_case) mà
 * HeritageManager.tsx/HeritageQR.tsx đang dùng (AGENTS.md mục 4: toDto()).
 */
function format(item: ItemWithCount) {
  const attributes = readAttributes(item);
  return {
    id: item.Id,
    slug: item.Slug,
    name_vi: item.Name,
    name_en: item.NameEng,
    content_vi: item.Content,
    content_en: item.ContentEng,
    image_url: mainPictureUrl(item) ?? '',
    source: attributes.SOURCE ?? '',
    created_at: item.DateCreated,
    updated_at: item.LastEditedTime,
    ...(item._count ? { _count: { feedbacks: item._count.Feedbacks } } : {}),
  };
}

/** Danh sách di sản (chưa xóa mềm), kèm số lượng góp ý để hiện trên bảng quản trị */
export async function list() {
  const categoryId = await getItemCategoryId(DI_SAN_SLUG);
  const items = await prisma.item.findMany({
    where: { ItemCategoryId: categoryId, Deleted: false },
    orderBy: { DateCreated: 'desc' },
    include: { ...itemDetailInclude, _count: { select: { Feedbacks: true } } },
  });
  return items.map(format);
}

/** Tìm theo UUID hoặc slug (mặc định chỉ tìm bản ghi chưa bị xóa mềm) */
export async function findByIdOrSlug(idOrSlug: string, includeDeleted = false) {
  const categoryId = await getItemCategoryId(DI_SAN_SLUG);
  return prisma.item.findFirst({
    where: {
      ItemCategoryId: categoryId,
      OR: [{ Id: idOrSlug }, { Slug: idOrSlug }],
      ...(includeDeleted ? {} : { Deleted: false }),
    },
    include: itemDetailInclude,
  });
}

/** Như findByIdOrSlug nhưng không thấy hoặc đã xóa mềm thì ném 404, trả DTO hợp đồng cũ */
export async function getByIdOrSlug(idOrSlug: string) {
  const item = await findByIdOrSlug(idOrSlug);
  if (!item) throw new NotFoundError('Không tìm thấy di sản');
  return format(item);
}

/** Chi tiết kèm toàn bộ góp ý của di sản đó (chỉ di sản chưa xóa mềm) */
export async function getDetail(idOrSlug: string) {
  const categoryId = await getItemCategoryId(DI_SAN_SLUG);
  const item = await prisma.item.findFirst({
    where: { ItemCategoryId: categoryId, OR: [{ Id: idOrSlug }, { Slug: idOrSlug }], Deleted: false },
    include: { ...itemDetailInclude, _count: { select: { Feedbacks: true } } },
  });
  if (!item) throw new NotFoundError('Không tìm thấy di sản');

  const feedbacks = await prisma.feedback.findMany({
    where: { ItemId: item.Id },
    orderBy: { DateCreated: 'desc' },
  });

  return {
    ...format(item),
    feedbacks: feedbacks.map((f) => ({
      id: f.Id,
      content: f.Content,
      rating: f.Rating,
      status: f.Status,
      created_at: f.DateCreated,
      user_contact: f.UserContact,
    })),
  };
}

/** Tạo mới: slug sinh tự động từ name_vi và cố định từ đó về sau */
export async function create(input: CreateHeritageInput) {
  const categoryId = await getItemCategoryId(DI_SAN_SLUG);

  return prisma.$transaction(async (tx) => {
    const slug = await uniqueSlug(input.name_vi, async (candidate) => {
      const existing = await tx.item.findFirst({ where: { Slug: candidate } });
      return existing !== null;
    });

    const item = await tx.item.create({
      data: {
        ItemCategoryId: categoryId,
        Slug: slug,
        Name: input.name_vi,
        NameEng: input.name_en ?? '',
        Content: sanitizeHtml(input.content_vi),
        ContentEng: sanitizeHtml(input.content_en ?? ''),
      },
    });

    await setAttributes(tx, item.Id, { SOURCE: input.source });
    await setMainPicture(tx, item.Id, input.image_url);

    const full = await tx.item.findUniqueOrThrow({
      where: { Id: item.Id },
      include: itemDetailInclude,
    });
    return format(full);
  });
}

/**
 * Cập nhật nội dung.
 * Nếu client gửi slug khác với slug hiện tại → trả lỗi 400 "Slug không được thay đổi".
 */
export async function update(idOrSlug: string, input: UpdateHeritageInput) {
  const existing = await findByIdOrSlug(idOrSlug);
  if (!existing) throw new NotFoundError('Không tìm thấy di sản');

  if (input.slug !== undefined && input.slug !== existing.Slug) {
    throw new BadRequestError('Slug không được thay đổi');
  }

  return prisma.$transaction(async (tx) => {
    await tx.item.update({
      where: { Id: existing.Id },
      data: {
        ...(input.name_vi !== undefined && { Name: input.name_vi }),
        ...(input.name_en !== undefined && { NameEng: input.name_en }),
        ...(input.content_vi !== undefined && { Content: sanitizeHtml(input.content_vi) }),
        ...(input.content_en !== undefined && { ContentEng: sanitizeHtml(input.content_en) }),
      },
    });

    await setAttributes(tx, existing.Id, { SOURCE: input.source });
    await setMainPicture(tx, existing.Id, input.image_url);

    const full = await tx.item.findUniqueOrThrow({
      where: { Id: existing.Id },
      include: itemDetailInclude,
    });
    return format(full);
  });
}

/**
 * Xóa di sản: XÓA MỀM bằng cách gán Deleted = true.
 * Không xóa góp ý liên quan; di sản đã xóa không hiện trong danh sách/QR/public.
 */
export async function remove(idOrSlug: string) {
  const existing = await getByIdOrSlug(idOrSlug);
  await prisma.item.update({
    where: { Id: existing.id },
    data: { Deleted: true },
  });
  return { message: 'Đã xóa di sản', id: existing.id, slug: existing.slug };
}
