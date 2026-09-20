import { z } from 'zod';

/** QR di sản – chủ module: B · FR-08 (issue #15) */

/** {id} nhận UUID hoặc slug */
export const qrRefParam = z.object({
  id: z.string().min(1, 'Thiếu định danh di sản'),
});

/** ?size=300 – kích thước ảnh QR tính bằng pixel */
export const qrQuery = z.object({
  size: z.coerce.number().int().min(100).max(1000).default(300),
});

export type QrQuery = z.infer<typeof qrQuery>;
