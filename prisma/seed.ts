import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../server/core/slug.js';
import { heritageSites } from '../src/data/mockData.js';

const prisma = new PrismaClient();

/**
 * Dữ liệu mẫu cho schema mới theo khuôn mentor (DB-02, issue #42).
 * Chạy: npm run seed – xóa sạch rồi nạp lại, chạy nhiều lần vẫn ra kết quả như nhau.
 *
 * Gian hàng & di sản giữ nguyên nội dung của seed cũ (di sản giữ nguyên slug – đã có QR).
 */

/** Khai báo giờ Việt Nam (UTC+7) cho dễ đọc khi đặt lịch sự kiện/hồ sơ */
function gioVN(isoKhongMuiGio: string): Date {
  return new Date(`${isoKhongMuiGio}+07:00`);
}

async function main() {
  console.log('🌱 Đang dọn dẹp dữ liệu cũ...');
  // Xóa con trước cha để không vướng ràng buộc (schema mới không có cascade)
  await prisma.feedback.deleteMany({});
  await prisma.proposalItem.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.proposal.deleteMany({});
  await prisma.itemPictureMapping.deleteMany({});
  await prisma.itemAttributeMapping.deleteMany({});
  await prisma.picture.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.asset.deleteMany({});
  await prisma.venue.deleteMany({});
  await prisma.itemAttribute.deleteMany({});
  await prisma.itemCategory.deleteMany({});
  await prisma.websiteAttribute.deleteMany({});
  await prisma.campus.deleteMany({});

  // ------------------------------------------------------------------
  // 1. Cơ sở
  // ------------------------------------------------------------------
  console.log('🏢 Đang nạp 2 cơ sở...');

  const hcm = await prisma.campus.create({
    data: {
      Code: 'HCM',
      Name: 'Đường Sách TP.HCM',
      Address: 'Đường Nguyễn Văn Bình, Phường Bến Nghé, Quận 1, TP.HCM',
    },
  });

  const thuDuc = await prisma.campus.create({
    data: {
      Code: 'THU_DUC',
      Name: 'Đường Sách Thành phố Thủ Đức',
      Address: 'Đường Hồ Thị Tư, Phường Hiệp Phú, TP. Thủ Đức, TP.HCM',
    },
  });

  // ------------------------------------------------------------------
  // 2. Loại nội dung (ItemCategories)
  // ------------------------------------------------------------------
  console.log('🏷️ Đang nạp 4 loại nội dung...');

  const [catDiSan, catGianHang, catTienIch, catGioiThieu] = await Promise.all([
    prisma.itemCategory.create({
      data: { Slug: 'di-san', Name: 'Di sản văn hóa - lịch sử', NameEng: 'Heritage sites' },
    }),
    prisma.itemCategory.create({
      data: { Slug: 'gian-hang', Name: 'Gian hàng', NameEng: 'Book stalls' },
    }),
    prisma.itemCategory.create({
      data: { Slug: 'tien-ich', Name: 'Tiện ích', NameEng: 'Amenities' },
    }),
    prisma.itemCategory.create({
      data: { Slug: 'gioi-thieu', Name: 'Giới thiệu', NameEng: 'About' },
    }),
  ]);

  // ------------------------------------------------------------------
  // 3. Thuộc tính động (ItemAttributes)
  // ------------------------------------------------------------------
  console.log('🧩 Đang nạp 7 thuộc tính động...');

  const [attrSource, attrOwner, attrLocation, attrTopic, attrBookCount, attrLat, attrLng] =
    await Promise.all([
      prisma.itemAttribute.create({
        data: {
          Code: 'SOURCE',
          Name: 'Nguồn tư liệu',
          NameEng: 'Source',
          ControlType: 'text',
          ItemCategoryId: catDiSan.Id,
        },
      }),
      prisma.itemAttribute.create({
        data: {
          Code: 'OWNER',
          Name: 'Đơn vị sở hữu',
          NameEng: 'Owner',
          ControlType: 'text',
          ItemCategoryId: catGianHang.Id,
        },
      }),
      prisma.itemAttribute.create({
        data: {
          Code: 'LOCATION',
          Name: 'Vị trí',
          NameEng: 'Location',
          ControlType: 'text',
          ItemCategoryId: catGianHang.Id,
        },
      }),
      prisma.itemAttribute.create({
        data: {
          Code: 'TOPIC',
          Name: 'Chủ đề',
          NameEng: 'Topic',
          ControlType: 'text',
          ItemCategoryId: catGianHang.Id,
        },
      }),
      prisma.itemAttribute.create({
        data: {
          Code: 'BOOK_TITLE_COUNT',
          Name: 'Số đầu sách',
          NameEng: 'Book title count',
          ControlType: 'number',
          ItemCategoryId: catGianHang.Id,
        },
      }),
      prisma.itemAttribute.create({
        data: {
          Code: 'LAT',
          Name: 'Vĩ độ',
          NameEng: 'Latitude',
          ControlType: 'number',
          ItemCategoryId: catTienIch.Id,
        },
      }),
      prisma.itemAttribute.create({
        data: {
          Code: 'LNG',
          Name: 'Kinh độ',
          NameEng: 'Longitude',
          ControlType: 'number',
          ItemCategoryId: catTienIch.Id,
        },
      }),
    ]);
  void attrLat;
  void attrLng;

  // ------------------------------------------------------------------
  // 4. Cấu hình chung (WebsiteAttributes)
  // ------------------------------------------------------------------
  console.log('⚙️ Đang nạp cấu hình chung...');

  await prisma.websiteAttribute.createMany({
    data: [
      {
        Name: 'QR_BASE_URL',
        Type: 'qr',
        ControlType: 'text',
        Value: 'http://localhost:5173',
        IsPublic: false,
        Description: 'Domain dùng để sinh URL QR di sản (<domain>/di-san/<slug>).',
      },
      {
        Name: 'OPENING_HOURS',
        Type: 'contact',
        ControlType: 'text',
        Value: '7:00 - 22:00 hằng ngày',
        IsPublic: true,
        Description: 'Giờ mở cửa Đường Sách, hiển thị công khai.',
      },
      {
        Name: 'HOTLINE',
        Type: 'contact',
        ControlType: 'text',
        Value: '028 3822 3959',
        IsPublic: true,
        Description: 'Số hotline liên hệ Ban quản lý, hiển thị công khai.',
      },
      {
        Name: 'PROPOSAL_MAX_PER_EMAIL_PER_DAY',
        Type: 'proposal',
        ControlType: 'number',
        Value: '',
        IsPublic: false,
        Description: 'Giới hạn số hồ sơ nộp mỗi email/ngày. Rỗng = chưa giới hạn.',
      },
      {
        Name: 'PROPOSAL_MAX_PER_IP_PER_DAY',
        Type: 'proposal',
        ControlType: 'number',
        Value: '',
        IsPublic: false,
        Description: 'Giới hạn số hồ sơ nộp mỗi IP/ngày. Rỗng = chưa giới hạn.',
      },
      {
        Name: 'PROPOSAL_MAX_ATTENDEES_CA_NHAN',
        Type: 'proposal',
        ControlType: 'number',
        Value: '',
        IsPublic: false,
        Description: 'Giới hạn số người tham dự tối đa với hồ sơ cá nhân. Rỗng = chưa giới hạn.',
      },
    ],
  });

  // ------------------------------------------------------------------
  // 5. Di sản (27 bản ghi, nguồn: src/data/mockData.ts – giữ nguyên slug cũ
  //    của 10 di sản đầu vì QR đã in; giữ đúng thứ tự 1→27 của mockData qua DisplayOrder)
  // ------------------------------------------------------------------
  console.log(`🏛️ Đang nạp ${heritageSites.length} di sản văn hóa - lịch sử...`);

  // 10 di sản đầu đã có bản content_en viết tay từ seed gốc – giữ nguyên khi seed lại.
  // 17 di sản còn lại (11–27) chưa có bản dịch tiếng Anh: để trống, FE tự fallback về content_vi.
  const contentEngBySlug: Record<string, string> = {
    'buu-dien-trung-tam-sai-gon':
      'Constructed between 1886 and 1891 based on designs by architect Alfred Foulhoux with metallic vaulted roofs engineered by Gustave Eiffel. The building features Renaissance Revival architecture seamlessly blended with Indochinese motifs, located right at the head of Nguyen Van Binh Book Street.',
    'nha-tho-duc-ba':
      'The Cathedral Basilica of Our Lady of The Immaculate Conception is an architectural masterpiece built with red bricks imported directly from Marseille, France. Commenced in 1877 and completed in 1880, it stands as a celebrated religious and historical icon of the city.',
    'dinh-doc-lap':
      'A special national historic monument marking the milestone of national reunification on April 30, 1975. Designed by acclaimed architect Ngo Viet Thu, it harmonizes Western modernist architecture with Eastern traditional philosophy and feng shui principles.',
    'ben-nha-rong':
      'Originally built in 1863 as the headquarters of the Messageries Impériales shipping company. This historic wharf is where young Nguyen Tat Thanh embarked on the vessel Amiral Latouche-Treville on June 5, 1911, setting off on his journey for national salvation.',
    'bao-tang-thanh-pho-ho-chi-minh':
      'Located at 65 Ly Tu Trong Street, formerly known as Gia Long Palace, built between 1885 and 1890 in French Neoclassical style by architect Alfred Foulhoux.',
    'bao-tang-lich-su-tphcm':
      'Established in 1929 originally as the Blanchard de la Brosse Museum, showcasing innovative Indochine architecture with multi-tiered traditional tiled roofs located inside the Botanical Gardens.',
    'nha-hat-thanh-pho':
      'Inaugurated in 1900 featuring Flamboyant Gothic and French Renaissance architectural traits, serving as the premier performing arts venue of the city.',
    'cho-ben-thanh':
      'Constructed between 1912 and 1914. The prominent clock tower at the South gate is an unmistakable icon intimately woven into Saigon’s commercial heritage.',
    'tru-so-ubnd-thanh-pho':
      'Built from 1898 to 1909, designed by French architect Fernand Gardes modeled after the City Hall of Paris, characterized by an ornate central bell tower and delicate sculptures.',
    'bao-tang-my-thuat-tphcm':
      'Formerly the palatial residence of prominent merchant Hui Bon Hoa (Uncle Hoa), gracefully blending European Baroque architecture with Eastern imperial decorative elements.',
  };

  const createdHeritages: Record<string, Awaited<ReturnType<typeof prisma.item.create>>> = {};
  for (const [index, site] of heritageSites.entries()) {
    const item = await prisma.item.create({
      data: {
        ItemCategoryId: catDiSan.Id,
        CampusId: hcm.Id,
        Name: site.nameVi,
        NameEng: site.nameEn,
        Content: `<p>${site.summary}</p><p>${site.value}</p><p>${site.highlight}</p>`,
        ContentEng: contentEngBySlug[site.slug] ?? '',
        Slug: site.slug,
        DisplayOrder: index,
        AttributeMappings: {
          create: [{ ItemAttributeId: attrSource.Id, Value: site.sourceUrl }],
        },
        PictureMappings: {
          create: [
            {
              IsMainPicture: true,
              DisplayOrder: 0,
              Picture: { create: { Url: site.image } },
            },
          ],
        },
      },
    });
    createdHeritages[site.slug] = item;
  }

  // ------------------------------------------------------------------
  // 6. Gian hàng (7 bản ghi, nguồn: seed cũ / src/data/mockData.ts)
  // ------------------------------------------------------------------
  console.log('📚 Đang nạp 7 gian hàng...');

  const boothsData = [
    {
      name: 'NXB Trẻ',
      campus: hcm,
      owner: 'Nhà xuất bản Trẻ',
      location: 'A01',
      topic: 'Văn học, thiếu nhi',
      description:
        'Nhà xuất bản hàng đầu Việt Nam với hơn 40 năm lịch sử, chuyên xuất bản sách văn học và thiếu nhi chất lượng cao.',
      bookCount: 1240,
      imageUrl:
        'https://images.pexels.com/photos/27854754/pexels-photo-27854754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      name: 'Đông Tây Book',
      campus: hcm,
      owner: 'Công ty Sách Đông Tây',
      location: 'A02',
      topic: 'Kinh tế, quản trị, kỹ năng',
      description:
        'Chuyên cung cấp sách kinh tế, quản trị và kỹ năng mềm dành cho doanh nhân và người đi làm.',
      bookCount: 890,
      imageUrl:
        'https://images.pexels.com/photos/29614944/pexels-photo-29614944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      name: 'Alpha Books',
      campus: hcm,
      owner: 'Công ty Cổ phần Sách Alpha',
      location: 'A03',
      topic: 'Khoa học, công nghệ',
      description: 'Đầu mối cung cấp sách khoa học, công nghệ và tư duy sáng tạo cho giới trẻ.',
      bookCount: 760,
      imageUrl:
        'https://images.pexels.com/photos/3862153/pexels-photo-3862153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      name: 'NXB Kim Đồng',
      campus: hcm,
      owner: 'Nhà xuất bản Kim Đồng',
      location: 'A04',
      topic: 'Thiếu nhi, truyện tranh',
      description: 'Văn học thiếu nhi và truyện tranh quen thuộc với nhiều thế hệ độc giả Việt Nam.',
      bookCount: 1050,
      imageUrl:
        'https://images.pexels.com/photos/34750570/pexels-photo-34750570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      name: 'Thái Hà Books',
      campus: hcm,
      owner: 'Công ty Sách Thái Hà',
      location: 'A05',
      topic: 'Kỹ năng sống, truyền cảm hứng',
      description: 'Sách kỹ năng sống và truyền cảm hứng, thường xuyên tổ chức giao lưu tác giả.',
      bookCount: 680,
      imageUrl:
        'https://images.pexels.com/photos/13279386/pexels-photo-13279386.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      name: 'First News – Trí Việt',
      campus: hcm,
      owner: 'Công ty Văn hóa Sáng tạo Trí Việt',
      location: 'A06',
      topic: 'Sách dịch, khởi nghiệp',
      description: 'Sách dịch và sách khởi nghiệp, nhiều đầu sách bán chạy nhiều năm liền.',
      bookCount: 920,
      imageUrl:
        'https://images.pexels.com/photos/27854757/pexels-photo-27854757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      name: 'Phương Nam Book',
      campus: thuDuc,
      owner: 'Công ty Cổ phần Văn hóa Phương Nam',
      location: 'A07',
      topic: 'Tổng hợp nhiều lĩnh vực',
      description: 'Hệ thống nhà sách lâu đời với kho đầu sách đa dạng nhiều lĩnh vực.',
      bookCount: 1480,
      imageUrl:
        'https://images.pexels.com/photos/8045884/pexels-photo-8045884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
  ];

  for (const [index, b] of boothsData.entries()) {
    await prisma.item.create({
      data: {
        ItemCategoryId: catGianHang.Id,
        CampusId: b.campus.Id,
        Name: b.name,
        NameEng: b.name,
        Description: b.description,
        Slug: generateSlug(b.name),
        DisplayOrder: index,
        AttributeMappings: {
          create: [
            { ItemAttributeId: attrOwner.Id, Value: b.owner },
            { ItemAttributeId: attrLocation.Id, Value: b.location },
            { ItemAttributeId: attrTopic.Id, Value: b.topic },
            { ItemAttributeId: attrBookCount.Id, Value: String(b.bookCount) },
          ],
        },
        PictureMappings: {
          create: [
            {
              IsMainPicture: true,
              DisplayOrder: 0,
              Picture: { create: { Url: b.imageUrl } },
            },
          ],
        },
      },
    });
  }

  // ------------------------------------------------------------------
  // 7. Địa điểm tổ chức
  // ------------------------------------------------------------------
  console.log('📍 Đang nạp 3 địa điểm...');

  const sanKhauChinh = await prisma.venue.create({
    data: {
      Name: 'Sân khấu chính',
      CampusId: hcm.Id,
      Capacity: 200,
      Description: 'Sân khấu ngoài trời đầu tuyến, dùng cho lễ khai mạc và giao lưu tác giả.',
    },
  });

  const khuTrienLam = await prisma.venue.create({
    data: {
      Name: 'Khu triển lãm',
      CampusId: hcm.Id,
      Capacity: 120,
      Description: 'Không gian trưng bày sách quý và ảnh tư liệu.',
    },
  });

  const khuThieuNhi = await prisma.venue.create({
    data: {
      Name: 'Khu vui chơi thiếu nhi',
      CampusId: thuDuc.Id,
      Capacity: 80,
      Description: 'Khu hoạt động dành cho thiếu nhi và phụ huynh vào cuối tuần.',
    },
  });

  // ------------------------------------------------------------------
  // 8. Thiết bị
  // ------------------------------------------------------------------
  console.log('🔊 Đang nạp 5 thiết bị...');

  const loaKeo = await prisma.asset.create({
    data: { Name: 'Loa kéo', TotalQuantity: 4, Unit: 'cái', Description: 'Loa di động kèm micro không dây.' },
  });

  const micKhongDay = await prisma.asset.create({
    data: { Name: 'Micro không dây', TotalQuantity: 8, Unit: 'cái' },
  });

  const banGap = await prisma.asset.create({
    data: {
      Name: 'Bàn gấp',
      TotalQuantity: 20,
      Unit: 'cái',
      Description: 'Bàn nhựa gấp gọn cho gian hàng và khu ký tặng.',
    },
  });

  await prisma.asset.create({
    data: { Name: 'Ghế nhựa', TotalQuantity: 150, Unit: 'cái' },
  });

  const mayChieu = await prisma.asset.create({
    data: { Name: 'Máy chiếu', TotalQuantity: 2, Unit: 'cái', Description: 'Kèm màn chiếu 100 inch.' },
  });

  // ------------------------------------------------------------------
  // 9. Hồ sơ đề xuất – 5 bản ghi, đủ 4 loại đơn vị + đủ trạng thái
  // ------------------------------------------------------------------
  console.log('📝 Đang nạp 5 hồ sơ đề xuất...');

  // Hồ sơ đã duyệt – sẽ sinh ra sự kiện KEY bên dưới
  const hoSoDaDuyet = await prisma.proposal.create({
    data: {
      Code: 'HS-260922-0001',
      OrganizerType: 'doanh-nghiep',
      OrganizerName: 'Công ty TNHH Văn hóa Sài Gòn Xưa',
      RepresentativeName: 'Nguyễn Thị Mai',
      Email: 'mai.nguyen@saigonxua.example.com',
      Phone: '0909111222',
      TaxCode: '0312345678',
      Title: 'Giao lưu tác giả: Sài Gòn một thuở',
      Description: '<p>Buổi trò chuyện cùng tác giả về ký ức đô thị Sài Gòn, có phần ký tặng sách.</p>',
      StartTime: gioVN('2026-09-27T09:00:00'),
      EndTime: gioVN('2026-09-27T11:00:00'),
      VenueId: sanKhauChinh.Id,
      ExpectedAttendees: 150,
      Status: 'APPROVED',
      ReviewNote: 'Hồ sơ đầy đủ, đồng ý tổ chức.',
      ReviewedAt: gioVN('2026-09-18T10:00:00'),
      ReviewedBy: 'admin',
      EmailVerifiedAt: gioVN('2026-09-15T08:00:00'),
      Items: {
        create: [
          { AssetId: loaKeo.Id, Quantity: 2 },
          { AssetId: micKhongDay.Id, Quantity: 3 },
        ],
      },
    },
  });

  // Hồ sơ TRÙNG LỊCH với hồ sơ đã duyệt ở trên (cùng Sân khấu chính, giờ chồng nhau)
  await prisma.proposal.create({
    data: {
      Code: 'HS-260922-0002',
      OrganizerType: 'ca-nhan',
      OrganizerName: 'Trần Văn Nam',
      Email: 'tranvannam@example.com',
      Phone: '0912345678',
      Title: 'Workshop làm sách tranh cho thiếu nhi',
      Description: '<p>Hướng dẫn thiếu nhi tự làm một cuốn sách tranh nhỏ trong 90 phút.</p>',
      StartTime: gioVN('2026-09-27T10:00:00'),
      EndTime: gioVN('2026-09-27T12:00:00'),
      VenueId: sanKhauChinh.Id,
      ExpectedAttendees: 60,
      Status: 'PENDING',
      EmailVerifiedAt: gioVN('2026-09-16T09:00:00'),
      Items: {
        create: [
          { AssetId: banGap.Id, Quantity: 10 },
          { AssetId: loaKeo.Id, Quantity: 1 },
        ],
      },
    },
  });

  await prisma.proposal.create({
    data: {
      Code: 'HS-260922-0003',
      OrganizerType: 'clb-cong-dong',
      OrganizerName: 'CLB Đọc sách FPT',
      RepresentativeName: 'Lê Thị Hương',
      Email: 'clbdocsach@fpt.edu.vn',
      Phone: '0987654321',
      Title: 'Triển lãm ảnh: Đường Sách 10 năm',
      Description: '<p>Trưng bày 60 bức ảnh tư liệu về Đường Sách từ ngày thành lập.</p>',
      StartTime: gioVN('2026-10-05T08:00:00'),
      EndTime: gioVN('2026-10-05T17:00:00'),
      VenueId: khuTrienLam.Id,
      ExpectedAttendees: 300,
      Status: 'PENDING',
      EmailVerifiedAt: gioVN('2026-09-17T11:00:00'),
      Items: { create: [{ AssetId: mayChieu.Id, Quantity: 1 }] },
    },
  });

  // Hồ sơ CHƯA XÁC NHẬN EMAIL – API admin phải lọc bỏ (EmailVerifiedAt = NULL)
  await prisma.proposal.create({
    data: {
      Code: 'HS-260922-0004',
      OrganizerType: 'ca-nhan',
      OrganizerName: 'Phạm Thị Lan',
      Email: 'phamthilan@example.com',
      Phone: '0977889900',
      Title: 'Hội chợ đồ cũ cuối tuần',
      Description: '<p>Gian hàng trao đổi đồ cũ kèm khu ẩm thực.</p>',
      StartTime: gioVN('2026-10-11T07:00:00'),
      EndTime: gioVN('2026-10-11T18:00:00'),
      VenueId: khuThieuNhi.Id,
      ExpectedAttendees: 200,
      Status: 'PENDING',
      EmailVerifiedAt: null,
      EmailVerifyTokenHash: 'chua-xac-nhan-token-hash',
      EmailVerifyExpiresAt: gioVN('2026-09-24T00:00:00'),
      Items: { create: [{ AssetId: banGap.Id, Quantity: 5 }] },
    },
  });

  await prisma.proposal.create({
    data: {
      Code: 'HS-260922-0005',
      OrganizerType: 'truong-hoc',
      OrganizerName: 'Trường THPT Nguyễn Thị Minh Khai',
      RepresentativeName: 'Đỗ Văn Bình',
      Email: 'doanphong@ntmk.edu.vn',
      Phone: '0938112233',
      Title: 'Ngày hội đọc sách học đường',
      Description: '<p>Hoạt động đọc sách và trao đổi kinh nghiệm học tập dành cho học sinh.</p>',
      StartTime: gioVN('2026-10-18T08:00:00'),
      EndTime: gioVN('2026-10-18T11:00:00'),
      VenueId: khuTrienLam.Id,
      ExpectedAttendees: 250,
      Status: 'NEEDS_SUPPLEMENT',
      ReviewNote: 'Bổ sung danh sách phụ trách an ninh và phương án di chuyển học sinh.',
      ReviewedAt: gioVN('2026-09-19T14:20:00'),
      ReviewedBy: 'admin',
      EmailVerifiedAt: gioVN('2026-09-14T07:30:00'),
      Items: { create: [{ AssetId: micKhongDay.Id, Quantity: 2 }] },
    },
  });

  // ------------------------------------------------------------------
  // 10. Sự kiện – đủ 3 mức quan trọng
  // ------------------------------------------------------------------
  console.log('🎪 Đang nạp 3 sự kiện...');

  await prisma.event.create({
    data: {
      Name: 'Giao lưu tác giả: Sài Gòn một thuở',
      StartTime: gioVN('2026-09-27T09:00:00'),
      EndTime: gioVN('2026-09-27T11:00:00'),
      VenueId: sanKhauChinh.Id,
      Description: '<p>Sinh ra từ hồ sơ đề xuất đã được duyệt.</p>',
      Importance: 'KEY',
      ProposalId: hoSoDaDuyet.Id,
    },
  });

  await prisma.event.create({
    data: {
      Name: 'Tuần lễ sách thiếu nhi',
      StartTime: gioVN('2026-10-01T08:00:00'),
      EndTime: gioVN('2026-10-07T20:00:00'),
      VenueId: khuThieuNhi.Id,
      Description: '<p>Chuỗi hoạt động đọc sách và kể chuyện dành cho thiếu nhi.</p>',
      Importance: 'PRIORITY',
    },
  });

  await prisma.event.create({
    data: {
      Name: 'Đọc sách cùng nhau sáng Chủ nhật',
      StartTime: gioVN('2026-10-04T08:00:00'),
      EndTime: gioVN('2026-10-04T10:00:00'),
      VenueId: khuTrienLam.Id,
      Description: '<p>Hoạt động đọc sách chung định kỳ hằng tuần.</p>',
      Importance: 'NORMAL',
    },
  });

  // ------------------------------------------------------------------
  // 11. Góp ý – đủ 3 trạng thái, có góp ý toàn khu vực và góp ý ẩn danh
  // ------------------------------------------------------------------
  console.log('💬 Đang nạp 8 góp ý (privacy by design)...');

  const buuDien = createdHeritages['buu-dien-trung-tam-sai-gon'];
  const ducBa = createdHeritages['nha-tho-duc-ba'];
  const dinhDocLap = createdHeritages['dinh-doc-lap'];
  const benNhaRong = createdHeritages['ben-nha-rong'];

  await prisma.feedback.createMany({
    data: [
      {
        ItemId: ducBa.Id,
        Rating: 5,
        Content: 'Không gian Nhà thờ Đức Bà rất ấn tượng, bảng thuyết minh song ngữ quét mã QR nhanh!',
        Status: 'PENDING',
        UserContact: 'dukhach@example.com',
      },
      {
        ItemId: buuDien.Id,
        Rating: 5,
        Content: 'Mã QR tại Bưu điện Trung tâm quét rất nhạy, thông tin lịch sử đầy đủ.',
        Status: 'REVIEWED',
        UserContact: '0901234567',
      },
      {
        ItemId: dinhDocLap.Id,
        Rating: 4,
        Content: 'Khu vực Dinh Độc Lập cuối tuần hơi đông, mong bố trí thêm ghế nghỉ chân dưới bóng cây.',
        Status: 'RESOLVED',
        UserContact: null,
      },
      {
        ItemId: buuDien.Id,
        Rating: 5,
        Content: 'Wonderful post office! The QR guide provided great historical context without any app install.',
        Status: 'RESOLVED',
        UserContact: null,
      },
      {
        ItemId: ducBa.Id,
        Rating: 4,
        Content: 'Đang trùng tu nhưng góc chụp ngoài vẫn rất đẹp. Cần thêm hướng dẫn vị trí quét mã ở cổng rào.',
        Status: 'REVIEWED',
        UserContact: 'contact.traveler@gmail.com',
      },
      {
        ItemId: benNhaRong.Id,
        Rating: 4,
        Content: 'QR tại Bến Nhà Rồng hoạt động tốt, mong bổ sung audio guide song ngữ.',
        Status: 'PENDING',
        UserContact: '0933445566',
      },
      {
        // ItemId null = góp ý cho toàn Đường Sách, không gắn di sản/gian hàng nào
        ItemId: null,
        Rating: 3,
        Content: 'Buổi trưa thiếu chỗ ngồi có mái che, mong ban quản lý bổ sung thêm dù và ghế.',
        Status: 'PENDING',
        UserContact: null,
      },
      {
        ItemId: null,
        Rating: 5,
        Content: 'Không gian Đường Sách rất đẹp, nhân viên thân thiện, sẽ quay lại cùng gia đình.',
        Status: 'RESOLVED',
        UserContact: null,
      },
    ],
  });

  console.log('🎉 Hoàn tất nạp dữ liệu mẫu!');
  console.log(`   2 cơ sở · 4 loại nội dung · 7 thuộc tính · ${heritageSites.length} di sản · 7 gian hàng`);
  console.log('   3 địa điểm · 5 thiết bị · 5 hồ sơ đề xuất (1 hồ sơ trùng lịch) · 3 sự kiện · 8 góp ý');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
