import { Router } from 'express';
import { validate } from '../../core/validate.js';
import * as feedbacksController from '../feedbacks/feedbacks.controller.js';
import { createFeedback } from '../feedbacks/feedbacks.schema.js';
import * as heritagesController from '../heritages/heritages.controller.js';
import { heritageRefParam } from '../heritages/heritages.schema.js';

/**
 * API công khai cho du khách, đăng ký tại /api trong server/routes.ts.
 * Tách riêng khỏi nhánh /api/admin để API quản trị không còn lộ ở hai đường dẫn
 * như bản cũ (docs/01 mục 6, lỗi #8).
 *
 * TODO(#18): FR-11 bổ sung POST /api/proposals
 */
const router = Router();

router.post('/feedbacks', validate({ body: createFeedback }), feedbacksController.create);

// FR-10 (issue #17): danh sách/chi tiết di sản công khai – bản rút gọn của /api/admin/heritages
router.get('/heritages', heritagesController.listPublic);
router.get('/heritages/:id', validate({ params: heritageRefParam }), heritagesController.getPublic);

export default router;
