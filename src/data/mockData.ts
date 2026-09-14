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
    image: 'https://images.pexels.com/photos/27854754/pexels-photo-27854754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/29614944/pexels-photo-29614944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/3862153/pexels-photo-3862153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/34750570/pexels-photo-34750570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/13279386/pexels-photo-13279386.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/27854757/pexels-photo-27854757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/8045884/pexels-photo-8045884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/5499564/pexels-photo-5499564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/11565595/pexels-photo-11565595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/33719415/pexels-photo-33719415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/13919952/pexels-photo-13919952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    image: 'https://images.pexels.com/photos/3947517/pexels-photo-3947517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
  { id: 0, nameVi: 'Di sản số 01', nameEn: 'Heritage #01' },
  { id: 1, nameVi: 'Di sản số 02', nameEn: 'Heritage #02' },
  { id: 2, nameVi: 'Di sản số 03', nameEn: 'Heritage #03' },
  { id: 3, nameVi: 'Di sản số 04', nameEn: 'Heritage #04' },
  { id: 4, nameVi: 'Di sản số 05', nameEn: 'Heritage #05' },
];

export const heroImage = 'https://images.pexels.com/photos/12898231/pexels-photo-12898231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

// Reduced from 4 to 2: keep the large bookshelf photo + the two friends reading together
export const aboutGalleryImages = [
  'https://images.pexels.com/photos/34149049/pexels-photo-34149049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export const heritagePreviewImage = 'https://images.pexels.com/photos/29820533/pexels-photo-29820533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const visitorExperienceImages = {
  checkin: 'https://images.pexels.com/photos/36236916/pexels-photo-36236916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  coffee: 'https://images.pexels.com/photos/433113/pexels-photo-433113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kids: 'https://images.pexels.com/photos/19875334/pexels-photo-19875334.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const heritageImages = {
  hero: 'https://images.pexels.com/photos/25949836/pexels-photo-25949836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gallery: [
    'https://images.pexels.com/photos/11791584/pexels-photo-11791584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/34669353/pexels-photo-34669353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/20813525/pexels-photo-20813525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

export const mapPreviewImage = 'https://images.pexels.com/photos/36425755/pexels-photo-36425755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
