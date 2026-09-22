/**
 * Đọc cấu hình nghiệp vụ trong bảng WebsiteAttributes (domain QR, hotline, giới hạn đơn...).
 * Tương đương @Value đọc từ application.yml bên Spring, nhưng nguồn là DB thay vì file cấu hình,
 * để BQL đổi được trực tiếp trong SSMS mà không cần deploy lại.
 *
 * KHÔNG cache: demo cần thấy hiệu lực ngay sau khi sửa giá trị trong SSMS.
 */

import { prisma } from '../db.js';

/** Lấy một giá trị cấu hình theo Name. Bỏ bản ghi Deleted; chuỗi rỗng sau khi trim coi như chưa cấu hình. */
export async function getSetting(name: string): Promise<string | null> {
  const setting = await prisma.websiteAttribute.findFirst({
    where: { Name: name, Deleted: false },
  });
  if (!setting) return null;

  const value = setting.Value.trim();
  return value === '' ? null : value;
}

/** Như getSetting nhưng ép về số; giá trị rỗng hoặc không phải số → null. */
export async function getNumberSetting(name: string): Promise<number | null> {
  const value = await getSetting(name);
  if (value === null) return null;

  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

/** Toàn bộ cấu hình được phép lộ ra API công khai (IsPublic = true), dạng { Name: Value }. */
export async function getPublicSettings(): Promise<Record<string, string>> {
  const settings = await prisma.websiteAttribute.findMany({
    where: { Deleted: false, IsPublic: true },
  });

  return settings.reduce<Record<string, string>>((acc, setting) => {
    acc[setting.Name] = setting.Value;
    return acc;
  }, {});
}
