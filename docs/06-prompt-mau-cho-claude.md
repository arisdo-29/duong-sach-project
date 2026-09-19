# 06 · Làm việc với Claude: Chat hay Claude Code, và prompt mẫu

## 1. Dùng cái nào cho việc gì
| Việc | Công cụ |
|---|---|
| Viết/sửa code, chạy `npm run check`, tạo nhánh, commit, gỡ conflict, đọc cả repo | **Claude Code** (terminal, hoặc extension trong VS Code / Antigravity / IntelliJ) |
| Phân tích yêu cầu, hỏi khái niệm (Prisma, zod, Git…), luyện trả lời mentor, viết báo cáo | **Chat** trong một Project trên claude.ai |
| Tạo/cập nhật issue hàng loạt | Sửa `.github/backlog.json` → chạy workflow *Bootstrap backlog* |

Claude Code dùng được với gói Pro/Max; giới hạn sử dụng tính chung với chat. Ai trong nhóm muốn dùng thì cần tài khoản gói đó của riêng mình.

## 2. Không phải giải thích lại bối cảnh
- **Claude Code:** tự đọc `CLAUDE.md` (import `AGENTS.md`) mỗi khi mở trong thư mục repo. Không cần chạy `/init`.
- **Antigravity:** đọc `AGENTS.md` và `.agents/rules/00-duong-sach.md`.
- **Chat:** tạo Project "Đường Sách" → Project knowledge → **+ → GitHub** → chọn repo, tick `AGENTS.md`, `docs/`, `prisma/schema.prisma`, `.github/backlog.json` → sau mỗi lần merge bấm **Sync**. Project là của từng người nên mỗi thành viên tự tạo; nguồn bối cảnh vẫn là một (các file trong repo).
- Dán vào ô *Project instructions*:
  ```
  Bạn là trợ lý kỹ thuật của nhóm 4 sinh viên làm dự án Đường Sách (TypeScript: React + Express 5 + Prisma 6 + PostgreSQL trên Neon, deploy Vercel).
  Luôn dựa trên AGENTS.md và docs/ trong project knowledge. Trả lời bằng tiếng Việt, ngắn gọn, có ví dụ.
  Khi giải thích code, so sánh với Spring Boot vì nhóm đang học Java Spring.
  Deadline: 19:00 ngày 20/09/2026 – ưu tiên cách làm nhanh, chắc, dễ giải thích với mentor.
  ```

## 3. Mẹo dùng Claude Code
- Mở terminal tại thư mục repo → `claude`. Mỗi issue một phiên; xong thì `/clear` trước khi làm issue khác.
- Task lớn: bật Plan mode (Shift+Tab) để Claude trình bày kế hoạch trước khi sửa.
- Cài `gh` (GitHub CLI) và `gh auth login` để Claude đọc được issue bằng `gh issue view <số>`.
- Luôn đọc lại diff trước khi đồng ý commit.

## 4. Prompt SETUP-01 (trưởng nhóm, chạy đầu tiên)
```
Làm issue SETUP-01 (đọc bằng gh issue view <số>, hoặc xem .github/backlog.json). Tạo nhánh chore/<số>-setup-core.
Mục tiêu: chuẩn hóa backend TypeScript để 3 bạn còn lại code song song 9 nhóm API mà không đụng file của nhau.
1. Copy docs/schema-muc-tieu.prisma vào prisma/schema.prisma. Giữ Prisma 6.x (không nâng lên 7). Thêm zod vào dependencies.
2. Tạo cấu trúc theo AGENTS.md mục 2–3: server/app.ts (tạo app, json, gắn routes), server/routes.ts (đăng ký router cho campuses, booths,
   venues, assets, events, proposals, heritages, qr, feedbacks + router public), server/db.ts, server/index.ts,
   server/core/{errors.ts, error-handler.ts (map P2025→404, P2002→409, P2003→409), validate.ts (zod cho body/query/params), config.ts, slug.ts, openapi.ts}.
   Mỗi module mới tạo đủ 5 file rỗng có sẵn khung (routes/controller/service/schema/openapi) và file http/<module>.http trống.
3. Chuyển code trong server/routes/admin.ts sang modules heritages, qr, feedbacks – giữ nguyên hành vi và JSON (status giờ là string), rồi xóa admin.ts.
   Không mount router admin ở /api nữa; POST /api/feedbacks để ở router public.
4. GET /api/admin/campuses, GET /api/health, GET /api/openapi.json (gộp *.openapi.ts), public/api-docs.html dùng Swagger UI từ cdnjs.
5. Viết lại prisma/seed.ts cho mọi bảng theo mô tả trong issue (lấy gian hàng từ src/data/mockData.ts, 10 di sản từ seed cũ). Thêm script "seed".
6. api/index.ts, vercel.json (có "regions": ["sin1"]), tsconfig.server.json (NodeNext, strict, noEmit), script "check" (typecheck server + vite build),
   "postinstall": "prisma generate", .env.example (DATABASE_URL, DIRECT_URL, PUBLIC_BASE_URL). Import tương đối dùng đuôi .js. Sửa vite.config.ts để import server/app.
7. Chạy npx prisma validate, npm run check; db push + seed vào nhánh Neon dev trong .env, gọi thử /api/health.
Trình bày kế hoạch trước khi làm. Commit theo từng bước nhỏ, message theo AGENTS.md.
```

## 5. Prompt cho một issue API (B, C, D dùng chung)
```
Làm issue #<số> (gh issue view <số>). Tạo nhánh feat/<số>-<mô-tả>.
Chỉ sửa trong server/modules/<module>/ và http/<module>.http. Làm theo quy ước AGENTS.md và hợp đồng JSON trong docs/02.
Nếu đã có module làm xong (ví dụ booths), đọc nó trước để viết cùng phong cách.
Thứ tự: schema zod → service → controller → routes → openapi → request mẫu trong .http (có cả ca lỗi 400/404/409).
Trình bày kế hoạch ngắn, chờ mình đồng ý. Làm xong chạy npm run check, rồi giải thích lại luồng code cho mình
(so sánh với Spring Boot) để mình trả lời được mentor.
```

## 6. Prompt khác
**Cập nhật nhánh & gỡ conflict**
```
Mình cần cập nhật nhánh hiện tại với main. Chạy git fetch và git merge origin/main.
Nếu có conflict: liệt kê file, giải thích từng khối (phần nào của mình, phần nào từ main), đề xuất cách giữ và chờ mình xác nhận.
Không dùng rebase, không force push.
```
**Review PR của bạn cùng nhóm (trưởng nhóm)**
```
Review PR #<số> (gh pr diff <số>). Đối chiếu tiêu chí chấp nhận trong issue được nhắc ở PR và quy ước AGENTS.md.
Liệt kê: (1) tiêu chí chưa đạt, (2) lỗi logic/validation, (3) file sửa ngoài phạm vi module. Ngắn gọn, ưu tiên cái chặn merge.
```
**Luyện Q&A với mentor (chat hoặc Claude Code)**
```
Đóng vai mentor chấm đồ án. Hỏi mình 5 câu về module <module> (dựa trên code thật trong repo),
mỗi lần một câu, chờ mình trả lời rồi nhận xét và bổ sung. Tập trung: luồng request, validate, xử lý lỗi, lý do thiết kế.
```
**Viết file test .http cho cả nhóm (QA-01)**
```
Gom tất cả http/*.http, thêm biến @host dùng được cho local (http://localhost:5173) và production.
Chạy lần lượt trên production, lập bảng pass/fail, mỗi lỗi đề xuất nội dung issue type: bug kèm chủ module.
```
