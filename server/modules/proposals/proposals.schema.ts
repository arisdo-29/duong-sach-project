import { z } from 'zod';

/**
 * KHUNG SẴN – chủ module: D · FR-05/FR-06 hồ sơ đề xuất (issue #12)
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

// TODO(#12): thêm createProposal, updateProposal, listProposalQuery
