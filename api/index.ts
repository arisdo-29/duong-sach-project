import app from '../server/app.js';

/**
 * Entry của Vercel Function. Vercel gom mọi request khớp rewrite "/api/(.*)"
 * trong vercel.json về đây, rồi Express tự định tuyến tiếp như khi chạy local.
 * Import phải kết thúc bằng .js để chạy được sau khi biên dịch (AGENTS.md mục 3).
 */
export default app;
