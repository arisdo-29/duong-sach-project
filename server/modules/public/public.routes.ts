import { Router } from 'express';
import { validate } from '../../core/validate.js';
import * as feedbacksController from '../feedbacks/feedbacks.controller.js';
import { createFeedback } from '../feedbacks/feedbacks.schema.js';

/**
 * API công khai cho du khách, đăng ký tại /api trong server/routes.ts.
 * Tách riêng khỏi nhánh /api/admin để API quản trị không còn lộ ở hai đường dẫn
 * như bản cũ (docs/01 mục 6, lỗi #8).
 *
 * TODO(#17): FR-10 bổ sung GET /api/heritages/:slug
 * TODO(#18): FR-11 bổ sung POST /api/proposals
 */
const router = Router();

router.post('/feedbacks', validate({ body: createFeedback }), feedbacksController.create);

export default router;
