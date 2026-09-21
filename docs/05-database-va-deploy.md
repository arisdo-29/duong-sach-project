# 05 · Kết nối SQL Server & chạy dự án (bắt buộc đọc)

> Viết lại 21/09/2026: dự án đã chuyển từ PostgreSQL/Neon sang **SQL Server** theo yêu cầu mentor. Mọi hướng dẫn Neon cũ **bỏ**.
> Mục tiêu: **bất kỳ thành viên nào** làm theo từ đầu đến cuối đều chạy được dự án và mở được Swagger. Thời gian: 30–60 phút.

## 1. Tổng quan

| Hạng mục | Chọn |
|---|---|
| Database | **SQL Server local** trên máy mỗi người (không dùng chung DB → không giẫm dữ liệu của nhau) |
| Cách cài | **Docker** (mọi hệ điều hành, gọn nhất) **hoặc** SQL Server **Developer** / **Express** cài thẳng trên Windows (miễn phí) |
| Tên database | `DuongSach`, collation **`Vietnamese_CI_AI`** (tìm kiếm không phân biệt hoa thường và dấu) |
| Đăng nhập | **SQL Server authentication** (user `sa` + mật khẩu), cổng **1433** |
| Công cụ xem DB | **SSMS** (Windows, có Database Diagram để trình bày) · macOS: VS Code extension *SQL Server (mssql)* hoặc DBeaver |
| Hướng làm | **Code-first** với Prisma: `prisma/schema.prisma` → `npx prisma db push` |
| Chi phí | 0đ |

Mật khẩu `sa` gợi ý cho máy local: `DuongSach@2026` (đủ độ phức tạp SQL Server yêu cầu: ≥ 8 ký tự, có hoa, thường, số, ký hiệu). **Tránh** các ký tự `; = { } [ ] : / \` trong mật khẩu vì phải escape trong chuỗi kết nối. Đây là mật khẩu DB trên máy bạn, không dùng lại cho việc khác, không commit.

## 2. Cài SQL Server – chọn MỘT cách

### Cách 1 – Docker (khuyên dùng; Windows, macOS, Linux)
1. Cài **Docker Desktop**, mở lên và chờ trạng thái *Engine running*. Cấp cho Docker ≥ 2 GB RAM.
   - **macOS chip Apple (M1/M2/M3…)**: Docker Desktop → Settings → General → bật *Use Rosetta for x86_64/amd64 emulation on Apple Silicon*.
2. Chạy SQL Server 2022 (một lần duy nhất):
   ```bash
   docker run -d --name duongsach-sql \
     -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=DuongSach@2026" \
     -p 1433:1433 -v duongsach-sql-data:/var/opt/mssql \
     mcr.microsoft.com/mssql/server:2022-latest
   ```
   - PowerShell: viết trên **một dòng** (bỏ các dấu `\`).
   - macOS chip Apple: thêm `--platform linux/amd64` ngay sau `docker run -d`.
3. Kiểm tra: `docker ps` thấy `duongsach-sql` trạng thái *Up*. Nếu container tắt ngay: `docker logs duongsach-sql` (thường do mật khẩu yếu hoặc thiếu RAM).
4. Tạo database:
   ```bash
   docker exec -it duongsach-sql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "DuongSach@2026" -C -Q "CREATE DATABASE DuongSach COLLATE Vietnamese_CI_AI"
   ```
5. Những lần sau chỉ cần `docker start duongsach-sql` (dữ liệu nằm trong volume `duongsach-sql-data`, không mất khi tắt máy).

### Cách 2 – Cài SQL Server Developer trên Windows (miễn phí, đủ tính năng)
1. Tải **SQL Server 2022 Developer** từ trang *SQL Server Downloads* của Microsoft → chạy file cài → chọn **Custom** (không chọn Basic, vì Basic chỉ bật Windows authentication).
2. Ở bước *Database Engine Configuration* → *Authentication Mode*: chọn **Mixed Mode**, đặt mật khẩu cho `sa`, bấm *Add Current User*. Instance để mặc định (`MSSQLSERVER`).
3. Bật TCP cổng 1433: mở **SQL Server Configuration Manager** → *SQL Server Network Configuration* → *Protocols for MSSQLSERVER* → **TCP/IP** → *Enabled*. Mở TCP/IP → tab *IP Addresses* → mục **IPAll**: `TCP Dynamic Ports` để trống, `TCP Port` = `1433`.
4. *SQL Server Services* → chuột phải **SQL Server (MSSQLSERVER)** → *Restart*.
5. Tạo database: xem mục 3.

> Đã lỡ cài kiểu Basic (chỉ Windows authentication): mở SSMS bằng Windows authentication → chuột phải server → *Properties* → *Security* → chọn *SQL Server and Windows Authentication mode* → OK. Rồi *Security → Logins → sa* → *Properties*: đặt mật khẩu; trang *Status*: *Login* = **Enabled**. Restart service như bước 4.

### Cách 3 – SQL Server Express (nhẹ hơn, giới hạn 10 GB – vẫn đủ)
Giống cách 2 nhưng instance tên `SQLEXPRESS` và mặc định dùng cổng động. Bắt buộc làm bước 3 với mục *Protocols for SQLEXPRESS* (TCP Port = `1433`, Dynamic Ports để trống) rồi restart *SQL Server (SQLEXPRESS)*. Chuỗi kết nối vẫn dùng `localhost:1433`.

## 3. Công cụ xem DB + tạo database

**SSMS (Windows)** – tải *SQL Server Management Studio* bản mới nhất từ Microsoft.
1. Mở SSMS → *Connect*: Server name `localhost,1433` (dấu **phẩy**), Authentication **SQL Server Authentication**, Login `sa`, Password.
2. Bản SSMS mới mặc định *Encrypt = Mandatory*: tick **Trust server certificate** (SQL Server local dùng chứng chỉ tự ký).
3. Chưa tạo database ở mục 2: *New Query* → chạy
   ```sql
   CREATE DATABASE DuongSach COLLATE Vietnamese_CI_AI;
   ```
4. Kiểm tra collation: `SELECT DATABASEPROPERTYEX('DuongSach', 'Collation');` → `Vietnamese_CI_AI`.

**macOS / Linux:** VS Code extension **SQL Server (mssql)** của Microsoft (kết nối, chạy truy vấn, xem sơ đồ bảng) hoặc **DBeaver Community** (tab *ER Diagram*). Kết nối: host `localhost`, port `1433`, user `sa`, bật *Trust server certificate*. Tạo database bằng lệnh `sqlcmd` ở mục 2 bước 4 hoặc câu `CREATE DATABASE` trên.

## 4. Tạo file `.env`
```bash
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
```
Mở `.env` và điền:
```env
# Prisma chuỗi kết nối SQL Server – KHÔNG commit file .env
DATABASE_URL="sqlserver://localhost:1433;database=DuongSach;user=sa;password=DuongSach@2026;encrypt=true;trustServerCertificate=true"

# Domain dự phòng khi WebsiteAttributes.QR_BASE_URL để trống
PUBLIC_BASE_URL="http://localhost:5173"
```
Giải thích các phần của `DATABASE_URL`:

| Phần | Ý nghĩa |
|---|---|
| `sqlserver://localhost:1433` | Máy và cổng SQL Server. Đổi cổng Docker (vd `-p 1434:1433`) thì sửa ở đây |
| `database=DuongSach` | Tên database đã tạo ở mục 2/3 |
| `user=sa;password=...` | Login SQL Server authentication |
| `encrypt=true;trustServerCertificate=true` | Mã hóa kết nối nhưng **chấp nhận chứng chỉ tự ký** của SQL Server local. Không có `trustServerCertificate=true` → lỗi TLS/chứng chỉ |

Mật khẩu có ký tự đặc biệt `; = { } [ ] : / \` thì bọc trong ngoặc nhọn: `password={Mat;Khau}`. Không còn biến `DIRECT_URL` (đó là của Neon).

## 5. Chạy dự án
```bash
npm install              # lần đầu hoặc khi package.json đổi (tự chạy prisma generate)
npx prisma db push       # tạo/cập nhật bảng theo prisma/schema.prisma
npm run seed             # xóa dữ liệu cũ rồi nạp dữ liệu mẫu (chạy lại bao nhiêu lần cũng được)
npm run dev              # frontend + API cùng lúc
```
- Trang web: http://localhost:5173 · **Swagger: http://localhost:5173/api-docs.html** · kiểm tra: http://localhost:5173/api/health
- `npm run server` (tùy chọn): chỉ chạy API ở http://localhost:5000 – không cần khi đã chạy `npm run dev`.
- Xem dữ liệu: `npx prisma studio`, hoặc SSMS → `DuongSach` → *Tables*.
- **Schema thay đổi lớn** (vd lúc chuyển từ bản DB-01 sang DB-02): `npx prisma db push --force-reset` rồi `npm run seed`. Lệnh này **xóa sạch** mọi bảng trong database local – chỉ dùng trên máy mình.
- Schema thay đổi nhỏ (thêm cột có mặc định): `npx prisma db push` là đủ.

### Test API trên Swagger
Mở `/api-docs.html` → chọn endpoint → *Try it out* → sửa body mẫu → *Execute*. Mỗi module cũng có file `http/<module>.http` (VS Code extension *REST Client* hoặc IntelliJ HTTP Client) với biến `@host = http://localhost:5173`.

## 6. Database Diagram trong SSMS (để trình bày với mentor)
1. Sau `npx prisma db push`: SSMS → mở `DuongSach` → chuột phải **Database Diagrams** → *New Database Diagram*.
2. Lần đầu SSMS hỏi cài *support objects* → *Yes*. Nếu báo lỗi *does not have a valid owner*:
   ```sql
   ALTER AUTHORIZATION ON DATABASE::DuongSach TO sa;
   ```
3. Chọn các bảng → *Add*. 14 bảng vừa một sơ đồ; muốn rõ hơn thì tạo **2 sơ đồ**: (a) khung nội dung chung: `ItemCategories`, `Items`, `ItemAttributes`, `ItemAttributeMappings`, `Pictures`, `ItemPictureMappings`, `WebsiteAttributes`, `Campuses`, `Feedbacks`; (b) nghiệp vụ: `Campuses`, `Venues`, `Assets`, `Events`, `Proposals`, `ProposalItems`. Lưu tên `01-noi-dung-chung`, `02-nghiep-vu`.
4. Sơ đồ lưu **trong database**: chạy `db push --force-reset` sẽ mất → làm lại sau lần reset cuối trên máy demo.

## 7. Lỗi hay gặp

| Lỗi | Nguyên nhân / cách sửa |
|---|---|
| `P1001: Can't reach database server at localhost:1433` | Docker: container chưa chạy → `docker start duongsach-sql`. Windows: TCP/IP chưa bật hoặc chưa đặt cổng 1433 (mục 2 cách 2 bước 3), chưa restart service. Máy đã có SQL Server khác chiếm 1433 → chạy Docker với `-p 1434:1433` và sửa cổng trong `.env` |
| `Error opening a TLS connection` / *self signed certificate* / *certificate verify failed* | Thiếu `trustServerCertificate=true` trong `DATABASE_URL` |
| `P1000: Authentication failed` / *Login failed for user 'sa'* | Sai mật khẩu; chưa bật Mixed Mode; login `sa` đang *Disabled* (mục 2 cách 2 – khung lưu ý) |
| *Cannot open database "DuongSach" requested by the login* | Chưa tạo database → mục 3 bước 3 |
| Tiếng Việt thành `?` trong SSMS | Cột khai báo `@db.VarChar` thay vì `@db.NVarChar` → sửa schema, `db push --force-reset`, seed lại. Tự chèn bằng SQL thì chuỗi phải có tiền tố `N'...'` |
| *Introducing FOREIGN KEY constraint … may cause cycles or multiple cascade paths* | Quan hệ thiếu `onDelete: NoAction, onUpdate: NoAction` |
| `P2002` Unique constraint khi chèn bản ghi thứ hai có cột NULL | Có `@unique` trên cột nullable → bỏ `@unique` (AGENTS.md mục 3.2) |
| Typecheck: *'mode' does not exist in type …* | Còn `mode: 'insensitive'` (chỉ PostgreSQL có) → xóa; collation `Vietnamese_CI_AI` đã không phân biệt hoa thường |
| `db push` cảnh báo *data loss* / không chạy tiếp | Đổi cấu trúc bảng đã có dữ liệu → trên máy local: `npx prisma db push --force-reset` rồi `npm run seed` |
| Tìm "nha nam" không ra "Nhã Nam" | Database không tạo với `Vietnamese_CI_AI`. Sửa: SSMS chạy `DROP DATABASE DuongSach; CREATE DATABASE DuongSach COLLATE Vietnamese_CI_AI;` rồi `db push` + `seed` |
| Docker: container tắt ngay sau khi chạy | `docker logs duongsach-sql`: mật khẩu không đủ phức tạp hoặc Docker thiếu RAM (< 2 GB) |
| macOS chip Apple: *no matching manifest for linux/arm64* | Thêm `--platform linux/amd64` và bật Rosetta (mục 2 cách 1) |
| SSMS: *The certificate chain was issued by an authority that is not trusted* | Tick *Trust server certificate* ở hộp thoại Connect |
| Database Diagram: *does not have a valid owner* | `ALTER AUTHORIZATION ON DATABASE::DuongSach TO sa;` |
| `Environment variable not found: DATABASE_URL` | Chưa có file `.env` ở gốc repo (mục 4) |
| Seed báo lỗi khóa ngoại khi xóa dữ liệu cũ | Seed phải xóa bảng con trước bảng cha. Nhanh nhất: `npx prisma db push --force-reset` rồi seed lại; báo A để sửa thứ tự trong `prisma/seed.ts` |

## 8. Deploy lên cloud (tùy chọn – chỉ khi 3 API demo đã chạy ổn local)

Không kịp thì **demo local**, deploy sau. Luôn giữ bản local làm dự phòng.

**a) Chọn nơi đặt SQL Server** (API trên Vercel phải kết nối được qua Internet):
- **Azure SQL Database** – gói miễn phí (serverless, tự tạm dừng khi không dùng). Cần tài khoản Azure: *Azure for Students* (email trường) hoặc tài khoản có thẻ. Chọn vùng **Southeast Asia (Singapore)** cho gần Vercel `sin1`.
- Dịch vụ SQL Server miễn phí/dùng thử khác: phải kiểm tra **cho phép kết nối từ bên ngoài** (không chỉ từ web host của họ) và giới hạn dung lượng trước khi chọn.

**b) Cấu hình** (trưởng nhóm):
1. Tạo database `DuongSach` với collation `Vietnamese_CI_AI`.
2. Firewall: Vercel không có IP cố định → phải mở cho mọi IP (Azure: *Allow Azure services* không đủ; thêm rule `0.0.0.0 – 255.255.255.255`). Bù lại: mật khẩu mạnh, login riêng không phải `sa`, đóng rule sau đợt demo.
3. Tạo bảng + dữ liệu mẫu từ máy A (biến trong terminal được ưu tiên hơn `.env`, nên lệnh chạy vào cloud chứ không vào DB local):
   ```powershell
   $env:DATABASE_URL="sqlserver://<host>:1433;database=DuongSach;user=<login>;password=<matkhau>;encrypt=true"
   npx prisma db push
   npm run seed
   Remove-Item Env:DATABASE_URL
   ```
4. Vercel → Project → Settings → Environment Variables (Production + Preview): `DATABASE_URL` (chuỗi trên), `PUBLIC_BASE_URL=https://duong-sach-project.vercel.app`. Xóa biến cũ `DIRECT_URL`.
5. Trong bảng `WebsiteAttributes` của DB cloud: đặt `QR_BASE_URL` = `https://duong-sach-project.vercel.app`.
6. Merge `main` → Vercel build → kiểm tra `/api/health`, `/api-docs.html`.

**c) Lưu ý:** DB serverless có thể "ngủ" → request đầu tiên chậm vài giây đến vài chục giây. 30 phút trước demo gọi `/api/health` và một API bất kỳ để đánh thức.

## 9. Checklist máy demo (18:00–19:00 ngày 22/09)
1. `git switch main && git pull` → `npm install` → `npx prisma db push --force-reset` → `npm run seed` → `npm run dev`.
2. Mở sẵn: `/api-docs.html`, SSMS với 2 Database Diagram (mục 6), bảng `WebsiteAttributes` (để sửa `QR_BASE_URL` khi demo), điện thoại có app quét QR.
3. Để điện thoại mở được link QR: đặt `QR_BASE_URL` = `http://<IP-LAN-của-máy-demo>:5173` và chạy `npm run dev -- --host` (điện thoại cùng Wi-Fi), hoặc chỉ trình bày URL giải mã được từ QR.
4. Gọi thử 3 API demo một lượt. Tắt thông báo, sạc đầy máy.
