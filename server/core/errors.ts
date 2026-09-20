/**
 * Lỗi nghiệp vụ dùng chung cho mọi module.
 * Service ném lỗi ở đây; error-handler.ts đổi thành phản hồi JSON chuẩn.
 * (Tương đương exception tùy biến + @ControllerAdvice bên Spring Boot.)
 */

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL';

export interface ErrorDetail {
  path: string;
  message: string;
}

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly details?: ErrorDetail[];

  constructor(status: number, code: ErrorCode, message: string, details?: ErrorDetail[]) {
    super(message);
    this.name = new.target.name;
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/** 400 – dữ liệu gửi lên không hợp lệ về mặt nghiệp vụ */
export class BadRequestError extends AppError {
  constructor(message: string, details?: ErrorDetail[]) {
    super(400, 'BAD_REQUEST', message, details);
  }
}

/** 404 – không tìm thấy bản ghi */
export class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy dữ liệu') {
    super(404, 'NOT_FOUND', message);
  }
}

/** 409 – xung đột: trùng dữ liệu duy nhất, hoặc bản ghi đang được nơi khác dùng */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, 'CONFLICT', message);
  }
}
