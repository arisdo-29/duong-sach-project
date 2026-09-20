import type { OpenApiPaths } from '../../core/openapi.js';

const heritageSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    slug: { type: 'string', example: 'nha-tho-duc-ba' },
    name_vi: { type: 'string', example: 'Nhà thờ Đức Bà Sài Gòn' },
    name_en: { type: 'string', example: 'Notre-Dame Cathedral Basilica of Saigon' },
    content_vi: { type: 'string' },
    content_en: { type: 'string' },
    image_url: { type: 'string' },
    source: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
  },
};

const refParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'string' },
  description: 'UUID hoặc slug của di sản',
};

const notFound = {
  description: 'Không tìm thấy di sản',
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
};

export const heritagesPaths: OpenApiPaths = {
  '/api/admin/heritages': {
    get: {
      tags: ['Di sản'],
      summary: 'Danh sách di sản',
      description: 'Kèm `_count.feedbacks` là số góp ý của từng di sản.',
      responses: {
        200: {
          description: 'Danh sách di sản',
          content: { 'application/json': { schema: { type: 'array', items: heritageSchema } } },
        },
      },
    },
    post: {
      tags: ['Di sản'],
      summary: 'Thêm di sản',
      description: 'Slug tự sinh từ `name_vi` (bỏ dấu) và cố định từ đó về sau vì mã QR in vật lý dùng slug.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name_vi', 'content_vi'],
              properties: {
                name_vi: { type: 'string' },
                name_en: { type: 'string' },
                content_vi: { type: 'string' },
                content_en: { type: 'string' },
                image_url: { type: 'string' },
                source: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Đã tạo', content: { 'application/json': { schema: heritageSchema } } },
        400: {
          description: 'Dữ liệu không hợp lệ',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
      },
    },
  },

  '/api/admin/heritages/{id}': {
    get: {
      tags: ['Di sản'],
      summary: 'Chi tiết di sản (kèm góp ý)',
      parameters: [refParam],
      responses: {
        200: { description: 'Chi tiết', content: { 'application/json': { schema: heritageSchema } } },
        404: notFound,
      },
    },
    put: {
      tags: ['Di sản'],
      summary: 'Sửa nội dung di sản',
      description: 'Không cho phép đổi `slug`: slug cố định để mã QR đã in không bị gãy link. Nếu gửi slug khác với slug hiện tại sẽ trả lỗi 400.',
      parameters: [refParam],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object', properties: heritageSchema.properties } } },
      },
      responses: {
        200: { description: 'Đã cập nhật', content: { 'application/json': { schema: heritageSchema } } },
        400: {
          description: 'Dữ liệu không hợp lệ hoặc cố tình thay đổi slug',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        404: notFound,
      },
    },
    delete: {
      tags: ['Di sản'],
      summary: 'Xóa mềm di sản',
      description: 'Đánh dấu `deleted_at`, không xóa các góp ý liên quan. Di sản đã xóa sẽ không xuất hiện trong danh sách, QR hoặc API public.',
      parameters: [refParam],
      responses: {
        200: {
          description: 'Đã xóa mềm',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  id: { type: 'string' },
                  slug: { type: 'string' },
                },
              },
            },
          },
        },
        404: notFound,
      },
    },
  },
};

export default heritagesPaths;
