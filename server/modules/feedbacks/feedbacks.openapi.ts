import type { OpenApiPaths } from '../../core/openapi.js';
import { FEEDBACK_STATUSES } from './feedbacks.schema.js';

const heritageBriefSchema = {
  type: 'object',
  nullable: true,
  properties: {
    id: { type: 'string', format: 'uuid' },
    slug: { type: 'string' },
    name_vi: { type: 'string' },
    name_en: { type: 'string' },
  },
};

const feedbackSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    content: { type: 'string' },
    rating: { type: 'integer', minimum: 1, maximum: 5 },
    status: { type: 'string', enum: [...FEEDBACK_STATUSES] },
    createdAt: { type: 'string', example: '2026-09-19 14:30' },
    scope: { type: 'string', example: 'Nhà thờ Đức Bà Sài Gòn' },
    contact: { type: 'string', description: 'Rỗng nếu du khách không để lại liên hệ' },
    heritage_id: { type: 'string', nullable: true, description: 'NULL nếu là góp ý chung "Toàn Đường Sách"' },
    heritage: heritageBriefSchema,
  },
};

const notFound = {
  description: 'Không tìm thấy góp ý',
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
};

export const feedbacksPaths: OpenApiPaths = {
  '/api/admin/feedbacks': {
    get: {
      tags: ['Góp ý'],
      summary: 'Danh sách góp ý',
      description: 'Các điều kiện lọc được kết hợp theo AND. `heritageId` nhận UUID, slug hoặc `general` cho góp ý toàn Đường Sách.',
      parameters: [
        { name: 'heritageId', in: 'query', schema: { type: 'string' }, description: 'UUID, slug hoặc `general`' },
        { name: 'status', in: 'query', schema: { type: 'string', enum: [...FEEDBACK_STATUSES] } },
        { name: 'rating', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 5 } },
        { name: 'minRating', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 5 } },
        { name: 'maxRating', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 5 } },
      ],
      responses: {
        200: {
          description: 'Danh sách góp ý',
          content: { 'application/json': { schema: { type: 'array', items: feedbackSchema } } },
        },
      },
    },
  },

  '/api/admin/feedbacks/{id}/status': {
    patch: {
      tags: ['Góp ý'],
      summary: 'Cập nhật trạng thái xử lý',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['status'],
              properties: { status: { type: 'string', enum: [...FEEDBACK_STATUSES] } },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Đã cập nhật',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { message: { type: 'string' }, feedback: feedbackSchema },
              },
            },
          },
        },
        400: {
          description: 'Trạng thái không hợp lệ',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        404: notFound,
      },
    },
  },

  '/api/admin/feedbacks/{id}': {
    delete: {
      tags: ['Góp ý'],
      summary: 'Xóa góp ý',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: {
        200: {
          description: 'Đã xóa',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { message: { type: 'string' }, id: { type: 'string' } },
              },
            },
          },
        },
        404: notFound,
      },
    },
  },
};

export default feedbacksPaths;
