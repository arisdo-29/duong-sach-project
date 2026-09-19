## Issue
Closes #<!-- số issue, ví dụ: Closes #5 → merge xong issue tự đóng, nhãn tự chuyển "status: done" -->

## Thay đổi gì
<!-- 2–4 gạch đầu dòng, ngắn gọn -->
- 

## Cách test (người review làm lại được)
<!-- Ví dụ: npm run dev → mở http/booths.http → chạy request "Tạo gian hàng" → mong đợi 201; hoặc thử trên link Vercel Preview của PR -->
1. 

## Ảnh / log kết quả
<!-- Dán ảnh /api-docs.html hoặc kết quả request trong http/<module>.http -->

## Checklist
- [ ] Đã `git merge origin/main` mới nhất vào nhánh này, không còn conflict
- [ ] `npm run check` xanh (typecheck backend + build)
- [ ] Chỉ sửa thư mục module của mình (`server/modules/<module>/`, `http/<module>.http`) hoặc file issue cho phép
- [ ] Không commit `.env`, mật khẩu, connection string thật, `node_modules/`, `dist/`, `prisma/dev.db`
- [ ] Nếu đổi API: đã cập nhật `docs/02-requirements-va-uu-tien.md`
