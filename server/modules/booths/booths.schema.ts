import { z } from 'zod';

/**
 * KHUNG SẴN – chủ module: C · FR-01 CRUD gian hàng (issue #8)
 *
 * Khai báo zod cho body/query/params (vai trò DTO + @Valid bên Spring Boot).
 * Hợp đồng JSON: docs/02-requirements-va-uu-tien.md mục 4.
 * Quy ước: dùng z.coerce cho số/ngày trên query string; trạng thái/mức độ khai
 * báo bằng mảng `as const` + z.enum() kèm map nhãn tiếng Việt.
 */

/** Tham số :id trên URL – mọi bảng đều dùng UUID */
export const idParam = z.object({
  id: z.string().uuid('id phải là UUID'),
});

// TODO(#8): thêm createBooth, updateBooth, listBoothQuery
