import type { Request, Response } from 'express';
import * as service from './campuses.service.js';

/** GET /api/admin/campuses – danh sách cơ sở (chỉ đọc) */
export async function list(_req: Request, res: Response): Promise<void> {
  res.status(200).json(await service.list());
}
