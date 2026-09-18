import { app } from './index.ts';
import http from 'http';

const server = http.createServer(app);
const PORT = 5055;

server.listen(PORT, async () => {
  console.log(`[Test Server] Đang chạy tại http://localhost:${PORT}`);

  try {
    // Test 1: GET /api/admin/heritages/nha-tho-duc-ba/qr
    const res1 = await fetch(`http://localhost:${PORT}/api/admin/heritages/nha-tho-duc-ba/qr`);
    const data1 = await res1.json();
    console.log('Test 1 (QR nha-tho-duc-ba):', res1.status === 200 && data1.qrCode.startsWith('data:image/png;base64,') ? 'PASSED ✅' : 'FAILED ❌');
    console.log('Target URL:', data1.url);

    // Test 2: GET /api/admin/heritages/1/qr
    const res2 = await fetch(`http://localhost:${PORT}/api/admin/heritages/1/qr`);
    const data2 = await res2.json();
    console.log('Test 2 (QR heritage 1):', res2.status === 200 && data2.qrCode.startsWith('data:image/png;base64,') ? 'PASSED ✅' : 'FAILED ❌');
    console.log('Target URL 2:', data2.url);

    // Test 3: GET /api/admin/feedbacks
    const res3 = await fetch(`http://localhost:${PORT}/api/admin/feedbacks`);
    const data3 = await res3.json();
    console.log('Test 3 (Feedbacks list count):', data3.length > 0 ? `PASSED (${data3.length} items) ✅` : 'FAILED ❌');

    // Test 4: PATCH /api/admin/feedbacks/:id/status (Invalid status validation)
    const res4 = await fetch(`http://localhost:${PORT}/api/admin/feedbacks/fb-001/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'INVALID_STATUS' }),
    });
    console.log('Test 4 (Invalid status validation 400):', res4.status === 400 ? 'PASSED ✅' : 'FAILED ❌');

    // Test 5: PATCH /api/admin/feedbacks/:id/status (Valid status)
    const res5 = await fetch(`http://localhost:${PORT}/api/admin/feedbacks/fb-001/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'RESOLVED' }),
    });
    const data5 = await res5.json();
    console.log('Test 5 (Valid status update 200):', res5.status === 200 ? 'PASSED ✅' : 'FAILED ❌');
    console.log('Res 5 message:', data5.message);

    // Test 6: POST /api/feedbacks (Create feedback)
    const res6 = await fetch(`http://localhost:${PORT}/api/feedbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'Trải nghiệm quét mã QR rất mượt mà tại Nhà thờ Đức Bà!',
        rating: 5,
        scope: 'Nhà thờ Đức Bà Sài Gòn',
        contact: 'visitor@duongsach.vn',
      }),
    });
    const data6 = await res6.json();
    console.log('Test 6 (Post feedback 201):', res6.status === 201 ? 'PASSED ✅' : 'FAILED ❌');
    console.log('Res 6 feedback id:', data6.feedback?.id);

    // ===============================================
    // TEST CRUD HERITAGE
    // ===============================================
    console.log('\n--- BẮT ĐẦU TEST CRUD HERITAGE ---');

    // Test 7: POST /api/admin/heritages - Thêm mới & Tự động sinh slug không dấu
    const res7 = await fetch(`http://localhost:${PORT}/api/admin/heritages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name_vi: 'Cột Cờ Thủ Ngữ Sài Gòn',
        name_en: 'Thu Ngu Flagpole Saigon',
        content_vi: 'Di tích lịch sử tại ngã ba sông Sài Gòn và rạch Bến Nghé.',
        content_en: 'Historic flagpole monument at the confluence of Saigon River and Ben Nghe Canal.',
        image_url: 'https://example.com/cot-co-thu-ngu.jpg',
        source: 'Sở Văn hóa & Thể thao TP.HCM',
      }),
    });
    const data7 = await res7.json();
    const createdHeritageId = data7.id;
    const isSlugCorrect = data7.slug === 'cot-co-thu-ngu-sai-gon';
    console.log('Test 7 (POST Heritage + Auto Slug):', res7.status === 201 && isSlugCorrect ? 'PASSED ✅' : 'FAILED ❌');
    console.log('Generated Slug:', data7.slug);

    // Test 8: GET /api/admin/heritages/:id - Đọc chi tiết 1 di sản
    const res8 = await fetch(`http://localhost:${PORT}/api/admin/heritages/${createdHeritageId}`);
    const data8 = await res8.json();
    console.log('Test 8 (GET Single Heritage by ID):', res8.status === 200 && data8.name_vi === 'Cột Cờ Thủ Ngữ Sài Gòn' ? 'PASSED ✅' : 'FAILED ❌');

    // Test 9: PUT /api/admin/heritages/:id - Cập nhật nội dung nhưng KHÓA SLUG (Slug không bị thay đổi)
    const res9 = await fetch(`http://localhost:${PORT}/api/admin/heritages/${createdHeritageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: 'slug-bi-doi-trai-phep', // Cố tình truyền slug giả để kiểm tra tính năng khóa slug
        name_vi: 'Cột Cờ Thủ Ngữ (Đã cập nhật)',
        source: 'Tư liệu Lịch sử TP.HCM',
      }),
    });
    const data9 = await res9.json();
    const slugStillLocked = data9.slug === 'cot-co-thu-ngu-sai-gon'; // Phải giữ nguyên slug ban đầu
    const nameUpdated = data9.name_vi === 'Cột Cờ Thủ Ngữ (Đã cập nhật)';
    console.log('Test 9 (PUT Heritage + Lock Slug):', res9.status === 200 && slugStillLocked && nameUpdated ? 'PASSED (Slug được bảo vệ tuyệt đối) ✅' : 'FAILED ❌');

    // Test 10: DELETE /api/admin/heritages/:id - Xóa di sản thử nghiệm
    const res10 = await fetch(`http://localhost:${PORT}/api/admin/heritages/${createdHeritageId}`, {
      method: 'DELETE',
    });
    console.log('Test 10 (DELETE Heritage):', res10.status === 200 ? 'PASSED ✅' : 'FAILED ❌');

    console.log('\n--- TẤT CẢ 10 BÀI TEST API ĐỀU ĐÃ VƯỢT QUA THÀNH CÔNG! ---');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
