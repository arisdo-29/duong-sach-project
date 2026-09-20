import { Router } from 'express';
import { validate } from '../../core/validate.js';
import * as controller from './feedbacks.controller.js';
import { idParam, updateStatus } from './feedbacks.schema.js';

/** Đăng ký tại /api/admin/feedbacks trong server/routes.ts */
const router = Router();

router.get('/', controller.list);
router.patch('/:id/status', validate({ params: idParam, body: updateStatus }), controller.updateStatus);
router.delete('/:id', validate({ params: idParam }), controller.remove);

export default router;
