/**
 * Helper thao tác khung nội dung chung: Item, ItemAttribute(Mapping), Picture,
 * ItemPictureMapping. Dùng chung cho mọi module hiển thị nội dung (di sản, gian hàng,
 * điểm bản đồ, trang giới thiệu...) thay vì mỗi module tự viết lại truy vấn thuộc tính/ảnh.
 * Tương đương một @Component tiện ích được nhiều @Service inject dùng chung bên Spring.
 *
 * Các hàm ghi (setAttributes, setMainPicture) nhận tham số `tx` để gọi được bên trong
 * prisma.$transaction, giống @Transactional bọc nhiều thao tác ghi thành một đơn vị nguyên tử.
 */

import type { Prisma } from '@prisma/client';
import { prisma } from '../db.js';
import { AppError } from './errors.js';

/** Client Prisma dùng được ở cả ngoài và trong transaction (tx của prisma.$transaction). */
type Db = Prisma.TransactionClient | typeof prisma;

/** include chuẩn để lấy chi tiết Item kèm thuộc tính động và ảnh (theo DisplayOrder). */
export const itemDetailInclude = {
  AttributeMappings: { include: { ItemAttribute: true } },
  PictureMappings: {
    include: { Picture: true },
    orderBy: { DisplayOrder: 'asc' },
  },
} satisfies Prisma.ItemInclude;

/** Kiểu Item kèm đủ thuộc tính + ảnh, dùng làm tham số cho readAttributes/mainPictureUrl. */
export type ItemWithDetail = Prisma.ItemGetPayload<{ include: typeof itemDetailInclude }>;

/**
 * Tra ItemCategories.Slug ra Id. Slug (di-san, gian-hang, tien-ich, gioi-thieu...) là dữ liệu
 * seed cố định — thiếu là lỗi cấu hình môi trường (quên chạy seed), không phải lỗi người dùng,
 * nên ném AppError 500 thay vì NotFoundError.
 */
export async function getItemCategoryId(slug: string, db: Db = prisma): Promise<string> {
  const category = await db.itemCategory.findUnique({ where: { Slug: slug } });
  if (!category) {
    throw new AppError(500, 'INTERNAL', `Thiếu dữ liệu seed ItemCategories: ${slug}`);
  }
  return category.Id;
}

/** Gom thuộc tính động của một Item thành { Code: Value } để service đọc cho gọn. */
export function readAttributes(item: ItemWithDetail): Record<string, string> {
  return item.AttributeMappings.reduce<Record<string, string>>((acc, mapping) => {
    acc[mapping.ItemAttribute.Code] = mapping.Value;
    return acc;
  }, {});
}

/** URL ảnh đại diện (ItemPictureMappings.IsMainPicture = true); chưa có ảnh chính → null. */
export function mainPictureUrl(item: ItemWithDetail): string | null {
  const main = item.PictureMappings.find((mapping) => mapping.IsMainPicture);
  return main ? main.Picture.Url : null;
}

/**
 * Ghi nhiều thuộc tính động cùng lúc theo Code.
 * - undefined  → bỏ qua, không đụng tới mapping hiện có.
 * - null / ''  → xóa mapping (thuộc tính không áp dụng / bị xóa).
 * - còn lại    → upsert theo cặp (ItemId, ItemAttributeId), lưu String(value).
 * Code không tồn tại trong ItemAttributes là lỗi cấu hình seed → AppError 500.
 */
export async function setAttributes(
  tx: Db,
  itemId: string,
  values: Record<string, string | number | null | undefined>,
): Promise<void> {
  for (const [code, value] of Object.entries(values)) {
    if (value === undefined) continue;

    const attribute = await tx.itemAttribute.findUnique({ where: { Code: code } });
    if (!attribute) {
      throw new AppError(500, 'INTERNAL', `Thiếu dữ liệu seed ItemAttributes: ${code}`);
    }

    if (value === null || value === '') {
      await tx.itemAttributeMapping.deleteMany({
        where: { ItemId: itemId, ItemAttributeId: attribute.Id },
      });
      continue;
    }

    await tx.itemAttributeMapping.upsert({
      where: { ItemId_ItemAttributeId: { ItemId: itemId, ItemAttributeId: attribute.Id } },
      create: { ItemId: itemId, ItemAttributeId: attribute.Id, Value: String(value) },
      update: { Value: String(value) },
    });
  }
}

/**
 * Đặt/xóa/cập nhật ảnh đại diện của một Item.
 * - undefined → bỏ qua.
 * - null / '' → xóa mapping ảnh chính (không xóa Picture, tránh phá tham chiếu nếu ảnh dùng chỗ khác).
 * - có url    → đã có ảnh chính thì đổi Picture.Url; chưa có thì tạo Picture + mapping IsMainPicture = true.
 */
export async function setMainPicture(
  tx: Db,
  itemId: string,
  url: string | null | undefined,
): Promise<void> {
  if (url === undefined) return;

  const existing = await tx.itemPictureMapping.findFirst({
    where: { ItemId: itemId, IsMainPicture: true },
    include: { Picture: true },
  });

  if (url === null || url === '') {
    if (existing) {
      await tx.itemPictureMapping.delete({ where: { Id: existing.Id } });
    }
    return;
  }

  if (existing) {
    await tx.picture.update({ where: { Id: existing.PictureId }, data: { Url: url } });
    return;
  }

  const picture = await tx.picture.create({ data: { Url: url } });
  await tx.itemPictureMapping.create({
    data: { ItemId: itemId, PictureId: picture.Id, IsMainPicture: true },
  });
}
