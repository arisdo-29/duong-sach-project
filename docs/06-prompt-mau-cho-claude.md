# 06 · Làm việc với Claude: Chat hay Claude Code, và prompt mẫu

> Cập nhật 21/09/2026 cho hướng đi SQL Server. Mọi prompt cũ (SETUP-01, Neon…) **bỏ**.
> Cách dùng: copy nguyên khối prompt, thay `<số>` bằng số issue thật (xem bằng `gh issue list`), dán vào Claude Code.

## 1. Dùng cái nào cho việc gì
| Việc | Công cụ |
|---|---|
| Viết/sửa code, chạy `npm run check`, `prisma db push`, tạo nhánh, commit, gỡ conflict | **Claude Code** (terminal, hoặc extension trong VS Code / Antigravity / IntelliJ) |
| Phân tích yêu cầu, hỏi khái niệm (Prisma, SQL Server, zod, Git…), luyện trả lời mentor, viết báo cáo | **Chat** trong một Project trên claude.ai |
| Tạo/cập nhật issue hàng loạt | Sửa `.github/backlog.json` → chạy workflow *Bootstrap backlog* |
| Cài SQL Server, sửa `.env`, lệnh có mật khẩu | **Tự làm** trong terminal (docs/05). Không dán mật khẩu cho AI |

## 2. Không phải giải thích lại bối cảnh
- **Claude Code:** tự đọc `CLAUDE.md` (import `AGENTS.md`) khi mở trong thư mục repo. Không cần `/init`.
- **Antigravity:** đọc `AGENTS.md` và `.agents/rules/00-duong-sach.md`.
- **Chat:** Project "Đường Sách" → Project knowledge → **+ → GitHub** → chọn repo, tick `AGENTS.md`, `docs/`, `prisma/schema.prisma`, `.github/backlog.json` → sau mỗi lần merge bấm **Sync**. Dán vào *Project instructions*:
  ```
  Bạn là trợ lý kỹ thuật của nhóm 4 sinh viên làm dự án Đường Sách
  (TypeScript: React + Express 5 + Prisma 6 + SQL Server local, Swagger viết tay, CKEditor 5).
  Database thiết kế theo khuôn mentor: Items/ItemCategories/ItemAttributes/ItemAttributeMappings/Pictures/
  ItemPictureMappings/WebsiteAttributes + bảng nghiệp vụ (Venues, Assets, Events, Proposals, ProposalItems...).
  Luôn dựa trên AGENTS.md, docs/ và prisma/schema.prisma trong project knowledge. KHÔNG dùng kiến thức PostgreSQL/Neon cũ.
  Trả lời bằng tiếng Việt, ngắn gọn, có ví dụ. Khi giải thích code, so sánh với Spring Boot + JPA.
  Mốc demo: 19:30 ngày 22/09/2026 (demo local trên Swagger) – ưu tiên cách làm nhanh, chắc, dễ giải thích.
  ```

## 3. Mẹo dùng Claude Code
- Mở terminal tại thư mục repo → `claude`. **Mỗi issue một phiên**; xong thì `/clear` trước khi làm issue khác.
- Task nhiều file: bật **Plan mode** (Shift+Tab) để Claude trình bày kế hoạch trước khi sửa.
- Cài `gh` (GitHub CLI) và `gh auth login` để Claude đọc issue bằng `gh issue view <số>`.
- Luôn đọc lại diff trước khi đồng ý commit. Claude **không được đọc `.env`** (đã chặn trong `.claude/settings.json`).
- Claude đề xuất `npx prisma db push --force-reset`: chỉ đồng ý khi đang ở **máy local** của mình.

---

## 4. Prompt cho trưởng nhóm (A)

### 4.1 DB-01 – SQL Server với schema cũ (bản dự phòng)
```
Làm issue DB-01 (gh issue view <số>). Tạo nhánh chore/<số>-sql-server từ main mới nhất.
Mục tiêu: dự án chạy trên SQL Server local với schema CŨ (giữ tên model/field), để có bản dự phòng chạy được
trước khi áp schema mới. Không đổi hợp đồng API, không đổi tên model/field.
1. prisma/schema.prisma:
   - provider = "sqlserver", bỏ directUrl, sửa comment đầu file (bỏ PostgreSQL/Neon).
   - Mọi @db.VarChar(n) → @db.NVarChar(n).
   - Mọi cột id và khóa ngoại (campusId, venueId, proposalId, assetId, heritage_id) thêm @db.NVarChar(36).
   - Chuỗi dài chưa có @db (description, content_vi, content_en…) → @db.NVarChar(Max).
   - Event.proposalId: BỎ @unique (SQL Server coi các NULL là trùng); quan hệ thành 1-n: EventProposal.event Event? → events Event[].
   - Kiểm tra mọi @relation có onDelete và onUpdate hợp lệ với SQL Server (không multiple cascade paths).
2. server/modules/feedbacks/feedbacks.service.ts: bỏ mode: 'insensitive' (B đã đồng ý – ghi rõ trong PR). Không sửa gì khác trong module của B.
3. Code nào dùng proposal.event (nếu có, kể cả prisma/seed.ts) → sửa theo quan hệ mới.
4. .env.example: chỉ còn DATABASE_URL dạng
   sqlserver://localhost:1433;database=DuongSach;user=sa;password=<matkhau>;encrypt=true;trustServerCertificate=true
   và PUBLIC_BASE_URL; comment trỏ tới docs/05 mục 4. Bỏ DIRECT_URL.
5. .github/workflows/ci.yml: KHÔNG cần sửa – bước "Chọn DATABASE_URL giả theo provider" tự chọn URL sqlserver khi schema đổi provider. Chỉ kiểm tra lại là CI không còn chỗ nào bắt buộc DIRECT_URL.
6. git rm prisma/dev.db. Rà server/core/config.ts và mọi chỗ còn nhắc DIRECT_URL.
7. Chạy: npx prisma validate → npx prisma db push → npm run seed → npm run check → npm run dev.
   Mình sẽ tự tạo .env (không đọc .env). Báo mình kiểm tra: /api-docs.html gọi được heritages, qr, feedbacks;
   màn admin di sản/QR/feedback chạy; tiếng Việt đúng dấu trong SSMS.
Trình bày kế hoạch trước. Commit nhỏ theo AGENTS.md. Mở PR "chore(db): chuyển sang SQL Server với schema cũ (#<số>)" có Closes #<số>.
```

### 4.2 DB-02 – Schema mới theo khuôn mentor + seed
```
Làm issue DB-02 (gh issue view <số>). Tạo nhánh chore/<số>-schema-moi từ main (đã có DB-01).
Đây là NHÁNH TÍCH HỢP: B sẽ commit FR-07/08/09 lên chính nhánh này, C/D tạo nhánh từ đây (docs/04 mục 6).
1. Copy docs/schema-muc-tieu.prisma → prisma/schema.prisma (bỏ đoạn "BẢN NHÁP" ở đầu file), rồi XÓA docs/schema-muc-tieu.prisma.
   Sửa link trong docs/01 mục 4 trỏ về prisma/schema.prisma. Không tự đổi cấu trúc schema; thấy điểm cần đổi → hỏi mình.
2. Viết lại prisma/seed.ts cho các bảng mới. Chạy lại nhiều lần vẫn cùng kết quả: xóa bảng con trước bảng cha
   (không có cascade). Dữ liệu (đọc seed cũ và src/data/mockData.ts để lấy nội dung thật):
   - Campuses: HCM, THU_DUC (giữ tên, địa chỉ như seed cũ).
   - ItemCategories (Slug): di-san, gian-hang, tien-ich, gioi-thieu – có Name/NameEng.
   - ItemAttributes (Code, ItemCategory, ControlType): SOURCE (di-san, text), OWNER, LOCATION, TOPIC (gian-hang, text),
     BOOK_TITLE_COUNT (gian-hang, number), LAT, LNG (tien-ich, number).
   - WebsiteAttributes: QR_BASE_URL = http://localhost:5173 (Type qr); OPENING_HOURS, HOTLINE (Type contact, IsPublic true);
     PROPOSAL_MAX_PER_EMAIL_PER_DAY, PROPOSAL_MAX_PER_IP_PER_DAY, PROPOSAL_MAX_ATTENDEES_CA_NHAN (Type proposal, Value rỗng = chưa giới hạn).
   - 10 di sản từ seed cũ → Items loại di-san, GIỮ NGUYÊN slug cũ, Content/ContentEng bọc <p>…</p>,
     CampusId = HCM, thuộc tính SOURCE, ảnh chính qua Pictures + ItemPictureMappings (IsMainPicture = true).
   - 7 gian hàng từ seed cũ → Items loại gian-hang (slug sinh từ tên), OWNER, LOCATION, BOOK_TITLE_COUNT, TOPIC, ảnh chính.
   - 3 Venues, 5 Assets như seed cũ.
   - 3 Events đủ 3 mức NORMAL/PRIORITY/KEY.
   - 5 Proposals có Code dạng HS-YYMMDD-NNNN, đủ 4 OrganizerType (ca-nhan, doanh-nghiep có TaxCode, truong-hoc, clb-cong-dong):
     2 PENDING (1 hồ sơ trùng lịch với một sự kiện), 1 NEEDS_SUPPLEMENT (có ReviewNote, ReviewedAt, ReviewedBy = "admin"),
     1 APPROVED (có ReviewedAt, có Event với ProposalId trỏ về), 1 PENDING nhưng EmailVerifiedAt = NULL (để demo "chưa xác nhận email").
     Các hồ sơ còn lại EmailVerifiedAt có giá trị. Có ProposalItems.
   - 8 Feedbacks: rating 1–5, đủ 3 trạng thái, 2 góp ý chung (ItemId = NULL).
3. Module campuses (của A): cập nhật service/schema/openapi theo tên cột mới, JSON giữ nguyên
   { id, code, name, address, createdAt, _count: { booths, venues } } (booths = Items loại gian-hang chưa xóa).
4. Chạy npx prisma validate → npx prisma db push --force-reset → npm run seed. Mở SSMS kiểm tra dữ liệu tiếng Việt.
   Lưu ý: npm run check SẼ ĐỎ ở heritages/qr/feedbacks cho tới khi B làm xong FR-07/08/09 – bình thường trên nhánh này.
   Liệt kê cho mình các lỗi typecheck còn lại (để B biết cần sửa gì).
5. Commit "feat(db): schema SQL Server theo khuôn mentor + seed (#<số>)" rồi PUSH NGAY để B, C, D bắt đầu.
Trình bày kế hoạch trước khi làm.
```

### 4.3 CORE-01 – Helper dùng chung + thư viện
```
Làm issue CORE-01 (gh issue view <số>) trên nhánh tích hợp chore/<số DB-02>-schema-moi (không tạo nhánh mới).
1. Cài thư viện (một lần cho cả nhóm): dependencies sanitize-html, ckeditor5, @ckeditor/ckeditor5-react;
   devDependencies @types/sanitize-html. Chọn bản tương thích React 18. Không nâng thư viện khác, không nâng Prisma.
2. server/core/settings.ts – đọc bảng WebsiteAttributes:
   - getSetting(name): Promise<string | null> – bỏ bản ghi Deleted, trim, chuỗi rỗng → null.
   - getNumberSetting(name): Promise<number | null> – không phải số → null.
   - getPublicSettings(): Promise<Record<string, string>> – chỉ IsPublic = true.
   KHÔNG cache (demo sửa QR_BASE_URL trong SSMS phải thấy ngay).
3. server/core/html.ts – sanitizeHtml(html) dùng sanitize-html, allowlist khớp output CKEditor 5:
   p, br, h2, h3, h4, strong, b, em, i, u, s, a[href|target|rel], ul, ol, li, blockquote, figure, figcaption,
   img[src|alt|width|height], table, thead, tbody, tr, th, td, span, code, pre, hr. Scheme: http, https, mailto.
   Thẻ a luôn có rel="noopener noreferrer". Thêm htmlToText(html) để làm mô tả ngắn nếu cần.
4. server/core/items.ts – thao tác khung nội dung chung, dùng được trong prisma.$transaction (tham số tx):
   - getItemCategoryId(slug): tra ItemCategories.Slug; thiếu → AppError 500 "Thiếu dữ liệu seed ItemCategories: <slug>".
   - itemDetailInclude: include AttributeMappings (kèm ItemAttribute) + PictureMappings (kèm Picture, theo DisplayOrder).
   - readAttributes(item): Record<Code, string>.
   - mainPictureUrl(item): string | null.
   - setAttributes(tx, itemId, values: Record<Code, string | number | null | undefined>): undefined = bỏ qua,
     null/'' = xóa mapping, còn lại upsert theo (ItemId, ItemAttributeId). Code không tồn tại → AppError 500.
   - setMainPicture(tx, itemId, url: string | null | undefined): undefined = bỏ qua, null/'' = xóa mapping ảnh chính,
     có sẵn ảnh chính thì cập nhật Picture.Url, chưa có thì tạo Picture + ItemPictureMapping (IsMainPicture = true).
   - Kiểu ItemWithDetail cho service dùng.
   Viết JSDoc tiếng Việt, so sánh ngắn với Spring (helper ≈ @Component dùng chung).
5. Cập nhật AGENTS.md mục 3.3 nếu tên hàm khác mô tả. Chạy npx tsc -p tsconfig.server.json --noEmit và
   xác nhận các file core mới không có lỗi (lỗi còn lại chỉ ở module của B).
6. Commit "feat(core): helper WebsiteAttributes, Items, sanitize HTML + thư viện CKEditor (#<số>)", push, báo mình nhắn B.
```

### 4.4 Mở PR tích hợp (khi B báo xong FR-07/08/09)
```
Trên nhánh chore/<số DB-02>-schema-moi: git pull, npm install, npx prisma generate, npm run check (phải xanh),
npx prisma db push --force-reset, npm run seed. Chạy lần lượt http/heritages.http, http/qr.http, http/feedbacks.http,
http/campuses.http và báo bảng pass/fail. Nếu xanh: tạo PR vào main bằng gh pr create, tiêu đề
"feat: schema SQL Server theo khuôn mentor + chuyển 3 API demo (#<DB-02>)", mô tả tóm tắt thay đổi, cách test,
và các dòng Closes #<DB-02> Closes #<CORE-01> Closes #<FR-07> Closes #<FR-08> Closes #<FR-09>.
```

### 4.5 DEMO-01 – Kịch bản demo
```
Làm issue DEMO-01. Đọc docs/03 mục 6–7 và code thật của heritages, qr, feedbacks (và module P1 đã merge).
1. Viết file http/demo.http: các request theo đúng thứ tự kịch bản demo, dùng dữ liệu seed thật (slug, id lấy từ seed),
   mỗi request có comment "nói gì lúc này" (1 câu).
2. Viết docs/08-kich-ban-demo.md: lời thoại từng bước (tối đa 10 phút), chỗ nào mở SSMS xem bảng nào,
   câu SQL SELECT để chỉ dữ liệu vừa tạo (Items, ItemAttributeMappings, ItemPictureMappings, WebsiteAttributes, Feedbacks),
   và danh sách câu hỏi mentor có thể hỏi kèm câu trả lời ngắn cho từng người (A, B, C, D).
3. Đóng vai mentor, hỏi mình 5 câu khó nhất về thiết kế database, mỗi lần một câu, chờ mình trả lời rồi nhận xét.
```

### 4.6 QA-02 – Rà test sau đổi schema
```
Làm issue QA-02 (nhánh test/<số>-qa-sau-doi-schema từ main). Mục tiêu: mọi file test khớp dữ liệu seed mới.
1. Rà http/*.http: id/slug/field còn đúng hợp đồng docs/02 và dữ liệu seed không; thêm biến @host dùng chung.
2. Chạy npx playwright test; e2e/ đang đọc src/data/mockData.ts – kiểm tra slug di sản trong mockData khớp slug seed.
3. Chạy toàn bộ .http trên máy mình (db push --force-reset + seed trước), lập bảng pass/fail;
   mỗi lỗi đề xuất nội dung issue type: bug kèm chủ module. Chỉ sửa file test, không sửa module của người khác.
```

### 4.7 DEVOPS-02 – Deploy (chỉ khi 3 API demo đã ổn)
```
Làm issue DEVOPS-02. Mình đã có SQL Server trên cloud <tên dịch vụ>, đã tạo DB DuongSach (Vietnamese_CI_AI).
Hướng dẫn mình từng bước theo docs/05 mục 8 (mình tự gõ lệnh có mật khẩu, không dán mật khẩu cho bạn):
db push + seed lên cloud, biến môi trường trên Vercel, cập nhật QR_BASE_URL. Kiểm tra vercel.json, api/index.ts
còn đúng với SQL Server không (bỏ mọi thứ liên quan Neon/DIRECT_URL). Sau đó gọi thử /api/health và 3 API demo trên bản deploy.
```

---

## 5. Prompt cho B (Phần 3 – đường găng của demo)

Làm trên **nhánh tích hợp** `chore/<số DB-02>-schema-moi` (không tạo nhánh riêng). Trước mỗi phiên: `git switch chore/<số DB-02>-schema-moi && git pull`.

### 5.1 FR-07 – Di sản trên Items
```
Làm issue FR-07 (gh issue view <số>) trên nhánh tích hợp hiện tại (không tạo nhánh mới). Chỉ sửa
server/modules/heritages/ và http/heritages.http.
Đọc trước: AGENTS.md, docs/01 mục 4.5 (ánh xạ JSON ↔ bảng), docs/02 mục 4 Phần 3, prisma/schema.prisma,
server/core/items.ts, server/core/html.ts, server/core/slug.ts.
Mục tiêu: chuyển heritages từ bảng cũ sang Items (loại di-san), GIỮ NGUYÊN hợp đồng JSON snake_case để
HeritageManager.tsx và HeritageQR.tsx không phải sửa.
1. heritages.service.ts:
   - Mọi truy vấn lọc ItemCategoryId = getItemCategoryId('di-san'); danh sách/chi tiết chỉ lấy Deleted = false.
   - toDto(item) trả đúng: id, slug, name_vi (Name), name_en (NameEng), content_vi (Content), content_en (ContentEng),
     image_url (ảnh chính, '' nếu không có), source (thuộc tính SOURCE, '' nếu không có), deleted_at (null),
     created_at (DateCreated), updated_at (LastEditedTime), _count: { feedbacks } (đếm Feedbacks).
   - Giữ tên và chữ ký các hàm export (list, findByIdOrSlug, getByIdOrSlug, getDetail, create, update, remove)
     vì qr.service.ts đang gọi getByIdOrSlug; getByIdOrSlug trả DTO.
   - create: uniqueSlug kiểm tra trùng trên toàn bảng Items (kể cả bản đã xóa mềm); sanitizeHtml cho content_vi/en;
     trong một prisma.$transaction: tạo Item + setAttributes(SOURCE) + setMainPicture(image_url).
   - update: gửi slug khác slug hiện tại → 400 "Slug không được thay đổi"; sanitize; transaction như trên.
   - remove: Deleted = true, không đụng Feedbacks.
   - getDetail: kèm feedbacks (format như cũ).
2. heritages.schema.ts: content nhận HTML; giữ quy tắc validate cũ. heritages.openapi.ts: ghi chú content là HTML (CKEditor).
3. http/heritages.http: slug/id khớp seed mới; có ca 400 (thiếu name_vi, đổi slug), 404.
4. npx tsc -p tsconfig.server.json --noEmit: không còn lỗi trong heritages (qr/feedbacks làm ở FR-08/09).
5. npm run dev → test trên /api-docs.html và màn admin Quản lý di sản (thêm, sửa, xóa). Mở SSMS kiểm tra
   Items, ItemAttributeMappings, ItemPictureMappings.
Trình bày kế hoạch, chờ mình đồng ý. Xong: commit "feat(heritages): chuyển CRUD di sản sang Items (#<số>)",
git pull rồi git push, và giải thích lại luồng create cho mình (so sánh Spring + JPA) để trả lời mentor.
```

### 5.2 FR-08 – QR đọc domain từ WebsiteAttributes
```
Làm issue FR-08 trên nhánh tích hợp. Chỉ sửa server/modules/qr/ và http/qr.http.
1. qr.service.ts: domain = await getSetting('QR_BASE_URL') (core/settings.ts), rỗng thì config.publicBaseUrl.
   Bỏ "/" thừa cuối. Production mà domain cuối cùng chứa localhost → 500 như cũ. URL = <domain>/di-san/<slug>.
   Lấy di sản qua getByIdOrSlug của heritages (DTO). JSON trả về giữ nguyên { url, qrCode, heritage }.
2. qr.openapi.ts: mô tả nguồn domain (WebsiteAttributes QR_BASE_URL → PUBLIC_BASE_URL).
3. http/qr.http: theo slug seed; ca 404.
4. Test: gọi API → sửa Value của QR_BASE_URL trong SSMS → gọi lại, url đổi theo. Màn admin QR vẫn chạy.
Commit "feat(qr): domain QR đọc từ WebsiteAttributes (#<số>)", pull, push.
```

### 5.3 FR-09 – Feedback trên bảng mới
```
Làm issue FR-09 trên nhánh tích hợp. Chỉ sửa server/modules/feedbacks/, server/modules/public/ (nếu cần), http/feedbacks.http.
Giữ nguyên hợp đồng JSON cho FeedbackTable.tsx và FeedbackForm.tsx (docs/02 Phần 3).
1. feedbacks.service.ts theo model Feedback mới (ItemId, Rating, Content, Status, UserContact, DateCreated):
   - format(): heritage_id = ItemId, contact = UserContact ?? '', scope = tên di sản hoặc "Toàn Đường Sách",
     createdAt dạng "YYYY-MM-DD HH:mm" theo GIỜ VIỆT NAM, heritage = { id, slug, name_vi, name_en } hoặc null.
   - list: heritageId = 'general' → ItemId null; là Id hoặc slug → Item có Id/Slug tương ứng; rating, minRating, maxRating, status kết hợp AND.
   - create (public POST /api/feedbacks): tìm di sản theo heritage_id, hoặc theo scope (Name/NameEng contains, hoặc Slug),
     chỉ di sản chưa xóa. KHÔNG tìm thấy → ItemId = NULL ("Toàn Đường Sách"). XÓA hẳn đoạn gán vào di sản đầu tiên (TODO #17).
     Không dùng mode: 'insensitive' (collation Vietnamese_CI_AI đã không phân biệt hoa thường/dấu).
   - updateStatus, remove giữ hành vi cũ.
2. feedbacks.openapi.ts, public.openapi.ts: cập nhật mô tả nếu đổi. http/feedbacks.http: ca lọc general, slug, khoảng điểm, ca 400/404.
3. npm run check phải XANH toàn bộ (FR-07/08/09 xong). Test /api-docs.html + màn Quản lý góp ý + form góp ý ở trang du khách.
Commit "feat(feedbacks): chuyển góp ý sang schema mới, góp ý chung ItemId NULL (#<số>)", pull, push, báo A mở PR tích hợp.
```

### 5.4 FE-03 – CKEditor 5 (sau khi PR tích hợp đã merge)
```
Làm issue FE-03 (gh issue view <số>). Tạo nhánh feat/<số>-ckeditor từ main mới nhất.
Thư viện ckeditor5 và @ckeditor/ckeditor5-react ĐÃ được A cài ở CORE-01 – không cài thêm, không sửa package.json.
1. Tạo src/components/Admin/RichTextEditor.tsx: ClassicEditor, licenseKey: 'GPL', plugin Essentials, Paragraph, Heading,
   Bold, Italic, Underline, Link, List, BlockQuote, Table, Undo; props { value, onChange, placeholder }; import 'ckeditor5/ckeditor5.css'.
   Giao diện hợp với Tailwind hiện có (chiều cao tối thiểu, viền).
2. HeritageManager.tsx: thay textarea content_vi, content_en bằng RichTextEditor. Chỗ nào hiển thị nội dung di sản dạng
   văn bản thô thì hiển thị HTML (dữ liệu đã sanitize ở server) – ghi chú rõ trong code.
3. Kiểm tra bằng Playwright MCP: mở màn Quản lý di sản, sửa nội dung có in đậm + danh sách, lưu, tải lại thấy đúng;
   thử dán <script>alert(1)</script> → bị loại sau khi lưu. npm run check xanh.
Trình bày kế hoạch trước. Commit, push, mở PR có Closes #<số>.
```

---

## 6. Prompt cho C và D (6 API còn lại, trên schema mới)

**Tạo nhánh từ nhánh tích hợp** (docs/04 mục 6) cho tới khi PR tích hợp merge; sau đó tạo nhánh từ `main`:
```bash
git fetch && git switch chore/<số DB-02>-schema-moi && git pull
git switch -c feat/<số>-<mô-tả>          # vd feat/9-venues-crud
npx prisma db push --force-reset && npm run seed
```

### 6.1 Prompt chung cho một issue API
```
Làm issue #<số> (gh issue view <số>). Mình đang ở nhánh feat/<số>-<mô-tả> (tạo từ nhánh tích hợp schema mới).
Chỉ sửa trong server/modules/<module>/ và http/<module>.http. Làm theo AGENTS.md và hợp đồng JSON ở docs/02 mục 4.
Đọc prisma/schema.prisma để lấy đúng tên model/cột PascalCase (không đoán). Nếu heritages đã chuyển xong sang schema mới,
đọc nó làm mẫu phong cách (toDto, transaction, helper core).
Thứ tự: schema zod → service (có toDto chuyển PascalCase → JSON camelCase) → controller → routes → openapi
→ request mẫu trong .http (có cả ca lỗi 400/404/409).
Quy tắc SQL Server: không mode: 'insensitive'; trường HTML gọi sanitizeHtml (core/html.ts) trước khi lưu.
Trình bày kế hoạch ngắn, chờ mình đồng ý. Làm xong chạy npm run check, test trên /api-docs.html,
rồi giải thích lại luồng code cho mình (so sánh với Spring Boot + JPA) để mình trả lời được mentor.
```

### 6.2 Ghi chú thêm từng issue (dán tiếp sau prompt chung)
**FR-01 gian hàng (C)**
```
Gian hàng là Items loại 'gian-hang' (getItemCategoryId), KHÔNG có bảng Booths. Ánh xạ: name→Name, campusId→CampusId
(nhận Id hoặc code HCM/THU_DUC – dùng campuses.service findByIdOrCode; không tồn tại → 400), description→Content (HTML, sanitize),
owner/location/topic/bookCount → setAttributes OWNER/LOCATION/TOPIC/BOOK_TITLE_COUNT (bookCount là số nguyên ≥ 0 = số ĐẦU SÁCH),
imageUrl → setMainPicture. Slug sinh bằng uniqueSlug (duy nhất trên toàn Items). Tạo/sửa trong prisma.$transaction.
Danh sách: Deleted = false, q → Name contains, campusId, sắp xếp theo Name. DELETE = Deleted = true; GET/PUT bản đã xóa → 404.
```
**FR-02 địa điểm (C)** / **FR-03 thiết bị (D)**
```
Bảng Venues (Assets). campusId nhận Id hoặc code. capacity (totalQuantity) là số nguyên > 0 (≥ 0 với totalQuantity).
DELETE là xóa cứng; đang được Events/Proposals (ProposalItems) tham chiếu thì DB chặn → error-handler tự trả 409 (P2003) –
kiểm tra thông báo tiếng Việt "đang được sử dụng". Có ca 409 trong .http (dùng venue/asset đã có trong seed).
```
**FR-04 sự kiện (C)**
```
Bảng Events. importance ∈ NORMAL|PRIORITY|KEY (as const + z.enum + importanceLabel tiếng Việt). endTime > startTime (zod refine → 400).
venueId phải tồn tại (400). description là HTML → sanitize. Lọc danh sách: from/to (YYYY-MM-DD, giờ VN) theo StartTime, venueId, importance.
JSON kèm venue { id, name, campus }.
```
**FR-05 xem hồ sơ (D)**
```
Bảng Proposals (+ Venues, ProposalItems + Assets). Thông tin người nộp là CỘT trên Proposals (OrganizerType, OrganizerName,
RepresentativeName, Email, Phone, TaxCode) – không có bảng Organizers, không có ProposalReviewLogs.
Chỉ trả hồ sơ có EmailVerifiedAt khác NULL. Lọc: status, from/to (giờ VN) theo dateField = startTime (StartTime) | submittedAt (DateCreated).
JSON theo docs/02: code, organizerName (OrganizerName), organizerType (nhãn tiếng Việt từ OrganizerType), statusLabel tiếng Việt, venue;
chi tiết thêm description, organizerContact ("Email · Phone"), representativeName, taxCode, expectedAttendees,
reviewNote, reviewedAt, reviewedBy, assets[{assetId, name, quantity, totalQuantity}].
```
**FR-06 duyệt hồ sơ (D)**
```
POST /{id}/approve | request-supplement | reject. note bắt buộc với request-supplement, reject (zod → 400).
Máy trạng thái: PENDING → APPROVED | NEEDS_SUPPLEMENT | REJECTED; NEEDS_SUPPLEMENT → REJECTED; APPROVED, REJECTED là cuối → 409.
Hồ sơ chưa xác nhận email → 404. Cập nhật Status, ReviewNote, ReviewedAt, ReviewedBy ("admin" khi chưa có đăng nhập) bằng
updateMany có điều kiện Status hiện tại (tránh hai người duyệt cùng lúc; count = 0 → 409). Trả proposal chi tiết như FR-05. .http có đủ ca: thiếu note 400, duyệt lại hồ sơ đã duyệt 409.
```

### 6.3 FR-11 – Đăng ký tổ chức không đăng nhập (D, P2 – chỉ khi FR-05, FR-06 đã mở PR)
```
Làm issue FR-11 (gh issue view <số>). Nhánh feat/<số>-dang-ky-to-chuc từ main. Sửa server/modules/proposals/
(router public mới trong module, nhắn A đăng ký vào server/routes.ts nếu cần) và http/proposals.http.
Theo docs/02 mục "Public – đăng ký tổ chức" và AGENTS.md mục 5:
- POST /api/proposals: chọn organizerType trước; zod dùng discriminatedUnion theo organizerType (taxCode bắt buộc với
  doanh-nghiep); cá nhân được phép; tạo Proposal (Status PENDING, EmailVerifiedAt NULL, thông tin người nộp ghi thẳng
  vào các cột Organizer*/Email/Phone/TaxCode) + ProposalItems trong transaction; sinh Code;
  sinh OTP 6 số + token truy cập, chỉ lưu HASH; email chưa có dịch vụ gửi → log OTP ra console và ghi chú TODO.
- Giới hạn số đơn/ngày theo email và IP: đọc getNumberSetting('PROPOSAL_MAX_PER_EMAIL_PER_DAY'|'PROPOSAL_MAX_PER_IP_PER_DAY'),
  null = không giới hạn. KHÔNG hard-code con số.
- POST /api/proposals/verify-email { code, otp } → đặt EmailVerifiedAt, xóa EmailVerifyTokenHash.
- GET /api/proposals/{code}?token= → trạng thái + ghi chú duyệt. Không thu CCCD, chỉ email + SĐT.
Trình bày kế hoạch trước (nhiều file → Plan mode).
```

---

## 7. Prompt khác (ai cũng dùng)

**SETUP-03 – gỡ lỗi cài SQL Server**
```
Mình đang làm SETUP-03 theo docs/05, bị lỗi sau khi chạy <lệnh>:
<dán thông báo lỗi, KHÔNG dán mật khẩu>
Máy mình: <Windows/macOS chip Intel/macOS chip Apple>, cài SQL Server bằng <Docker/Developer/Express>.
Đối chiếu docs/05 mục 7, chỉ mình từng bước kiểm tra. Không sửa code trong repo.
```
**Cập nhật nhánh & gỡ conflict**
```
Mình cần cập nhật nhánh hiện tại với main. Chạy git fetch và git merge origin/main.
Nếu có conflict: liệt kê file, giải thích từng khối (phần nào của mình, phần nào từ main), đề xuất cách giữ và chờ mình xác nhận.
File không thuộc module của mình (prisma/, server/core/, package*.json, module người khác) thì đề xuất lấy bản của main.
Không dùng rebase, không force push. Xong chạy npm install, npx prisma generate, npm run check.
```
**Review PR của bạn cùng nhóm (trưởng nhóm)**
```
Review PR #<số> (gh pr diff <số>). Đối chiếu tiêu chí chấp nhận trong issue được nhắc ở PR, AGENTS.md (đặc biệt mục 3.2
quy tắc SQL Server) và hợp đồng JSON docs/02. Liệt kê: (1) tiêu chí chưa đạt, (2) lỗi logic/validation, (3) vi phạm quy tắc
SQL Server (mode insensitive, VarChar, thiếu sanitize HTML, tra cứu bằng Name thay vì Code/Slug), (4) file sửa ngoài phạm vi module.
Ngắn gọn, ưu tiên cái chặn merge.
```
**Giải thích thiết kế database để trả lời mentor**
```
Dựa vào prisma/schema.prisma và docs/01 mục 4: giải thích cho mình (như trình bày trước mentor, 2 phút) vì sao
<di sản/gian hàng> nằm trong Items còn <địa điểm/hồ sơ> là bảng riêng; ánh xạ từng bảng với mẫu của mentor
(Products, ProductAttributes...); và một truy vấn Prisma cụ thể của module <module> sinh ra câu SQL như thế nào.
```
**Luyện Q&A với mentor**
```
Đóng vai mentor chấm đồ án. Hỏi mình 5 câu về module <module> (dựa trên code thật trong repo và schema SQL Server),
mỗi lần một câu, chờ mình trả lời rồi nhận xét và bổ sung. Tập trung: luồng request, validate, xử lý lỗi,
thiết kế bảng (cột thật vs thuộc tính động), lý do chọn SQL Server + Prisma code-first.
```
