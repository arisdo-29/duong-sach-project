# Đường Sách TP.HCM – Website & hệ thống quản trị

Dự án hợp tác ĐH FPT – AIC Lab. Website song ngữ cho du khách + API quản trị cho Ban quản lý: gian hàng & cơ sở vật chất, sự kiện & hồ sơ đề xuất, di sản (QR) & góp ý.

- Mốc demo mentor: **19:30 ngày 22/09/2026** (chạy local, Swagger tại `http://localhost:5173/api-docs.html`)
- Website (bản cũ, sẽ cập nhật khi có SQL Server trên cloud): https://duong-sach-project.vercel.app

## Công nghệ
React 18 + Vite + Tailwind · Express 5 + Prisma 6 + zod (TypeScript) · **SQL Server** (local: Docker hoặc Developer/Express) · Swagger UI · CKEditor 5 · Vercel

## Chạy trên máy
Cài SQL Server và tạo database theo **[docs/05](docs/05-database-va-deploy.md)** trước, rồi:
```bash
npm install
cp .env.example .env        # điền DATABASE_URL dạng sqlserver://... (docs/05 mục 4)
npx prisma db push          # tạo bảng
npm run seed                # dữ liệu mẫu
npm run dev                 # http://localhost:5173  ·  Swagger: /api-docs.html
```

## Tài liệu nhóm
| File | Nội dung |
|---|---|
| [AGENTS.md](AGENTS.md) | Bối cảnh + quy ước – AI agent và người mới đọc trước |
| [docs/01](docs/01-tong-quan-he-thong.md) | Tổng quan, kiến trúc, **mô hình dữ liệu SQL Server theo khuôn mentor**, quyết định kiến trúc |
| [docs/02](docs/02-requirements-va-uu-tien.md) | 9 API, mức ưu tiên, danh sách issue, hợp đồng API, đối chiếu Spring ↔ Express |
| [docs/03](docs/03-ke-hoach-va-phan-cong.md) | Kế hoạch tới 19:30 22/09, phân công A/B/C/D, rủi ro, kịch bản demo |
| [docs/04](docs/04-git-workflow.md) | Quy trình Git: nhánh, commit, PR, nhánh tích hợp, xử lý xung đột |
| [docs/05](docs/05-database-va-deploy.md) | **Hướng dẫn kết nối SQL Server**, lỗi hay gặp, Database Diagram, deploy |
| [docs/06](docs/06-prompt-mau-cho-claude.md) | Dùng Claude Chat / Claude Code, prompt mẫu cho từng issue |
| [docs/07](docs/07-huong-dan-nhom-truong.md) | Hướng dẫn từng bước cho nhóm trưởng |

## Quy trình làm việc
Issue được tạo tự động từ `.github/backlog.json` (Actions → *Bootstrap backlog*). Mỗi issue → một nhánh `feat/<số>-<mô-tả>` → Pull Request có `Closes #<số>` → trưởng nhóm review, squash merge. Nhãn `status: …` tự đổi theo tiến độ.
