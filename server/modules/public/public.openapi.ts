import type { OpenApiPaths } from '../../core/openapi.js';

export const publicPaths: OpenApiPaths = {
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
                      heritage_id: { type: 'string', nullable: true },
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
