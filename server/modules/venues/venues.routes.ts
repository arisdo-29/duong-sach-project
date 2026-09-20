import { Router } from 'express';

/**
 * KHUNG SẴN – chủ module: C · FR-02 CRUD địa điểm tổ chức (issue #9)
 *
 * Gắn middleware validate + controller (vai trò @RequestMapping).
 * Router này ĐÃ được đăng ký sẵn tại /api/admin/venues trong server/routes.ts,
 * nên chỉ cần thêm endpoint ở đây, không phải sửa file routes.ts.
 *
 * Mẫu:
 *   router.get('/', validate({ query: listVenueQuery }), controller.list);
 *   router.post('/', validate({ body: createVenue }), controller.create);
 */
const router = Router();

// TODO(#9): thêm endpoint theo hợp đồng trong docs/02 mục 4

export default router;
