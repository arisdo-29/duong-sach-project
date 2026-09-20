@AGENTS.md

# Ghi chú riêng cho Claude Code
- Luôn trả lời bằng tiếng Việt.
- Task đụng từ 3 file trở lên: vào Plan mode, trình bày kế hoạch, chờ xác nhận rồi mới sửa.
- Làm API: đọc tiêu chí trong issue và mục Hợp đồng API ở `docs/02-requirements-va-uu-tien.md` trước khi viết schema zod. Làm module mới thì mở một module đã xong làm mẫu để giữ cùng phong cách.
- Code Node cũ (trước SETUP-01) có lỗi đã liệt kê ở `docs/01` mục Vấn đề – không sao chép lại các lỗi đó.
- Xong task: chạy `npm run check`, tóm tắt thay đổi, hướng dẫn test bằng `http/<module>.http` hoặc `/api-docs.html`, đề xuất commit message theo AGENTS.md.
- Gặp conflict git: giải thích từng khối (phần nào của ai), đề xuất cách giữ, chỉ sửa khi được đồng ý.
- Khi được nhờ "giải thích để trả lời mentor": đi theo luồng request → routes → validate → controller → service → Prisma → PostgreSQL, nêu lý do thiết kế và so sánh với cách làm trong Spring Boot.
## Kiểm thử
- Sau khi sửa UI/routing, dùng Playwright MCP để tự mở trình duyệt và kiểm tra tương tác (click, Back/Forward, render).
- Với thay đổi về router, viết hoặc cập nhật test trong `e2e/` và chạy `npx playwright test` trước khi báo xong.
