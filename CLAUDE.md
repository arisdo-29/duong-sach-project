@AGENTS.md

# Ghi chú riêng cho Claude Code
- Luôn trả lời bằng tiếng Việt.
- Database là **SQL Server** (không phải PostgreSQL/Neon). Trước khi viết truy vấn Prisma, mở `prisma/schema.prisma` để lấy đúng tên model/cột PascalCase; không đoán tên.
- Task đụng từ 3 file trở lên: vào Plan mode, trình bày kế hoạch, chờ xác nhận rồi mới sửa.
- Làm API: đọc tiêu chí trong issue và mục Hợp đồng API ở `docs/02-requirements-va-uu-tien.md` trước khi viết zod. Hợp đồng JSON **giữ nguyên** dù tên cột DB đổi: viết hàm `toDto()` trong service để chuyển bản ghi → JSON.
- Làm module mới: mở một module đã xong trên schema mới (ưu tiên `heritages` sau FR-07) làm mẫu để giữ cùng phong cách; dùng helper `server/core/items.ts`, `settings.ts`, `html.ts` thay vì tự viết lại.
- Không sao chép các lỗi cũ đã liệt kê ở `docs/01` mục 6.
- Xong task: chạy `npm run check`, tóm tắt thay đổi, hướng dẫn test bằng `http/<module>.http` hoặc `/api-docs.html`, đề xuất commit message theo AGENTS.md.
- Lỗi kết nối DB (P1001, TLS, login failed): **không** tự sửa code; đối chiếu `docs/05` mục Lỗi hay gặp và hướng dẫn người dùng kiểm tra `.env` / SQL Server. Không đọc, không in file `.env`.
- Gặp conflict git: giải thích từng khối (phần nào của ai), đề xuất cách giữ, chỉ sửa khi được đồng ý.
- Khi được nhờ "giải thích để trả lời mentor": đi theo luồng request → routes → validate → controller → service → Prisma → SQL Server, nêu lý do thiết kế (cột thật vs thuộc tính động, xóa mềm, slug cố định…) và so sánh với Spring Boot + JPA.
## Kiểm thử
- Sau khi sửa UI/routing, dùng Playwright MCP để tự mở trình duyệt và kiểm tra tương tác (click, Back/Forward, render).
- Với thay đổi về router, viết hoặc cập nhật test trong `e2e/` và chạy `npx playwright test` trước khi báo xong.
