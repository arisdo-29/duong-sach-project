export interface Stall {
  id: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  descVi: string;
  descEn: string;
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
  type: 'stall' | 'amenity' | 'heritage' | 'parking' | 'cafe';
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
    id: 'kimdong',
    nameVi: 'Gian hàng Kim Đồng',
    nameEn: 'Kim Đồng Stall',
    categoryVi: 'Văn học thiếu nhi',
    categoryEn: 'Children\'s Literature',
    descVi: 'Văn học thiếu nhi và truyện tranh — gian hàng thân thiện với các bạn nhỏ.',
    descEn: 'Children\'s literature & comics — a kid-friendly stall.',
    image: 'https://images.pexels.com/photos/34708262/pexels-photo-34708262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'nhanam',
    nameVi: 'Gian hàng Nhã Nam',
    nameEn: 'Nhã Nam Stall',
    categoryVi: 'Văn học trong & ngoài nước',
    categoryEn: 'Vietnamese & World Literature',
    descVi: 'Văn học trong và ngoài nước — những ấn bản đẹp và hiếm.',
    descEn: 'Vietnamese & world literature — beautiful and rare editions.',
    image: 'https://images.pexels.com/photos/3747461/pexels-photo-3747461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'thaiha',
    nameVi: 'Gian hàng Thái Hà',
    nameEn: 'Thái Hà Stall',
    categoryVi: 'Sách kỹ năng & kinh doanh',
    categoryEn: 'Skills & Business Books',
    descVi: 'Sách kỹ năng và kinh doanh — phát triển bản thân mỗi ngày.',
    descEn: 'Skills & business books — personal development every day.',
    image: 'https://images.pexels.com/photos/20774772/pexels-photo-20774772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    locationVi: 'Khu vui chơi thiếu nhi',
    locationEn: 'Kids\' play area',
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
    locationVi: 'Khu triển lãm',
    locationEn: 'Exhibition area',
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
  // Parking (blue)
  { id: 0, label: 'P1', type: 'parking', nameVi: 'Bãi giữ xe Diamond Plaza', nameEn: 'Diamond Plaza Parking', descVi: '', descEn: '', x: 12, y: 18, addressVi: '34 Lê Duẩn, P. Bến Nghé, Q.1', addressEn: '34 Lê Duẩn, Bến Nghé Ward, Dist. 1', capacity: '1.000 xe', hoursVi: '9:30 – 22:00', hoursEn: '9:30 AM – 10:00 PM' },
  { id: 1, label: 'P2', type: 'parking', nameVi: 'Bãi giữ xe đường sách – Hai Bà Trưng', nameEn: 'Book Street Parking – Hai Bà Trưng', descVi: '', descEn: '', x: 8, y: 45, addressVi: 'Góc Nguyễn Văn Bình & Hai Bà Trưng', addressEn: 'Corner of Nguyễn Văn Bình & Hai Bà Trưng', capacity: '200 xe', hoursVi: '8:00 – 22:00', hoursEn: '8:00 AM – 10:00 PM' },
  { id: 2, label: 'P3', type: 'parking', nameVi: 'Bãi giữ xe đường sách Nguyễn Văn Bình', nameEn: 'Book Street Parking – Nguyễn Văn Bình', descVi: '', descEn: '', x: 88, y: 15, addressVi: 'Góc Nguyễn Văn Bình & Công Xã Paris', addressEn: 'Corner of Nguyễn Văn Bình & Công Xã Paris', capacity: '200 xe', hoursVi: '8:00 – 22:00', hoursEn: '8:00 AM – 10:00 PM' },
  { id: 3, label: 'P4', type: 'parking', nameVi: 'Bãi giữ xe Bưu điện thành phố', nameEn: 'City Post Office Parking', descVi: '', descEn: '', x: 92, y: 50, addressVi: 'Cạnh Bưu điện TP', addressEn: 'Next to City Post Office', capacity: '60 xe', hoursVi: '7:00 – 21:30', hoursEn: '7:00 AM – 9:30 PM' },
  { id: 4, label: 'P5', type: 'parking', nameVi: 'Bãi giữ xe đường Lê Duẩn', nameEn: 'Lê Duẩn Street Parking', descVi: '', descEn: '', x: 15, y: 75, addressVi: 'Đường Lê Duẩn', addressEn: 'Lê Duẩn Street', capacity: '2.000 xe', hoursVi: '7:00 – 23:00', hoursEn: '7:00 AM – 11:00 PM' },

  // Stalls (green)
  { id: 5, label: 'S1', type: 'stall', nameVi: 'Gian hàng Kim Đồng', nameEn: 'Kim Đồng Stall', descVi: 'Văn học thiếu nhi và truyện tranh.', descEn: 'Children\'s literature & comics.', x: 28, y: 30, addressVi: 'Hơn 20 gian hàng xuất bản dọc tuyến đường', addressEn: '20+ publisher stalls line the street' },
  { id: 6, label: 'S2', type: 'stall', nameVi: 'Gian hàng Nhã Nam', nameEn: 'Nhã Nam Stall', descVi: 'Văn học trong & ngoài nước.', descEn: 'Vietnamese & world literature.', x: 40, y: 42 },
  { id: 7, label: 'S3', type: 'stall', nameVi: 'Gian hàng Thái Hà', nameEn: 'Thái Hà Stall', descVi: 'Sách kỹ năng & kinh doanh.', descEn: 'Skills & business books.', x: 50, y: 35 },
  { id: 8, label: 'S4', type: 'stall', nameVi: 'Gian hàng Alphabooks', nameEn: 'Alphabooks Stall', descVi: 'Kinh tế & phát triển bản thân.', descEn: 'Economics & self-development.', x: 58, y: 48 },
  { id: 9, label: 'S5', type: 'stall', nameVi: 'Gian hàng Phương Nam', nameEn: 'Phương Nam Stall', descVi: 'Sách giáo khoa & tham khảo.', descEn: 'Textbooks & reference books.', x: 68, y: 38 },
  { id: 10, label: 'S6', type: 'stall', nameVi: 'Gian hàng Fahasa', nameEn: 'Fahasa Stall', descVi: 'Sách ngoại văn & văn phòng phẩm.', descEn: 'Foreign books & stationery.', x: 35, y: 55 },

  // Cafes (brown)
  { id: 11, label: 'C1', type: 'cafe', nameVi: 'Phương Nam Coffee Book', nameEn: 'Phương Nam Coffee Book', descVi: 'Không gian thoáng mát, hiện đại, phù hợp ngồi đọc sách.', descEn: 'Bright, modern space, great for reading.', x: 45, y: 62 },
  { id: 12, label: 'C2', type: 'cafe', nameVi: 'Bản Coffee', nameEn: 'Bản Coffee', descVi: 'Không gian thoáng mát, hiện đại, phù hợp ngồi đọc sách.', descEn: 'Bright, modern space, great for reading.', x: 72, y: 58 },

  // Amenities (purple)
  { id: 13, label: 'A1', type: 'amenity', nameVi: 'Góc check-in', nameEn: 'Photo corner', descVi: 'Không gian thiết kế độc đáo, lý tưởng để chụp ảnh.', descEn: 'Uniquely designed, perfect for photos.', x: 55, y: 70 },
  { id: 14, label: 'A2', type: 'amenity', nameVi: 'Khu triển lãm sách', nameEn: 'Book exhibition area', descVi: 'Nơi diễn ra triển lãm, hội thảo giao lưu tác giả – độc giả.', descEn: 'Hosts exhibitions and author talks.', x: 30, y: 68 },
  { id: 15, label: 'A3', type: 'amenity', nameVi: 'Khu vui chơi thiếu nhi', nameEn: 'Kids\' play area', descVi: 'Không gian trải nghiệm, trò chơi và truyện tranh cho trẻ em.', descEn: 'Play area with games and comics for kids.', x: 80, y: 72 },

  // Heritage (gold)
  { id: 16, label: 'H1', type: 'heritage', nameVi: 'Di sản văn hóa Thủ Đức', nameEn: 'Thủ Đức Heritage Site', descVi: 'Di sản văn hóa — điểm tham quan lịch sử tại Thủ Đức.', descEn: 'Heritage site — historical visit point in Thủ Đức.', x: 62, y: 25 },
];

export const heritageSites: HeritageSite[] = [
  { id: 0, nameVi: 'Di sản số 01', nameEn: 'Heritage #01' },
  { id: 1, nameVi: 'Di sản số 02', nameEn: 'Heritage #02' },
  { id: 2, nameVi: 'Di sản số 03', nameEn: 'Heritage #03' },
  { id: 3, nameVi: 'Di sản số 04', nameEn: 'Heritage #04' },
  { id: 4, nameVi: 'Di sản số 05', nameEn: 'Heritage #05' },
];

export const heroImage = 'https://images.pexels.com/photos/12898231/pexels-photo-12898231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const aboutGalleryImages = [
  'https://images.pexels.com/photos/34149049/pexels-photo-34149049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2875855/pexels-photo-2875855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2079452/pexels-photo-2079452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10638213/pexels-photo-10638213.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

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
