import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Dữ liệu mẫu cho toàn bộ bảng (SETUP-01, issue #5).
 * Chạy: npm run seed – xóa sạch rồi nạp lại, chạy nhiều lần vẫn ra kết quả như nhau.
 *
 * Gian hàng lấy từ src/data/mockData.ts để dữ liệu khớp với giao diện đang có.
 * Di sản giữ nguyên 10 bản ghi của seed cũ.
 */

/** Khai báo giờ Việt Nam (UTC+7) cho dễ đọc khi đặt lịch sự kiện */
function gioVN(isoKhongMuiGio: string): Date {
  return new Date(`${isoKhongMuiGio}+07:00`);
}

async function main() {
  console.log('🌱 Đang dọn dẹp dữ liệu cũ...');
  // Xóa ngược theo khóa ngoại để không vướng ràng buộc
  await prisma.proposalReviewLog.deleteMany({});
  await prisma.proposalAsset.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.eventProposal.deleteMany({});
  await prisma.asset.deleteMany({});
  await prisma.venue.deleteMany({});
  await prisma.booth.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.heritage.deleteMany({});
  await prisma.campus.deleteMany({});

  // ------------------------------------------------------------------
  // 1. Cơ sở
  // ------------------------------------------------------------------
  console.log('🏢 Đang nạp 2 cơ sở...');

  const hcm = await prisma.campus.create({
    data: {
      code: 'HCM',
      name: 'Đường Sách TP.HCM',
      address: 'Đường Nguyễn Văn Bình, Phường Bến Nghé, Quận 1, TP.HCM',
    },
  });

  const thuDuc = await prisma.campus.create({
    data: {
      code: 'THU_DUC',
      name: 'Đường Sách Thành phố Thủ Đức',
      address: 'Đường Hồ Thị Tư, Phường Hiệp Phú, TP. Thủ Đức, TP.HCM',
    },
  });

  // ------------------------------------------------------------------
  // 2. Gian hàng (nguồn: src/data/mockData.ts)
  // ------------------------------------------------------------------
  console.log('📚 Đang nạp 7 gian hàng...');

  await prisma.booth.createMany({
    data: [
      {
        name: 'NXB Trẻ',
        campusId: hcm.id,
        owner: 'Nhà xuất bản Trẻ',
        location: 'A01',
        description:
          'Nhà xuất bản hàng đầu Việt Nam với hơn 40 năm lịch sử, chuyên xuất bản sách văn học và thiếu nhi chất lượng cao.',
        bookCount: 1240,
        imageUrl:
          'https://images.pexels.com/photos/27854754/pexels-photo-27854754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        name: 'Đông Tây Book',
        campusId: hcm.id,
        owner: 'Công ty Sách Đông Tây',
        location: 'A02',
        description:
          'Chuyên cung cấp sách kinh tế, quản trị và kỹ năng mềm dành cho doanh nhân và người đi làm.',
        bookCount: 890,
        imageUrl:
          'https://images.pexels.com/photos/29614944/pexels-photo-29614944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        name: 'Alpha Books',
        campusId: hcm.id,
        owner: 'Công ty Cổ phần Sách Alpha',
        location: 'A03',
        description: 'Đầu mối cung cấp sách khoa học, công nghệ và tư duy sáng tạo cho giới trẻ.',
        bookCount: 760,
        imageUrl:
          'https://images.pexels.com/photos/3862153/pexels-photo-3862153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        name: 'NXB Kim Đồng',
        campusId: hcm.id,
        owner: 'Nhà xuất bản Kim Đồng',
        location: 'A04',
        description: 'Văn học thiếu nhi và truyện tranh quen thuộc với nhiều thế hệ độc giả Việt Nam.',
        bookCount: 1050,
        imageUrl:
          'https://images.pexels.com/photos/34750570/pexels-photo-34750570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        name: 'Thái Hà Books',
        campusId: hcm.id,
        owner: 'Công ty Sách Thái Hà',
        location: 'A05',
        description: 'Sách kỹ năng sống và truyền cảm hứng, thường xuyên tổ chức giao lưu tác giả.',
        bookCount: 680,
        imageUrl:
          'https://images.pexels.com/photos/13279386/pexels-photo-13279386.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        name: 'First News – Trí Việt',
        campusId: hcm.id,
        owner: 'Công ty Văn hóa Sáng tạo Trí Việt',
        location: 'A06',
        description: 'Sách dịch và sách khởi nghiệp, nhiều đầu sách bán chạy nhiều năm liền.',
        bookCount: 920,
        imageUrl:
          'https://images.pexels.com/photos/27854757/pexels-photo-27854757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        name: 'Phương Nam Book',
        campusId: thuDuc.id,
        owner: 'Công ty Cổ phần Văn hóa Phương Nam',
        location: 'A07',
        description: 'Hệ thống nhà sách lâu đời với kho đầu sách đa dạng nhiều lĩnh vực.',
        bookCount: 1480,
        imageUrl:
          'https://images.pexels.com/photos/8045884/pexels-photo-8045884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  });

  // ------------------------------------------------------------------
  // 3. Địa điểm tổ chức
  // ------------------------------------------------------------------
  console.log('📍 Đang nạp 3 địa điểm...');

  const sanKhauChinh = await prisma.venue.create({
    data: {
      name: 'Sân khấu chính',
      campusId: hcm.id,
      capacity: 200,
      description: 'Sân khấu ngoài trời đầu tuyến, dùng cho lễ khai mạc và giao lưu tác giả.',
    },
  });

  const khuTrienLam = await prisma.venue.create({
    data: {
      name: 'Khu triển lãm',
      campusId: hcm.id,
      capacity: 120,
      description: 'Không gian trưng bày sách quý và ảnh tư liệu.',
    },
  });

  const khuThieuNhi = await prisma.venue.create({
    data: {
      name: 'Khu vui chơi thiếu nhi',
      campusId: thuDuc.id,
      capacity: 80,
      description: 'Khu hoạt động dành cho thiếu nhi và phụ huynh vào cuối tuần.',
    },
  });

  // ------------------------------------------------------------------
  // 4. Thiết bị
  // ------------------------------------------------------------------
  console.log('🔊 Đang nạp 5 thiết bị...');

  const loaKeo = await prisma.asset.create({
    data: {
      name: 'Loa kéo',
      totalQuantity: 4,
      unit: 'cái',
      description: 'Loa di động kèm micro không dây.',
    },
  });

  const micKhongDay = await prisma.asset.create({
    data: { name: 'Micro không dây', totalQuantity: 8, unit: 'cái' },
  });

  const banGap = await prisma.asset.create({
    data: {
      name: 'Bàn gấp',
      totalQuantity: 20,
      unit: 'cái',
      description: 'Bàn nhựa gấp gọn cho gian hàng và khu ký tặng.',
    },
  });

  await prisma.asset.create({
    data: { name: 'Ghế nhựa', totalQuantity: 150, unit: 'cái' },
  });

  const mayChieu = await prisma.asset.create({
    data: {
      name: 'Máy chiếu',
      totalQuantity: 2,
      unit: 'cái',
      description: 'Kèm màn chiếu 100 inch.',
    },
  });

  // ------------------------------------------------------------------
  // 5. Hồ sơ đề xuất – đủ 4 trạng thái, có 1 hồ sơ trùng lịch cố ý
  // ------------------------------------------------------------------
  console.log('📝 Đang nạp 4 hồ sơ đề xuất...');

  const hoSoDaDuyet = await prisma.eventProposal.create({
    data: {
      title: 'Giao lưu tác giả: Sài Gòn một thuở',
      organizerName: 'CLB Đọc sách FPT',
      organizerContact: 'clbdocsach@fpt.edu.vn',
      description: 'Buổi trò chuyện cùng tác giả về ký ức đô thị Sài Gòn, có phần ký tặng sách.',
      startTime: gioVN('2026-09-27T09:00:00'),
      endTime: gioVN('2026-09-27T11:00:00'),
      venueId: sanKhauChinh.id,
      expectedAttendees: 150,
      status: 'APPROVED',
      reviewNote: 'Hồ sơ đầy đủ, đồng ý tổ chức.',
      reviewedAt: gioVN('2026-09-18T10:00:00'),
      assets: {
        create: [
          { assetId: loaKeo.id, quantity: 2 },
          { assetId: micKhongDay.id, quantity: 3 },
        ],
      },
      reviewLogs: {
        create: [
          {
            action: 'APPROVE',
            fromStatus: 'PENDING',
            toStatus: 'APPROVED',
            note: 'Hồ sơ đầy đủ, đồng ý tổ chức.',
          },
        ],
      },
    },
  });

  // Hồ sơ này TRÙNG LỊCH với hồ sơ đã duyệt ở trên (cùng Sân khấu chính, giờ chồng nhau)
  // để có dữ liệu demo cảnh báo trùng lịch của FR-12.
  await prisma.eventProposal.create({
    data: {
      title: 'Workshop làm sách tranh cho thiếu nhi',
      organizerName: 'Nhóm Minh họa Trẻ',
      organizerContact: '0912345678',
      description: 'Hướng dẫn thiếu nhi tự làm một cuốn sách tranh nhỏ trong 90 phút.',
      startTime: gioVN('2026-09-27T10:00:00'),
      endTime: gioVN('2026-09-27T12:00:00'),
      venueId: sanKhauChinh.id,
      expectedAttendees: 60,
      status: 'PENDING',
      assets: {
        create: [
          { assetId: banGap.id, quantity: 10 },
          { assetId: loaKeo.id, quantity: 1 },
        ],
      },
    },
  });

  await prisma.eventProposal.create({
    data: {
      title: 'Triển lãm ảnh: Đường Sách 10 năm',
      organizerName: 'Hội Nhiếp ảnh TP.HCM',
      organizerContact: 'hoinhiepanh@example.org',
      description: 'Trưng bày 60 bức ảnh tư liệu về Đường Sách từ ngày thành lập.',
      startTime: gioVN('2026-10-05T08:00:00'),
      endTime: gioVN('2026-10-05T17:00:00'),
      venueId: khuTrienLam.id,
      expectedAttendees: 300,
      status: 'NEEDS_SUPPLEMENT',
      reviewNote: 'Bổ sung danh sách ảnh trưng bày và phương án treo ảnh chống mưa.',
      reviewedAt: gioVN('2026-09-19T14:20:00'),
      assets: { create: [{ assetId: mayChieu.id, quantity: 1 }] },
      reviewLogs: {
        create: [
          {
            action: 'REQUEST_SUPPLEMENT',
            fromStatus: 'PENDING',
            toStatus: 'NEEDS_SUPPLEMENT',
            note: 'Bổ sung danh sách ảnh trưng bày và phương án treo ảnh chống mưa.',
          },
        ],
      },
    },
  });

  await prisma.eventProposal.create({
    data: {
      title: 'Hội chợ đồ cũ cuối tuần',
      organizerName: 'Nhóm Chợ Phiên',
      organizerContact: 'chophien@example.com',
      description: 'Gian hàng trao đổi đồ cũ kèm khu ẩm thực.',
      startTime: gioVN('2026-10-11T07:00:00'),
      endTime: gioVN('2026-10-11T18:00:00'),
      venueId: khuThieuNhi.id,
      expectedAttendees: 500,
      status: 'REJECTED',
      reviewNote: 'Nội dung chưa phù hợp định hướng văn hóa đọc của Đường Sách.',
      reviewedAt: gioVN('2026-09-19T15:00:00'),
      reviewLogs: {
        create: [
          {
            action: 'REJECT',
            fromStatus: 'PENDING',
            toStatus: 'REJECTED',
            note: 'Nội dung chưa phù hợp định hướng văn hóa đọc của Đường Sách.',
          },
        ],
      },
    },
  });

  // ------------------------------------------------------------------
  // 6. Sự kiện – đủ 3 mức quan trọng
  // ------------------------------------------------------------------
  console.log('🎪 Đang nạp 3 sự kiện...');

  await prisma.event.create({
    data: {
      name: 'Giao lưu tác giả: Sài Gòn một thuở',
      startTime: gioVN('2026-09-27T09:00:00'),
      endTime: gioVN('2026-09-27T11:00:00'),
      venueId: sanKhauChinh.id,
      description: 'Sinh ra từ hồ sơ đề xuất đã được duyệt.',
      importance: 'KEY',
      proposalId: hoSoDaDuyet.id,
    },
  });

  await prisma.event.create({
    data: {
      name: 'Tuần lễ sách thiếu nhi',
      startTime: gioVN('2026-10-01T08:00:00'),
      endTime: gioVN('2026-10-07T20:00:00'),
      venueId: khuThieuNhi.id,
      description: 'Chuỗi hoạt động đọc sách và kể chuyện dành cho thiếu nhi.',
      importance: 'PRIORITY',
    },
  });

  await prisma.event.create({
    data: {
      name: 'Đọc sách cùng nhau sáng Chủ nhật',
      startTime: gioVN('2026-10-04T08:00:00'),
      endTime: gioVN('2026-10-04T10:00:00'),
      venueId: khuTrienLam.id,
      description: 'Hoạt động đọc sách chung định kỳ hằng tuần.',
      importance: 'NORMAL',
    },
  });

  // ------------------------------------------------------------------
  // 7. Di sản (giữ nguyên 10 bản ghi của seed cũ)
  // ------------------------------------------------------------------
  console.log('🏛️ Đang nạp 10 di sản văn hóa - lịch sử tiêu biểu...');

  const heritagesData = [
    {
      slug: 'buu-dien-trung-tam-sai-gon',
      name_vi: 'Bưu điện Trung tâm Sài Gòn',
      name_en: 'Saigon Central Post Office',
      content_vi: 'Được xây dựng từ năm 1886 đến 1891 theo đồ án của kiến trúc sư Alfred Foulhoux và thiết kế kết cấu vòm kim loại của Gustave Eiffel. Công trình mang phong cách Phục Hưng kết hợp hài hòa với các hoa văn trang trí Đông Dương, nằm ngay đầu Đường Sách Nguyễn Văn Bình.',
      content_en: 'Constructed between 1886 and 1891 based on designs by architect Alfred Foulhoux with metallic vaulted roofs engineered by Gustave Eiffel. The building features Renaissance Revival architecture seamlessly blended with Indochinese motifs, located right at the head of Nguyen Van Binh Book Street.',
      image_url: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
      source: 'Cổng thông tin Điện tử Sở Du lịch TP.HCM & Trung tâm Bảo tồn Di tích',
    },
    {
      slug: 'nha-tho-duc-ba',
      name_vi: 'Nhà thờ Đức Bà Sài Gòn',
      name_en: 'Notre-Dame Cathedral Basilica of Saigon',
      content_vi: 'Nhà thờ chính tòa Đức Bà Sài Gòn là một kiệt tác kiến trúc cổ kính với toàn bộ gạch xây dựng được nhập khẩu từ Marseille (Pháp). Công trình khởi công năm 1877 và khánh thành năm 1880, là biểu tượng tôn giáo và lịch sử tiêu biểu của thành phố.',
      content_en: 'The Cathedral Basilica of Our Lady of The Immaculate Conception is an architectural masterpiece built with red bricks imported directly from Marseille, France. Commenced in 1877 and completed in 1880, it stands as a celebrated religious and historical icon of the city.',
      image_url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
      source: 'Hồ sơ Di tích Kiến trúc Nghệ thuật TP.HCM',
    },
    {
      slug: 'dinh-doc-lap',
      name_vi: 'Dinh Độc Lập',
      name_en: 'Independence Palace',
      content_vi: 'Di tích quốc gia đặc biệt ghi dấu mốc son lịch sử ngày 30/4/1975 thống nhất đất nước. Công trình do Kiến trúc sư Ngô Viết Thụ thiết kế, kết hợp hài hòa giữa kiến trúc hiện đại phương Tây và thuật phong thủy, triết lý phương Đông.',
      content_en: 'A special national historic monument marking the milestone of national reunification on April 30, 1975. Designed by acclaimed architect Ngo Viet Thu, it harmonizes Western modernist architecture with Eastern traditional philosophy and feng shui principles.',
      image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      source: 'Ban Quản lý Khu Di tích Lịch sử Dinh Độc Lập',
    },
    {
      slug: 'ben-nha-rong',
      name_vi: 'Bến Nhà Rồng - Bảo tàng Hồ Chí Minh',
      name_en: 'Nha Rong Wharf - Ho Chi Minh Museum',
      content_vi: 'Tòa nhà ban đầu là trụ sở của Công ty Vận tải Hoàng gia Pháp (Messageries Impériales), xây dựng từ năm 1863. Đây là nơi người thanh niên Nguyễn Tất Thành lên con tàu Amiral Latouche-Tréville ra đi tìm đường cứu nước vào ngày 5/6/1911.',
      content_en: 'Originally built in 1863 as the headquarters of the Messageries Impériales shipping company. This historic wharf is where young Nguyen Tat Thanh embarked on the vessel Amiral Latouche-Treville on June 5, 1911, setting off on his journey for national salvation.',
      image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      source: 'Bảo tàng Hồ Chí Minh - Chi nhánh TP.HCM',
    },
    {
      slug: 'bao-tang-thanh-pho-ho-chi-minh',
      name_vi: 'Bảo tàng Thành phố Hồ Chí Minh',
      name_en: 'Ho Chi Minh City Museum',
      content_vi: 'Tọa lạc tại số 65 Lý Tự Trọng, công trình nguyên là Dinh Gia Long, được xây dựng từ năm 1885 đến 1890 theo phong cách kiến trúc Tân Cổ Điển Pháp bởi kiến trúc sư Alfred Foulhoux.',
      content_en: 'Located at 65 Ly Tu Trong Street, formerly known as Gia Long Palace, built between 1885 and 1890 in French Neoclassical style by architect Alfred Foulhoux.',
      image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      source: 'Sở Văn hóa và Thể thao TP.HCM',
    },
    {
      slug: 'bao-tang-lich-su-tphcm',
      name_vi: 'Bảo tàng Lịch sử TP.HCM',
      name_en: 'Ho Chi Minh City History Museum',
      content_vi: 'Được thành lập năm 1929, ban đầu có tên là Bảo tàng Blanchard de la Brosse, mang phong cách kiến trúc "Đông Dương cách tân" với mái ngói cổ truyền nhiều tầng độc đáo trong khuôn viên Thảo Cầm Viên.',
      content_en: 'Established in 1929 originally as the Blanchard de la Brosse Museum, showcasing innovative Indochine architecture with multi-tiered traditional tiled roofs located inside the Botanical Gardens.',
      image_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      source: 'Bảo tàng Lịch sử TP.HCM',
    },
    {
      slug: 'nha-hat-thanh-pho',
      name_vi: 'Nhà hát Thành phố',
      name_en: 'Municipal Theatre (Saigon Opera House)',
      content_vi: 'Khánh thành vào năm 1900 mang phong cách Flamboyant Gothic và Phục Hưng Pháp, nhà hát là trung tâm biểu diễn nghệ thuật danh tiếng bậc nhất miền Nam.',
      content_en: 'Inaugurated in 1900 featuring Flamboyant Gothic and French Renaissance architectural traits, serving as the premier performing arts venue of the city.',
      image_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      source: 'Nhà hát Giao hưởng Nhạc Vũ kịch TP.HCM',
    },
    {
      slug: 'cho-ben-thanh',
      name_vi: 'Chợ Bến Thành',
      name_en: 'Ben Thanh Market',
      content_vi: 'Khởi công xây dựng từ năm 1912 và hoàn thành năm 1914. Tháp đồng hồ ở cửa Nam của chợ là một trong những hình ảnh đặc trưng gắn liền với lịch sử thương mại của Sài Gòn.',
      content_en: 'Constructed between 1912 and 1914. The prominent clock tower at the South gate is an unmistakable icon intimately woven into Saigon’s commercial heritage.',
      image_url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      source: 'Hồ sơ Địa danh Lịch sử UBND Quận 1',
    },
    {
      slug: 'tru-so-ubnd-thanh-pho',
      name_vi: 'Trụ sở HĐND - UBND Thành phố',
      name_en: 'Ho Chi Minh City Hall',
      content_vi: 'Được xây dựng từ năm 1898 đến 1909 do kiến trúc sư Femand Gardès thiết kế mô phỏng theo kiểu tòa thị chính ở Paris với tháp chuông nhọn và tượng điêu khắc tinh xảo.',
      content_en: 'Built from 1898 to 1909, designed by French architect Fernand Gardes modeled after the City Hall of Paris, characterized by an ornate central bell tower and delicate sculptures.',
      image_url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      source: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia - Bộ VHTT&DL',
    },
    {
      slug: 'bao-tang-my-thuat-tphcm',
      name_vi: 'Bảo tàng Mỹ thuật TP.HCM',
      name_en: 'Ho Chi Minh City Museum of Fine Arts',
      content_vi: 'Tòa nhà nguyên là dinh thự tráng lệ của doanh nhân Hứa Bổn Hòa (Chú Hỏa), kết hợp hài hòa giữa trường phái mỹ thuật Baroque châu Âu và kiến trúc cung đình phương Đông.',
      content_en: 'Formerly the palatial residence of prominent merchant Hui Bon Hoa (Uncle Hoa), gracefully blending European Baroque architecture with Eastern imperial decorative elements.',
      image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      source: 'Bảo tàng Mỹ thuật TP.HCM',
    },
  ];

  const createdHeritages = [];
  for (const item of heritagesData) {
    createdHeritages.push(await prisma.heritage.create({ data: item }));
  }

  // ------------------------------------------------------------------
  // 8. Góp ý – đủ 3 trạng thái, có góp ý toàn khu vực và góp ý ẩn danh
  // ------------------------------------------------------------------
  console.log('💬 Đang nạp 6 góp ý (privacy by design)...');

  const buuDien = createdHeritages.find((h) => h.slug === 'buu-dien-trung-tam-sai-gon')!;
  const ducBa = createdHeritages.find((h) => h.slug === 'nha-tho-duc-ba')!;
  const dinhDocLap = createdHeritages.find((h) => h.slug === 'dinh-doc-lap')!;

  await prisma.feedback.createMany({
    data: [
      {
        heritage_id: ducBa.id,
        rating: 5,
        content: 'Không gian Nhà thờ Đức Bà rất ấn tượng, bảng thuyết minh song ngữ quét mã QR nhanh!',
        status: 'PENDING',
        user_contact: 'dukhach@example.com', // khách chủ động để lại email
      },
      {
        heritage_id: buuDien.id,
        rating: 5,
        content: 'Mã QR tại Bưu điện Trung tâm quét rất nhạy, thông tin lịch sử đầy đủ.',
        status: 'REVIEWED',
        user_contact: '0901234567', // khách để lại số điện thoại
      },
      {
        heritage_id: dinhDocLap.id,
        rating: 4,
        content: 'Khu vực Dinh Độc Lập cuối tuần hơi đông, mong bố trí thêm ghế nghỉ chân dưới bóng cây.',
        status: 'RESOLVED',
        user_contact: null, // privacy by design: hoàn toàn ẩn danh
      },
      {
        heritage_id: buuDien.id,
        rating: 5,
        content: 'Wonderful post office! The QR guide provided great historical context without any app install.',
        status: 'RESOLVED',
        user_contact: null,
      },
      {
        heritage_id: ducBa.id,
        rating: 4,
        content: 'Đang trùng tu nhưng góc chụp ngoài vẫn rất đẹp. Cần thêm hướng dẫn vị trí quét mã ở cổng rào.',
        status: 'REVIEWED',
        user_contact: 'contact.traveler@gmail.com',
      },
      {
        // heritage_id null = góp ý cho toàn Đường Sách, không gắn di sản nào
        heritage_id: null,
        rating: 3,
        content: 'Buổi trưa thiếu chỗ ngồi có mái che, mong ban quản lý bổ sung thêm dù và ghế.',
        status: 'PENDING',
        user_contact: null,
      },
    ],
  });

  console.log('🎉 Hoàn tất nạp dữ liệu mẫu!');
  console.log('   2 cơ sở · 7 gian hàng · 3 địa điểm · 5 thiết bị');
  console.log('   4 hồ sơ đề xuất (1 hồ sơ trùng lịch) · 3 sự kiện · 10 di sản · 6 góp ý');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
