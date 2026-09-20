import { prisma } from '../../db.js';

/**
 * KHUNG SẴN – chủ module: D · FR-03 CRUD thiết bị (issue #10)
 *
 * Nghiệp vụ + gọi Prisma (vai trò @Service). Controller không gọi Prisma trực tiếp.
 * Ném lỗi bằng NotFoundError / BadRequestError / ConflictError trong core/errors.js.
 */

// Giữ import prisma để module luôn biên dịch được; xóa dòng dưới khi viết hàm thật.
void prisma;

// TODO(#10): list / getById / create / update / remove
