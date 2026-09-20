import { prisma } from '../../db.js';
import { NotFoundError } from '../../core/errors.js';
import { uniqueSlug } from '../../core/slug.js';
import type { CreateHeritageInput, UpdateHeritageInput } from './heritages.schema.js';

/** Danh sách di sản, kèm số lượng góp ý để hiện trên bảng quản trị */
export async function list() {
  return prisma.heritage.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      _count: { select: { feedbacks: true } },
    },
  });
}

/** Tìm theo UUID hoặc slug – mã QR in vật lý dùng slug */
export async function findByIdOrSlug(idOrSlug: string) {
  return prisma.heritage.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });
}

/** Như findByIdOrSlug nhưng không thấy thì ném 404 */
export async function getByIdOrSlug(idOrSlug: string) {
  const heritage = await findByIdOrSlug(idOrSlug);
  if (!heritage) throw new NotFoundError('Không tìm thấy di sản');
  return heritage;
}

/** Chi tiết kèm toàn bộ góp ý của di sản đó */
export async function getDetail(idOrSlug: string) {
  const heritage = await prisma.heritage.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
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
    const existing = await prisma.heritage.findUnique({ where: { slug: candidate } });
    return existing !== null;
  });

  return prisma.heritage.create({
    data: {
      slug,
      name_vi: input.name_vi,
      name_en: input.name_en ?? '',
      content_vi: input.content_vi ?? '',
      content_en: input.content_en ?? '',
      image_url: input.image_url ?? '',
      source: input.source ?? '',
    },
  });
}

/** Cập nhật nội dung. Chủ ý KHÔNG đụng tới slug để mã QR đã in không gãy link. */
export async function update(idOrSlug: string, input: UpdateHeritageInput) {
  const existing = await getByIdOrSlug(idOrSlug);

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
 * Xóa di sản.
 * TODO(#14): schema đã có cột deleted_at, FR-07 sẽ đổi sang xóa mềm.
 * Hiện giữ nguyên hành vi cũ là xóa cứng; góp ý liên quan không mất theo
 * vì khóa ngoại đặt onDelete: SetNull (heritage_id thành null).
 */
export async function remove(idOrSlug: string) {
  const existing = await getByIdOrSlug(idOrSlug);
  await prisma.heritage.delete({ where: { id: existing.id } });
  return { message: 'Xóa thành công', id: existing.id, slug: existing.slug };
}
