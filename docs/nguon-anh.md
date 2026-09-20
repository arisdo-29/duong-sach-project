# Nguồn ảnh

Bảng này ghi lại xuất xứ và giấy phép của ảnh trong repo. Mục đích: trước khi đưa website lên công khai, nhóm phải chứng minh được mình có quyền dùng từng tấm ảnh.

> **⚠️ Cần trưởng nhóm điền.** Cả 19 ảnh vào repo trong một commit duy nhất `dd05dfe "Update v1"` (arisdo-29, 15/09/2026) và **không kèm ghi chú nguồn nào**. Những ô ghi `cần xác nhận` bên dưới chưa được kiểm chứng — không được coi là đã có giấy phép.
>
> Nếu toàn bộ 19 ảnh do nhóm tự chụp tại Đường Sách thì thay hết cột Nguồn thành `Nhóm tự chụp`, cột Tác giả thành tên người chụp, cột Giấy phép thành `Nhóm sở hữu — toàn quyền sử dụng`.

## 1. Ảnh trong repo — `public/images/duong-sach/`

Tất cả đã nén sang WebP (cạnh dài ≤ 1600px, mỗi file ≤ 300KB) trong issue #29.

| File | Đang dùng ở | Nguồn | Tác giả | Giấy phép |
|---|---|---|---|---|
| `duong_sach.webp` | Ảnh bìa trang chủ | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-1.webp` | Thư viện ảnh "Về Đường Sách" | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-2.webp` | Thư viện ảnh "Về Đường Sách" | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-nhin-ra-nha-tho-duc-ba.webp` | Khối giới thiệu di sản | cần xác nhận | cần xác nhận | cần xác nhận |
| `cong_vao.webp` | Trải nghiệm du khách — check-in | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-5.webp` | Ảnh minh họa khối bản đồ | cần xác nhận | cần xác nhận | cần xác nhận |
| `nha_sach_thai_ha.webp` | Gian hàng A05 Thái Hà Books | cần xác nhận | cần xác nhận | cần xác nhận |
| `nha_xuat_ban_tong_hop.webp` | Gian hàng A08 NXB Tổng hợp TP.HCM | cần xác nhận | cần xác nhận | cần xác nhận |
| `cac_nha_sach.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `dong_sach_nghe_thuat_con_meo_nho.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `gian_hang.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `gian_hang_nha_nam.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `nha_xuat_ban_phu_nu.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-3.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-4.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `duong-sach-6.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `su_kien.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `su_kien_2.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |
| `su_kien_3.webp` | *chưa dùng* | cần xác nhận | cần xác nhận | cần xác nhận |

Chín ảnh đánh dấu *chưa dùng* được giữ lại để UI-01 (#30) dùng khi sắp xếp lại trang chủ.

## 2. Ảnh lấy từ đường dẫn bên ngoài

Những ảnh này **không nằm trong repo**, trang web tải thẳng từ máy chủ của bên thứ ba lúc người dùng mở trang.

| Nhóm | Nơi khai báo | Nguồn | Giấy phép |
|---|---|---|---|
| Ảnh 7 gian hàng còn lại | `stalls[].image` trong `src/data/mockData.ts` | Pexels | [Pexels License](https://www.pexels.com/license/) — dùng thương mại được, không bắt buộc ghi công |
| Trải nghiệm du khách (cà phê, thiếu nhi) | `visitorExperienceImages` | Pexels | Pexels License |
| Ảnh bìa và thư viện ảnh di sản | `heritageImages` | Pexels | Pexels License |
| Ảnh 27 di sản | `heritageSites[].image` và `.gallery` | **Nhiều nguồn khác nhau, chưa kiểm chứng** — có cả thumbnail Bing, gody.vn, bestprice.vn, galeriemichael.com | **Chưa rõ — xem cảnh báo bên dưới** |

### ⚠️ Ảnh di sản cần xử lý

27 ảnh di sản đang trỏ tới ảnh trên các website thương mại và thumbnail của công cụ tìm kiếm. Hai vấn đề:

1. **Bản quyền**: phần lớn không có giấy phép cho phép dùng lại. Đưa lên website công khai là rủi ro.
2. **Kỹ thuật**: đường dẫn của bên thứ ba có thể đổi hoặc chặn hotlink bất kỳ lúc nào, ảnh sẽ vỡ ngay giữa buổi demo.

Hướng xử lý: thay bằng ảnh từ **Wikimedia Commons** với giấy phép CC BY, CC BY-SA hoặc Public domain, tải về `public/images/di-san/<slug>/`, và ghi tác giả + giấy phép vào bảng mục 1.

Phần này **chưa làm trong issue #29** vì nội dung di sản đang do Trâm phụ trách.

## 3. Quy tắc khi thêm ảnh mới

1. Chỉ dùng ảnh nhóm tự chụp, hoặc ảnh có giấy phép cho phép dùng lại (CC BY, CC BY-SA, CC0, Public domain, Pexels/Unsplash License).
2. Nén trước khi commit — cạnh dài tối đa 1600px, mỗi file tối đa 300KB, định dạng WebP:
   ```bash
   npx --yes sharp-cli -i <file> -o public/images/duong-sach -f webp -q 82 \
       resize 1600 1600 --fit inside --withoutEnlargement
   ```
   Phải có `--fit inside`; nếu chỉ viết `resize 1600` thì sharp chỉ đặt chiều rộng, ảnh dọc sẽ không được thu nhỏ.
3. Thêm một dòng vào bảng mục 1 ngay trong cùng PR. Ảnh không có dòng trong bảng coi như chưa được duyệt.
4. Ảnh yêu cầu ghi công (CC BY, CC BY-SA) phải hiển thị tên tác giả và giấy phép ở nơi người xem thấy được, không chỉ ghi trong file này.
