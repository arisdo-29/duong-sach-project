import { Router } from 'express';
import * as controller from './campuses.controller.js';

/** Đăng ký tại /api/admin/campuses trong server/routes.ts */
const router = Router();

router.get('/', controller.list);

export default router;
