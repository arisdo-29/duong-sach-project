# 07 · Hướng dẫn trưởng nhóm (A – Khuyên): làm gì, theo thứ tự nào, dán prompt nào

> Dành riêng cho trưởng nhóm, từ **tối 21/09** tới **19:30 ngày 22/09/2026**. Làm **từ trên xuống**, xong bước nào tick bước đó.
> Tài liệu liên quan: lịch cả nhóm `docs/03` mục 3 · quy trình nhánh tích hợp `docs/04` mục 6 · cài SQL Server `docs/05` · toàn văn prompt `docs/06`.
> Quy ước trong file này: 🖐 = tự làm bằng tay · 🤖 = dán prompt vào Claude Code · 💬 = nhắn nhóm · ✅ = điểm kiểm tra, chưa đạt thì **không đi tiếp**.

---

## 0. Vòng làm việc chuẩn với Claude Code (dùng cho mọi bước 🤖)

Mọi bước 🤖 bên dưới đều làm theo đúng 10 bước này – phần sau chỉ ghi "dán prompt docs/06 mục X".

1. 🖐 Terminal ở thư mục repo, đúng nhánh (`git status` sạch, `git branch --show-current`).
2. 🖐 Gõ `claude`. Nếu phiên cũ còn mở: `/clear` (mỗi issue một phiên).
3. 🖐 Bật **Plan mode** (Shift+Tab) cho task nhiều file (DB-01, DB-02, CORE-01).
4. 🖐 Mở `docs/06-prompt-mau-cho-claude.md`, copy **toàn bộ khối code** của mục cần dùng. Thay mọi `<số>` bằng **số issue thật** (lấy ở bảng mục 2.4 bên dưới). Dán vào Claude Code, Enter.
5. 🖐 Đọc kế hoạch Claude đưa ra. Kiểm tra 3 điều: (a) chỉ sửa file thuộc phạm vi issue, (b) không đụng `.env`, (c) không đổi cấu trúc schema ngoài ý mình. Sai → trả lời "Không, sửa kế hoạch: …". Đúng → đồng ý.
6. 🖐 Khi Claude xin chạy lệnh: đồng ý `npx prisma validate/generate/db push`, `npm run check`, `npm run seed`, `git` thường. **Từ chối** mọi lệnh đọc/sửa `.env`, `git push --force`, `git reset --hard`, lệnh xóa DB trên cloud.
7. 🖐 Claude báo xong → tự kiểm tra: `git status` + `git diff --stat` (danh sách file có hợp lý không), rồi `npm run check`.
8. 🖐 Tự chạy thử theo tiêu chí chấp nhận của issue (Swagger `http://localhost:5173/api-docs.html`, SSMS xem bảng).
9. 🖐 Commit (nếu Claude chưa commit) theo AGENTS.md → `git push`. Mở PR khi prompt yêu cầu.
10. 💬 Nhắn nhóm theo mẫu ở mục 6. Ghi chú lại số PR.

> Claude kẹt quá 15 phút ở cùng một lỗi → dừng (`Esc`), `/clear`, dán prompt "gỡ lỗi" ở **docs/06 mục 7** kèm nguyên văn lỗi. Lỗi kết nối DB → tự xử theo **docs/05 mục 7**, không để Claude sửa.

---

## 1. Tối 21/09 – Đưa bộ kit mới lên `main` (≈ 20 phút)

### 1.1 🖐 Áp bộ kit vào repo
```bash
git switch main && git pull
git switch -c docs/huong-di-sql-server
# copy đè các file của bộ kit vào đúng vị trí (giữ cấu trúc thư mục)
git status                       # chỉ có file docs/, AGENTS.md, CLAUDE.md, README.md, .agents/, .github/
git add -A && git commit -m "docs: soạn lại bộ kit theo hướng đi SQL Server"
git push -u origin docs/huong-di-sql-server
gh pr create --title "docs: bộ kit hướng đi SQL Server (demo 22/09)" --body "Soạn lại tài liệu, prompt, quy định agent, backlog, CI theo file Hướng đi dự án."
```
- ✅ CI của PR **xanh** (CI tự chọn URL giả theo provider nên vẫn chạy với schema PostgreSQL hiện tại).
- 🖐 Squash merge PR. `git switch main && git pull`.

### 1.2 🖐 Kiểm tra cài đặt repo (docs/04 mục 2)
- [ ] Settings → Branches: `main` bắt buộc PR + status check **CI**.
- [ ] Settings → General → Pull Requests: bật *Allow squash merging*, *Automatically delete head branches*.
- [ ] Settings → Collaborators: B, C, D đã là collaborator (không thì workflow không gán được người).

---

## 2. Tối 21/09 – Tạo backlog mới, đóng issue cũ (≈ 15 phút)

### 2.1 🖐 Chạy thử (dry run)
GitHub → **Actions** → *🗂️ Bootstrap backlog* → **Run workflow**, chọn:

| Input | Giá trị |
|---|---|
| dry_run | ✅ bật |
| close_legacy | ✅ bật |
| include_stretch | ⬜ tắt |

Mở log/Summary của lượt chạy, kiểm tra:
- [ ] 20 dòng `[dry-run] tạo: [SETUP-03] … [CLEAN-02] …` (5 việc P3 báo "bỏ qua (stretch)").
- [ ] Các dòng `[dry-run] đóng #… [FR-01] → …` và `~ giữ #… (stretch?)` cho FR-12/13/14, FE-02, NFR-01: chỉ đóng issue **đang mở** của đợt cũ (dự kiến #6, #8–#13, #17–#20, #27). **Không** có issue đã đóng (#5, #7, #14–#16).

### 2.2 🖐 Chạy thật
Chạy lại workflow: **dry_run tắt**, close_legacy bật, include_stretch tắt.
- ✅ Summary báo "Đã tạo mới 20 issue, đóng N issue cũ". Tab Issues → lọc milestone *Demo mentor – 19:30 22/09/2026* thấy 20 issue có người được gán.
- Issue cũ FR-12, FR-13, FR-14, FE-02, NFR-01 **vẫn mở** (bản mới là stretch, chưa tạo) – đúng thiết kế. Muốn tạo luôn: chạy lại với include_stretch bật (chạy lại bao nhiêu lần cũng không tạo trùng).
- Lỗi "Không gán được …" trong log → username sai hoặc chưa là collaborator; gán tay trên issue.

### 2.3 🖐 Kiểm tra nhánh/PR đang dở của đợt cũ
- [ ] `gh pr list` – PR nào gắn với issue vừa đóng thì comment "đóng theo hướng đi mới, làm lại ở #…" rồi đóng PR (không merge code trên schema cũ).

### 2.4 🖐 Ghi số issue thật vào đây (dùng để thay `<số>` trong prompt)

| Mã | Số issue | Mã | Số issue |
|---|---|---|---|
| SETUP-03 | # | FR-01 (C) | # |
| DB-01 | # | FR-02 (C) | # |
| DB-02 | # | FR-04 (C) | # |
| CORE-01 | # | FR-03 (D) | # |
| FR-07 (B) | # | FR-05 (D) | # |
| FR-08 (B) | # | FR-06 (D) | # |
| FR-09 (B) | # | FE-03 (B) | # |
| DEMO-01 | # | QA-02 | # |

### 2.5 🖐 Cập nhật Claude Project (chat)
Project "Đường Sách" trên claude.ai → Project knowledge → **Sync** repo GitHub; thay *Project instructions* bằng khối ở **docs/06 mục 2**.

### 2.6 💬 Nhắn nhóm – mẫu "khởi động"
```
[Đường Sách] Hướng đi mới đã lên main: chuyển SQL Server, demo local 19:30 mai (22/09).
Tối nay MỖI NGƯỜI làm issue SETUP-03 (#…): cài SQL Server + SSMS/DBeaver, tạo DB DuongSach (Vietnamese_CI_AI), tạo .env – theo docs/05 mục 2–4.
Xong comment "xong" + ảnh vào issue. Kẹt thì dùng prompt gỡ lỗi docs/06 mục 7 rồi nhắn mình.
Đọc trước: AGENTS.md mục 3, docs/01 mục 4, docs/04 mục 6. Issue của từng người đã gán trong milestone "Demo mentor".
B: tối nay đọc lại code heritages/qr/feedbacks. C, D: soạn trước zod + http/*.http cho issue của mình (chưa cần schema).
Sáng mai ~09:30 mình nhắn "schema xong" thì mới tạo nhánh. KHÔNG tự sửa prisma/, server/core/, package.json.
```

---

## 3. Tối 21/09 – Máy của A + DB-01 (bản dự phòng) (≈ 1,5–2 giờ)

### 3.1 🖐 SETUP-03 trên máy A
- [ ] Cài SQL Server (docs/05 mục 2), SSMS hoặc DBeaver, tạo DB `DuongSach` collation `Vietnamese_CI_AI` (mục 3).
- [ ] Tạo `.env` (mục 4). Chưa `db push` được lúc này vì `main` vẫn là PostgreSQL – bình thường.

### 3.2 🤖 DB-01 – dán **docs/06 mục 4.1**
Nhánh `chore/<DB-01>-sql-server`. Sau vòng chuẩn (mục 0), tự kiểm tra thêm:
- [ ] `git diff prisma/schema.prisma`: `provider = "sqlserver"`, không còn `directUrl`, không còn `@db.VarChar`, `Event.proposalId` không còn `@unique`. **Tên model/field giữ nguyên.**
- [ ] `server/modules/feedbacks/feedbacks.service.ts` chỉ mất `mode: 'insensitive'`.
- [ ] `npx prisma db push` → `npm run seed` → `npm run dev` → Swagger gọi được `GET /api/admin/heritages`, tạo QR, lọc feedback.
- [ ] SSMS: bảng di sản hiển thị tiếng Việt đúng dấu.
- ✅ PR có `Closes #<DB-01>`, CI xanh → squash merge → `git switch main && git pull`.
- 🖐 Gắn tag dự phòng: `git tag v1.9-sqlserver-schema-cu && git push origin v1.9-sqlserver-schema-cu` (dùng khi phải demo bằng bản này, xem mục 8).

### 3.3 💬 Nhắn nhóm
```
DB-01 đã merge: main chạy trên SQL Server (schema cũ). Ai xong SETUP-03 thì: git pull → npm install → npx prisma db push → npm run seed → npm run dev → mở /api-docs.html gọi thử GET /api/admin/heritages, rồi comment ảnh vào SETUP-03.
```

### 3.4 🤖 Bắt đầu DB-02 nếu còn sức – dán **docs/06 mục 4.2**
- Mục tiêu tối nay: schema mới `db push` được + seed chạy được (kể cả chưa đủ dữ liệu). **Push ngay** lên `chore/<DB-02>-schema-moi` dù `npm run check` còn đỏ ở module của B (bình thường, prompt đã nói rõ).
- Không kịp thì dừng, ngủ; sáng mai làm tiếp từ bước 4.1.

- ✅ **Trước khi ngủ:** SETUP-03 có ≥ 3/4 người comment "xong". Ai chưa → hẹn 07:30 sáng hỗ trợ qua màn hình.

---

## 4. Sáng 22/09 (07:30 → 09:30) – Nhánh tích hợp: DB-02 + CORE-01

### 4.1 🤖 Hoàn tất DB-02 (docs/06 mục 4.2)
Tự kiểm tra sau khi Claude xong:
- [ ] `docs/schema-muc-tieu.prisma` đã bị xóa, nội dung nằm ở `prisma/schema.prisma`.
- [ ] `npx prisma db push --force-reset` → `npm run seed` chạy 2 lần liên tiếp không lỗi.
- [ ] SSMS → Database Diagrams → New Diagram → chọn tất cả bảng: thấy đủ **14 bảng**, các đường quan hệ (lỗi quyền → docs/05 mục 6). **Chụp ảnh diagram** (dùng khi demo/ báo cáo).
- [ ] Mở `Items`, `ItemAttributeMappings`, `WebsiteAttributes`, `Proposals`: tiếng Việt đúng dấu; có hồ sơ chưa xác nhận email; có `QR_BASE_URL`.
- [ ] Claude đã liệt kê lỗi typecheck còn lại (chỉ ở heritages/qr/feedbacks) → copy danh sách này, gửi B.
- 🖐 Commit + `git push`.

### 4.2 🤖 CORE-01 – dán **docs/06 mục 4.3** (cùng nhánh, không tạo nhánh mới)
- [ ] `package.json` chỉ thêm `sanitize-html`, `ckeditor5`, `@ckeditor/ckeditor5-react`, `@types/sanitize-html`; không nâng Prisma.
- [ ] Có `server/core/settings.ts`, `html.ts`, `items.ts`; `npx tsc -p tsconfig.server.json --noEmit` chỉ báo lỗi ở module của B.
- 🖐 Commit + `git push`.

### 4.3 💬 Nhắn nhóm – "schema xong" (mục tiêu **≤ 09:30**)
```
SCHEMA XONG. Nhánh tích hợp: chore/<DB-02>-schema-moi
Mọi người: git fetch && git switch chore/<DB-02>-schema-moi && git pull && npm install && npx prisma db push --force-reset && npm run seed
- B: làm FR-07 → FR-08 → FR-09 NGAY TRÊN nhánh này (không tạo nhánh riêng), git pull trước mỗi lần push. Lỗi typecheck cần sửa: <dán danh sách>
- C: từ nhánh này tạo feat/<FR-02>-venues-crud, rồi FR-01, FR-04. Prompt docs/06 mục 6.1 + 6.2
- D: từ nhánh này tạo feat/<FR-03>-assets-crud, rồi FR-05, FR-06. Prompt docs/06 mục 6.1 + 6.2
Chỉ sửa thư mục module của mình. Cần thêm cột/bảng/thư viện → nhắn mình, không tự sửa prisma/ hay package.json.
```

### ✅ Mốc 0 – 09:30 (họp 10 phút)
- [ ] Máy A: nhánh tích hợp có schema + seed + helper, Diagram mở được.
- [ ] B, C, D đã `db push --force-reset` + seed thành công trên máy mình.
- Chưa đạt → xem mục 8 (DB-02 trễ). Mỗi người nói: đã push gì / đang kẹt gì / sẽ xong gì trước 12:30.

---

## 5. 09:30 → 19:30 – Theo mốc

### 5.1 09:30–12:30: gỡ vướng cho đường găng (B)
- 🖐 Ngồi cạnh (hoặc share màn hình) với B. Mỗi 45 phút hỏi B: FR nào xong, `npm run check` còn bao nhiêu lỗi.
- 🖐 B cần thêm cột/sửa seed → **A sửa** (schema/seed là file của A), commit lên nhánh tích hợp, nhắn B `git pull`.
- 🖐 Nếu 11:30 FR-07 chưa chạy: A nhận **FR-09** (dán docs/06 mục 5.3), B giữ FR-07/08.
- 🖐 PR của C/D đến trước 12:30: chỉ **review**, chưa merge (base của họ là nhánh tích hợp, merge sau khi PR tích hợp vào `main`). Review bằng prompt "Review PR" ở **docs/06 mục 7**:
  ```bash
  gh pr checkout <số PR> && npm install && npx prisma generate && npm run check && npm run dev
  ```
  rồi gọi thử `http/<module>.http`.

### 5.2 🤖 12:30 – Mốc 1: mở PR tích hợp – dán **docs/06 mục 4.4**
Điều kiện: B báo xong FR-07/08/09 và trên máy A, Swagger gọi được 3 API.
- [ ] Bảng pass/fail của Claude: heritages, qr, feedbacks, campuses đều pass.
- [ ] PR có đủ `Closes #<DB-02> #<CORE-01> #<FR-07> #<FR-08> #<FR-09>` (mỗi cái một dòng `Closes`).
- ✅ CI xanh → squash merge **trước 13:30** → tag `git tag v2.0-api-demo && git push origin v2.0-api-demo`.
- 💬 Nhắn:
  ```
  PR tích hợp đã vào main (3 API demo chạy). C, D: git fetch && git merge origin/main trên nhánh của mình.
  Conflict ở prisma/, server/core/, package*.json → lấy bản main (docs/04 mục 6 bước 5), rồi đổi base PR sang main.
  B: làm FE-03 CKEditor (docs/06 mục 5.4), rảnh thì FR-10.
  ```

### 5.3 13:30–16:30: merge PR của C/D + QA + kịch bản demo
Thứ tự ưu tiên của A trong khung này:
1. 🖐 **Merge PR của C/D** ngay khi CI xanh và đã chạy thử (đổi base sang `main` nếu còn trỏ nhánh tích hợp). Sau mỗi lần merge nhắn người còn lại `git merge origin/main`.
2. 🤖 **QA-02** – dán **docs/06 mục 4.6** (nhánh `test/<QA-02>-qa-sau-doi-schema`). Lỗi tìm được → tạo issue `type: bug`, gán chủ module.
3. 🤖 **DEMO-01** – dán **docs/06 mục 4.5**. Sản phẩm: `http/demo.http` + `docs/08-kich-ban-demo.md`. Luyện 5 câu hỏi khó với Claude ở cuối prompt.
4. 🖐 15:00 kiểm tra: còn > 3 FR P1 chưa mở PR → nhắn cắt phạm vi ("chỉ danh sách + tạo mới"), bỏ P2.
5. 🤖 **DEVOPS-02** (docs/06 mục 4.7) **chỉ khi** 15:00 mọi thứ trên đều xanh. Không thì bỏ – demo local được chấp nhận.

### ✅ Mốc 2 – 16:30: đóng băng tính năng
- 💬 "Đóng băng: từ giờ chỉ merge PR đã mở, sau đó chỉ sửa lỗi nhánh fix/…"
- [ ] Cập nhật bảng mục 2.4 + trạng thái issue (nhãn `status:` tự đổi khi PR merge).

### 5.4 16:30–18:00: dựng máy demo (máy A)
```bash
cd ~ && git clone https://github.com/arisdo-29/duong-sach-project.git duong-sach-demo && cd duong-sach-demo
cp ../<thư mục cũ>/.env .env           # tự copy, không để Claude làm
npm install
npx prisma db push --force-reset && npm run seed
npm run dev
```
- [ ] Chạy toàn bộ `http/demo.http` theo thứ tự, rồi các `http/*.http` còn lại.
- [ ] Điện thoại cùng wifi quét QR: nếu dùng điện thoại, sửa `QR_BASE_URL` trong SSMS thành `http://<IP-LAN-máy-A>:5173` (đây cũng là màn demo "đổi cấu hình không cần sửa code").
- [ ] Máy B dựng song song y hệt (máy dự phòng).
- [ ] Checklist **docs/05 mục 9**.

### 5.5 18:00–18:45: tổng duyệt
- 🖐 Cả nhóm chạy kịch bản `docs/08` trọn vẹn **một lần**, bấm giờ (≤ 10 phút).
- 🤖 Luyện Q&A: chat Project, dán prompt "Luyện Q&A với mentor" (docs/06 mục 7), mỗi người trả lời câu về phần mình. Đọc lại docs/03 mục 7.
- Lỗi phát hiện → chỉ sửa nếu < 15 phút, trên nhánh `fix/…`, PR, merge; không thì né trong kịch bản.

### ✅ 18:45: khóa
```bash
git switch main && git pull
git tag v2.0-demo && git push origin v2.0-demo
```
💬 "Khóa merge. Không push gì lên main nữa tới sau demo."

### ✅ 19:00: sẵn sàng
- [ ] Máy A: `npm run dev` đang chạy; tab Swagger `/api-docs.html`; SSMS mở sẵn Diagram + tab `SELECT` các bảng Items/WebsiteAttributes/Feedbacks; màn admin di sản có CKEditor; điện thoại sẵn sàng quét QR.
- [ ] Gọi thử 3 API demo một lần. Tắt thông báo, sạc máy.
- [ ] Máy B chạy sẵn phía sau.

### 19:30 – Demo (kịch bản docs/03 mục 6 / docs/08)
Cuối buổi: hỏi mentor câu còn mở (Item vs Product, giới hạn đăng ký tổ chức, cá nhân có được đề xuất…) và **ghi lại** vào docs/03 mục 8.

---

## 6. Mẫu tin nhắn nhanh

| Lúc | Tin nhắn |
|---|---|
| Nhắc cập nhật nhánh | "Main vừa có PR #… merge. Ai đang làm: `git fetch && git merge origin/main && npm install && npx prisma generate && npm run check`." |
| Có người kẹt | "Kẹt > 30 phút thì gắn nhãn `status: blocked` vào issue + nhắn lỗi nguyên văn, mình vào ngay." |
| Đổi schema giữa chừng | "Mình vừa thêm <cột/bảng> trên <nhánh>. `git pull` → `npx prisma db push` → `npm run seed` (đổi lớn thì `--force-reset`)." |
| Nhắc DoD trước PR | "Trước khi mở PR: merge main mới nhất, `npm run check` xanh, có `Closes #…`, có request mẫu trong `http/<module>.http`, chỉ sửa file module mình." |

---

## 7. Những việc A **không** giao cho Claude
- Đọc/sửa `.env`, gõ mật khẩu SQL Server, chuỗi kết nối cloud.
- Merge PR, đóng issue, xóa nhánh trên GitHub, tag release – A tự bấm sau khi đã chạy thử.
- `db push --force-reset` trên DB **cloud** (chỉ local).
- Quyết định đổi cấu trúc schema (thêm/bớt bảng) – A tự quyết, Claude chỉ thực hiện.
- Trả lời thay thành viên phần họ làm: mỗi người phải tự giải thích được code của mình khi mentor hỏi.

---

## 8. Phương án khi trễ

| Tình huống (kiểm tra lúc) | Làm ngay |
|---|---|
| 07:30 còn người chưa cài được SQL Server | Share màn hình 20 phút theo docs/05 mục 7. Không được → người đó code, test chung trên máy A/B |
| 09:30 DB-02 chưa `db push` được | Cắt seed tối thiểu (1 di sản, 1 gian hàng, 2 feedback, WebsiteAttributes) để B bắt đầu; bổ sung seed sau. C/D tiếp tục zod + `.http` |
| 11:30 FR-07 chưa chạy | A nhận FR-09 (docs/06 mục 5.3); B chỉ FR-07 + FR-08 |
| 12:30 chưa mở được PR tích hợp | Dời mốc tới 14:30, cả A+B dồn vào phần 3; C/D tiếp tục trên nhánh của mình |
| **14:30 vẫn chưa merge PR tích hợp** | **Demo bằng tag `v1.9-sqlserver-schema-cu`** (3 API chạy trên SQL Server schema cũ) + trình bày schema mới qua ảnh Diagram và file schema trên nhánh tích hợp. Ngừng port, chuyển sang luyện demo |
| 15:00 còn > 3 FR P1 chưa có PR | Cắt về "danh sách + tạo mới"; bỏ FR-10, FR-11, DEVOPS-02 |
| 19:00 máy A lỗi | Demo trên máy B (đã dựng ở 5.4) |
