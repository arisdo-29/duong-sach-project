# AGENTS.md — Bối cảnh dự án cho AI (Claude Code, Antigravity, Copilot…)

> "Trí nhớ chung" của nhóm. Mọi AI agent đọc file này trước khi làm việc.
> Chủ sở hữu: trưởng nhóm (vai trò A). Muốn sửa → PR riêng, không sửa kèm PR tính năng.

## 1. Dự án
- Website + trang quản trị cho **Đường Sách TP.HCM** (hợp tác ĐH FPT – AIC Lab). Người dùng: du khách và Ban quản lý (BQL).
- Mentor yêu cầu nhóm làm **đủ 3 phần** API admin (login/register không tính):
  1. **Gian hàng & CSVC:** `/api/admin/booths` (xóa mềm, tìm tên, lọc cơ sở), `/api/admin/venues` (tên, cơ sở, sức chứa), `/api/admin/assets` (tên, tổng số lượng)
  2. **Sự kiện & hồ sơ:** `/api/admin/events` (tên, thời gian, địa điểm, mô tả, mức quan trọng), `GET /api/admin/proposals[/{id}]` (lọc trạng thái, ngày), `POST /api/admin/proposals/{id}/approve|request-supplement|reject` (trả bổ sung/từ chối bắt buộc ghi chú)
  3. **Di sản & feedback:** `/api/admin/heritages` (slug cố định, VI/EN, ảnh, nguồn), `GET /api/admin/heritages/{id}/qr` (domain từ cấu hình), `GET /api/admin/feedbacks` + `PATCH /{id}/status` (lọc di sản, điểm, trạng thái)
- Deadline **19:00 ngày 20/09/2026**. Thứ tự ưu tiên: chạy được → deploy được → giải thích được → đẹp.
- Chi tiết + hợp đồng JSON: `docs/02-requirements-va-uu-tien.md`. Tổng quan: `docs/01-tong-quan-he-thong.md`.

## 2. Công nghệ & cấu trúc repo
TypeScript toàn bộ: React 18 + Vite + Tailwind (frontend) · Node + **Express 5** + **Prisma 6** + **zod** (backend) · **PostgreSQL** trên **Neon** (mỗi người một nhánh DB riêng) · deploy **Vercel** (trang tĩnh + API chạy dạng Vercel Function).
```
src/                   Frontend (admin: src/components/Admin/*)                  – D + chủ module liên quan
server/
  app.ts, routes.ts, index.ts, db.ts                                              – A
  core/                errors, error-handler, validate (zod), config, slug, openapi – A
  modules/<module>/    <module>.routes.ts · .controller.ts · .service.ts · .schema.ts · .openapi.ts
api/index.ts           Entry Vercel Function (export app)                         – A
prisma/schema.prisma   Schema DB – CHỈ A sửa · prisma/seed.ts – A
http/<module>.http     Request mẫu (IntelliJ HTTP Client / VS Code REST Client)   – chủ module
public/api-docs.html   Swagger UI đọc /api/openapi.json                            – A
docs/                  Tài liệu nhóm
```
**Chủ sở hữu module** (chỉ chủ module sửa thư mục của mình):
| Vai trò | Module |
|---|---|
| A – trưởng nhóm | `core/`, `app.ts`, `routes.ts`, `api/`, `prisma/`, `campuses`, `package.json`, `vite.config.ts`, `vercel.json` |
| B | `heritages`, `qr`, `feedbacks` (+ API public di sản/góp ý) |
| C | `booths`, `venues`, `events` |
| D | `assets`, `proposals` (+ API public gửi hồ sơ) |

URL: https://duong-sach-project.vercel.app · API docs: `/api-docs.html` · health: `/api/health`

## 3. Quy ước backend (bắt buộc)
- Mỗi module 3 lớp giống Spring: **routes** (≈ `@RequestMapping`, gắn middleware `validate`) → **controller** (≈ `@RestController`, chỉ đọc `req` và trả `res`) → **service** (≈ `@Service`, nghiệp vụ + gọi Prisma). Controller **không** gọi Prisma trực tiếp.
- Validate mọi body/query bằng zod trong `<module>.schema.ts` (≈ DTO + `@Valid`). Dùng `z.coerce` cho số/ngày trong query.
- Lỗi: ném `NotFoundError` / `BadRequestError` / `ConflictError` từ `core/errors.ts`. `core/error-handler.ts` (≈ `@ControllerAdvice`) trả `{ error: "<thông báo tiếng Việt>", code, details? }`, và tự đổi lỗi Prisma: `P2025`→404, `P2002`→409, `P2003`→409 "đang được sử dụng". Không lộ stacktrace.
- Express 5 tự chuyển lỗi của hàm `async` sang error handler → không cần try/catch trong controller.
- Import tương đối trong `server/`, `api/` **luôn có đuôi `.js`** (`import { x } from './a.service.js'`) để chạy được cả với tsx, Vite và Vercel.
- ID là UUID (chuỗi). Thời gian nhận/trả ISO-8601; lọc theo ngày (`from`, `to` dạng `YYYY-MM-DD`) hiểu theo giờ Việt Nam (UTC+7).
- JSON module mới dùng **camelCase**. Riêng `heritages`/`feedbacks` giữ nguyên field cũ (snake_case như `name_vi`, `image_url`) để frontend không phải sửa.
- Danh sách trả **mảng**. Tạo mới trả 201. Xóa mềm: `booths` (`deletedAt`), `heritages` (`deleted_at`).
- Trạng thái/mức độ lưu kiểu `String` (không dùng enum của Prisma): giá trị hợp lệ khai báo bằng mảng `as const` + `z.enum()` trong `schema.ts`, kèm map nhãn tiếng Việt.
- Tìm kiếm chữ (`q`) dùng `contains` + `mode: 'insensitive'` – PostgreSQL phân biệt hoa thường.
- Chỉ trưởng nhóm sửa `prisma/schema.prisma`. Cần thêm cột → nhắn A, A làm PR nhỏ riêng. DB theo hướng **code-first**: `npx prisma db push` (chỉ thêm, không đổi tên/xóa field trong đợt này).
- Mỗi endpoint mới: thêm mô tả vào `<module>.openapi.ts` và request mẫu vào `http/<module>.http`.
- Cấu hình đọc qua `core/config.ts` từ env (`DATABASE_URL`, `DIRECT_URL`, `PUBLIC_BASE_URL`). Không hard-code, không commit `.env`.
- Không tự thêm/nâng thư viện (đặc biệt **không nâng Prisma lên 7**). Cần thư viện → hỏi A.

## 4. Quy tắc nghiệp vụ (đừng phá)
- **Gian hàng:** xóa = xóa mềm; tìm theo tên (`q`), lọc theo cơ sở (`campusId` nhận id hoặc code `HCM`/`THU_DUC`).
- **Địa điểm / thiết bị:** đang được sự kiện/hồ sơ dùng thì không xóa được → 409.
- **Sự kiện:** `endTime` > `startTime`; `importance` ∈ `NORMAL` (Thường) | `PRIORITY` (Ưu tiên) | `KEY` (Trọng điểm).
- **Hồ sơ đề xuất:** `PENDING → APPROVED | NEEDS_SUPPLEMENT | REJECTED`; `NEEDS_SUPPLEMENT → REJECTED`; `APPROVED`, `REJECTED` là trạng thái cuối (thao tác tiếp → 409). `request-supplement` và `reject` **bắt buộc `note`**. Mỗi lần duyệt ghi `ProposalReviewLog` trong cùng transaction.
- **Di sản:** slug sinh từ `name_vi` (bỏ dấu, `đ→d`, `a-z0-9-`), duy nhất, **không bao giờ đổi** (QR đã in). Xóa = xóa mềm, không xóa feedback.
- **QR:** URL = `PUBLIC_BASE_URL + "/di-san/" + slug`. Path `{id}` nhận UUID hoặc slug.
- **Feedback:** rating 1–5; `user_contact` tùy chọn (privacy by design); `heritage_id` NULL = "Toàn Đường Sách"; trạng thái `PENDING | REVIEWED | RESOLVED`.

## 5. Lệnh hay dùng
```bash
npm install                  # lần đầu (tự chạy prisma generate)
npx prisma db push           # tạo/cập nhật bảng theo schema (code-first)
npm run seed                 # nạp dữ liệu mẫu
npm run dev                  # http://localhost:5173 – frontend + API cùng lúc; docs: /api-docs.html
npm run check                # typecheck backend + build (phải xanh trước khi commit)
npx prisma studio            # xem dữ liệu trên trình duyệt (hoặc Neon Console → Tables)
gh issue view <số>           # đọc issue
```

## 6. Quy tắc cho AI agent
1. **Không commit/push thẳng `main`.** Nhánh: `feat/<số-issue>-<mô-tả>`, `fix/<số-issue>-…`, `chore/…`, `docs/…`.
2. Trước khi code: đọc issue (`gh issue view <số>`), nêu kế hoạch ngắn (file sẽ tạo/sửa). Cần đụng file ngoài module của task → dừng và hỏi.
3. Commit nhỏ, Conventional Commits, mô tả tiếng Việt, có số issue: `feat(booths): thêm API xóa mềm gian hàng (#7)`.
4. Trước khi commit: `npm run check` phải xanh; tự gọi thử endpoint bằng file `.http`.
5. Không `git push --force`, không `git reset --hard`, không xóa nhánh người khác, không sửa lịch sử `main`.
6. Không in/commit secret, connection string thật.
7. Trả lời bằng **tiếng Việt**, đủ rõ để sinh viên tự giải thích với mentor. Tên biến/hàm/file bằng tiếng Anh.
8. Đổi hợp đồng API → cập nhật `docs/02`. Muốn đổi quy ước → đề xuất PR riêng sửa file này.
9. Không chắc tên field hay nghiệp vụ → hỏi, đừng đoán.
