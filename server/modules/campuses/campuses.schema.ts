import { z } from 'zod';

/**
 * Cơ sở là dữ liệu chỉ đọc (nạp bằng seed) nên chưa có body cần validate.
 * Giữ sẵn hằng mã cơ sở để các module khác dùng chung khi lọc `?campusId=HCM`.
 */

export const CAMPUS_CODES = ['HCM', 'THU_DUC'] as const;

export const CAMPUS_CODE_LABELS: Record<(typeof CAMPUS_CODES)[number], string> = {
  HCM: 'Đường Sách TP.HCM (Nguyễn Văn Bình)',
  THU_DUC: 'Đường Sách Thành phố Thủ Đức',
};

/** Chấp nhận cả UUID lẫn mã cơ sở, dùng cho query `?campusId=` */
export const campusRef = z.string().min(1, 'campusId không được để trống');

export const campusCode = z.enum(CAMPUS_CODES);
