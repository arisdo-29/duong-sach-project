import { Router } from 'express';

/**
 * KHUNG SẴN – chủ module: C · FR-01 CRUD gian hàng (issue #8)
 *
 * Gắn middleware validate + controller (vai trò @RequestMapping).
 * Router này ĐÃ được đăng ký sẵn tại /api/admin/booths trong server/routes.ts,
 * nên chỉ cần thêm endpoint ở đây, không phải sửa file routes.ts.
 *
 * Mẫu:
 *   router.get('/', validate({ query: listBoothQuery }), controller.list);
 *   router.post('/', validate({ body: createBooth }), controller.create);
 */
const router = Router();

// TODO(#8): thêm endpoint theo hợp đồng trong docs/02 mục 4

export default router;
