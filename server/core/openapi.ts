/**
 * Gộp mô tả endpoint của các module thành một tài liệu OpenAPI 3.0
 * phục vụ /api/openapi.json và trang /api-docs.html
 * (vai trò springdoc + Swagger UI bên Spring Boot).
 *
 * Mỗi module tự khai báo phần của mình trong <module>.openapi.ts và
 * export ra một object `paths`. Thêm endpoint mới thì sửa file đó,
 * không phải sửa file này.
 */

/** Kiểu lỏng: chỉ cần đủ để Swagger UI hiển thị, không ràng buộc toàn bộ chuẩn OpenAPI */
export type OpenApiOperation = Record<string, unknown>;
export type OpenApiPaths = Record<string, Record<string, OpenApiOperation>>;

export interface OpenApiTag {
  name: string;
  description?: string;
}

/** Phản hồi lỗi dùng chung – tham chiếu bằng $ref cho gọn */
const errorSchema = {
  type: 'object',
  properties: {
    error: { type: 'string', example: 'Không tìm thấy di sản' },
    code: {
      type: 'string',
      enum: ['VALIDATION_ERROR', 'BAD_REQUEST', 'NOT_FOUND', 'CONFLICT', 'INTERNAL'],
    },
    details: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
} as const;

export function buildOpenApiDocument(input: {
  paths: OpenApiPaths;
  tags: OpenApiTag[];
}): Record<string, unknown> {
  return {
    openapi: '3.0.3',
    info: {
      title: 'API Đường Sách TP.HCM',
      version: '1.0.0',
      description:
        'API quản trị và API công khai cho website Đường Sách TP.HCM. ' +
        'Hợp đồng chi tiết: docs/02-requirements-va-uu-tien.md.',
    },
    servers: [{ url: '/', description: 'Cùng domain với trang web' }],
    tags: input.tags,
    paths: input.paths,
    components: {
      schemas: {
        Error: errorSchema,
      },
    },
  };
}

/** Gộp nhiều object paths lại; cùng một đường dẫn thì gộp theo method */
export function mergePaths(...parts: OpenApiPaths[]): OpenApiPaths {
  const merged: OpenApiPaths = {};

  for (const part of parts) {
    for (const [path, operations] of Object.entries(part)) {
      merged[path] = { ...(merged[path] ?? {}), ...operations };
    }
  }

  return merged;
}
