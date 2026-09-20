import { z } from 'zod';

/**
 * Góp ý – chủ module: B · FR-09 (issue #16), API public FR-10 (issue #17).
 * Trạng thái lưu kiểu String trong DB (schema không dùng enum của Prisma),
 * giá trị hợp lệ kiểm tra tại đây – xem AGENTS.md mục 3.
 */

export const FEEDBACK_STATUSES = ['PENDING', 'REVIEWED', 'RESOLVED'] as const;
export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

/** Nhãn tiếng Việt để hiển thị trên giao diện quản trị */
export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  PENDING: 'Chờ xử lý',
  REVIEWED: 'Đã xem',
  RESOLVED: 'Đã xử lý',
};

export const feedbackStatus = z.enum(FEEDBACK_STATUSES);

export const idParam = z.object({
  id: z.string().min(1, 'Thiếu id góp ý'),
});

/** PATCH /api/admin/feedbacks/:id/status */
export const updateStatus = z.object({
  status: feedbackStatus,
});

/** GET /api/admin/feedbacks – bộ lọc cho màn hình quản trị. */
export const listFeedbackQuery = z
  .object({
    // `general` đại diện cho góp ý không gắn với một di sản cụ thể.
    heritageId: z.string().trim().min(1, 'heritageId không được để trống').optional(),
    status: feedbackStatus.optional(),
    rating: z.coerce.number().int().min(1).max(5).optional(),
    minRating: z.coerce.number().int().min(1).max(5).optional(),
    maxRating: z.coerce.number().int().min(1).max(5).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.minRating !== undefined &&
      data.maxRating !== undefined &&
      data.minRating > data.maxRating
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['minRating'],
        message: 'Điểm tối thiểu không được lớn hơn điểm tối đa',
      });
    }
  });

export type ListFeedbackQuery = z.infer<typeof listFeedbackQuery>;

/**
 * POST /api/feedbacks – form góp ý của du khách.
 * `contact` tùy chọn theo nguyên tắc privacy by design: không ép du khách
 * để lại thông tin cá nhân mới được góp ý.
 */
export const createFeedback = z.object({
  content: z.string().trim().min(1, 'Nội dung không được để trống'),
  rating: z.coerce.number().int().min(1, 'Đánh giá phải từ 1 đến 5 sao').max(5, 'Đánh giá phải từ 1 đến 5 sao'),
  scope: z.string().trim().optional(),
  contact: z.string().trim().optional(),
  heritage_id: z.string().optional(),
});

export type CreateFeedbackInput = z.infer<typeof createFeedback>;
