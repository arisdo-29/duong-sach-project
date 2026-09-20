import { Router, type Request, type Response } from 'express';

import campusesRoutes from './modules/campuses/campuses.routes.js';
import boothsRoutes from './modules/booths/booths.routes.js';
import venuesRoutes from './modules/venues/venues.routes.js';
import assetsRoutes from './modules/assets/assets.routes.js';
import eventsRoutes from './modules/events/events.routes.js';
import proposalsRoutes from './modules/proposals/proposals.routes.js';
import heritagesRoutes from './modules/heritages/heritages.routes.js';
import qrRoutes from './modules/qr/qr.routes.js';
import feedbacksRoutes from './modules/feedbacks/feedbacks.routes.js';
import publicRoutes from './modules/public/public.routes.js';

import { buildOpenApiDocument, mergePaths } from './core/openapi.js';
import campusesPaths from './modules/campuses/campuses.openapi.js';
import boothsPaths from './modules/booths/booths.openapi.js';
import venuesPaths from './modules/venues/venues.openapi.js';
import assetsPaths from './modules/assets/assets.openapi.js';
import eventsPaths from './modules/events/events.openapi.js';
import proposalsPaths from './modules/proposals/proposals.openapi.js';
import heritagesPaths from './modules/heritages/heritages.openapi.js';
import qrPaths from './modules/qr/qr.openapi.js';
import feedbacksPaths from './modules/feedbacks/feedbacks.openapi.js';
import publicPaths from './modules/public/public.openapi.js';

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

// Phần 3 – di sản, QR, feedback (B)
// qrRoutes gắn trước heritagesRoutes vì cùng tiền tố /heritages
admin.use('/heritages', qrRoutes); // GET /api/admin/heritages/:id/qr
admin.use('/heritages', heritagesRoutes);
admin.use('/feedbacks', feedbacksRoutes);

router.use('/admin', admin);

// ----- Công khai cho du khách ----------------------------------------
router.use('/', publicRoutes);

// ----- Tiện ích -------------------------------------------------------
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

/**
 * Tài liệu API: gộp mô tả của mọi module. Trang /api-docs.html đọc file này.
 * Module thêm endpoint thì chỉ sửa <module>.openapi.ts, tài liệu tự cập nhật.
 */
router.get('/openapi.json', (_req: Request, res: Response) => {
  res.status(200).json(
    buildOpenApiDocument({
      tags: [
        { name: 'Cơ sở', description: 'Cơ sở Đường Sách (chỉ đọc)' },
        { name: 'Gian hàng', description: 'Phần 1 – gian hàng & cơ sở vật chất' },
        { name: 'Địa điểm', description: 'Phần 1 – địa điểm tổ chức' },
        { name: 'Thiết bị', description: 'Phần 1 – thiết bị' },
        { name: 'Sự kiện', description: 'Phần 2 – sự kiện đã công bố' },
        { name: 'Hồ sơ đề xuất', description: 'Phần 2 – xem và duyệt hồ sơ' },
        { name: 'Di sản', description: 'Phần 3 – di sản và mã QR check-in' },
        { name: 'Góp ý', description: 'Phần 3 – quản lý góp ý của du khách' },
        { name: 'Công khai', description: 'API dành cho du khách' },
      ],
      paths: mergePaths(
        campusesPaths,
        boothsPaths,
        venuesPaths,
        assetsPaths,
        eventsPaths,
        proposalsPaths,
        heritagesPaths,
        qrPaths,
        feedbacksPaths,
        publicPaths
      ),
    })
  );
});

export default router;
