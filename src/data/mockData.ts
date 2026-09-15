export interface Stall {
  id: string;
  code: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  tagsVi: string[];
  tagsEn: string[];
  descVi: string;
  descEn: string;
  bookCount: string;
  bookCountEn?: string;
  image: string;
}

export interface CalendarEvent {
  id: string;
  titleVi: string;
  titleEn: string;
  date: string;
  dateLabelVi: string;
  dateLabelEn: string;
  timeVi: string;
  timeEn: string;
  locationVi: string;
  locationEn: string;
  descVi: string;
  descEn: string;
  priority: 'low' | 'medium' | 'high';
  image: string;
  day: number;
  month: number;
}

export interface MapPoint {
  id: number;
  label: string;
  type: 'stall' | 'amenity' | 'heritage' | 'parking' | 'cafe' | 'checkin' | 'kids' | 'exhibition';
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  x: number;
  y: number;
  addressVi?: string;
  addressEn?: string;
  capacity?: string;
  hoursVi?: string;
  hoursEn?: string;
}

export interface HeritageSite {
  id: number;
  nameVi: string;
  nameEn: string;
  category: string;
  address: string;
  period: string;
  summary: string;
  value: string;
  highlight: string;
  image: string;
  sourceUrl: string;
  
}

export const stalls: Stall[] = [
  {
    id: 'nxbtre',
    code: 'A01',
    nameVi: 'NXB Trẻ',
    nameEn: 'NXB Trẻ (Youth Publishing House)',
    categoryVi: 'Văn học · Thiếu nhi',
    categoryEn: 'Literature · Children',
    tagsVi: ['Văn học', 'Thiếu nhi'],
    tagsEn: ['Literature', 'Children'],
    descVi: 'Nhà xuất bản hàng đầu Việt Nam với hơn 40 năm lịch sử, chuyên xuất bản sách văn học và thiếu nhi chất lượng cao.',
    descEn: 'A leading Vietnamese publisher with 40+ years of history, specializing in quality literature and children\'s books.',
    bookCount: '1.240 đầu sách',
    bookCountEn: '1,240 titles',
    image: '/images/hinh_anh_cac_gian_hang/cac_nha_sach.jpg',
  },
  {
    id: 'dongtay',
    code: 'A02',
    nameVi: 'Đông Tây Book',
    nameEn: 'Đông Tây Book',
    categoryVi: 'Kinh tế · Quản trị',
    categoryEn: 'Economics · Management',
    tagsVi: ['Kinh tế', 'Quản trị'],
    tagsEn: ['Economics', 'Management'],
    descVi: 'Chuyên cung cấp sách kinh tế, quản trị và kỹ năng mềm dành cho doanh nhân và người đi làm.',
    descEn: 'Specializes in economics, management, and soft-skills books for entrepreneurs and professionals.',
    bookCount: '890 đầu sách',
    bookCountEn: '890 titles',
    image: '/images/hinh_anh_cac_gian_hang/gian_hang.jpg',
  },
  {
    id: 'alpha',
    code: 'A03',
    nameVi: 'Alpha Books',
    nameEn: 'Alpha Books',
    categoryVi: 'Khoa học · Công nghệ',
    categoryEn: 'Science · Technology',
    tagsVi: ['Khoa học', 'Công nghệ'],
    tagsEn: ['Science', 'Technology'],
    descVi: 'Đầu mối cung cấp sách khoa học, công nghệ và tư duy sáng tạo cho giới trẻ.',
    descEn: 'A leading source for science, technology, and creative-thinking books for young readers.',
    bookCount: '760 đầu sách',
    bookCountEn: '760 titles',
    image: '/images/hinh_anh_cac_gian_hang/nha_xuat_ban_tong_hop.jpg',
  },
  {
    id: 'kimdong',
    code: 'A04',
    nameVi: 'NXB Kim Đồng',
    nameEn: 'NXB Kim Đồng (Kim Dong Publishing)',
    categoryVi: 'Thiếu nhi · Truyện tranh',
    categoryEn: 'Children · Comics',
    tagsVi: ['Thiếu nhi', 'Truyện tranh'],
    tagsEn: ['Children', 'Comics'],
    descVi: 'Văn học thiếu nhi và truyện tranh quen thuộc với nhiều thế hệ độc giả Việt Nam.',
    descEn: 'Beloved children\'s literature and comics familiar to generations of Vietnamese readers.',
    bookCount: '1.050 đầu sách',
    bookCountEn: '1,050 titles',
    image: '/images/hinh_anh_cac_gian_hang/dong_sach_nghe_thuat_con_meo_nho.jpg',
  },
  {
    id: 'thaiha',
    code: 'A05',
    nameVi: 'Thái Hà Books',
    nameEn: 'Thái Hà Books',
    categoryVi: 'Kỹ năng · Truyền cảm hứng',
    categoryEn: 'Skills · Inspirational',
    tagsVi: ['Kỹ năng', 'Truyền cảm hứng'],
    tagsEn: ['Skills', 'Inspirational'],
    descVi: 'Nổi bật với sách kỹ năng, Phật giáo và nhiều tác phẩm truyền cảm hứng.',
    descEn: 'Known for skills books, Buddhism titles, and many inspirational works.',
    bookCount: '680 đầu sách',
    bookCountEn: '680 titles',
    image: '/images/hinh_anh_cac_gian_hang/nha_sach_thai_ha.jpg',
  },
  {
    id: 'firstnews',
    code: 'A06',
    nameVi: 'First News – Trí Việt',
    nameEn: 'First News – Trí Việt',
    categoryVi: 'Sách dịch · Khởi nghiệp',
    categoryEn: 'Translated · Entrepreneurship',
    tagsVi: ['Sách dịch', 'Khởi nghiệp'],
    tagsEn: ['Translated', 'Entrepreneurship'],
    descVi: 'Tập trung sách dịch nổi tiếng, sách doanh nhân và tủ sách Hạt giống tâm hồn.',
    descEn: 'Focuses on famous translated works, business books, and the "Soul Seeds" series.',
    bookCount: '920 đầu sách',
    bookCountEn: '920 titles',
    image: '/images/hinh_anh_cac_gian_hang/nha_xuat_ban_phu_nu.jpg',
  },
  {
    id: 'phuongnam',
    code: 'A07',
    nameVi: 'Phương Nam Book',
    nameEn: 'Phương Nam Book',
    categoryVi: 'Tổng hợp · Ngoại văn',
    categoryEn: 'General · Foreign Language',
    tagsVi: ['Tổng hợp', 'Ngoại văn'],
    tagsEn: ['General', 'Foreign Language'],
    descVi: 'Quy mô lớn, đa dạng thể loại từ thiếu nhi, tiểu thuyết đến sách ngoại văn.',
    descEn: 'Large-scale, diverse genres from children\'s books and novels to foreign-language titles.',
    bookCount: '1.480 đầu sách',
    bookCountEn: '1,480 titles',
    image: '/images/hinh_anh_cac_gian_hang/gian_hang_nha_nam.jpg',
  },
  {
    id: 'tonghop',
    code: 'A08',
    nameVi: 'NXB Tổng hợp TP.HCM',
    nameEn: 'Ho Chi Minh City General Publishing House',
    categoryVi: 'Học thuật · Nghiên cứu',
    categoryEn: 'Academic · Research',
    tagsVi: ['Học thuật', 'Nghiên cứu'],
    tagsEn: ['Academic', 'Research'],
    descVi: 'Sách học thuật, tham khảo chuyên ngành và ấn phẩm văn hóa – lịch sử.',
    descEn: 'Academic books, specialized reference, and cultural–historical publications.',
    bookCount: '540 đầu sách',
    bookCountEn: '540 titles',
    image: '/images/hinh_anh_cac_gian_hang/nha_xuat_ban_tong_hop.jpg',
  },
  {
    id: 'ngoaiVan',
    code: 'A09',
    nameVi: 'Khu Ngoại văn & Artbook',
    nameEn: 'Foreign Books & Artbook Zone',
    categoryVi: 'Ngoại ngữ · Quà lưu niệm',
    categoryEn: 'Foreign Language · Souvenirs',
    tagsVi: ['Ngoại ngữ', 'Quà lưu niệm'],
    tagsEn: ['Foreign Language', 'Souvenirs'],
    descVi: 'Sách tiếng Anh, Pháp, Nhật và artbook mỹ thuật – kiến trúc, phù hợp du khách quốc tế và người học ngoại ngữ.',
    descEn: 'English, French, Japanese books and fine art–architecture artbooks, ideal for international visitors and language learners.',
    bookCount: '410 đầu sách',
    bookCountEn: '410 titles',
    image: '/images/hinh_anh_cac_gian_hang/dong_sach_nghe_thuat_con_meo_nho.jpg',
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    titleVi: 'Tọa đàm & Ký tặng: Hành trình văn học Việt',
    titleEn: 'Talk & Book Signing: A Journey Through Vietnamese Literature',
    date: '2026-09-20',
    dateLabelVi: 'Thứ Bảy, 20/09/2026',
    dateLabelEn: 'Saturday, Sep 20, 2026',
    timeVi: '09:00 – 11:00',
    timeEn: '9:00 AM – 11:00 AM',
    locationVi: 'Sân khấu chính',
    locationEn: 'Main stage',
    descVi: 'Tọa đàm về hành trình phát triển văn học Việt Nam qua các thời kỳ, cùng cơ hội ký tặng sách với các tác giả tham gia. Sự kiện mở cửa cho tất cả độc giả.',
    descEn: 'A talk on the journey of Vietnamese literature through the eras, with a book signing opportunity with participating authors. Open to all readers.',
    priority: 'low',
    image: '/images/hinh_anh_duong_sach/su_kien.jpg',
    day: 20,
    month: 9,
  },
  {
    id: 'evt-2',
    titleVi: 'Hội sách cuối tuần — Giảm đến 30%',
    titleEn: 'Weekend Book Fair — Up to 30% off',
    date: '2026-09-27',
    dateLabelVi: 'Thứ Bảy – Chủ Nhật, 27–28/09/2026',
    dateLabelEn: 'Saturday–Sunday, Sep 27–28, 2026',
    timeVi: '08:00 – 21:00',
    timeEn: '8:00 AM – 9:00 PM',
    locationVi: 'Toàn tuyến đường sách',
    locationEn: 'Entire book street',
    descVi: 'Hội sách cuối tuần với giảm giá lên đến 30% tại tất cả gian hàng. Cơ hội tuyệt vời để sưu tầm những đầu sách yêu thích với mức giá tốt nhất.',
    descEn: 'Weekend book fair with up to 30% off at all stalls. A great opportunity to collect your favorite titles at the best prices.',
    priority: 'medium',
    image: '/images/hinh_anh_duong_sach/su_kien_2.jpg',
    day: 27,
    month: 9,
  },
  {
    id: 'evt-3',
    titleVi: 'Đêm nhạc tưởng nhớ Trịnh Công Sơn',
    titleEn: 'An Evening for Trịnh Công Sơn',
    date: '2026-10-04',
    dateLabelVi: 'Chủ Nhật, 04/10/2026',
    dateLabelEn: 'Sunday, Oct 4, 2026',
    timeVi: '19:00 – 21:00',
    timeEn: '7:00 PM – 9:00 PM',
    locationVi: 'Sân khấu chính',
    locationEn: 'Main stage',
    descVi: 'Đêm nhạc acoustic tưởng nhớ nhạc sĩ Trịnh Công Sơn với các ca khúc bất hủ. Không gian ngoài trời dưới ánh đèn ấm, dành cho những người yêu âm nhạc và sách.',
    descEn: 'An acoustic evening honoring composer Trịnh Công Sơn with timeless songs. An outdoor setting under warm lights, for lovers of music and books.',
    priority: 'high',
    image: '/images/hinh_anh_duong_sach/su_kien_3.jpg',
    day: 4,
    month: 10,
  },
  {
    id: 'evt-4',
    titleVi: 'Ngày hội đọc sách thiếu nhi',
    titleEn: 'Children\'s Reading Day',
    date: '2026-10-11',
    dateLabelVi: 'Chủ Nhật, 11/10/2026',
    dateLabelEn: 'Sunday, Oct 11, 2026',
    timeVi: '08:30 – 11:30',
    timeEn: '8:30 AM – 11:30 AM',
    locationVi: 'Khu gian thiếu nhi',
    locationEn: 'Kids\' area',
    descVi: 'Ngày hội dành riêng cho các bạn nhỏ với hoạt động đọc sách, trò chơi và kể chuyện. Mỗi bé nhận một cuốn sách nhỏ làm quà.',
    descEn: 'A special day for young readers with reading activities, games, and storytelling. Each child receives a small book as a gift.',
    priority: 'low',
    image: 'https://images.pexels.com/photos/5865565/pexels-photo-5865565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    day: 11,
    month: 10,
  },
  {
    id: 'evt-5',
    titleVi: 'Workshop vẽ minh họa sách tranh',
    titleEn: 'Picture Book Illustration Workshop',
    date: '2026-10-17',
    dateLabelVi: 'Thứ Bảy, 17/10/2026',
    dateLabelEn: 'Saturday, Oct 17, 2026',
    timeVi: '14:00 – 16:30',
    timeEn: '2:00 PM – 4:30 PM',
    locationVi: 'Khu trưng bày – giao lưu tác giả',
    locationEn: 'Exhibition & author-talk area',
    descVi: 'Workshop thực hành vẽ minh họa sách tranh dành cho người yêu nghệ thuật. Học cách kể chuyện qua hình ảnh từ họa sĩ chuyên nghiệp.',
    descEn: 'A hands-on picture book illustration workshop for art lovers. Learn to tell stories through images from a professional illustrator.',
    priority: 'medium',
    image: 'https://images.pexels.com/photos/5104716/pexels-photo-5104716.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    day: 17,
    month: 10,
  },
  {
    id: 'evt-6',
    titleVi: 'Lễ hội Đường Sách Tết — Khởi động chương trình',
    titleEn: 'Tet Book Street Festival — Program Kickoff',
    date: '2027-02-02',
    dateLabelVi: 'Thứ Hai, 02/02/2027',
    dateLabelEn: 'Monday, Feb 2, 2027',
    timeVi: 'Cả ngày',
    timeEn: 'All day',
    locationVi: 'Toàn tuyến',
    locationEn: 'Entire street',
    descVi: 'Lễ hội sách dịp Tết Nguyên Đán với hàng trăm đầu sách mới, hoạt động văn hóa truyền thống và không gian trang trí đón xuân.',
    descEn: 'Tet book festival with hundreds of new titles, traditional cultural activities, and spring-themed decorations.',
    priority: 'high',
    image: 'https://images.pexels.com/photos/12898231/pexels-photo-12898231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    day: 2,
    month: 2,
  },
];

export const mapPoints: MapPoint[] = [
  // Parking (blue) — spread around the map edges
  { id: 0, label: 'P1', type: 'parking', nameVi: 'Bãi giữ xe Diamond Plaza', nameEn: 'Diamond Plaza Parking', descVi: '', descEn: '', x: 5, y: 8, addressVi: '34 Lê Duẩn, P. Bến Nghé, Q.1', addressEn: '34 Lê Duẩn, Bến Nghé Ward, Dist. 1', capacity: '1.000 xe', hoursVi: '9:30 – 22:00', hoursEn: '9:30 AM – 10:00 PM' },
  { id: 1, label: 'P2', type: 'parking', nameVi: 'Bãi giữ xe Hai Bà Trưng', nameEn: 'Hai Bà Trưng Parking', descVi: '', descEn: '', x: 5, y: 35, addressVi: 'Góc Nguyễn Văn Bình & Hai Bà Trưng', addressEn: 'Corner of Nguyễn Văn Bình & Hai Bà Trưng', capacity: '200 xe', hoursVi: '8:00 – 22:00', hoursEn: '8:00 AM – 10:00 PM' },
  { id: 2, label: 'P3', type: 'parking', nameVi: 'Bãi giữ xe Nguyễn Văn Bình', nameEn: 'Nguyễn Văn Bình Parking', descVi: '', descEn: '', x: 5, y: 62, addressVi: 'Góc Nguyễn Văn Bình & Công Xã Paris', addressEn: 'Corner of Nguyễn Văn Bình & Công Xã Paris', capacity: '200 xe', hoursVi: '8:00 – 22:00', hoursEn: '8:00 AM – 10:00 PM' },
  { id: 3, label: 'P4', type: 'parking', nameVi: 'Bãi giữ xe Bưu điện thành phố', nameEn: 'City Post Office Parking', descVi: '', descEn: '', x: 93, y: 35, addressVi: 'Cạnh Bưu điện TP', addressEn: 'Next to City Post Office', capacity: '60 xe', hoursVi: '7:00 – 21:30', hoursEn: '7:00 AM – 9:30 PM' },
  { id: 4, label: 'P5', type: 'parking', nameVi: 'Bãi giữ xe đường Lê Duẩn', nameEn: 'Lê Duẩn Street Parking', descVi: '', descEn: '', x: 93, y: 8, addressVi: 'Đường Lê Duẩn', addressEn: 'Lê Duẩn Street', capacity: '2.000 xe', hoursVi: '7:00 – 23:00', hoursEn: '7:00 AM – 11:00 PM' },

  // Stalls (green) — alternating top and bottom sides of the straight path
  { id: 5, label: 'A01', type: 'stall', nameVi: 'NXB Trẻ', nameEn: 'NXB Trẻ', descVi: 'Văn học & thiếu nhi — 1.240 đầu sách.', descEn: 'Literature & children — 1,240 titles.', x: 15, y: 22 },
  { id: 6, label: 'A02', type: 'stall', nameVi: 'Đông Tây Book', nameEn: 'Đông Tây Book', descVi: 'Kinh tế & quản trị — 890 đầu sách.', descEn: 'Economics & management — 890 titles.', x: 28, y: 78 },
  { id: 7, label: 'A03', type: 'stall', nameVi: 'Alpha Books', nameEn: 'Alpha Books', descVi: 'Khoa học & công nghệ — 760 đầu sách.', descEn: 'Science & technology — 760 titles.', x: 22, y: 22 },
  { id: 8, label: 'A04', type: 'stall', nameVi: 'NXB Kim Đồng', nameEn: 'NXB Kim Đồng', descVi: 'Thiếu nhi & truyện tranh — 1.050 đầu sách.', descEn: 'Children & comics — 1,050 titles.', x: 35, y: 78 },
  { id: 9, label: 'A05', type: 'stall', nameVi: 'Thái Hà Books', nameEn: 'Thái Hà Books', descVi: 'Kỹ năng & truyền cảm hứng — 680 đầu sách.', descEn: 'Skills & inspirational — 680 titles.', x: 42, y: 22 },
  { id: 10, label: 'A06', type: 'stall', nameVi: 'First News – Trí Việt', nameEn: 'First News – Trí Việt', descVi: 'Sách dịch & khởi nghiệp — 920 đầu sách.', descEn: 'Translated & entrepreneurship — 920 titles.', x: 55, y: 78 },
  { id: 11, label: 'A07', type: 'stall', nameVi: 'Phương Nam Book', nameEn: 'Phương Nam Book', descVi: 'Tổng hợp & ngoại văn — 1.480 đầu sách.', descEn: 'General & foreign — 1,480 titles.', x: 62, y: 22 },
  { id: 12, label: 'A08', type: 'stall', nameVi: 'NXB Tổng hợp TP.HCM', nameEn: 'HCMC General Publishing', descVi: 'Học thuật & nghiên cứu — 540 đầu sách.', descEn: 'Academic & research — 540 titles.', x: 72, y: 78 },
  { id: 13, label: 'A09', type: 'stall', nameVi: 'Khu Ngoại văn & Artbook', nameEn: 'Foreign Books & Artbook', descVi: 'Ngoại ngữ & quà lưu niệm — 410 đầu sách.', descEn: 'Foreign language & souvenirs — 410 titles.', x: 80, y: 22 },

  // Cafes (brown)
  { id: 14, label: 'C1', type: 'cafe', nameVi: 'Phương Nam Coffee Book', nameEn: 'Phương Nam Coffee Book', descVi: 'Bàn ghế gọn gàng dưới bóng cây, lý tưởng để vừa nhâm nhi cà phê vừa đọc sách.', descEn: 'Cozy seating under trees — perfect for coffee and a book.', x: 48, y: 50 },
  { id: 15, label: 'C2', type: 'cafe', nameVi: 'Bản Coffee', nameEn: 'Bản Coffee', descVi: 'Bàn ghế gọn gàng dưới bóng cây, lý tưởng để vừa nhâm nhi cà phê vừa đọc sách.', descEn: 'Cozy seating under trees — perfect for coffee and a book.', x: 65, y: 50 },

  // Check-in corner (amenity type, special)
  { id: 16, label: 'CH1', type: 'checkin', nameVi: 'Góc check-in Bưu điện Trung tâm', nameEn: 'Central Post Office Check-in Corner', descVi: 'Phông nền kiến trúc Pháp cổ điển, góc chụp ảnh được yêu thích nhất đường sách. Đẹp nhất lúc sáng sớm hoặc xế chiều.', descEn: 'Classic French architecture backdrop — the most-loved photo spot on the street. Best in early morning or late afternoon.', x: 90, y: 62 },

  // Kids area (amenity type)
  { id: 17, label: 'K1', type: 'kids', nameVi: 'Khu gian thiếu nhi', nameEn: 'Kids\' Area', descVi: 'Kệ sách thấp, giờ kể chuyện và workshop vẽ – tô màu vào cuối tuần (9h–11h và 15h–17h).', descEn: 'Low bookshelves, storytelling and drawing–coloring workshops on weekends (9–11am and 3–5pm).', x: 50, y: 78 },

  // Exhibition/event area (amenity type)
  { id: 18, label: 'E1', type: 'exhibition', nameVi: 'Khu trưng bày – giao lưu tác giả', nameEn: 'Exhibition & Author-talk Area', descVi: 'Nơi tổ chức book-launch, ký tặng và talk-show cuối tuần, thường vào 10h–12h hoặc 15h–17h.', descEn: 'Hosts book launches, signings, and weekend talk shows, usually 10am–12pm or 3–5pm.', x: 18, y: 50 },
];

export const heritageSites: HeritageSite[] = [
  {
  id: 1,
  nameVi: 'Bưu điện Trung tâm Sài Gòn',
  nameEn: 'Saigon Central Post Office',
  category: 'Kiến trúc đô thị',
  address: '02 Công trường Công xã Paris, Quận 1, TP.HCM',
  period: 'Thế kỷ XIX (khởi công năm 1886, hoàn thành năm 1891)',
  summary: 'Công trình bưu chính tiêu biểu mang phong cách kiến trúc Pháp cổ điển pha trộn yếu tố công nghiệp châu Âu, do kiến trúc sư Alfred Foulhoux thiết kế. Tòa nhà nằm ngay trung tâm thành phố, cạnh Nhà thờ Đức Bà, và là một trong những công trình cổ nhất còn được bảo tồn gần như nguyên vẹn tại Sài Gòn.',
  value: 'Không chỉ là di sản kiến trúc với mặt tiền theo phong cách Phục Hưng, khung sắt kiểu nhà ga châu Âu và mái vòm cong đặc trưng, công trình còn là chứng nhân lịch sử của ngành bưu chính viễn thông Việt Nam thời Pháp thuộc, phản ánh quá trình đô thị hóa và giao lưu văn hóa Đông - Tây tại Sài Gòn cuối thế kỷ XIX. Đến nay, tòa nhà vẫn hoạt động như một bưu điện, đồng thời là điểm tham quan du lịch nổi tiếng thu hút đông đảo du khách trong và ngoài nước.',
  highlight: 'Hai tấm bản đồ lịch sử "Sài Gòn và các vùng phụ cận năm 1892" và "Sài Gòn - Chợ Lớn năm 1936" vẫn được lưu giữ, trưng bày trên tường trong tòa nhà, cùng hệ thống cửa gỗ, ghế gỗ và các họa tiết trang trí bằng sắt uốn nguyên bản từ thời Pháp.',
  image: 'https://tse3.mm.bing.net/th/id/OIP.N_ub3f5bk9L-TvNQykGALAHaD4?r=0&pid=Api&h=220&P=0',
  sourceUrl: 'https://vnpost.vn/vi/hoat-dong-nganh/buu-dien-trung-tam-thanh-pho-ho-chi-minh-mot-diem-den-hap-dan'
},
 {
  id: 2,
  nameVi: 'Nhà thờ Đức Bà Sài Gòn',
  nameEn: 'Notre-Dame Cathedral Basilica of Saigon',
  category: 'Kiến trúc tôn giáo',
  address: '01 Công xã Paris, Quận 1, TP.HCM',
  period: '1863–1880 (khánh thành ngày 11/4/1880)',
  summary: 'Nhà thờ chính tòa Công giáo lớn nhất tại Sài Gòn, do kiến trúc sư J. Bourard thiết kế theo phong cách Roman kết hợp Gothic, mang đậm dấu ấn kiến trúc Pháp cuối thế kỷ XIX. Toàn bộ vật liệu xây dựng như gạch, ngói, kính màu đều được nhập trực tiếp từ Pháp.',
  value: 'Là biểu tượng kiến trúc tôn giáo tiêu biểu và một trong những công trình mang tính nhận diện nhất của Sài Gòn - TP.HCM, gắn liền với diện mạo đô thị lịch sử quanh khu vực Công xã Paris cùng Bưu điện Trung tâm. Công trình phản ánh sự giao thoa văn hóa Đông - Tây và vai trò trung tâm sinh hoạt tôn giáo, cộng đồng suốt hơn một thế kỷ qua.',
  highlight: 'Hai tháp chuông cao khoảng 58m với 6 chuông đồng lớn được đúc tại Pháp, cùng bức tượng Đức Mẹ Hòa Bình bằng đá cẩm thạch đặt phía trước sân nhà thờ từ năm 1959. Công trình không sử dụng xi măng cốt thép mà xây bằng gạch trần chuyên dụng vẫn giữ được màu sắc nguyên vẹn qua hơn 140 năm mà không cần sơn phủ. Đây cũng là điểm mốc quen thuộc, thường xuất hiện trong các sự kiện văn hóa lớn của trung tâm thành phố.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmIjMmmSYnfE4T_C8DjAwHeTWAMwF2IdxzIU3nLQ6P_NUcnMl3PaEydw&s=10',
  sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/documents/10184/265325/Danh%2Bs%C3%A1ch%2Bdi%2Bt%C3%ADch%2B%C4%91%C3%A3%2BQ%C4%90%2Bx%E1%BA%BFp%2Bh%E1%BA%A1ng%2B%C4%91%E1%BA%BFn%2Bth%C3%A1ng%2B5%2B2017.pdf/948c1ef9-4d46-43b6-af76-c1e616dcf54d'
},
 {
  id: 3,
  nameVi: 'Dinh Độc Lập',
  nameEn: 'Independence Palace',
  category: 'Di tích lịch sử',
  address: '135 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM',
  period: 'Thế kỷ XX (xây dựng lại 1962–1966, trên nền Dinh Norodom cũ xây từ 1868)',
  summary: 'Công trình do kiến trúc sư Ngô Viết Thụ thiết kế, từng là nơi ở và làm việc của Tổng thống chính quyền Sài Gòn, mang phong cách kiến trúc hiện đại kết hợp yếu tố phong thủy và triết lý phương Đông. Đây là nơi diễn ra sự kiện xe tăng quân Giải phóng húc đổ cổng chính vào trưa 30/4/1975, đánh dấu thời khắc kết thúc chiến tranh, thống nhất đất nước.',
  value: 'Được xếp hạng Di tích quốc gia đặc biệt, Dinh Độc Lập là biểu tượng lưu giữ ký ức về thời khắc lịch sử thống nhất đất nước, đồng thời phản ánh dấu ấn kiến trúc và chính trị của Việt Nam trong giai đoạn nửa sau thế kỷ XX. Công trình cũng ghi dấu sự kiện ném bom Dinh năm 1962, dẫn đến việc xây dựng lại toàn bộ tòa nhà như hiện nay.',
  highlight: 'Không gian trưng bày gồm hầm chỉ huy tác chiến với hệ thống thông tin liên lạc nguyên bản, phòng khánh tiết, phòng làm việc của Tổng thống, sân bay trực thăng trên nóc và hai chiếc xe tăng mang số hiệu 843 và 390 được trưng bày trong khuôn viên, gắn liền với thời khắc lịch sử trưa 30/4/1975.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/20190923_Independence_Palace-10.jpg',
  sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/documents/10184/265325/Danh%2Bs%C3%A1ch%2Bdi%2Bt%C3%ADch%2B%C4%91%C3%A3%2BQ%C4%90%2Bx%E1%BA%BFp%2Bh%E1%BA%A1ng%2B%C4%91%E1%BA%BFn%2Bth%C3%A1ng%2B5%2B2017.pdf/948c1ef9-4d46-43b6-af76-c1e616dcf54d'
},
  {
  id: 4,
  nameVi: 'Bến Nhà Rồng',
  nameEn: 'Nha Rong Wharf',
  category: 'Di tích lịch sử',
  address: '01 Nguyễn Tất Thành, Quận 4, TP.HCM',
  period: 'Thế kỷ XIX (xây dựng năm 1863)',
  summary: 'Nguyên là trụ sở của hãng vận tải Messageries Maritimes (Pháp), Bến Nhà Rồng mang kiến trúc phương Tây kết hợp hai con rồng lớn gắn trên nóc theo mô-típ Á Đông, nên được gọi là Nhà Rồng. Đây là địa điểm gắn liền với hành trình ra đi tìm đường cứu nước của người thanh niên Nguyễn Tất Thành năm 1911.',
  value: 'Từ năm 1979, công trình được chọn làm Bảo tàng Hồ Chí Minh - Chi nhánh TP.HCM, trở thành không gian giáo dục truyền thống và lịch sử cách mạng quan trọng, lưu giữ nhiều hiện vật, tư liệu về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh, đặc biệt là hành trình 30 năm bôn ba tìm đường cứu nước.',
  highlight: 'Ngày 05/06/1911, tại bến cảng này, Nguyễn Tất Thành với tên gọi Văn Ba đã lên con tàu Amiral Latouche-Tréville rời Sài Gòn sang Pháp, mở đầu hành trình 30 năm tìm đường cứu nước. Bảo tàng hiện trưng bày hơn 170.000 tư liệu, hiện vật, hình ảnh liên quan đến cuộc đời và sự nghiệp của Người.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBYf3az7R-temAnUrrlwvyXM3_M_fgZkpzfMUBqVYHg&s=10',
  sourceUrl: 'https://baotanghochiminh.vn/chuyen-di-lich-su.htm'
},
  {
  id: 5,
  nameVi: 'Bảo tàng Thành phố Hồ Chí Minh',
  nameEn: 'Ho Chi Minh City Museum',
  category: 'Kiến trúc – bảo tàng',
  address: '65 Lý Tự Trọng, Quận 1, TP.HCM',
  period: 'Thế kỷ XIX–XX (xây dựng 1885–1890)',
  summary: 'Tòa nhà nguyên là dinh thự của Thống đốc Nam Kỳ, sau này còn được gọi là "Dinh Gia Long", do kiến trúc sư người Pháp Alfred Foulhoux thiết kế theo phong cách cổ điển kết hợp yếu tố phương Đông. Từ năm 1978, công trình được chuyển đổi thành Bảo tàng Thành phố Hồ Chí Minh, giới thiệu lịch sử, văn hóa và con người vùng đất Sài Gòn - Gia Định qua các thời kỳ.',
  value: 'Công trình được công nhận là di tích kiến trúc nghệ thuật cấp quốc gia năm 2012, tiêu biểu cho phong cách kiến trúc cổ điển Pháp cuối thế kỷ XIX kết hợp trang trí phương Đông. Đây từng là nơi làm việc của nhiều chính quyền qua các giai đoạn lịch sử khác nhau, từ thời Pháp thuộc đến chính quyền Sài Gòn trước 1975.',
  highlight: 'Không gian trưng bày hơn 100.000 tư liệu, hiện vật theo các chủ đề từ thiên nhiên, khảo cổ, địa lý - hành chính Sài Gòn xưa đến quá trình đấu tranh cách mạng và phát triển đô thị của Thành phố. Tòa nhà còn có hệ thống hầm ngầm kiên cố từng được sử dụng làm nơi trú ẩn trong các giai đoạn biến động lịch sử.',
  image: 'https://hcmc-museum.edu.vn/wp-content/uploads/2021/11/07-1400x580.jpg',
  sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/tin-chi-tiet/-/chi-tiet/bao-tang-thanh-pho-ho-chi-minh-19637-2015.html'
},
      {
  id: 6,
  nameVi: 'Bảo tàng Lịch sử TP.HCM',
  nameEn: 'Ho Chi Minh City History Museum',
  category: 'Kiến trúc – bảo tàng',
  address: '02 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM',
  period: 'Thế kỷ XX (xây dựng 1926–1929)',
  summary: 'Công trình do kiến trúc sư người Pháp Auguste Delaval thiết kế theo phong cách kiến trúc Đông Dương (Indochine), kết hợp giữa kỹ thuật xây dựng phương Tây và các họa tiết trang trí truyền thống Á Đông như mái ngói cong, hoa văn lưỡng long. Bảo tàng chuyên nghiên cứu, bảo tồn và giới thiệu lịch sử - văn hóa Việt Nam cùng một số nước trong khu vực châu Á.',
  value: 'Là nơi kết nối tư liệu, hiện vật khảo cổ và hoạt động giáo dục di sản, bảo tàng lưu giữ hàng chục nghìn hiện vật quý từ thời tiền sử, các nền văn hóa Óc Eo, Champa, Đại Việt cho đến các hiện vật văn hóa của Trung Quốc, Nhật Bản, Campuchia và các nước Đông Nam Á khác.',
  highlight: 'Nằm trong khuôn viên Thảo Cầm Viên Sài Gòn, gần nhiều điểm văn hóa trung tâm, bảo tàng có các bộ sưu tập nổi bật như xác ướp Xóm Cải, cổ vật văn hóa Óc Eo, tượng cổ Champa và hệ thống trưng bày chuyên đề về lịch sử Sài Gòn - Gia Định qua các thời kỳ.',
  image: 'https://mia.vn/media/uploads/blog-du-lich/bao-tang-lich-su-thanh-pho-ho-chi-minh-1-1692719389.jpg',
  sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/tin-chi-tiet/-/chi-tiet/bao-tang-lich-su-thanh-pho-ho-chi-minh-19126-2015.html'
},
 {
    id: 7,
    nameVi: 'Nhà hát Thành phố',
    nameEn: 'Saigon Opera House (Municipal Theatre)',
    category: 'Kiến trúc đô thị',
    address: '07 Công trường Lam Sơn, Quận 1, TP.HCM',
    period: '1898–1900',
    summary: 'Nhà hát opera theo phong cách Pháp cổ điển, một trong những công trình kiến trúc lâu đời nhất trung tâm Sài Gòn.',
    value: 'Chứng nhân lịch sử qua nhiều giai đoạn: từ nhà hát opera, trụ sở Hạ Nghị viện, đến nay là trung tâm biểu diễn nghệ thuật của thành phố.',
    highlight: 'Mặt tiền lấy cảm hứng từ bảo tàng Petit Palais (Paris); khánh thành đúng ngày 1/1/1900.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saigon-Opera-House-2007.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ho_Chi_Minh_City_Opera_House',
  },
  {
    id: 8,
    nameVi: 'Chợ Bến Thành',
    nameEn: 'Ben Thanh Market',
    category: 'Kiến trúc – thương mại',
    address: 'Đường Lê Lợi, phường Bến Thành, Quận 1, TP.HCM',
    period: '1912–1914',
    summary: 'Ngôi chợ trăm tuổi mang tính biểu tượng, được người Pháp xây dựng gần ga xe lửa Mỹ Tho để thay thế khu chợ cũ ven kênh.',
    value: 'Trung tâm thương mại lâu đời, phản ánh lịch sử phát triển đô thị Sài Gòn – Chợ Lớn qua hơn một thế kỷ.',
    highlight: 'Cổng Nam có tháp đồng hồ mang tính biểu tượng; lễ khánh thành năm 1914 kéo dài 3 ngày với hơn 100.000 người tham dự.',
    image: 'https://cdn3.ivivu.com/2022/10/cho_ben_thanh_ivivu.jpeg',
    sourceUrl: 'https://en.wikipedia.org/wiki/B%E1%BA%BFn_Th%C3%A0nh_Market',
  },
  {
    id: 9,
    nameVi: 'Trụ sở UBND Thành phố',
    nameEn: 'Ho Chi Minh City Hall (Hôtel de Ville)',
    category: 'Kiến trúc hành chính',
    address: '86 Lê Thánh Tôn, Quận 1, TP.HCM',
    period: '1898–1909',
    summary: 'Trụ sở hành chính mang phong cách kiến trúc châu Âu pha trộn Phục Hưng, Baroque và Art Nouveau, từng có tên Hôtel de Ville (Dinh Xã Tây) thời Pháp thuộc.',
    value: 'Di tích kiến trúc nghệ thuật cấp quốc gia (công nhận năm 2020), hiện là nơi làm việc của HĐND và UBND TP.HCM.',
    highlight: 'Do kiến trúc sư Fernand Gardès thiết kế, mô phỏng tòa thị chính Paris với tháp nhọn nhô cao ở chính giữa.',
    image: 'https://cdn3.ivivu.com/2023/08/%E1%BB%A7y-ban-nh%C3%A2n-d%C3%A2n-TPHCM-ivivu.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ho_Chi_Minh_City_Hall',
  },
  {
    id: 10,
    nameVi: 'Bảo tàng Mỹ thuật TP.HCM',
    nameEn: 'Ho Chi Minh City Museum of Fine Arts',
    category: 'Kiến trúc – bảo tàng',
    address: '97 Phó Đức Chính, Quận 1, TP.HCM',
    period: '1929–1934',
    summary: 'Nguyên là dinh thự của thương gia Hứa Bổn Hòa (chú Hỏa), sau này trở thành bảo tàng mỹ thuật lớn nhất phía Nam.',
    value: 'Nơi lưu giữ hơn 20.000 tác phẩm hội họa, điêu khắc và cổ vật, phản ánh dòng chảy mỹ thuật Việt Nam qua nhiều thời kỳ.',
    highlight: 'Tòa nhà pha trộn kiến trúc Pháp và Hoa, được công nhận di tích kiến trúc nghệ thuật cấp thành phố năm 2012.',
    image: 'https://static.vinwonders.com/production/bao-tang-my-thuat-thanh-pho-ho-chi-minh.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ho_Chi_Minh_City_Museum_of_Fine_Arts',
  },
  {
    id: 11,
    nameVi: 'Chùa Ngọc Hoàng',
    nameEn: 'Jade Emperor Pagoda',
    category: 'Kiến trúc tín ngưỡng',
    address: '73 Mai Thị Lựu, Quận 1, TP.HCM',
    period: 'Đầu thế kỷ XX (khoảng 1902–1909)',
    summary: 'Ngôi điện thờ Ngọc Hoàng Thượng đế do ông Lưu Minh (người Quảng Đông) xây dựng, mang đậm kiến trúc Trung Hoa.',
    value: 'Công trình kiến trúc nghệ thuật độc đáo cấp quốc gia (1994), điểm đến tâm linh nổi tiếng về cầu con, cầu duyên.',
    highlight: 'Cựu Tổng thống Mỹ Barack Obama từng ghé thăm chùa vào ngày 24/5/2016.',
    image: 'https://ticotravel.com.vn/wp-content/uploads/2022/05/chua-ngoc-hoang-8-1080x600.jpg', 
    sourceUrl: 'https://en.wikipedia.org/wiki/Jade_Emperor_Pagoda',
  },
  {
    id: 12,
    nameVi: 'Hội quán Tuệ Thành',
    nameEn: 'Tue Thanh Assembly Hall',
    category: 'Kiến trúc – tín ngưỡng người Hoa',
    address: '710 Nguyễn Trãi, Quận 5, TP.HCM',
    period: 'Khoảng năm 1760',
    summary: 'Hội quán do cộng đồng người Hoa gốc Quảng Châu (Tuệ Thành) góp sức xây dựng, vừa là nơi thờ tự vừa là trung tâm sinh hoạt cộng đồng.',
    value: 'Một trong những công trình lâu đời nhất của người Hoa tại Sài Gòn – Chợ Lớn, được xếp hạng di tích kiến trúc nghệ thuật cấp quốc gia năm 1993.',
    highlight: 'Vẫn lưu giữ nhiều hiện vật cổ, phù điêu gốm sứ và tượng gỗ có niên đại hàng trăm năm.',
    image: 'https://ticotravel.com.vn/wp-content/uploads/2024/08/hoi-quan-tue-thanh-12-768x614.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Thien_Hau_Temple_(Cholon)',
  },
  {
    id: 13,
    nameVi: 'Chùa Bà Thiên Hậu',
    nameEn: 'Thien Hau Temple',
    category: 'Kiến trúc – tín ngưỡng người Hoa',
    address: '710 Nguyễn Trãi, Quận 5, TP.HCM',
    period: 'Khoảng năm 1760',
    summary: 'Ngôi chùa thờ Thiên Hậu Thánh Mẫu (Lâm Mặc Nương) – vị nữ thần biển được cộng đồng người Hoa tôn kính, nằm liền kề Hội quán Tuệ Thành.',
    value: 'Không gian tín ngưỡng sôi động bậc nhất khu Chợ Lớn, đặc biệt vào dịp lễ Tết và vía Bà.',
    highlight: 'Trên nóc chùa là các phù điêu gốm mô tả tích truyện dân gian Trung Hoa, đặc trưng nghệ thuật gốm Cây Mai.',
    image: 'https://chonthieng.com/data/uploads/2022/04/1-Chua-Ba-Thien-Hau-nguon-vinpearl.com_.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Thien_Hau_Temple_(Cholon)',
  },
  {
  id: 14,
  nameVi: 'Lăng Ông Bà Chiểu',
  nameEn: 'Le Van Duyet Temple (Lang Ong)',
  category: 'Di tích lịch sử – tín ngưỡng',
  address: 'Số 1 đường Vũ Tùng, Phường 1, Quận Bình Thạnh, TP.HCM',
  period: '1832 (xây lăng), trùng tu lớn 1848–1949',
  summary: 'Khu lăng mộ và miếu thờ Tả quân Lê Văn Duyệt (1764–1832), Tổng trấn thành Gia Định, được xây ngay sau khi ông qua đời và trùng tu, mở rộng qua nhiều thời kỳ.',
  value: 'Miếu thờ có lịch sử lâu đời nhất tại TP.HCM, di tích lịch sử – văn hóa cấp quốc gia (công nhận năm 1989), gắn với lễ hội hát bội hằng năm.',
  highlight: 'Tên gọi "Lăng Ông Bà Chiểu" xuất phát từ vị trí lăng nằm sát chợ Bà Chiểu; khuôn viên rộng khoảng 18.500m² với 4 cổng ra 4 con đường.',
  image: 'https://hires.vn/cdn-cgi/imagedelivery/1m1rJdJLBoJbXbtIvke6Fg/b7d910b7-553b-4770-41ef-6c4851dbaf01/public', // TODO: thay ảnh thật của Lăng Ông
  sourceUrl: 'https://vi.wikipedia.org/wiki/L%C4%83ng_%C3%94ng_(B%C3%A0_Chi%E1%BB%83u)',
},
{
  id: 15,
  nameVi: 'Đình Thông Tây Hội',
  nameEn: 'Thong Tay Hoi Communal House',
  category: 'Kiến trúc – tín ngưỡng',
  address: '319 đường Thống Nhất, phường Thông Tây Hội, Quận Gò Vấp, TP.HCM',
  period: 'Khoảng 1679, xây lại kiên cố năm 1883',
  summary: 'Ngôi đình được xem là cổ nhất còn tồn tại ở vùng Gia Định – Sài Gòn và cả miền Nam, do những người di dân gốc Nghệ An lập nên.',
  value: 'Di tích kiến trúc nghệ thuật – lịch sử cấp quốc gia (công nhận năm 1998), nguồn tư liệu quý về cư dân vùng Gò Vấp thời khai hoang.',
  highlight: 'Tên gọi ghép từ hai làng Hạnh Thông Tây và An Hội sáp nhập năm 1944; cổng tam quan có đôi rồng gốm xanh đặc sắc.',
  image: 'https://vntravel.org.vn/uploads/images/2024/06/24/thiet-ke-chua-co-ten-8-1719199237.jpg', // TODO
  sourceUrl: 'https://vi.wikipedia.org/wiki/%C4%90%C3%ACnh_Th%C3%B4ng_T%C3%A2y_H%E1%BB%99i',
},
{
  id: 16,
  nameVi: 'Đình Bình Đông',
  nameEn: 'Binh Dong Communal House',
  category: 'Di tích lịch sử – tín ngưỡng',
  address: 'Cù lao Bà Tàng, đường Phạm Thế Hiển, Phường 7 (cũ), Quận 8, TP.HCM',
  period: 'Khoảng năm 1852',
  summary: 'Đình nằm trên cù lao Bà Tàng giữa kênh Đôi, ban đầu là nhà lá đơn sơ để dân làng hội họp, cúng lễ; nhận sắc phong của vua Tự Đức năm 1853.',
  value: 'Di tích lịch sử – văn hóa cấp quốc gia, gắn với hoạt động bí mật của Công hội đầu tiên của giai cấp công nhân Việt Nam do Tôn Đức Thắng thành lập (1920–1925).',
  highlight: 'Đình từng bị chiến tranh phá hủy nặng năm 1968, được trùng tu nhiều lần nhưng vẫn giữ kiến trúc đình Nam Bộ truyền thống.',
  image: 'https://static.vinwonders.com/production/Binh-Dong-Communal-House-in-Ho-Chi-Minh-City.jpeg', // TODO
  sourceUrl: 'https://www.vietnamplus.vn/dau-an-cong-hoi-bi-mat-sai-gon-tai-di-tich-lich-su-dinh-binh-dong-post519667.vnp',
},
{
  id: 17,
  nameVi: 'Lò gốm cổ Hưng Lợi',
  nameEn: 'Hung Loi Ancient Kiln',
  category: 'Di tích khảo cổ học',
  address: 'Phường Phú Định (trước là Phường 16, Quận 8), TP.HCM',
  period: 'Thế kỷ XVIII–XIX, khai quật 1997–1998',
  summary: 'Di tích khảo cổ học duy nhất trong khu vực nội thành TP.HCM được khai quật, thuộc xóm Lò Gốm ven kênh Ruột Ngựa, từng có khoảng 30 lò gốm hoạt động ở khu vực Chợ Lớn cuối thế kỷ XIX.',
  value: 'Di tích khảo cổ học cấp quốc gia (công nhận 25/4/1998), tư liệu quan trọng về nghề gốm và quá trình hình thành đô thị Sài Gòn – Chợ Lớn.',
  highlight: 'Lò có cấu trúc ba giai đoạn sản xuất chồng lên nhau, cho ra các sản phẩm từ lu, siêu, chậu đến gốm men nhiều màu; hiện di tích đang được quy hoạch tu bổ, phục hồi.',
  image: 'https://dobuon.vn/wp-content/uploads/2022/09/lo-gom-hung-loi-600x338.jpg', // TODO
  sourceUrl: 'https://vi.wikipedia.org/wiki/L%C3%B2_g%E1%BB%91m_c%E1%BB%95_H%C6%B0ng_L%E1%BB%A3i',
},
{
  id: 18,
  nameVi: 'Địa đạo Phú Thọ Hòa',
  nameEn: 'Phu Tho Hoa Tunnels',
  category: 'Di tích lịch sử',
  address: '139 đường Phú Thọ Hòa, Phường Phú Thọ Hòa, Quận Tân Phú, TP.HCM',
  period: 'Xây dựng từ năm 1947',
  summary: 'Hệ thống địa đạo đầu tiên ở khu vực Sài Gòn – Gia Định, khởi nguồn từ những chiếc hầm bí mật (hầm ếch) của quân dân thôn Lộc Hòa trong kháng chiến chống Pháp.',
  value: 'Di tích lịch sử cấp quốc gia (công nhận 28/6/1996), là căn cứ bám trụ, ém quân cho các trận đánh vào nội thành Sài Gòn trong kháng chiến chống Mỹ.',
  highlight: 'Hệ thống địa đạo dài hơn 10km, có 2 tầng, sâu 3–4m; một đoạn 100m được phục chế từ năm 1985 để phục vụ khách tham quan.',
  image: 'https://hotel84.com/hotel84-images/news/photo/dia-dao-phu-tho-hoa1.jpg', // TODO
  sourceUrl: 'https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Ba_%C4%91%E1%BA%A1o_Ph%C3%BA_Th%E1%BB%8D_H%C3%B2a',
},
{
  id: 19,
  nameVi: 'Khu trại giam Bệnh viện Chợ Quán',
  nameEn: 'Cho Quan Hospital Prison',
  category: 'Di tích lịch sử',
  address: '764 đường Võ Văn Kiệt, Phường 1, Quận 5, TP.HCM (trong khuôn viên Bệnh viện Bệnh Nhiệt đới)',
  period: 'Cuối thế kỷ XIX – đầu thế kỷ XX',
  summary: 'Nơi thực dân Pháp giam giữ những chiến sĩ cách mạng bị tra tấn đến lâm bệnh, dưới danh nghĩa "điều trị" trong khu nhà nhốt bệnh nhân tâm thần của Bệnh viện Chợ Quán.',
  value: 'Di tích lịch sử – văn hóa cấp quốc gia (công nhận 16/11/1988); nơi Tổng Bí thư đầu tiên của Đảng Cộng sản Việt Nam, đồng chí Trần Phú, bị giam giữ và hy sinh ngày 6/9/1931.',
  highlight: 'Kiến trúc trại giam hình chữ U vẫn còn khá nguyên vẹn với cửa sắt, xiềng xích và các khẩu hiệu đấu tranh khắc trên tường.',
  image: 'https://resource.kinhtedothi.vn/2023/04/19/1.jpg', // TODO
  sourceUrl: 'https://baovanhoa.vn/van-hoa/mo-cua-tham-quan-di-tich-khu-trai-giam-benh-vien-cho-quan-91911.html',
},
{
  id: 20,
  nameVi: 'Ngã ba Giồng',
  nameEn: 'Nga Ba Giong Memorial',
  category: 'Di tích lịch sử',
  address: '1460 đường Phan Văn Hớn, xã Xuân Thới Thượng, huyện Hóc Môn, TP.HCM',
  period: 'Sự kiện 1940, công nhận di tích năm 2002',
  summary: 'Trường bắn do thực dân Pháp lập ra sau cuộc Khởi nghĩa Nam Kỳ (22–23/11/1940) để hành quyết các chiến sĩ cách mạng và đồng bào yêu nước.',
  value: 'Di tích lịch sử cấp quốc gia (Quyết định số 39/QĐ-BVHTT, 30/12/2002); nơi Tổng Bí thư Nguyễn Văn Cừ và ông Phan Đăng Lưu bị xử bắn.',
  highlight: 'Còn được gọi là "Ngã Ba Giồng Bằng Lăng" vì mọc nhiều cây bằng lăng cổ thụ; hiện là Khu tưởng niệm Liệt sĩ rộng hơn 7ha.',
  image: 'https://tse1.mm.bing.net/th/id/OIP.jrvxx0iu5VevYrX3TgVALwHaFj?r=0&pid=Api&h=220&P=0', // TODO
  sourceUrl: 'https://cand.com.vn/Tieu-diem-van-hoa/Nga-Ba-Giong-noi-ghi-dau-lich-su-oai-hung-i509576/',
},
{
  id: 21,
  nameVi: 'Di tích Rừng Sác',
  nameEn: 'Rung Sac Special Forces Base',
  category: 'Di tích lịch sử',
  address: 'Đường Rừng Sác, xã Long Hòa, huyện Cần Giờ, TP.HCM',
  period: 'Hoạt động 1966–1975, công nhận di tích năm 2004',
  summary: 'Căn cứ của Đoàn 10 Đặc công Rừng Sác — lực lượng chiến đấu trong vùng rừng ngập mặn hiểm trở nhằm khống chế đường tiếp vận thủy của Mỹ vào Sài Gòn.',
  value: 'Di tích lịch sử cấp quốc gia, nằm trong Khu dự trữ sinh quyển thế giới Cần Giờ được UNESCO công nhận năm 2000.',
  highlight: 'Đặc công Rừng Sác thực hiện hơn 400 trận đánh trong điều kiện khắc nghiệt (bom đạn, cá sấu); khu di tích tái hiện nhà quân y, xưởng quân giới, đài quan sát.',
  image: 'https://lh7-us.googleusercontent.com/9vhF5I9sqpVdZrS3CulYKr1F5wIwJM7b1IH91urwrJZU-AzBDBwuyBlhduaoeCV-rbx18FZlALzyksHzvndtGZokesVRRsdtojIWtdFhlSXiz1e0o7tgXkNeZHEdqZB1Z2Ftua7m_nf00d0jxRx7ZPw', // TODO
  sourceUrl: 'https://cangio.hochiminhcity.gov.vn/cam-nang-du-lich/-/asset_publisher/wwpJo03VZm5w/content/di-tich-lich-su-chien-khu-rung-sac-can-gio',
},
{
  id: 22,
  nameVi: 'Địa đạo Củ Chi',
  nameEn: 'Cu Chi Tunnels',
  category: 'Di tích lịch sử',
  address: 'Khu Bến Dược: ấp Phú Hiệp, xã Phú Mỹ Hưng; Khu Bến Đình: ấp Bến Đình, xã Nhuận Đức — huyện Củ Chi, TP.HCM',
  period: 'Xây dựng 1946–1948, mở rộng qua hai cuộc kháng chiến',
  summary: 'Hệ thống đường hầm phòng thủ dưới lòng đất dài hơn 200km, gồm hầm ở, hầm hội họp, trạm y tế, bếp Hoàng Cầm, là căn cứ của Khu ủy và Bộ Tư lệnh Quân khu Sài Gòn – Chợ Lớn – Gia Định.',
  value: 'Di tích lịch sử văn hóa cấp quốc gia (Bến Dược: 1979; Bến Đình: 2004), được xếp hạng Di tích quốc gia đặc biệt năm 2016.',
  highlight: 'Được xem là một trong những hệ thống đường hầm quân sự độc đáo và dài nhất, thu hút đông du khách trong và ngoài nước nhất trong các di tích chiến tranh ở TP.HCM.',
  image: 'https://tse3.mm.bing.net/th/id/OIP.BwqZcUqXFzCOg8gmMo743AHaFH?r=0&pid=Api&h=220&P=0', // TODO
  sourceUrl: 'https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Ba_%C4%91%E1%BA%A1o_C%E1%BB%A7_Chi',
},
{
  id: 23,
  nameVi: 'Bến Bình Đông',
  nameEn: 'Binh Dong Wharf',
  category: 'Kiến trúc đô thị',
  address: 'Đường Bến Bình Đông, dọc kênh Tàu Hủ, Quận 8, TP.HCM',
  period: 'Hình thành từ thế kỷ XIX',
  summary: 'Bến thuyền cổ dọc kênh Tàu Hủ, từng được gọi là "đại lộ Tàu Hủ" — đầu mối giao thương lúa gạo, nông sản sầm uất giữa Sài Gòn – Chợ Lớn và miền Tây Nam Bộ.',
  value: 'Không gian lưu giữ kiến trúc phố "trên bến dưới thuyền" đặc trưng Nam Bộ, kết hợp nét Đông – Tây trong các dãy nhà cổ mặt tiền hẹp.',
  highlight: 'Nổi tiếng nhất với chợ hoa Tết "trên bến dưới thuyền" mỗi năm, khi ghe thuyền chở hoa từ miền Tây tập kết bán ngay trên kênh.',
  image: 'https://tse3.mm.bing.net/th/id/OIP.WVVJnVCPicDQyL9VwUEXogHaFY?r=0&pid=Api&h=220&P=0', // TODO
  sourceUrl: 'https://vnexpress.net/ben-binh-dong-tu-ben-hoa-tet-den-diem-hen-dau-tu-moi-4191674.html',
},
{
  id: 24,
  nameVi: 'Chợ Lớn',
  nameEn: 'Cholon (Chinatown)',
  category: 'Kiến trúc – khu vực đô thị',
  address: 'Khu vực Quận 5, Quận 6 và một phần Quận 10, Quận 11, TP.HCM',
  period: 'Hình thành thế kỷ XVII–XIX',
  summary: 'Khu phố người Hoa lớn nhất Việt Nam, hình thành từ làng Minh Hương thế kỷ XVII và phát triển mạnh khi người Hoa từ Cù Lao Phố (Biên Hòa) chạy đến lánh nạn cuối thế kỷ XVIII.',
  value: 'Từng là một thành phố độc lập (Pháp công nhận năm 1865) trước khi sáp nhập với Sài Gòn năm 1931–1932; nơi tập trung hội quán, chùa miếu và kiến trúc nhà ống người Hoa.',
  highlight: 'Trung tâm là chợ Bình Tây (Chợ Lớn mới) do thương gia Quách Đàm xây năm 1928, cùng nhiều hội quán – chùa cổ như Tuệ Thành, Thiên Hậu, Nghĩa An.',
  image: 'https://erci.edu.vn/upload/2025/06/lich-su-cho-lon-sai-gon-3.webp', // TODO
  sourceUrl: 'https://vnexpress.net/cho-lon-xua-va-nay-4056243.html',
},
{
  id: 25,
  nameVi: 'Nhà thờ Huyện Sĩ',
  nameEn: 'Huyen Sy Church (St. Philippe Church)',
  category: 'Kiến trúc tôn giáo',
  address: 'Số 1 đường Tôn Thất Tùng (góc Nguyễn Trãi), Quận 1, TP.HCM',
  period: '1902–1905',
  summary: 'Nhà thờ mang tên chính thức Thánh Philipphê Tông đồ, do ông bà Lê Phát Đạt (Huyện Sỹ) — một trong những người giàu nhất Nam Kỳ — hiến đất và 1/7 gia tài để xây dựng.',
  value: 'Một trong những công trình Công giáo lâu đời và tiêu biểu nhất Sài Gòn, kết hợp kiến trúc Gothic châu Âu với đá granite Biên Hòa.',
  highlight: 'Tháp chuông cao 57m với 4 quả chuông đúc tại Pháp; phía sau cung thánh có khu mộ đá cẩm thạch của vợ chồng ông Huyện Sỹ — ông ngoại của Nam Phương hoàng hậu.',
  image: 'https://tse2.mm.bing.net/th/id/OIP.xf6r7U7_onBPmF6OVGn4JgHaE8?r=0&pid=Api&h=220&P=0', // TODO
  sourceUrl: 'https://vi.wikipedia.org/wiki/Nh%C3%A0_th%E1%BB%9D_Huy%E1%BB%87n_S%E1%BB%B9',
},
{
  id: 26,
  nameVi: 'Chùa Giác Lâm',
  nameEn: 'Giac Lam Pagoda',
  category: 'Kiến trúc tín ngưỡng',
  address: '565 đường Lạc Long Quân, Phường 10, Quận Tân Bình, TP.HCM',
  period: '1744',
  summary: 'Một trong những ngôi chùa cổ nhất tại TP.HCM, do cư sĩ Lý Thụy Long xây dựng dưới thời chúa Nguyễn Phúc Khoát; là tổ đình của phái Thiền Lâm Tế tông ở Nam Bộ.',
  value: 'Di tích lịch sử – văn hóa cấp quốc gia (công nhận năm 1988), giữ kỷ lục ngôi chùa có số lượng đĩa kiểu trang trí nhiều nhất Việt Nam (hơn 7.000 chiếc).',
  highlight: 'Cổng tam quan xây năm 1955; Bảo tháp Xá Lợi 7 tầng hình lục giác hoàn thành năm 1994.',
  image: 'https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/03_2021/chua-giac-lam-sai-gon-lich-su.jpg', // TODO
  sourceUrl: 'https://www.xanhsm.com/news/chua-giac-lam',
},
{
  id: 27,
  nameVi: 'Khu tưởng niệm các Vua Hùng',
  nameEn: 'Hung Kings Memorial Temple',
  category: 'Kiến trúc – tín ngưỡng',
  address: 'Công viên Lịch sử – Văn hóa Dân tộc, đường 16, khu phố Vĩnh Thuận, Phường Long Bình, TP. Thủ Đức, TP.HCM',
  period: 'Khởi công đầu những năm 2000',
  summary: 'Đền tưởng niệm các Vua Hùng nằm trên một quả đồi cao hơn 20m trong Công viên Lịch sử – Văn hóa Dân tộc rộng hơn 400ha, nơi tổ chức lễ Giỗ Tổ Hùng Vương hằng năm tại TP.HCM.',
  value: 'Công trình văn hóa – tâm linh quy mô lớn, nơi giáo dục truyền thống "hướng về nguồn" cho các thế hệ, đặc biệt vào dịp Giỗ Tổ (10/3 âm lịch).',
  highlight: 'Quảng trường 4.000m² mô phỏng trống đồng Đông Sơn; đường tre dài 360m dẫn lên đền với văn bia khắc trên đá hoa cương đen do GS. Vũ Khiêu phụng thảo.',
  image: 'https://media.baobinhphuoc.com.vn/Content/UploadFiles/EditorFiles/images/2019/Quy2/denhung-17-1554729993r680x012042019041709.jpg', // TODO
  sourceUrl: 'https://vi.wikipedia.org/wiki/C%C3%B4ng_vi%C3%AAn_L%E1%BB%8Bch_s%E1%BB%AD_%E2%80%93_V%C4%83n_h%C3%B3a_D%C3%A2n_t%E1%BB%99c',
},]


export const heroImage = '/images/hinh_anh_duong_sach/duong_sach.jpg';

// Reduced from 4 to 2: keep the large bookshelf photo + the two friends reading together
export const aboutGalleryImages = [
  '/images/hinh_anh_duong_sach/duong-sach-1.jpg',
];

export const heritagePreviewImage = 'https://images.pexels.com/photos/29820533/pexels-photo-29820533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const visitorExperienceImages = {
  checkin: '/images/hinh_anh_duong_sach/cong_vao.jpg',
  coffee: '/images/hinh_anh_duong_sach/duong-sach-nhin-ra-nha-tho-duc-ba.jpg',
  kids: '/images/hinh_anh_duong_sach/duong-sach-6.jpg',
};

export const heritageImages = {
  hero: 'https://images.pexels.com/photos/25949836/pexels-photo-25949836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gallery: [
    'https://images.pexels.com/photos/11791584/pexels-photo-11791584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/34669353/pexels-photo-34669353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/20813525/pexels-photo-20813525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

export const mapPreviewImage = '/images/hinh_anh_duong_sach/duong-sach-2.jpg';
