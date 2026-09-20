import { Router } from 'express';

/**
 * KHUNG SẴN – chủ module: D · FR-05/FR-06 hồ sơ đề xuất (issue #12)
 *
 * Gắn middleware validate + controller (vai trò @RequestMapping).
 * Router này ĐÃ được đăng ký sẵn tại /api/admin/proposals trong server/routes.ts,
 * nên chỉ cần thêm endpoint ở đây, không phải sửa file routes.ts.
 *
 * Mẫu:
 *   router.get('/', validate({ query: listProposalQuery }), controller.list);
 *   router.post('/', validate({ body: createProposal }), controller.create);
 */
const router = Router();

// TODO(#12): thêm endpoint theo hợp đồng trong docs/02 mục 4

export default router;
