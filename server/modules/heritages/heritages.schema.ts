import { z } from 'zod';

/**
 * Di sản – chủ module: B · FR-07 (issue #14).
 * Field giữ nguyên snake_case như frontend HeritageManager.tsx đang dùng
 * (xem AGENTS.md mục 3: chỉ module mới mới dùng camelCase).
 */

/** {id} nhận UUID hoặc slug – QR in vật lý dùng slug */
export const heritageRefParam = z.object({
  id: z.string().min(1, 'Thiếu định danh di sản'),
});

export const createHeritage = z.object({
  name_vi: z.string().trim().min(1, 'Tên tiếng Việt (name_vi) là bắt buộc'),
  name_en: z.string().trim().optional(),
  content_vi: z.string().trim().optional(),
  content_en: z.string().trim().optional(),
  image_url: z.string().trim().optional(),
  source: z.string().trim().optional(),
});

/**
 * Cập nhật: mọi field đều tùy chọn.
 * KHÔNG có `slug` ở đây – slug là cố định vì mã QR đã in trên vật liệu tại
 * Đường Sách trỏ theo slug, đổi slug là gãy toàn bộ QR đã in.
 * TODO(#14): docs/02 yêu cầu trả 400 "Slug không được thay đổi" nếu client
 * vẫn gửi slug; hiện tại giữ hành vi cũ là im lặng bỏ qua.
 */
export const updateHeritage = createHeritage.partial();

export type CreateHeritageInput = z.infer<typeof createHeritage>;
export type UpdateHeritageInput = z.infer<typeof updateHeritage>;
