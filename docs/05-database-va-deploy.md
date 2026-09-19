# 05 · Database & deploy (miễn phí, ai cũng mở được trên trình duyệt)

## 1. Khuyến nghị

| Hạng mục | Chọn | Lý do |
|---|---|---|
| Database | **PostgreSQL trên Neon** (gói Free) | Miễn phí lâu dài, **không cần thẻ, không cần email trường**; mỗi người một nhánh DB nên không ai phải cài database trên máy |
| Hướng làm | **Code-first** với Prisma (`schema.prisma` → `prisma db push`) | Schema nằm trong git, review như code |
| Hosting | **Vercel** cho cả frontend lẫn API (Vercel Function), vùng **Singapore (`sin1`)** | Đã có sẵn project; cùng domain nên không CORS; cùng vùng với DB nên nhanh |
| Chi phí | 0đ | Neon Free + Vercel Hobby |

Gói Free của Neon: mỗi project có 0.5 GB dữ liệu, 100 CU-giờ máy mỗi tháng, tối đa 10 nhánh. Database tự "ngủ" sau 5 phút không dùng; lần gọi đầu sau khi ngủ chậm khoảng nửa giây đến vài giây. Hết hạn mức thì chỉ tạm dừng tới tháng sau, **không bao giờ tính tiền**.

Vì sao không phải SQL Server: Azure SQL miễn phí cần email trường (Azure for Students) hoặc thẻ thanh toán, nhóm không có. Nhờ Prisma, đổi sang PostgreSQL chỉ phải sửa schema (đã làm sẵn trong `docs/schema-muc-tieu.prisma`); code service giữ nguyên.

## 2. Cách tổ chức database

Dùng **2 project** để mật khẩu database production không nằm trong tay cả nhóm (các nhánh trong cùng một project dùng chung tài khoản và mật khẩu):

| Project Neon | Nhánh | Dùng cho | Ai giữ chuỗi kết nối |
|---|---|---|---|
| `duongsach-prod` | `main` | Website thật trên Vercel (Production + Preview) | Chỉ trưởng nhóm + Vercel |
| `duongsach-dev` | `dev-khuyen`, `dev-tan`, `dev-tri`, `dev-tram` | Máy của từng người | Mỗi người giữ chuỗi của nhánh mình |

Mỗi project có hạn mức giờ máy riêng, nên 4 người dev cả ngày cũng không ảnh hưởng bản demo.

## 3. Tạo database (trưởng nhóm, ~15 phút)
1. Vào **neon.com** → *Sign up* → đăng nhập bằng **GitHub** (không cần thẻ).
2. *New project* → tên `duongsach-prod`, Region **AWS Asia Pacific (Singapore)**, giữ database mặc định `neondb`.
3. Tạo thêm project `duongsach-dev`, cùng vùng Singapore. Vào tab **Branches** → *Create branch* 4 lần (tạo từ `main`): `dev-khuyen`, `dev-tan`, `dev-tri`, `dev-tram`.
4. Lấy chuỗi kết nối: chọn nhánh → nút **Connect** → có 2 dạng:
   - **Pooled** (bật *Connection pooling*): host có chữ `-pooler`. Dùng cho API trên Vercel.
   - **Direct** (tắt *Connection pooling*): dùng cho `prisma db push` và cho máy dev.
5. Cất các chuỗi vào ghi chú riêng. Gửi **tin nhắn riêng** cho từng người đúng chuỗi nhánh của họ. Không gửi vào nhóm chung, không commit.

## 4. Máy dev (mỗi thành viên)
Không cần cài PostgreSQL. Tạo file `.env` ở gốc repo (đã nằm trong `.gitignore`), dùng chuỗi **direct** của nhánh mình cho cả hai biến:
```env
DATABASE_URL="postgresql://<user>:<matkhau>@<host-nhanh-cua-ban>.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"
DIRECT_URL="postgresql://<user>:<matkhau>@<host-nhanh-cua-ban>.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"
PUBLIC_BASE_URL="http://localhost:5173"
```
Sau đó:
```bash
npx prisma db push     # tạo/cập nhật bảng trên nhánh của bạn
npm run seed           # nạp dữ liệu mẫu (xóa dữ liệu cũ rồi nạp lại)
npm run dev            # http://localhost:5173 và http://localhost:5173/api-docs.html
npx prisma studio      # xem dữ liệu
```
Làm hỏng dữ liệu nhánh mình → chạy lại `npm run seed`, hoặc trên Neon Console chọn nhánh → *Reset from parent*.

## 5. Production trên Vercel (trưởng nhóm)

**a) Tạo bảng + dữ liệu mẫu trên `duongsach-prod`** (tự làm trong terminal, không nhờ AI vì có mật khẩu):
```powershell
# PowerShell – dùng chuỗi DIRECT của duongsach-prod cho cả hai biến
$env:DATABASE_URL="postgresql://...duongsach-prod-direct...?sslmode=require&connect_timeout=15"
$env:DIRECT_URL=$env:DATABASE_URL
npx prisma db push
npm run seed
Remove-Item Env:DATABASE_URL, Env:DIRECT_URL
```
Biến đặt trong terminal được ưu tiên hơn file `.env`, nên lệnh chạy vào production chứ không vào nhánh dev.

**b) Biến môi trường trên Vercel** (Project → Settings → Environment Variables, chọn cả Production và Preview):

| Biến | Giá trị |
|---|---|
| `DATABASE_URL` | Chuỗi **pooled** của `duongsach-prod`, thêm `&pgbouncer=true`: `postgresql://...-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15` |
| `DIRECT_URL` | Chuỗi **direct** của `duongsach-prod` |
| `PUBLIC_BASE_URL` | `https://duong-sach-project.vercel.app` (Preview cũng để vậy, để QR luôn trỏ domain thật) |

**c) Các file SETUP-01 đã tạo:**
- `api/index.ts`:
  ```ts
  import app from '../server/app.js';
  export default app;
  ```
- `vercel.json`:
  ```json
  {
    "regions": ["sin1"],
    "rewrites": [
      { "source": "/api/(.*)", "destination": "/api" },
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
  `regions` đặt API chạy ở Singapore, cạnh database. Rewrite 1 chuyển mọi `/api/...` vào Express. Rewrite 2 là SPA fallback để link QR `/di-san/{slug}` mở được app. File tĩnh có thật (ảnh, `/api-docs.html`) vẫn được phục vụ trước rewrite.
- `package.json` có `"postinstall": "prisma generate"` để Vercel luôn sinh Prisma Client mới.

Merge vào `main` → Vercel tự build. Kiểm tra `/api/health` và `/api-docs.html`. Xem lỗi ở Deployments → chọn bản build → Logs.

**d) Khi schema thay đổi sau này:** trưởng nhóm lặp lại bước (a) cho production; từng thành viên chạy `npx prisma db push` trên nhánh của mình.

## 6. Lỗi hay gặp
| Lỗi | Nguyên nhân / cách sửa |
|---|---|
| `P1001: Can't reach database server` | Sai host hoặc thiếu `?sslmode=require`; mạng trường chặn cổng 5432 → thử bằng 4G |
| `P1017` / timeout ở lần gọi đầu | Neon đang thức dậy → thêm `connect_timeout=15`, gọi lại |
| `prepared statement "s0" already exists` | `DATABASE_URL` dùng chuỗi pooled mà thiếu `pgbouncer=true` |
| `prisma db push` treo hoặc lỗi trên production | Đang dùng chuỗi pooled → `DIRECT_URL` phải là chuỗi **direct** |
| Lỗi liên quan `channel_binding` | Chuỗi copy từ Neon có `&channel_binding=require` → xóa tham số này |
| `Environment variable not found: DIRECT_URL` | Thiếu `DIRECT_URL` trong `.env` hoặc trên Vercel |
| Tìm "nha nam" không ra "Nhã Nam" | PostgreSQL phân biệt hoa thường/dấu → dùng `mode: 'insensitive'`; tìm không dấu là điểm cộng (FR-01) |
| Vercel `/api/...` trả 404 | Thiếu `api/index.ts` hoặc rewrite trong `vercel.json` |
| Vercel `ERR_MODULE_NOT_FOUND ... .ts` | Import tương đối phải kết thúc bằng `.js` |
| Vercel `PrismaClientInitializationError` | Thiếu env trên Vercel, hoặc thiếu `postinstall: prisma generate` |

## 7. Trước giờ demo (18:30)
1. Mở `https://duong-sach-project.vercel.app/api/health` để đánh thức database.
2. Mở sẵn `/api-docs.html` và Neon Console (project `duongsach-prod` → Tables) để cho mentor xem dữ liệu thật.

## 8. Phương án dự phòng
- **API trên Vercel Function không chạy:** deploy cùng Express app lên Render (Web Service, Node, build `npm install`, start `npx tsx server/index.ts`, env như trên, region Singapore), rồi đổi rewrite 1 trong `vercel.json` thành `"destination": "https://<app>.onrender.com/api/$1"`. Render free tự ngủ sau 15 phút không có request.
- **Neon gặp sự cố:** Supabase cũng là PostgreSQL miễn phí → chỉ đổi 2 chuỗi kết nối, không sửa code.
- **Mọi thứ đều hỏng lúc 17h:** chạy local rồi mở link công khai tạm thời bằng `npx cloudflared tunnel --url http://localhost:5173`.
