# 04 · Làm việc với Git & GitHub cho nhóm 4 người

## 1. Cài đặt một lần (mỗi người)
```bash
git config --global user.name "Nguyen Viet Tan"
git config --global user.email "email-dang-ky-github@..."   # PHẢI trùng email GitHub để commit hiện đúng avatar
git config --global core.autocrlf true      # Windows  (macOS/Linux dùng: input)
git config --global pull.rebase false       # git pull = merge, dễ hiểu cho người mới
git config --global init.defaultBranch main
git clone https://github.com/arisdo-29/duong-sach-project.git
```
Repo có `.gitattributes` để thống nhất kiểu xuống dòng → hết lỗi "cả file bị đổi" khi Windows và macOS cùng sửa.

## 2. Dọn repo trước khi bắt đầu (trưởng nhóm, 15 phút)
1. PR đang mở từ nhánh `webadmin` (1 commit sửa `mockData.ts`, nhánh này từng merge rồi revert): hỏi người viết còn cần không → cần thì mở PR mới từ `main`, không thì **Close**.
2. Nhánh `agents/update-og-image-metadata` là nhánh do AI agent tạo, đã nằm trong `main` → xóa.
3. **Settings → Branches → Add rule** cho `main`: *Require a pull request before merging* (1 approval), *Require status checks: CI*. Từ đây không ai push thẳng `main` được.
4. **Settings → General → Pull Requests**: chỉ bật *Allow squash merging*, bật *Automatically delete head branches*.

## 3. Mô hình nhánh: GitHub Flow

```mermaid
gitGraph
  commit id: "main ổn định"
  branch feat/7-booths-crud
  commit id: "feat(booths): list + create"
  commit id: "feat(booths): xóa mềm"
  checkout main
  branch feat/12-proposals-view
  commit id: "feat(proposals): list + filter"
  checkout main
  merge feat/7-booths-crud id: "squash #7"
  checkout feat/12-proposals-view
  merge main id: "cập nhật từ main"
  checkout main
  merge feat/12-proposals-view id: "squash #12"
```

- `main` luôn chạy được và **tự deploy lên Vercel**.
- Mỗi issue = một nhánh ngắn (vài giờ), tách từ `main` mới nhất.
- Tên nhánh `<loại>/<số-issue>-<mô-tả-ngắn>`: `feat/7-booths-crud`, `fix/15-feedback-filter`, `chore/1-setup`, `docs/20-demo`. Có số issue ở đầu → nhãn trạng thái của issue tự cập nhật.

## 4. Commit message (Conventional Commits)
`<loại>(<module>): <mô tả tiếng Việt> (#<issue>)`

| Loại | Khi nào | Ví dụ |
|---|---|---|
| `feat` | Tính năng / API mới | `feat(booths): thêm lọc theo cơ sở (#7)` |
| `fix` | Sửa lỗi | `fix(feedbacks): bỏ fallback id test (#15)` |
| `refactor` | Sửa cấu trúc, không đổi hành vi | `refactor(heritages): tách service (#13)` |
| `test` | Thêm test / file .http | `test(proposals): thêm ca từ chối thiếu ghi chú (#12)` |
| `docs` | Tài liệu | `docs: cập nhật hợp đồng API events (#10)` |
| `chore` | Cấu hình, dependency | `chore: thêm script check (#1)` |

Commit nhỏ, mỗi commit một ý, commit **sau khi** `npm run check` xanh.

## 5. Quy trình một task

| Bước | Dòng lệnh | IntelliJ | VS Code / Antigravity |
|---|---|---|---|
| 1. Lấy `main` mới | `git switch main && git pull` | Git → Pull | Source Control → … → Pull |
| 2. Tạo nhánh | `git switch -c feat/7-booths-crud` | Nhánh ở góc dưới phải → New Branch | Tên nhánh ở góc dưới trái → Create new branch |
| 3. Code + test | `npm run check` | Terminal | Terminal |
| 4. Commit | `git add server/modules/booths http/booths.http` rồi `git commit -m "feat(booths): ... (#7)"` | Commit (Ctrl+K), chỉ tick file của mình | Tab Source Control, `+` từng file, nhập message |
| 5. Đẩy lên | `git push -u origin feat/7-booths-crud` | Push (Ctrl+Shift+K) | Publish Branch |
| 6. Mở PR | `gh pr create --fill` hoặc trên web | GitHub → Create Pull Request | Extension GitHub Pull Requests |
| 7. Sau review | Trưởng nhóm bấm **Squash and merge** | | |

Luôn **xem lại danh sách file trước khi commit**: không có `.env`, `node_modules/`, `dist/`, `prisma/dev.db`, file của module khác.

## 6. Cập nhật nhánh khi `main` đã thay đổi
Làm mỗi khi có PR khác vừa merge và **bắt buộc trước khi mở PR**:
```bash
git fetch origin
git merge origin/main        # không dùng rebase, không force push
npm install                  # nếu package.json vừa đổi
npx prisma generate          # nếu schema.prisma vừa đổi
npm run check
git push
```

## 7. Tránh xung đột
1. **Mỗi người chỉ sửa thư mục module của mình** (bảng chủ sở hữu trong AGENTS.md).
2. **File dùng chung chỉ trưởng nhóm sửa:** `prisma/schema.prisma`, `server/routes.ts`, `server/core/*`, `server/app.ts`, `package.json`, `package-lock.json`, `vite.config.ts`, `vercel.json`, `AGENTS.md`. Cần đổi → nhắn A.
3. **Không cài thư viện riêng lẻ.** `npm install xyz` đổi `package-lock.json` → xung đột khó gỡ. Cần thư viện → A cài một lần cho cả nhóm.
4. PR nhỏ, merge thường xuyên (mỗi 2–3 giờ). Nhánh sống càng lâu càng dễ xung đột.
5. Không format lại cả file (tắt "Reformat code" khi commit trong IntelliJ) → chỉ đổi đúng dòng cần đổi.

## 8. Khi có xung đột
Git đánh dấu trong file:
```
<<<<<<< HEAD            ← phần của bạn
...
=======
...
>>>>>>> origin/main     ← phần đã có trên main
```
- **IntelliJ:** Git → Resolve Conflicts → Merge: 3 cột (của bạn | kết quả | của main), bấm `>>` / `<<` để lấy từng đoạn.
- **VS Code / Antigravity:** mở file → *Resolve in Merge Editor* → Accept Current / Incoming / Both.
- **Claude Code:** `Có conflict khi merge origin/main. Giải thích từng khối, đề xuất cách giữ, chờ mình xác nhận.`
- Xong: `git add <file>` → `git commit` → `npm run check` → `git push`.
- **Riêng `package-lock.json`:** không sửa tay. `git checkout --theirs package-lock.json && npm install && git add package-lock.json`.

## 9. Sự cố thường gặp
| Tình huống | Cách cứu |
|---|---|
| Lỡ commit trên `main` (chưa push) | `git switch -c feat/x-ten` (commit đi theo nhánh mới) → `git branch -f main origin/main` (đưa `main` về như trên GitHub) |
| Muốn bỏ commit cuối (chưa push) | `git reset --soft HEAD~1` (giữ nguyên code) |
| Lỡ commit file không nên (`.env`) | `git rm --cached .env` → commit. Nếu **đã push mật khẩu**: reset mật khẩu DB ngay trên Neon (Roles → Reset password) |
| Sửa lung tung muốn về trạng thái commit gần nhất | `git restore .` (mất thay đổi chưa commit!) |
| Push bị từ chối (non-fast-forward) | `git pull` rồi push lại. **Không** `--force` |

## 10. Lệnh nhanh
```bash
git status                    # đang ở nhánh nào, file nào đổi
git log --oneline --graph -15 # lịch sử
git diff                      # xem thay đổi chưa add
gh issue list --assignee @me  # việc của tôi
gh pr status                  # PR của tôi
```
