import { Router } from 'express';
import { validate } from '../../core/validate.js';
import * as controller from './qr.controller.js';
import { qrQuery, qrRefParam } from './qr.schema.js';

/**
 * Đăng ký tại /api/admin/heritages trong server/routes.ts (trước router heritages),
 * nên đường dẫn đầy đủ là GET /api/admin/heritages/:id/qr.
 * Tách riêng module vì đây là đầu việc FR-08, nhưng vẫn thuộc nhóm URL di sản.
 */
const router = Router();

router.get('/:id/qr', validate({ params: qrRefParam, query: qrQuery }), controller.generate);

export default router;
