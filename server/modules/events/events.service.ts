import { prisma } from '../../db.js';

/**
 * KHUNG SẴN – chủ module: C · FR-04 CRUD sự kiện (issue #11)
 *
 * Nghiệp vụ + gọi Prisma (vai trò @Service). Controller không gọi Prisma trực tiếp.
 * Ném lỗi bằng NotFoundError / BadRequestError / ConflictError trong core/errors.js.
 */

// Giữ import prisma để module luôn biên dịch được; xóa dòng dưới khi viết hàm thật.
void prisma;

// TODO(#11): list / getById / create / update / remove
