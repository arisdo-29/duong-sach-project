import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { FullConfig } from '@playwright/test';

/**
 * Chạy trước mọi test, sau khi webServer (npm run dev) đã sẵn sàng.
 *
 * heritage-routing.spec.ts cần danh sách di sản thật để dựng các test theo
 * từng slug ngay lúc nạp file (test.describe chạy đồng bộ), nên không thể gọi
 * API bất đồng bộ ngay trong file spec. Giải pháp: gọi API một lần ở đây rồi
 * ghi ra file JSON tạm để spec đọc đồng bộ, thay vì đọc thẳng src/data/mockData.ts
 * như trước (nguồn dữ liệu giờ là DB qua GET /api/heritages, không còn mock).
 */
async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL = config.projects[0]?.use?.baseURL ?? 'http://localhost:5173';

  const res = await fetch(`${baseURL}/api/heritages`);
  if (!res.ok) {
    throw new Error(
      `GET /api/heritages trả về ${res.status} – kiểm tra SQL Server local đã chạy và seed chưa ` +
        '(npx prisma db push && npm run seed), xem docs/05.'
    );
  }

  const heritages = await res.json();
  const outPath = fileURLToPath(new URL('./.heritages-cache.json', import.meta.url));
  writeFileSync(outPath, JSON.stringify(heritages), 'utf8');
}

export default globalSetup;
