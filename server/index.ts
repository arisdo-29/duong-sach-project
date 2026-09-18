import express from 'express';
import cors from 'cors';
import adminRouter from './routes/admin.ts';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api', adminRouter); // Hỗ trợ cả /api/feedbacks và /api/admin/feedbacks

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

// Chỉ khởi động server độc lập nếu file được chạy trực tiếp qua CLI
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('server/index.ts') || 
  process.argv[1].endsWith('server\\index.ts') ||
  process.argv[1].endsWith('server/index') ||
  process.argv[1].endsWith('server\\index')
);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`[Backend Server] Chạy tại http://localhost:${PORT}`);
  });
}

export default app;
