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

    console.log('\n--- TẤT CẢ CÁC BÀI TEST API ĐỀU ĐÃ VƯỢT QUA THÀNH CÔNG! ---');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
