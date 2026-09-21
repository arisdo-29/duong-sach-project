---
trigger: always_on
---

# Quy tắc dự án Đường Sách (Antigravity)

Toàn bộ bối cảnh, quy ước và quy tắc làm việc nằm trong file `AGENTS.md` ở thư mục gốc repo: @../../AGENTS.md

Nếu không đọc được file trên: hãy mở và đọc `AGENTS.md` ở gốc repo trước khi làm bất cứ việc gì, rồi tuân thủ nó.

Nhắc nhanh những điều hay sai:
- Luôn trả lời bằng tiếng Việt. Không commit thẳng vào nhánh main.
- Database là **SQL Server** (không phải PostgreSQL/Neon): chuỗi dùng `@db.NVarChar`, nội dung dài `@db.NVarChar(Max)`, không `enum`/`Json`, không `mode: 'insensitive'`, không `directUrl`.
- Tên bảng/cột theo khuôn mentor (PascalCase: `Items`, `ItemAttributeMappings`, `Name`, `NameEng`, `DateCreated`…). Mở `prisma/schema.prisma` để lấy đúng tên, không đoán.
- Hợp đồng JSON của API giữ nguyên (docs/02). Chỉ sửa thư mục module của mình.
