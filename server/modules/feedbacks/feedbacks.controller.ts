import type { Request, Response } from 'express';
import * as service from './feedbacks.service.js';
import type { FeedbackStatus } from './feedbacks.schema.js';

type IdRequest = Request<{ id: string }>;

/** GET /api/admin/feedbacks */
export async function list(_req: Request, res: Response): Promise<void> {
  res.status(200).json(await service.list());
}

/** PATCH /api/admin/feedbacks/:id/status */
export async function updateStatus(req: IdRequest, res: Response): Promise<void> {
  const { status } = req.body as { status: FeedbackStatus };
  res.status(200).json(await service.updateStatus(req.params.id, status));
}

/** DELETE /api/admin/feedbacks/:id */
export async function remove(req: IdRequest, res: Response): Promise<void> {
  res.status(200).json(await service.remove(req.params.id));
}

/** POST /api/feedbacks – gắn ở router public, du khách gửi góp ý */
export async function create(req: Request, res: Response): Promise<void> {
  res.status(201).json(await service.create(req.body));
}
