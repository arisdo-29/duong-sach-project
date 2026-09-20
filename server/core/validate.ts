import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError, type ZodTypeAny } from 'zod';

/**
 * Middleware hợp lệ hóa dữ liệu vào bằng zod
 * (vai trò DTO + @Valid + @NotBlank bên Spring Boot).
 *
 * Dùng trong <module>.routes.ts:
 *   router.get('/', validate({ query: listQuery }), controller.list);
 *   router.post('/', validate({ body: createBooth }), controller.create);
 *
 * Giá trị sau khi parse được ghi đè lại vào req, nên controller nhận đúng kiểu
 * đã ép (ví dụ z.coerce.number() cho tham số trên query string).
 */

export interface ValidateSchemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

export function validate(schemas: ValidateSchemas): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        Object.assign(req.params, schemas.params.parse(req.params));
      }
      if (schemas.query) {
        // Express 5: req.query chỉ có getter → ghi đè bằng defineProperty
        const parsedQuery = schemas.query.parse(req.query);
        Object.defineProperty(req, 'query', {
          value: parsedQuery,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Chuyển sang error-handler để giữ một định dạng lỗi duy nhất
        next(error);
        return;
      }
      next(error);
    }
  };
}

export default validate;
