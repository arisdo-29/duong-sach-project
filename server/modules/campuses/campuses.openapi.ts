import type { OpenApiPaths } from '../../core/openapi.js';

export const campusesPaths: OpenApiPaths = {
  '/api/admin/campuses': {
    get: {
      tags: ['Cơ sở'],
      summary: 'Danh sách cơ sở Đường Sách',
      description: 'Dữ liệu chỉ đọc, nạp bằng seed. Dùng để đổ dropdown cơ sở ở gian hàng và địa điểm.',
      responses: {
        200: {
          description: 'Danh sách cơ sở',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    code: { type: 'string', example: 'HCM' },
                    name: { type: 'string', example: 'Đường Sách TP.HCM' },
                    address: { type: 'string', nullable: true },
                    createdAt: { type: 'string', format: 'date-time' },
                    _count: {
                      type: 'object',
                      properties: {
                        booths: { type: 'integer' },
                        venues: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default campusesPaths;
