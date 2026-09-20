import express from 'express';
import cors from 'cors';
import apiRouter from './routes.js';
import { errorHandler, notFoundHandler } from './core/error-handler.js';

/**
 * Tạo Express app. File này KHÔNG tự lắng nghe cổng, chỉ export app, để dùng được
 * ở cả ba nơi: vite dev (middleware), `npm run server` (server/index.ts) và
 * Vercel Function (api/index.ts).
 */
export const app = express();

app.use(cors());
app.use(express.json());

// Toàn bộ endpoint nằm dưới /api (xem server/routes.ts)
app.use('/api', apiRouter);

// Đường dẫn /api/** không khớp router nào → 404 dạng JSON, không trả HTML
app.use('/api', notFoundHandler);

// Error handler phải đăng ký CUỐI CÙNG (vai trò @ControllerAdvice)
app.use(errorHandler);

export default app;
