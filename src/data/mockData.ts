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
  { id: 1, nameVi: 'Bưu điện Trung tâm Sài Gòn', nameEn: 'Saigon Central Post Office', category: 'Kiến trúc đô thị', address: '02 Công trường Công xã Paris, TP.HCM', period: 'Thế kỷ XIX', summary: 'Công trình bưu chính tiêu biểu ở trung tâm thành phố, nằm cạnh Nhà thờ Đức Bà.', value: 'Không gian lưu giữ dấu ấn kiến trúc và lịch sử liên lạc của Sài Gòn.', highlight: 'Hai bản đồ lịch sử năm 1892 và 1936 vẫn được lưu giữ trong tòa nhà.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Buu_dien_2.jpg/1200px-Buu_dien_2.jpg', sourceUrl: 'https://vnpost.vn/vi/hoat-dong-nganh/buu-dien-trung-tam-thanh-pho-ho-chi-minh-mot-diem-den-hap-dan' },
  { id: 2, nameVi: 'Nhà thờ Đức Bà Sài Gòn', nameEn: 'Notre-Dame Cathedral Basilica of Saigon', category: 'Kiến trúc tôn giáo', address: '01 Công xã Paris, TP.HCM', period: '1863–1880', summary: 'Biểu tượng kiến trúc tôn giáo nổi bật tại khu vực trung tâm Sài Gòn.', value: 'Gắn với diện mạo đô thị lịch sử và không gian công cộng quanh Công xã Paris.', highlight: 'Công trình là một điểm mốc quen thuộc của trung tâm thành phố.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/HCMC_Notre_Dame_Cathedral.jpg', sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/documents/10184/265325/Danh%2Bs%C3%A1ch%2Bdi%2Bt%C3%ADch%2B%C4%91%C3%A3%2BQ%C4%90%2Bx%E1%BA%BFp%2Bh%E1%BA%A1ng%2B%C4%91%E1%BA%BFn%2Bth%C3%A1ng%2B5%2B2017.pdf/948c1ef9-4d46-43b6-af76-c1e616dcf54d' },
  { id: 3, nameVi: 'Dinh Độc Lập', nameEn: 'Independence Palace', category: 'Di tích lịch sử', address: '135 Nam Kỳ Khởi Nghĩa, TP.HCM', period: 'Thế kỷ XX', summary: 'Địa điểm gắn với nhiều dấu mốc của lịch sử Việt Nam hiện đại.', value: 'Di tích quốc gia đặc biệt, lưu giữ ký ức về thời khắc thống nhất đất nước.', highlight: 'Không gian trưng bày kể lại lịch sử của tòa dinh và các sự kiện quan trọng.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/20190923_Independence_Palace-10.jpg', sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/documents/10184/265325/Danh%2Bs%C3%A1ch%2Bdi%2Bt%C3%ADch%2B%C4%91%C3%A3%2BQ%C4%90%2Bx%E1%BA%BFp%2Bh%E1%BA%A1ng%2B%C4%91%E1%BA%BFn%2Bth%C3%A1ng%2B5%2B2017.pdf/948c1ef9-4d46-43b6-af76-c1e616dcf54d' },
  { id: 4, nameVi: 'Bến Nhà Rồng', nameEn: 'Nha Rong Wharf', category: 'Di tích lịch sử', address: '01 Nguyễn Tất Thành, TP.HCM', period: 'Thế kỷ XIX', summary: 'Địa điểm gắn với hành trình ra đi tìm đường cứu nước của Nguyễn Tất Thành năm 1911.', value: 'Không gian giáo dục lịch sử, hiện là một phần của Bảo tàng Hồ Chí Minh.', highlight: 'Ngày 05/06/1911, Nguyễn Tất Thành rời bến cảng trên tàu Latouche-Tréville.', image: 'https://images.pexels.com/photos/30802123/pexels-photo-30802123.jpeg?auto=compress&cs=tinysrgb&w=1200', sourceUrl: 'https://baotanghochiminh.vn/chuyen-di-lich-su.htm' },
  { id: 5, nameVi: 'Bảo tàng Thành phố Hồ Chí Minh', nameEn: 'Ho Chi Minh City Museum', category: 'Kiến trúc – bảo tàng', address: '65 Lý Tự Trọng, TP.HCM', period: 'Thế kỷ XIX', summary: 'Tòa nhà bảo tàng giới thiệu lịch sử, văn hóa và con người Thành phố Hồ Chí Minh.', value: 'Công trình được công nhận là di tích kiến trúc nghệ thuật quốc gia năm 2012.', highlight: 'Trưng bày từ thiên nhiên, khảo cổ đến lịch sử Sài Gòn – Gia Định.', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/B%E1%BA%A3o_t%C3%A0ng_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh_7.jpg/1280px-B%E1%BA%A3o_t%C3%A0ng_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh_7.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail', sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/tin-chi-tiet/-/chi-tiet/bao-tang-thanh-pho-ho-chi-minh-19637-2015.html' },
  { id: 6, nameVi: 'Bảo tàng Lịch sử TP.HCM', nameEn: 'Ho Chi Minh City History Museum', category: 'Kiến trúc – bảo tàng', address: '02 Nguyễn Bỉnh Khiêm, TP.HCM', period: 'Thế kỷ XX', summary: 'Bảo tàng nghiên cứu, bảo tồn và giới thiệu lịch sử Việt Nam cùng các nước trong khu vực.', value: 'Nơi kết nối tư liệu, hiện vật và hoạt động giáo dục di sản.', highlight: 'Nằm trong khu vực Thảo Cầm Viên, gần nhiều điểm văn hóa trung tâm.', image: 'https://images.pexels.com/photos/257621/pexels-photo-257621.jpeg?auto=compress&cs=tinysrgb&w=1200', sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/tin-chi-tiet/-/chi-tiet/bao-tang-lich-su-thanh-pho-ho-chi-minh-19126-2015.html' },
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
    image: 'https://cdn.justfly.vn/1050x700/media/c5/77/9ca5-96c9-453a-82f3-31522933b55e.jpg',
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
  ...['Lăng Ông Bà Chiểu', 'Đình Thông Tây Hội', 'Đình Bình Đông', 'Lò gốm cổ Hưng Lợi', 'Địa đạo Phú Thọ Hòa', 'Khu trại giam Bệnh viện Chợ Quán', 'Ngã ba Giồng', 'Di tích Rừng Sác', 'Địa đạo Củ Chi', 'Bến Bình Đông', 'Chợ Lớn', 'Nhà thờ Huyện Sĩ', 'Chùa Giác Lâm', 'Khu tưởng niệm các Vua Hùng'].map((nameVi, index) => ({ id: index + 7, nameVi, nameEn: nameVi, category: index < 4 ? 'Kiến trúc – tín ngưỡng' : 'Di tích lịch sử – văn hóa', address: 'Thành phố Hồ Chí Minh', period: 'Di sản đô thị Sài Gòn – TP.HCM', summary: `${nameVi} là một điểm đến trong tuyến khám phá di sản đô thị, phản ánh lớp trầm tích lịch sử và văn hóa của thành phố.`, value: 'Điểm dừng giúp kết nối câu chuyện cộng đồng, kiến trúc và ký ức địa phương.', highlight: 'Mở trang này qua mã QR để đọc tư liệu, ghi chú tham quan và nội dung được cập nhật.', image: 'https://images.pexels.com/photos/25949836/pexels-photo-25949836.jpeg?auto=compress&cs=tinysrgb&w=1200', sourceUrl: 'https://svhtt.hochiminhcity.gov.vn/documents/10184/265325/Danh%2Bs%C3%A1ch%2Bdi%2Bt%C3%ADch%2B%C4%91%C3%A3%2BQ%C4%90%2Bx%E1%BA%BFp%2Bh%E1%BA%A1ng%2B%C4%91%E1%BA%BFn%2Bth%C3%A1ng%2B5%2B2017.pdf/948c1ef9-4d46-43b6-af76-c1e616dcf54d' })),
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
