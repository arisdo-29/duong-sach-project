# Đường Sách TP.HCM – Website & hệ thống quản trị

Dự án hợp tác ĐH FPT – AIC Lab. Website song ngữ cho du khách + API quản trị cho Ban quản lý: gian hàng & cơ sở vật chất, sự kiện & hồ sơ đề xuất, di sản (QR) & góp ý.

- Website: https://duong-sach-project.vercel.app
- Tài liệu API: https://duong-sach-project.vercel.app/api-docs.html *(sau khi deploy xong)*

## Công nghệ
React 18 + Vite + Tailwind · Express 5 + Prisma 6 + zod (TypeScript) · PostgreSQL (Neon) · Vercel

## Chạy trên máy
```bash
npm install
cp .env.example .env        # điền DATABASE_URL, DIRECT_URL (trưởng nhóm gửi riêng)
npx prisma db push          # tạo bảng
npm run seed                # dữ liệu mẫu
npm run dev                 # http://localhost:5173  ·  API docs: /api-docs.html
```

## Tài liệu nhóm
| File | Nội dung |
|---|---|
| [AGENTS.md](AGENTS.md) | Bối cảnh + quy ước – AI agent và người mới đọc trước |
| [docs/01](docs/01-tong-quan-he-thong.md) | Tổng quan hệ thống, kiến trúc, mô hình dữ liệu, vấn đề hiện tại |
| [docs/02](docs/02-requirements-va-uu-tien.md) | Requirement, mức ưu tiên, hợp đồng API, đối chiếu Spring ↔ Express |
| [docs/03](docs/03-ke-hoach-va-phan-cong.md) | Phân công, lịch làm việc, rủi ro, kịch bản demo |
| [docs/04](docs/04-git-workflow.md) | Quy trình Git: nhánh, commit, PR, xử lý xung đột |
| [docs/05](docs/05-database-va-deploy.md) | Neon PostgreSQL, deploy Vercel, lỗi hay gặp |
| [docs/06](docs/06-prompt-mau-cho-claude.md) | Dùng Claude Chat / Claude Code, prompt mẫu |

## Quy trình làm việc
Issue được tạo tự động từ `.github/backlog.json` (Actions → *Bootstrap backlog*). Mỗi issue → một nhánh `feat/<số>-<mô-tả>` → Pull Request có `Closes #<số>` → trưởng nhóm review, squash merge. Nhãn `status: …` tự đổi theo tiến độ.
