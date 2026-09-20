import { Router, type Request, type Response } from 'express';

import campusesRoutes from './modules/campuses/campuses.routes.js';
import boothsRoutes from './modules/booths/booths.routes.js';
import venuesRoutes from './modules/venues/venues.routes.js';
import assetsRoutes from './modules/assets/assets.routes.js';
import eventsRoutes from './modules/events/events.routes.js';
import proposalsRoutes from './modules/proposals/proposals.routes.js';

import legacyAdminRouter from './routes/admin.js';

/**
 * NƠI DUY NHẤT đăng ký router (vai trò danh sách @RequestMapping gốc).
 * Mỗi module đã có sẵn chỗ ở đây rồi → B, C, D chỉ cần code trong
 * server/modules/<module>/ của mình, KHÔNG phải sửa file này nữa.
 *
 * Quy ước đường dẫn (docs/02 mục 4):
 *   /api/admin/*  – dành cho Ban quản lý
 *   /api/*        – công khai cho du khách
 */
const router = Router();

// ----- Quản trị -------------------------------------------------------
const admin = Router();

admin.use('/campuses', campusesRoutes); // chỉ đọc, phục vụ dropdown cơ sở

// Phần 1 – gian hàng & cơ sở vật chất (C, D)
admin.use('/booths', boothsRoutes);
admin.use('/venues', venuesRoutes);
admin.use('/assets', assetsRoutes);

// Phần 2 – sự kiện & hồ sơ đề xuất (C, D)
admin.use('/events', eventsRoutes);
admin.use('/proposals', proposalsRoutes);

// Phần 3 – di sản, QR, feedback (B): còn nằm trong router cũ, sẽ tách ở bước sau
admin.use(legacyAdminRouter);

router.use('/admin', admin);

// ----- Tiện ích -------------------------------------------------------
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

export default router;
