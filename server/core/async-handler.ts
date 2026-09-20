import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Bọc một handler async để lỗi luôn chảy về error-handler.
 *
 * Express 5 đã tự bắt Promise bị reject nên phần lớn controller KHÔNG cần
 * try/catch và cũng không cần hàm này (xem AGENTS.md mục 3). Giữ lại cho các
 * trường hợp gắn handler ngoài router (middleware tự viết) và để code đọc
 * giống mẫu Express 4 mà nhiều tài liệu đang dùng.
 */
export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export default asyncHandler;
