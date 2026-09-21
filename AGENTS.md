# AGENTS.md — Bối cảnh dự án cho AI (Claude Code, Antigravity, Copilot…)

> "Trí nhớ chung" của nhóm. Mọi AI agent đọc file này trước khi làm việc.
> Chủ sở hữu: trưởng nhóm (vai trò A). Muốn sửa → PR riêng, không sửa kèm PR tính năng.
> Cập nhật 21/09/2026 theo **hướng đi SQL Server** (yêu cầu mới của mentor). Mọi hướng dẫn cũ về PostgreSQL/Neon đã **hết hiệu lực**.

## 1. Dự án
- Website + trang quản trị cho **Đường Sách TP.HCM** (hợp tác ĐH FPT – AIC Lab). Người dùng: du khách, Ban quản lý (BQL), người/đơn vị đề xuất tổ chức sự kiện.
- Yêu cầu mentor (đợt này):
  1. Database **SQL Server**, thiết kế theo khuôn mẫu mentor (Products, ProductCategories, ProductAttributes, ProductAttributeMappings, Pictures, ProductPictureMappings, WebsiteAttributes, Orders, OrderItems) → nhóm dùng tiền tố **Item** (docs/01 mục 4).
  2. **9 API admin** chia 3 phần (không tính login/register). **Demo tối thiểu 3 API trên Swagger** (`/api-docs.html`).
  3. Trường mô tả dùng trình soạn thảo **CKEditor 5**.
- Mốc demo: **19:30 ngày 22/09/2026**. Demo chạy **local** được chấp nhận; xong sớm mới deploy.
- Thứ tự ưu tiên: **3 API demo (FR-07, FR-08, FR-09) chạy trên SQL Server local** → 6 API còn lại → CKEditor → deploy → đẹp.
- Kế hoạch & phân công: `docs/03`. Hợp đồng JSON: `docs/02`. Mô hình dữ liệu: `docs/01` mục 4. Chạy DB: `docs/05`.

| Mã | API | Phần | Chủ | Ưu tiên |
|---|---|---|---|---|
| FR-07 | CRUD di sản `/api/admin/heritages` | 3 | B | **Demo** |
| FR-08 | QR `GET /api/admin/heritages/{id}/qr` | 3 | B | **Demo** |
| FR-09 | Feedback `GET /api/admin/feedbacks`, `PATCH /{id}/status` | 3 | B | **Demo** |
| FR-01 | CRUD gian hàng `/api/admin/booths` | 1 | C | Sau demo |
| FR-02 | CRUD địa điểm `/api/admin/venues` | 1 | C | Sau demo |
| FR-03 | CRUD thiết bị `/api/admin/assets` | 1 | D | Sau demo |
| FR-04 | CRUD sự kiện `/api/admin/events` | 2 | C | Sau demo |
| FR-05 | Xem hồ sơ `GET /api/admin/proposals[/{id}]` | 2 | D | Sau demo |
| FR-06 | Duyệt hồ sơ `POST /{id}/approve\|request-supplement\|reject` | 2 | D | Sau demo |

## 2. Công nghệ & cấu trúc repo
TypeScript toàn bộ: React 18 + Vite + Tailwind (frontend) · Node + **Express 5** + **Prisma 6** + **zod** (backend) · **SQL Server** (mỗi người một SQL Server **local**: Docker hoặc bản Developer/Express) · Swagger viết tay (`*.openapi.ts` → `/api-docs.html`) · deploy **Vercel** (chỉ khi có SQL Server trên cloud – docs/05 mục 8).
```
src/                   Frontend (admin: src/components/Admin/*)
server/
  app.ts, routes.ts, index.ts, db.ts                                              – A
  core/                errors, error-handler, validate (zod), config, slug, openapi,
                       settings (WebsiteAttributes), items (thuộc tính/ảnh Item), html (sanitize) – A
  modules/<module>/    <module>.routes.ts · .controller.ts · .service.ts · .schema.ts · .openapi.ts
api/index.ts           Entry Vercel Function (export app)                         – A
prisma/schema.prisma   Schema DB – CHỈ A sửa · prisma/seed.ts – A
http/<module>.http     Request mẫu (IntelliJ HTTP Client / VS Code REST Client)   – chủ module
public/api-docs.html   Swagger UI đọc /api/openapi.json                            – A
docs/                  Tài liệu nhóm (01–07)
```
**Chủ sở hữu module** (chỉ chủ module sửa thư mục của mình):
| Vai trò | Người | Module |
|---|---|---|
| A – trưởng nhóm | Khuyên (arisdo-29) | `core/`, `app.ts`, `routes.ts`, `api/`, `prisma/`, `campuses`, `package.json`, `vite.config.ts`, `vercel.json`, `.env.example`, `.github/`, docs |
| B | Tân (dwargon73-sketch) | `heritages`, `qr`, `feedbacks`, `public` + màn admin di sản/QR/feedback, CKEditor |
| C | Trí (Nguyentri2531) | `booths`, `venues`, `events` |
| D | Trâm (kopslngbtram2110) | `assets`, `proposals` (+ API public đăng ký tổ chức) |

Health: `/api/health` · API docs: `/api-docs.html` · Local: http://localhost:5173

## 3. Database SQL Server – quy tắc bắt buộc
### 3.1 Đặt tên (khuôn của mentor)
- **Model** Prisma: PascalCase **số ít** + `@@map("<số nhiều>")` → bảng `Items`, `ItemCategories`… Code gọi `prisma.item`, `prisma.itemAttributeMapping`.
- **Cột**: PascalCase viết thẳng trong schema (`Name`, `NameEng`, `DescEng`, `ContentEng`, `Slug`, `MetaTitle`, `DateCreated`, `LastEditedTime`, `Deleted`, `DisplayOrder`, `IsMainPicture`, `IsPublic`, `ControlType`, `Value`…). Bản tiếng Anh thêm hậu tố `Eng`.
- Khóa chính luôn `Id` (UUID chuỗi `@db.NVarChar(36)`). Khóa ngoại `<Thực thể>Id` (`ItemId`, `PictureId`, `ProposalId`).
- Bảng phân loại `<Chủ thể>Categories`; định nghĩa thuộc tính `<Chủ thể>Attributes`; gán giá trị `<Chủ thể><Đối tượng>Mappings`; cặp đầu–chi tiết `<Đầu>` + `<Đầu số ít>Items` (`Proposals` + `ProposalItems`).
### 3.2 Kỹ thuật (sai là lỗi thật)
- Mọi chuỗi: `@db.NVarChar(n)`. **Cấm `@db.VarChar`** (tiếng Việt thành "?").
- Nội dung dài / HTML CKEditor: `@db.NVarChar(Max)` (`String` không khai báo chỉ là `nvarchar(1000)`).
- **Không `enum`, không `Json`**: trạng thái lưu `NVarChar` + kiểm tra bằng zod (`as const` + `z.enum()` + map nhãn tiếng Việt).
- Mọi quan hệ ghi rõ `onDelete: NoAction, onUpdate: NoAction` (tránh lỗi *multiple cascade paths*). Xóa dây chuyền làm trong service bằng `prisma.$transaction`.
- **Không `@unique` trên cột nullable** (SQL Server coi các NULL trùng nhau → P2002 từ bản ghi NULL thứ hai).
- **Không dùng `mode: 'insensitive'`** (Prisma không hỗ trợ với SQL Server → lỗi typecheck). Database tạo với collation `Vietnamese_CI_AI` nên `contains` đã **không phân biệt hoa thường và dấu** (docs/05 mục 3).
- Không có `directUrl`. Chỉ một biến `DATABASE_URL` dạng `sqlserver://…`.
- Code-first: `schema.prisma` → `npx prisma db push`. Đổi cấu trúc lớn trên máy local: `npx prisma db push --force-reset && npm run seed` (xóa sạch dữ liệu local).
### 3.3 Mô hình dữ liệu (tóm tắt – chi tiết docs/01 mục 4)
- **Cột thật** cho trường dùng để lọc / sắp xếp / kiểm tra ràng buộc. **Thuộc tính động** (`ItemAttributes` + `ItemAttributeMappings`) cho trường chỉ để hiển thị và khác nhau theo loại.
- Khung nội dung chung: `ItemCategories` (slug `di-san`, `gian-hang`, `tien-ich`, `gioi-thieu`), `Items`, `ItemAttributes` (tra bằng `Code`: `SOURCE`, `OWNER`, `LOCATION`, `BOOK_TITLE_COUNT`, `TOPIC`, `LAT`, `LNG`…), `ItemAttributeMappings`, `Pictures`, `ItemPictureMappings`, `WebsiteAttributes`.
- Bảng nghiệp vụ: `Campuses`, `Venues`, `Assets`, `Events`, `Proposals` + `ProposalItems` (≈ Orders + OrderItems), `Feedbacks`. **Tổng 14 bảng – không tự thêm bảng** (thông tin người nộp là cột trên `Proposals`; không có bảng Organizers/ProposalReviewLogs – docs/01 ADR-7). Cần bảng mới → hỏi trưởng nhóm.
- Tra loại nội dung bằng `ItemCategory.Slug`, tra thuộc tính bằng `ItemAttribute.Code`, tra cấu hình bằng `WebsiteAttribute.Name`. **Không** tra bằng tên hiển thị, **không** hard-code Id.
- Dùng helper trong `server/core/items.ts`, `server/core/settings.ts`, `server/core/html.ts` (tạo ở CORE-01) thay vì tự viết lại.

## 4. Quy ước backend (bắt buộc)
- Mỗi module 3 lớp giống Spring: **routes** (≈ `@RequestMapping`, gắn middleware `validate`) → **controller** (≈ `@RestController`, chỉ đọc `req`, trả `res`) → **service** (≈ `@Service`, nghiệp vụ + Prisma). Controller **không** gọi Prisma.
- Validate mọi body/query/params bằng zod trong `<module>.schema.ts` (≈ DTO + `@Valid`). `z.coerce` cho số/ngày trên query.
- Lỗi: ném `NotFoundError` / `BadRequestError` / `ConflictError` (`core/errors.ts`). `core/error-handler.ts` (≈ `@ControllerAdvice`) trả `{ error: "<tiếng Việt>", code, details? }`, tự đổi `P2025`→404, `P2002`→409, `P2003`→409 "đang được sử dụng". Không lộ stacktrace.
- Express 5 tự chuyển lỗi `async` sang error handler → không try/catch trong controller.
- Import tương đối trong `server/`, `api/`, `prisma/seed.ts` **luôn có đuôi `.js`**.
- **Hợp đồng API giữ nguyên** (docs/02 mục 4): tên cột trong DB là PascalCase nhưng JSON trả ra theo hợp đồng cũ. Service có hàm `toDto()` chuyển bản ghi Prisma → JSON.
  - `heritages`/`feedbacks`: JSON **snake_case** như cũ (`name_vi`, `content_en`, `image_url`, `heritage_id`…) để `HeritageManager`, `HeritageQR`, `FeedbackTable`, `FeedbackForm` không phải sửa.
  - Module khác: JSON **camelCase**.
- ID là UUID. Thời gian nhận/trả ISO-8601; lọc `from`/`to` (`YYYY-MM-DD`) theo giờ Việt Nam (UTC+7).
- Danh sách trả **mảng**. Tạo mới 201. Xóa mềm: `Items.Deleted = true` (di sản, gian hàng).
- Trường HTML (CKEditor): **sanitize bằng `sanitizeHtml()` của `core/html.ts` trước khi lưu**. Frontend hiển thị HTML đã sanitize.
- Cấu hình: biến môi trường qua `core/config.ts` (`DATABASE_URL`, `PUBLIC_BASE_URL`); cấu hình nghiệp vụ (domain QR, hotline, giới hạn đơn…) qua `WebsiteAttributes` bằng `getSetting()` của `core/settings.ts`. Không hard-code, không commit `.env`.
- Mỗi endpoint: mô tả trong `<module>.openapi.ts` + request mẫu trong `http/<module>.http` (có ca lỗi 400/404/409).
- Chỉ A sửa `prisma/schema.prisma`, `package.json`. Cần cột/thư viện → nhắn A. **Không nâng Prisma lên 7.**

## 5. Quy tắc nghiệp vụ (đừng phá)
- **Gian hàng** = `Items` loại `gian-hang`: xóa mềm; tìm theo tên (`q`); lọc cơ sở (`campusId` nhận Id hoặc code `HCM`/`THU_DUC`). `bookCount` là **số đầu sách** (tạm thời, chờ khách xác nhận) lưu ở thuộc tính `BOOK_TITLE_COUNT`.
- **Địa điểm / thiết bị:** đang được sự kiện/hồ sơ dùng thì không xóa được → 409.
- **Sự kiện:** `endTime` > `startTime`; `importance` ∈ `NORMAL` (Thường) | `PRIORITY` (Ưu tiên) | `KEY` (Trọng điểm).
- **Hồ sơ đề xuất:** `PENDING → APPROVED | NEEDS_SUPPLEMENT | REJECTED`; `NEEDS_SUPPLEMENT → REJECTED`; `APPROVED`, `REJECTED` là trạng thái cuối (→ 409). `request-supplement`, `reject` **bắt buộc `note`**. Mỗi lần duyệt cập nhật `Status`, `ReviewNote`, `ReviewedAt`, `ReviewedBy` (chỉ lưu lần gần nhất). `OrganizerType` ∈ `ca-nhan`/`doanh-nghiep`/`truong-hoc`/`clb-cong-dong`; `TaxCode` bắt buộc khi `doanh-nghiep`. API admin chỉ thấy hồ sơ đã xác nhận email (`EmailVerifiedAt` khác NULL).
- **Đăng ký tổ chức** (public, không đăng nhập): chọn loại đơn vị trước; **cá nhân được phép** (tạm thời); xác nhận email mới vào hàng đợi; mỗi hồ sơ có `Code` tra cứu + link riêng (lưu **hash** token); chỉ thu email, SĐT – **không thu CCCD**; giới hạn số đơn theo email/IP **đọc từ `WebsiteAttributes`**, giá trị rỗng = chưa giới hạn – **không hard-code con số**.
- **Di sản** = `Items` loại `di-san`: slug sinh từ tên tiếng Việt (bỏ dấu, `đ→d`, `a-z0-9-`), duy nhất, **không bao giờ đổi** (QR đã in). Xóa = xóa mềm, không xóa feedback. Ảnh chính = `ItemPictureMappings.IsMainPicture`. Nguồn = thuộc tính `SOURCE`.
- **QR:** URL = `<domain>/di-san/<slug>`; domain đọc `WebsiteAttributes` `QR_BASE_URL`, rỗng thì dùng `PUBLIC_BASE_URL`. Path `{id}` nhận Id hoặc slug.
- **Feedback:** rating 1–5; liên hệ tùy chọn (privacy by design); `ItemId` NULL = "Toàn Đường Sách" (không gán vào di sản nào); trạng thái `PENDING | REVIEWED | RESOLVED`.

## 6. Lệnh hay dùng
```bash
npm install                        # lần đầu (tự chạy prisma generate)
npx prisma db push                 # tạo/cập nhật bảng theo schema (code-first)
npx prisma db push --force-reset   # xóa sạch DB LOCAL rồi tạo lại (khi schema đổi lớn)
npm run seed                       # nạp dữ liệu mẫu
npm run dev                        # http://localhost:5173 – frontend + API cùng lúc; Swagger: /api-docs.html
npm run server                     # (tùy chọn) chỉ chạy API ở cổng 5000
npm run check                      # typecheck backend + build (phải xanh trước khi commit)
npx prisma studio                  # xem dữ liệu; hoặc SSMS → Database Diagrams
gh issue view <số>                 # đọc issue
```

## 7. Quy tắc cho AI agent
1. **Không commit/push thẳng `main`.** Nhánh: `feat/<số-issue>-<mô-tả>`, `fix/…`, `chore/…`, `docs/…`.
2. Trước khi code: đọc issue (`gh issue view <số>`), nêu kế hoạch ngắn (file sẽ tạo/sửa). Cần đụng file ngoài module của task → **dừng và hỏi**.
3. Commit nhỏ, Conventional Commits, mô tả tiếng Việt, có số issue: `feat(booths): thêm API xóa mềm gian hàng (#7)`.
4. Trước khi commit: `npm run check` xanh; tự gọi thử endpoint bằng file `.http` hoặc Swagger.
5. Không `git push --force`, không `git reset --hard`, không xóa nhánh người khác, không sửa lịch sử `main`.
6. Không in/commit secret, connection string thật, mật khẩu `sa`.
7. Trả lời bằng **tiếng Việt**, đủ rõ để sinh viên tự giải thích với mentor. Tên biến/hàm/file bằng tiếng Anh.
8. Đổi hợp đồng API → cập nhật `docs/02`. Muốn đổi quy ước → PR riêng sửa file này.
9. Không chắc tên bảng/cột/nghiệp vụ → đọc `prisma/schema.prisma` và docs/01 mục 4; vẫn không rõ thì **hỏi, đừng đoán**.
10. **Không sinh code theo PostgreSQL/Neon** (không `directUrl`, không `mode: 'insensitive'`, không `@db.VarChar`, không `@db.Text`, không `Json`, không `enum`).
