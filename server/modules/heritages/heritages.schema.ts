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
  name_vi: z.string({ required_error: 'Tên tiếng Việt (name_vi) là bắt buộc' }).trim().min(1, 'Tên tiếng Việt (name_vi) là bắt buộc'),
  name_en: z.string().trim().optional(),
  content_vi: z.string({ required_error: 'Nội dung tiếng Việt (content_vi) là bắt buộc' }).trim().min(1, 'Nội dung tiếng Việt (content_vi) là bắt buộc'),
  content_en: z.string().trim().optional(),
  image_url: z.string().trim().url('Đường dẫn ảnh phải là URL hợp lệ (http/https)').or(z.literal('')).optional(),
  source: z.string().trim().optional(),
});

/**
 * Cập nhật: mọi field đều tùy chọn.
 * Cho phép nhận trường `slug` để service kiểm tra nếu client cố tình thay đổi slug
 * thì trả về lỗi 400 "Slug không được thay đổi" (theo hợp đồng docs/02).
 */
export const updateHeritage = z.object({
  name_vi: z.string().trim().min(1, 'Tên tiếng Việt không được để trống').optional(),
  name_en: z.string().trim().optional(),
  content_vi: z.string().trim().min(1, 'Nội dung tiếng Việt không được để trống').optional(),
  content_en: z.string().trim().optional(),
  image_url: z.string().trim().url('Đường dẫn ảnh phải là URL hợp lệ (http/https)').or(z.literal('')).optional(),
  source: z.string().trim().optional(),
  slug: z.string().trim().optional(),
});

export type CreateHeritageInput = z.infer<typeof createHeritage>;
export type UpdateHeritageInput = z.infer<typeof updateHeritage>;
