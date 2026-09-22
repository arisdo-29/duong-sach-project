import type { OpenApiPaths } from '../../core/openapi.js';

const heritageSummarySchema = {
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

const heritageNotFound = {
  description: 'Không tìm thấy di sản',
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
};

export const publicPaths: OpenApiPaths = {
  '/api/heritages': {
    get: {
      tags: ['Công khai'],
      summary: 'Danh sách di sản (rút gọn)',
      description: 'Bản công khai của /api/admin/heritages, không kèm `_count.feedbacks` (FR-10).',
      responses: {
        200: {
          description: 'Danh sách di sản',
          content: { 'application/json': { schema: { type: 'array', items: heritageSummarySchema } } },
        },
      },
    },
  },
  '/api/heritages/{id}': {
    get: {
      tags: ['Công khai'],
      summary: 'Chi tiết di sản theo slug (hoặc UUID)',
      description: 'Không kèm danh sách góp ý (khác với /api/admin/heritages/{id}) – chỉ dữ liệu hiển thị công khai.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Slug của di sản (in trên mã QR) hoặc UUID',
        },
      ],
      responses: {
        200: { description: 'Chi tiết', content: { 'application/json': { schema: heritageSummarySchema } } },
        404: heritageNotFound,
      },
    },
  },
  '/api/feedbacks': {
    post: {
      tags: ['Công khai'],
      summary: 'Du khách gửi góp ý',
      description:
        'Trường `contact` là tùy chọn theo nguyên tắc privacy by design: không bắt buộc ' +
        'du khách để lại thông tin cá nhân mới được góp ý.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['content', 'rating'],
              properties: {
                content: { type: 'string', example: 'Cần thêm biển chỉ dẫn tiếng Anh' },
                rating: { type: 'integer', minimum: 1, maximum: 5, example: 4 },
                scope: { type: 'string', example: 'Toàn khu vực Đường Sách' },
                contact: { type: 'string', example: '' },
                heritage_id: { type: 'string', format: 'uuid' },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Đã ghi nhận góp ý',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  feedback: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      content: { type: 'string' },
                      rating: { type: 'integer' },
                      status: { type: 'string', example: 'PENDING' },
                      createdAt: { type: 'string', example: '2026-09-20 09:15' },
                      scope: { type: 'string' },
                      contact: { type: 'string' },
                      heritage_id: { type: 'string', nullable: true, description: 'NULL nếu là góp ý chung "Toàn Đường Sách"' },
                      heritage: {
                        type: 'object',
                        nullable: true,
                        properties: {
                          id: { type: 'string', format: 'uuid' },
                          slug: { type: 'string' },
                          name_vi: { type: 'string' },
                          name_en: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Dữ liệu không hợp lệ',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
      },
    },
  },
};

export default publicPaths;
