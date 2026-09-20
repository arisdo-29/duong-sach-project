import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError, type ErrorCode, type ErrorDetail } from './errors.js';

/**
 * Nơi duy nhất biến lỗi thành phản hồi JSON (vai trò @ControllerAdvice của Spring Boot).
 * Hợp đồng lỗi – docs/02 mục 4:
 *   { "error": "Thông báo tiếng Việt", "code": "NOT_FOUND", "details": [...] }
 * Tuyệt đối không trả stacktrace hay object lỗi gốc ra client (docs/01 mục 6, lỗi #9).
 */

interface ErrorBody {
  error: string;
  code: ErrorCode;
  details?: ErrorDetail[];
}

/** Lỗi Prisma có mã dạng P2025, P2002... nhưng không phải lúc nào cũng là instance của lớp Prisma */
function getPrismaErrorCode(err: unknown): string | null {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as { code: unknown }).code;
    if (typeof code === 'string' && /^P\d{4}$/.test(code)) return code;
  }
  return null;
}

/** Tên cột gây lỗi unique / khóa ngoại, để thông báo dễ hiểu hơn */
function getPrismaTarget(err: unknown): string | null {
  if (typeof err === 'object' && err !== null && 'meta' in err) {
    const meta = (err as { meta?: Record<string, unknown> }).meta;
    const target = meta?.target ?? meta?.field_name;
    if (Array.isArray(target)) return target.join(', ');
    if (typeof target === 'string') return target;
  }
  return null;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  // 1. Lỗi nghiệp vụ do service chủ động ném
  if (err instanceof AppError) {
    const body: ErrorBody = { error: err.message, code: err.code };
    if (err.details?.length) body.details = err.details;
    res.status(err.status).json(body);
    return;
  }

  // 2. Lỗi zod (thường đã được validate.ts bắt, giữ đây cho chắc)
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Dữ liệu gửi lên không hợp lệ',
      code: 'VALIDATION_ERROR',
      details: err.issues.map((issue) => ({
        path: issue.path.join('.') || '(body)',
        message: issue.message,
      })),
    } satisfies ErrorBody);
    return;
  }

  // 3. Lỗi Prisma → đổi sang mã HTTP tương ứng
  const prismaCode = getPrismaErrorCode(err);
  if (prismaCode) {
    const target = getPrismaTarget(err);

    if (prismaCode === 'P2025') {
      res.status(404).json({ error: 'Không tìm thấy dữ liệu', code: 'NOT_FOUND' } satisfies ErrorBody);
      return;
    }
    if (prismaCode === 'P2002') {
      res.status(409).json({
        error: target ? `Giá trị đã tồn tại: ${target}` : 'Dữ liệu đã tồn tại',
        code: 'CONFLICT',
      } satisfies ErrorBody);
      return;
    }
    if (prismaCode === 'P2003') {
      res.status(409).json({
        error: 'Bản ghi đang được sử dụng, không thể thực hiện thao tác này',
        code: 'CONFLICT',
      } satisfies ErrorBody);
      return;
    }
  }

  // 4. Còn lại: ghi log phía server, client chỉ nhận thông báo chung
  console.error('[Lỗi không lường trước]', err);
  res.status(500).json({ error: 'Lỗi hệ thống, vui lòng thử lại', code: 'INTERNAL' } satisfies ErrorBody);
}

/** 404 cho đường dẫn /api/** không khớp router nào */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: `Không tìm thấy endpoint ${req.method} ${req.path}`,
    code: 'NOT_FOUND',
  } satisfies ErrorBody);
}

export default errorHandler;
