import type { OpenApiPaths } from '../../core/openapi.js';

export const qrPaths: OpenApiPaths = {
  '/api/admin/heritages/{id}/qr': {
    get: {
      tags: ['Di sản'],
      summary: 'Sinh mã QR check-in của di sản',
      description:
        'Ảnh PNG dạng Base64. URL trong QR dựng theo **slug** và domain lấy từ cấu hình ' +
        '`PUBLIC_BASE_URL`, nên QR in ra không bao giờ gãy link.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'UUID hoặc slug của di sản',
        },
        {
          name: 'size',
          in: 'query',
          required: false,
          schema: { type: 'integer', minimum: 100, maximum: 1000, default: 300 },
          description: 'Kích thước ảnh QR (pixel)',
        },
      ],
      responses: {
        200: {
          description: 'Ảnh QR',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: { type: 'string', example: 'https://duong-sach-project.vercel.app/di-san/nha-tho-duc-ba' },
                  qrCode: { type: 'string', example: 'data:image/png;base64,...' },
                  heritage: {
                    type: 'object',
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
        400: {
          description: 'Tham số size không hợp lệ (phải là số nguyên từ 100 đến 1000)',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        404: {
          description: 'Không tìm thấy di sản hoặc di sản đã bị xóa mềm',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
      },
    },
  },
};

export default qrPaths;
