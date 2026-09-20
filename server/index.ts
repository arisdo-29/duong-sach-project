import app from './app.js';
import { config } from './core/config.js';

/**
 * Entry chạy server độc lập: `npm run server`.
 * Khi chạy bằng `npm run dev`, Vite nạp thẳng server/app.ts làm middleware
 * nên file này không được dùng tới; trên Vercel thì entry là api/index.ts.
 */
app.listen(config.port, () => {
  console.log(`[Backend] Đang chạy tại http://localhost:${config.port}`);
  console.log(`[Backend] Kiểm tra: http://localhost:${config.port}/api/health`);
});
