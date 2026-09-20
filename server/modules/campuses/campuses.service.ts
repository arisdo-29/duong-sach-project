import { prisma } from '../../db.js';
import { NotFoundError } from '../../core/errors.js';

/**
 * Cơ sở Đường Sách (HCM, THU_DUC). Dữ liệu nạp bằng seed, API chỉ đọc —
 * dùng để đổ dropdown "cơ sở" ở màn gian hàng và địa điểm.
 */

export async function list() {
  return prisma.campus.findMany({
    orderBy: { code: 'asc' },
    include: {
      _count: { select: { booths: true, venues: true } },
    },
  });
}

/**
 * Tra cứu theo id hoặc mã (`HCM` / `THU_DUC`).
 * Các module khác dùng hàm này để cho phép query `?campusId=HCM` như docs/02 mô tả.
 */
export async function findByIdOrCode(idOrCode: string) {
  return prisma.campus.findFirst({
    where: { OR: [{ id: idOrCode }, { code: idOrCode.toUpperCase() }] },
  });
}

/** Như findByIdOrCode nhưng không tìm thấy thì ném 404 */
export async function getByIdOrCode(idOrCode: string) {
  const campus = await findByIdOrCode(idOrCode);
  if (!campus) throw new NotFoundError('Không tìm thấy cơ sở');
  return campus;
}
