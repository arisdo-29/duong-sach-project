import { prisma } from '../../db.js';

/**
 * KHUNG SẴN – chủ module: C · FR-02 CRUD địa điểm tổ chức (issue #9)
 *
 * Nghiệp vụ + gọi Prisma (vai trò @Service). Controller không gọi Prisma trực tiếp.
 * Ném lỗi bằng NotFoundError / BadRequestError / ConflictError trong core/errors.js.
 */

// Giữ import prisma để module luôn biên dịch được; xóa dòng dưới khi viết hàm thật.
void prisma;

// TODO(#9): list / getById / create / update / remove
