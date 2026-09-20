import { Router } from 'express';
import { validate } from '../../core/validate.js';
import * as controller from './heritages.controller.js';
import { createHeritage, heritageRefParam, updateHeritage } from './heritages.schema.js';

/** Đăng ký tại /api/admin/heritages trong server/routes.ts */
const router = Router();

router.get('/', controller.list);
router.post('/', validate({ body: createHeritage }), controller.create);

router.get('/:id', validate({ params: heritageRefParam }), controller.getOne);
router.put('/:id', validate({ params: heritageRefParam, body: updateHeritage }), controller.update);
router.delete('/:id', validate({ params: heritageRefParam }), controller.remove);

export default router;
