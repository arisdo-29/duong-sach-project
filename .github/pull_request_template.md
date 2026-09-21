## Issue
Closes #<!-- số issue, ví dụ: Closes #5 → merge xong issue tự đóng, nhãn tự chuyển "status: done" -->
<!-- PR tích hợp đợt 22/09 gộp nhiều issue: mỗi issue một dòng "Closes #…" (docs/04 mục 6) -->

## Thay đổi gì
<!-- 2–4 gạch đầu dòng, ngắn gọn -->
- 

## Cách test (người review làm lại được)
<!-- Ví dụ: npx prisma db push → npm run seed → npm run dev → mở /api-docs.html → chạy "Tạo gian hàng" → mong đợi 201 -->
1. 

## Ảnh / log kết quả
<!-- Dán ảnh /api-docs.html hoặc kết quả request trong http/<module>.http -->

## Checklist
- [ ] Đã `git merge origin/main` mới nhất vào nhánh này, không còn conflict
- [ ] `npm run check` xanh (typecheck backend + build)
- [ ] Nếu đụng schema: `npx prisma db push` + `npm run seed` chạy được trên SQL Server local, tiếng Việt đúng dấu
- [ ] Code Prisma đúng quy tắc SQL Server (AGENTS.md mục 3): không `mode: 'insensitive'`, không `@db.VarChar`/`Json`/`enum`, trả JSON qua `toDto`
- [ ] Chỉ sửa thư mục module của mình (`server/modules/<module>/`, `http/<module>.http`) hoặc file issue cho phép
- [ ] Không commit `.env`, mật khẩu, connection string thật, `node_modules/`, `dist/`
- [ ] Nếu đổi API: đã cập nhật `docs/02-requirements-va-uu-tien.md`
