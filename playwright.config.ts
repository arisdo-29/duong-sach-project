import { defineConfig, devices } from '@playwright/test';

/**
 * Cấu hình kiểm thử giao diện bằng trình duyệt thật.
 *
 * Vì sao cần: app điều hướng bằng state trong React chứ không render phía
 * server, nên gọi HTTP đơn thuần (curl) luôn trả về cùng một khung HTML cho
 * mọi đường dẫn — không chứng minh được màn hình có hiện đúng hay không.
 * Chỉ trình duyệt thật mới kiểm được click, Back/Forward và nội dung mã QR.
 *
 * Chạy:  npm run test:e2e          (tự khởi động npm run dev)
 *        npm run test:e2e -- --ui  (chế độ xem trực quan)
 */
export default defineConfig({
  testDir: './e2e',
  // Nạp danh sách di sản thật từ API (xem e2e/global-setup.ts) trước khi chạy test
  globalSetup: './e2e/global-setup.ts',
  // Du khách quét QR chủ yếu bằng điện thoại nên lấy đó làm mặc định
  use: {
    baseURL: 'http://localhost:5173',
    viewport: { width: 390, height: 844 },
    navigationTimeout: 45_000,
    actionTimeout: 15_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'dien-thoai-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
  ],
  // Ảnh ngoài đã bị chặn trong test nên chạy song song vẫn ổn định
  fullyParallel: true,
  workers: process.env.CI ? 1 : 4,
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
