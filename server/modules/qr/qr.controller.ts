import type { Request, Response } from 'express';
import * as service from './qr.service.js';
import type { QrQuery } from './qr.schema.js';

/** GET /api/admin/heritages/:id/qr?size=300 */
export async function generate(req: Request<{ id: string }>, res: Response): Promise<void> {
  const { size } = req.query as unknown as QrQuery;
  res.status(200).json(await service.generate(req.params.id, size));
}
