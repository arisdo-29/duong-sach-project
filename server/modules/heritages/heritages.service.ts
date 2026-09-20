import { prisma } from '../../db.js';
import { BadRequestError, NotFoundError } from '../../core/errors.js';
import { uniqueSlug } from '../../core/slug.js';
import type { CreateHeritageInput, UpdateHeritageInput } from './heritages.schema.js';

/** Danh sách di sản (chưa xóa mềm), kèm số lượng góp ý để hiện trên bảng quản trị */
export async function list() {
  return prisma.heritage.findMany({
    where: { deleted_at: null },
    orderBy: { created_at: 'desc' },
    include: {
      _count: { select: { feedbacks: true } },
    },
  });
}

/** Tìm theo UUID hoặc slug (mặc định chỉ tìm bản ghi chưa bị xóa mềm) */
export async function findByIdOrSlug(idOrSlug: string, includeDeleted = false) {
  return prisma.heritage.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      ...(includeDeleted ? {} : { deleted_at: null }),
    },
  });
}

/** Như findByIdOrSlug nhưng không thấy hoặc đã xóa mềm thì ném 404 */
export async function getByIdOrSlug(idOrSlug: string) {
  const heritage = await findByIdOrSlug(idOrSlug);
  if (!heritage) throw new NotFoundError('Không tìm thấy di sản');
  return heritage;
}

/** Chi tiết kèm toàn bộ góp ý của di sản đó (chỉ di sản chưa xóa mềm) */
export async function getDetail(idOrSlug: string) {
  const heritage = await prisma.heritage.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      deleted_at: null,
    },
    include: {
      feedbacks: { orderBy: { created_at: 'desc' } },
    },
  });

  if (!heritage) throw new NotFoundError('Không tìm thấy di sản');
  return heritage;
}

/** Tạo mới: slug sinh tự động từ name_vi và cố định từ đó về sau */
export async function create(input: CreateHeritageInput) {
  const slug = await uniqueSlug(input.name_vi, async (candidate) => {
    const existing = await prisma.heritage.findFirst({ where: { slug: candidate } });
    return existing !== null;
  });

  return prisma.heritage.create({
    data: {
      slug,
      name_vi: input.name_vi,
      name_en: input.name_en ?? '',
      content_vi: input.content_vi,
      content_en: input.content_en ?? '',
      image_url: input.image_url ?? '',
      source: input.source ?? '',
    },
  });
}

/**
 * Cập nhật nội dung.
 * Nếu client gửi slug khác với slug hiện tại → trả lỗi 400 "Slug không được thay đổi".
 */
export async function update(idOrSlug: string, input: UpdateHeritageInput) {
  const existing = await getByIdOrSlug(idOrSlug);

  if (input.slug !== undefined && input.slug !== existing.slug) {
    throw new BadRequestError('Slug không được thay đổi');
  }

  return prisma.heritage.update({
    where: { id: existing.id },
    data: {
      ...(input.name_vi !== undefined && { name_vi: input.name_vi }),
      ...(input.name_en !== undefined && { name_en: input.name_en }),
      ...(input.content_vi !== undefined && { content_vi: input.content_vi }),
      ...(input.content_en !== undefined && { content_en: input.content_en }),
      ...(input.image_url !== undefined && { image_url: input.image_url }),
      ...(input.source !== undefined && { source: input.source }),
    },
  });
}

/**
 * Xóa di sản: XÓA MỀM bằng cách gán deleted_at = now().
 * Không xóa góp ý liên quan; di sản đã xóa không hiện trong danh sách/QR/public.
 */
export async function remove(idOrSlug: string) {
  const existing = await getByIdOrSlug(idOrSlug);
  await prisma.heritage.update({
    where: { id: existing.id },
    data: { deleted_at: new Date() },
  });
  return { message: 'Đã xóa di sản', id: existing.id, slug: existing.slug };
}
