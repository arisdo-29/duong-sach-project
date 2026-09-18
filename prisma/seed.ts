import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang dọn dẹp dữ liệu cũ...');
  await prisma.feedback.deleteMany({});
  await prisma.heritage.deleteMany({});

  console.log('🏛️ Đang nạp dữ liệu di sản (10 di sản văn hóa - lịch sử tiêu biểu)...');

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
    const heritage = await prisma.heritage.create({
      data: item,
    });
    createdHeritages.push(heritage);
  }

  console.log(`✅ Đã tạo thành công ${createdHeritages.length} di sản.`);

  console.log('💬 Đang tạo phản hồi mẫu (Tuân thủ Privacy by design)...');

  // Lấy id của các di sản đại diện
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
        user_contact: 'dukhach@example.com', // Khách chủ động để lại email
      },
      {
        heritage_id: buuDien.id,
        rating: 5,
        content: 'Mã QR tại Bưu điện Trung tâm quét rất nhạy, âm thanh thuyết minh rõ ràng và thông tin lịch sử rất đầy đủ.',
        status: 'REVIEWED',
        user_contact: '0901234567', // Khách để lại SĐT
      },
      {
        heritage_id: dinhDocLap.id,
        rating: 4,
        content: 'Khu vực Dinh Độc Lập cuối tuần hơi đông, mong ban quản lý bố trí thêm ghế nghỉ chân dưới bóng cây.',
        status: 'RESOLVED',
        user_contact: null, // [Privacy by design] Hoàn toàn ẩn danh
      },
      {
        heritage_id: buuDien.id,
        rating: 5,
        content: 'Wonderful post office! The QR guide provided great historical context right on my smartphone without any app install.',
        status: 'RESOLVED',
        user_contact: null, // [Privacy by design] Ẩn danh
      },
      {
        heritage_id: ducBa.id,
        rating: 4,
        content: 'Đang trùng tu nhưng chụp ảnh góc ngoài vẫn rất đẹp. Cần thêm hướng dẫn vị trí quét mã ở cổng rào.',
        status: 'REVIEWED',
        user_contact: 'contact.traveler@gmail.com',
      },
    ],
  });

  console.log('✅ Đã nạp thành công 5 phản hồi mẫu (bao gồm phản hồi ẩn danh và có liên hệ).');
  console.log('🎉 Hoàn tất Seed Database!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
