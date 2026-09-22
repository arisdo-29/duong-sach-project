import type { Request, Response } from 'express';
import * as service from './heritages.service.js';

/** :id trên URL nhận UUID hoặc slug */
type RefRequest = Request<{ id: string }>;

/** GET /api/admin/heritages */
export async function list(_req: Request, res: Response): Promise<void> {
  res.status(200).json(await service.list());
}

/** GET /api/admin/heritages/:id – id là UUID hoặc slug */
export async function getOne(req: RefRequest, res: Response): Promise<void> {
  res.status(200).json(await service.getDetail(req.params.id));
}

/** POST /api/admin/heritages */
export async function create(req: Request, res: Response): Promise<void> {
  res.status(201).json(await service.create(req.body));
}

/** PUT /api/admin/heritages/:id */
export async function update(req: RefRequest, res: Response): Promise<void> {
  res.status(200).json(await service.update(req.params.id, req.body));
}

/** DELETE /api/admin/heritages/:id */
export async function remove(req: RefRequest, res: Response): Promise<void> {
  res.status(200).json(await service.remove(req.params.id));
}

/** GET /api/heritages – công khai, bản rút gọn không kèm _count.feedbacks (FR-10) */
export async function listPublic(_req: Request, res: Response): Promise<void> {
  res.status(200).json(await service.listPublic());
}

/** GET /api/heritages/:id – công khai, id là UUID hoặc slug (FR-10) */
export async function getPublic(req: RefRequest, res: Response): Promise<void> {
  res.status(200).json(await service.getByIdOrSlug(req.params.id));
}
