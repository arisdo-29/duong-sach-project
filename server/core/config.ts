/**
 * Cấu hình đọc từ biến môi trường (vai trò như application.yml của Spring Boot).
 * Không hard-code domain / chuỗi kết nối ở bất kỳ chỗ nào khác.
 */

/** Bỏ dấu "/" thừa ở cuối để ghép URL không bị "//" */
function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

export const config = {
  /** Cổng chạy server khi gọi `npm run server` (Vercel tự quản lý cổng) */
  port: Number(process.env.PORT) || 5000,

  /**
   * Domain công khai dùng để sinh URL trong mã QR di sản.
   * Máy dev mặc định http://localhost:5173; production đặt trong Vercel.
   */
  publicBaseUrl: stripTrailingSlash(process.env.PUBLIC_BASE_URL || 'http://localhost:5173'),

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  },
};

export default config;
