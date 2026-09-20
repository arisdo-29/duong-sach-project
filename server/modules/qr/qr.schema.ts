import { z } from 'zod';

/** QR di sản – chủ module: B · FR-08 (issue #15) */

/** {id} nhận UUID hoặc slug */
export const qrRefParam = z.object({
  id: z.string().trim().min(1, 'Thiếu định danh di sản (id hoặc slug)'),
});

/** ?size=300 – kích thước ảnh QR tính bằng pixel (từ 100 đến 1000) */
export const qrQuery = z.object({
  size: z.coerce
    .number({ invalid_type_error: 'Kích thước size phải là số nguyên' })
    .int('Kích thước size phải là số nguyên')
    .min(100, 'Kích thước size tối thiểu là 100 pixel')
    .max(1000, 'Kích thước size tối đa là 1000 pixel')
    .default(300),
});

export type QrQuery = z.infer<typeof qrQuery>;
