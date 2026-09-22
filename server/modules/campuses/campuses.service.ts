import { prisma } from '../../db.js';
import { NotFoundError } from '../../core/errors.js';

/**
 * Cơ sở Đường Sách (HCM, THU_DUC). Dữ liệu nạp bằng seed, API chỉ đọc —
 * dùng để đổ dropdown "cơ sở" ở màn gian hàng và địa điểm.
 */

const GIAN_HANG_SLUG = 'gian-hang';

type CampusWithCounts = Awaited<ReturnType<typeof findAll>>[number];

async function findAll() {
  return prisma.campus.findMany({
    orderBy: { Code: 'asc' },
    include: {
      _count: {
        select: {
          Items: { where: { Deleted: false, ItemCategory: { Slug: GIAN_HANG_SLUG } } },
          Venues: true,
        },
      },
    },
  });
}

/** Hợp đồng JSON giữ nguyên (docs/02): id, code, name, address, createdAt, _count.{booths,venues} */
function toDto(campus: CampusWithCounts) {
  return {
    id: campus.Id,
    code: campus.Code,
    name: campus.Name,
    address: campus.Address,
    createdAt: campus.DateCreated,
    _count: {
      booths: campus._count.Items,
      venues: campus._count.Venues,
    },
  };
}

export async function list() {
  const campuses = await findAll();
  return campuses.map(toDto);
}

/**
 * Tra cứu theo id hoặc mã (`HCM` / `THU_DUC`).
 * Các module khác dùng hàm này để cho phép query `?campusId=HCM` như docs/02 mô tả.
 */
export async function findByIdOrCode(idOrCode: string) {
  return prisma.campus.findFirst({
    where: { OR: [{ Id: idOrCode }, { Code: idOrCode.toUpperCase() }] },
  });
}

/** Như findByIdOrCode nhưng không tìm thấy thì ném 404 */
export async function getByIdOrCode(idOrCode: string) {
  const campus = await findByIdOrCode(idOrCode);
  if (!campus) throw new NotFoundError('Không tìm thấy cơ sở');
  return campus;
}
