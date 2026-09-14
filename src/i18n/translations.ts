export type Lang = 'vi' | 'en';

export const translations = {
  // Header / Nav
  brandName: { vi: 'ĐƯỜNG SÁCH', en: 'ĐƯỜNG SÁCH' },
  brandTagline: { vi: 'Phố sách văn hóa TP.HCM', en: 'HCMC Book Street' },
  navHome: { vi: 'Trang chủ', en: 'Home' },
  navStalls: { vi: 'Gian hàng', en: 'Stalls' },
  navEvents: { vi: 'Sự kiện', en: 'Events' },
  navMap: { vi: 'Bản đồ', en: 'Map' },
  navHeritage: { vi: 'Di sản', en: 'Heritage' },
  navFeedback: { vi: 'Góp ý', en: 'Feedback' },
  navAssistant: { vi: 'Trợ lý AI', en: 'AI Assistant' },
  searchPlaceholder: {
    vi: 'Tìm gian hàng, sách hoặc sự kiện...',
    en: 'Search stalls, books or events...',
  },

  // Hero
  heroHeadline: {
    vi: 'ĐƯỜNG SÁCH — NƠI MỖI TRANG SÁCH LÀ MỘT CUỘC DẠO CHƠI',
    en: 'BOOK STREET — WHERE EVERY PAGE IS A WALK WORTH TAKING',
  },
  heroSubtext: {
    vi: 'Không gian văn hóa đọc giữa lòng thành phố, nơi sách, cà phê và những câu chuyện gặp nhau mỗi ngày.',
    en: 'A cultural reading space in the heart of the city, where books, coffee and stories meet every day.',
  },
  heroCtaEvents: { vi: 'Xem lịch sự kiện', en: 'View events' },
  heroCtaMap: { vi: 'Khám phá bản đồ', en: 'Explore the map' },

  // Quick info strip
  quickInfoHours: { vi: 'Giờ mở cửa: 08:00 – 22:00 hằng ngày', en: 'Open daily 8:00–22:00' },
  quickInfoStalls: { vi: 'Hơn 20 gian hàng xuất bản', en: '20+ publisher stalls' },
  quickInfoParking: { vi: '5 bãi giữ xe quanh khu vực', en: '5 nearby parking areas' },
  quickInfoFree: { vi: 'Miễn phí vào cửa', en: 'Free entry' },

  // About section
  aboutTitle: { vi: 'Về ĐƯỜNG SÁCH', en: 'ABOUT ĐƯỜNG SÁCH' },
  aboutP1: {
    vi: 'Đường Sách TP.HCM là con đường sách đầu tiên của Việt Nam, quy tụ hơn 20 gian hàng của các đơn vị xuất bản lớn như Kim Đồng, Nhã Nam, Thái Hà, Alphabooks. Giữa nhịp sống đô thị, đây là nơi bạn có thể chậm lại bên một ly cà phê, lật giở những trang sách mới, hoặc tìm lại một ấn bản cũ hiếm.',
    en: 'Đường Sách HCMC is Vietnam\'s first book street, bringing together over 20 stalls from major publishers like Kim Đồng, Nhã Nam, Thái Hà, and Alphabooks. Amid the rhythm of city life, this is where you can slow down with a cup of coffee, flip through new pages, or rediscover a rare old edition.',
  },
  aboutP2: {
    vi: 'Không chỉ là nơi mua sách, Đường Sách là không gian cộng đồng — nơi các tác giả gặp độc giả, nơi trẻ em làm quen với văn hóa đọc, và nơi những sự kiện văn hóa diễn ra đều đặn mỗi tuần.',
    en: 'More than a place to buy books, Đường Sách is a community space — where authors meet readers, where children discover the joy of reading, and where cultural events take place every week.',
  },
  aboutP3: {
    vi: 'Từ sáng sớm đến đêm khuya, con đường sống cùng tiếng cười của trẻ em, tiếng nhạc nhẹ từ quán cà phê góc, và mùi giấy mới từ những cuốn sách vừa mở.',
    en: 'From early morning to late night, the street comes alive with children\'s laughter, soft music from the corner café, and the scent of fresh pages from newly opened books.',
  },

  // Stalls
  stallsTitle: { vi: 'GIAN HÀNG NỔI BẬT', en: 'FEATURED STALLS' },
  stallsSubtitle: {
    vi: 'Hơn 20 gian hàng xuất bản dọc tuyến đường',
    en: '20+ publisher stalls line the street',
  },
  stall: { vi: 'Gian hàng', en: 'Stall' },
  bookCategory: { vi: 'Chủ đề sách', en: 'Book category' },
  viewAllStalls: { vi: 'Xem tất cả gian hàng', en: 'View all stalls' },

  // Events
  adminCalendar: { vi: 'Lịch sự kiện', en: 'Events Calendar' },
  proposeEvent: { vi: '+ Đề xuất tổ chức', en: '+ Propose an event' },
  priorityLegend: {
    vi: 'Mức quan trọng có màu + nhãn',
    en: 'Priority shown by color + label',
  },
  priorityNormal: { vi: 'Thường', en: 'Normal' },
  priorityPriority: { vi: 'Ưu tiên', en: 'Priority' },
  priorityKey: { vi: 'Trọng điểm', en: 'Key event' },
  viewAllEvents: { vi: 'Xem tất cả sự kiện', en: 'View all events' },
  addtoCalendar: { vi: 'Thêm vào lịch', en: 'Add to calendar' },
  eventLocation: { vi: 'Địa điểm', en: 'Location' },
  eventTime: { vi: 'Thời gian', en: 'Time' },
  eventDate: { vi: 'Ngày', en: 'Date' },
  proposalFormTitle: { vi: 'HỒ SƠ ĐỀ XUẤT', en: 'EVENT PROPOSAL FORM' },
  fieldName: { vi: 'Tên', en: 'Name' },
  fieldNamePh: { vi: 'Tên sự kiện / Event name', en: 'Event name' },
  fieldDateTime: { vi: 'Ngày giờ', en: 'Date-time' },
  fieldLocation: { vi: 'Địa điểm', en: 'Location' },
  fieldLocationPh: { vi: 'Chọn địa điểm / Select location', en: 'Select location' },
  fieldEquipment: { vi: 'Thiết bị và số lượng', en: 'Equipment & quantity' },
  fieldEquipmentPh: {
    vi: 'VD: Âm thanh (1), Bàn (4), Ghế (20)...',
    en: 'E.g. Audio (1), Tables (4), Chairs (20)...',
  },
  fieldDescription: { vi: 'Mô tả hoạt động', en: 'Description' },
  fieldDescriptionPh: {
    vi: 'Mô tả ngắn gọn hoạt động / Brief description',
    en: 'Brief description of the activity',
  },
  submitProposal: { vi: 'Gửi đề xuất', en: 'Submit' },
  reviewPanelTitle: { vi: 'BAN QUẢN LÝ', en: 'MANAGEMENT REVIEW' },
  reviewSubtitle: {
    vi: 'Xét duyệt đề xuất sự kiện',
    en: 'Event proposal review',
  },
  conflictWarning: {
    vi: 'Trùng lịch — cần điều chỉnh thời gian',
    en: 'Schedule conflict — time adjustment needed',
  },
  approve: { vi: 'Duyệt', en: 'Approve' },
  requestChanges: { vi: 'Bổ sung', en: 'Request changes' },
  afterApprove: { vi: 'Sau duyệt: công bố', en: 'After approval: published' },
  statusPending: { vi: 'Chờ duyệt', en: 'Pending' },
  statusApproved: { vi: 'Đã duyệt', en: 'Approved' },
  proposalSubmitted: {
    vi: 'Đề xuất đã gửi — chờ Ban quản lý xét duyệt',
    en: 'Proposal submitted — pending management review',
  },

  // Map
  mapTitle: { vi: 'Bản đồ tương tác', en: 'Interactive Map' },
  selectSite: { vi: 'Chọn cơ sở', en: 'Select site' },
  filterPointType: { vi: 'Lọc loại điểm', en: 'Filter point type' },
  pointTypeStall: { vi: 'Gian hàng', en: 'Stall' },
  pointTypeAmenity: { vi: 'Tiện ích', en: 'Amenity' },
  pointTypeHeritage: { vi: 'Di sản', en: 'Heritage' },
  pointTypeParking: { vi: 'Gửi xe', en: 'Parking' },
  pointTypeCafe: { vi: 'Cà phê', en: 'Café' },
  illustrativeMap: { vi: 'Sơ đồ Đường Sách', en: 'Book Street Map' },
  walkingPath: { vi: 'LỐI ĐI BỘ', en: 'WALKING PATH' },
  pointInfo: { vi: 'THÔNG TIN ĐIỂM', en: 'POINT INFO' },
  point: { vi: 'Điểm', en: 'Point' },
  selectPointHint: {
    vi: 'Chọn một điểm trên bản đồ để xem thông tin',
    en: 'Select a point on the map to see details',
  },
  viewDetails: { vi: 'Xem chi tiết', en: 'View details' },
  sendFeedback: { vi: 'Gửi feedback chung', en: 'Send feedback' },
  mapPreviewTitle: { vi: 'Bản đồ Đường Sách', en: 'Book Street Map' },
  mapPreviewDesc: {
    vi: 'Khám phá hơn 30 điểm trên tuyến đường sách — từ gian hàng, quán cà phê đến bãi giữ xe.',
    en: 'Explore 30+ points along the book street — from stalls and cafés to parking areas.',
  },
  openFullMap: { vi: 'Mở bản đồ đầy đủ', en: 'Open full map' },
  address: { vi: 'Địa chỉ', en: 'Address' },
  capacity: { vi: 'Sức chứa', en: 'Capacity' },
  hours: { vi: 'Giờ mở cửa', en: 'Opening hours' },

  // Heritage
  heritageTitle: { vi: 'THỦ ĐỨC', en: 'THỦ ĐỨC' },
  heritageSiteName: {
    vi: 'Di sản văn hóa Thủ Đức',
    en: 'Thủ Đức Heritage Site',
  },
  heritageIntro: {
    vi: 'Giới thiệu · Giá trị · Câu chuyện',
    en: 'Introduction · Value · Story',
  },
  heritageContentP1: {
    vi: 'Tọa lạc tại khu vực Thủ Đức, di sản này là một trong những điểm tham quan văn hóa lịch sử nổi bật của thành phố. Kiến trúc mang đậm dấu ấn thời kỳ đầu thế kỷ XX, kết hợp giữa yếu tố truyền thống Việt Nam và ảnh hưởng kiến trúc Pháp.',
    en: 'Located in the Thủ Đức area, this heritage site is one of the city\'s notable cultural and historical landmarks. The architecture bears the marks of the early 20th century, blending traditional Vietnamese elements with French colonial influence.',
  },
  heritageContentP2: {
    vi: 'Giá trị của di sản nằm ở việc lưu giữ không gian nguyên bản, nơi du khách có thể cảm nhận nhịp sống của một thời kỳ đã qua. Nơi đây thường xuyên tổ chức các buổi thuyết minh, triển lãm và hoạt động giao lưu cộng đồng.',
    en: 'The site\'s value lies in preserving the original space, where visitors can feel the rhythm of a bygone era. It regularly hosts guided tours, exhibitions, and community events.',
  },
  heritageContentP3: {
    vi: 'Câu chuyện của di sản gắn liền với sự phát triển của khu vực Thủ Đức — từ một làng quê yên bình đến một khu đô thị năng động. Mỗi góc nhỏ đều mang một mảnh lịch sử riêng.',
    en: 'The story of this heritage site is intertwined with the development of Thủ Đức — from a peaceful village to a dynamic urban district. Every corner holds a piece of history.',
  },
  sourceUpdated: {
    vi: 'Nguồn / ngày cập nhật',
    en: 'Source / last updated',
  },
  sourceValue: {
    vi: 'Ban quản lý Đường Sách — Cập nhật: 09/2026',
    en: 'Đường Sách Management — Updated: 09/2026',
  },
  uniqueQR: {
    vi: 'Di sản số 01',
    en: 'Heritage #01',
  },
  mediaGallery: { vi: 'Thư viện ảnh', en: 'Media gallery' },
  sendFeedbackFull: { vi: 'Gửi feedback', en: 'Send feedback' },
  feedbackSameForm: {
    vi: 'Cùng form feedback chung',
    en: 'Uses the same shared feedback form',
  },

  // Feedback
  feedbackTitle: { vi: 'GÓP Ý TRẢI NGHIỆM', en: 'SHARE YOUR EXPERIENCE' },
  feedbackSubtitle: {
    vi: 'Đóng góp ý của bạn để Đường Sách tốt hơn',
    en: 'Share your feedback to improve Đường Sách',
  },
  feedbackScopeAll: { vi: 'Toàn Đường Sách', en: 'Whole Đường Sách' },
  feedbackScopeSite: { vi: 'Chọn di sản', en: 'Choose a specific heritage site' },
  satisfaction: { vi: 'Hài lòng', en: 'Satisfaction' },
  feedbackContent: { vi: 'Nội dung góp ý...', en: 'Your feedback...' },
  contactOptional: { vi: 'Liên hệ: không bắt buộc', en: 'Contact: optional' },
  contactPh: {
    vi: 'Email hoặc SĐT (tùy chọn)',
    en: 'Email or phone (optional)',
  },
  submitFeedback: { vi: 'Gửi góp ý', en: 'Submit feedback' },
  feedbackSuccess: { vi: 'Thành công', en: 'Success' },
  feedbackSuccessMsg: {
    vi: 'Cảm ơn bạn! Góp ý đã được ghi nhận.',
    en: 'Thank you! Your feedback has been recorded.',
  },
  feedbackError: { vi: 'Báo lỗi thử lại', en: 'Error, please retry' },
  feedbackErrorMsg: {
    vi: 'Có lỗi xảy ra — vui lòng thử lại.',
    en: 'Something went wrong — please try again.',
  },
  selectSitePlaceholder: {
    vi: '— Chọn di sản (tùy chọn) —',
    en: '— Select a site (optional) —',
  },

  // Visitor experiences
  visitorTitle: { vi: 'TRẢI NGHIỆM KHÁCH THAM QUAN', en: 'VISITOR EXPERIENCES' },
  visitorCheckin: { vi: 'Góc check-in', en: 'Photo corners' },
  visitorCheckinDesc: {
    vi: 'Không gian thiết kế độc đáo với các góc chụp ấn tượng, lý tưởng để lưu giữ khoảnh khắc tại Đường Sách.',
    en: 'Uniquely designed spaces with striking photo spots, perfect for capturing your moments at the Book Street.',
  },
  visitorCoffee: { vi: 'Cà phê & đọc sách', en: 'Coffee & reading' },
  visitorCoffeeDesc: {
    vi: 'Thưởng thức ly cà phê sáng trong không gian thoáng mát, lật giở trang sách mới mua ngay tại quán.',
    en: 'Enjoy a morning coffee in a bright, airy space while flipping through your newly purchased book.',
  },
  visitorKids: { vi: 'Khu vui chơi thiếu nhi', en: 'Kids\' play area' },
  visitorKidsDesc: {
    vi: 'Không gian trải nghiệm với trò chơi, truyện tranh và hoạt động sáng tạo dành riêng cho các bạn nhỏ.',
    en: 'A play area with games, comics, and creative activities designed especially for young visitors.',
  },

  // Feedback CTA
  feedbackCtaTitle: {
    vi: 'Chia sẻ trải nghiệm của bạn',
    en: 'Share your experience',
  },
  feedbackCtaDesc: {
    vi: 'Mỗi góp ý giúp Đường Sách trở nên tốt hơn. Hãy để lại nhận xét về trải nghiệm tham quan của bạn.',
    en: 'Every piece of feedback makes Đường Sách better. Leave a note about your visit experience.',
  },

  // Chatbot
  chatbotTitle: { vi: 'TRỢ LÝ ĐƯỜNG SÁCH', en: 'ĐƯỜNG SÁCH ASSISTANT' },
  chatbotCounter: {
    vi: 'Còn 3/5 câu hôm nay',
    en: '3 of 5 questions left today',
  },
  chatbotGreeting: {
    vi: 'Bạn muốn tìm thông tin gì?',
    en: 'What would you like to know?',
  },
  chatbotQ1: { vi: 'Giờ mở cửa', en: 'Opening hours' },
  chatbotQ2: { vi: 'Sự kiện sắp tới', en: 'Upcoming events' },
  chatbotQ3: { vi: 'Cách đi đến Đường Sách', en: 'Directions to Book Street' },
  chatbotAnswer1: {
    vi: 'Đường Sách mở cửa từ 8:00 sáng đến 10:00 tối hàng ngày. Cổng chính nằm trên đường Nguyễn Văn Binh, Quận 1, TP.HCM.',
    en: 'Đường Sách is open from 8:00 AM to 10:00 PM daily. The main entrance is on Nguyễn Văn Binh Street, District 1, HCMC.',
  },
  chatbotAnswer2: {
    vi: 'Có nhiều sự kiện diễn ra trong tháng này, bao gồm tọa đàm văn học, hội sách cuối tuần và đêm nhạc tưởng nhớ. Bạn có thể xem chi tiết ở trang Sự kiện.',
    en: 'Several events are happening this month, including literary talks, a weekend book fair, and a memorial music night. See the Events page for details.',
  },
  chatbotAnswer3: {
    vi: 'Bạn có thể đến Đường Sách bằng xe máy, ô tô hoặc xe buýt. Có 5 bãi giữ xe quanh khu vực. Địa chỉ chính: đường Nguyễn Văn Binh, Phường Bến Nghé, Quận 1.',
    en: 'You can reach Đường Sách by motorbike, car, or bus. There are 5 parking areas nearby. Main address: Nguyễn Văn Binh Street, Bến Nghé Ward, District 1.',
  },
  chatbotSource: { vi: 'Nguồn: nội dung đã duyệt', en: 'Source: approved content' },
  chatbotFallback: {
    vi: 'Tôi chưa có thông tin này. Vui lòng liên hệ Ban quản lý qua email hoặc số điện thoại để được hỗ trợ.',
    en: 'I don\'t have this information. Please contact management via email or phone for assistance.',
  },
  chatbotInputPh: { vi: 'Nhập câu hỏi...', en: 'Type your question...' },
  chatbotSend: { vi: 'Gửi', en: 'Send' },

  // Footer
  footerIntro: { vi: 'Giới thiệu', en: 'Introduction' },
  footerTerms: { vi: 'Thỏa thuận', en: 'Terms' },
  footerLicense: { vi: 'Giấy phép', en: 'License' },
  footerContact: { vi: 'Liên hệ', en: 'Contact' },
  footerAddress: {
    vi: 'Đường Nguyễn Văn Binh, Phường Bến Nghé, Quận 1, TP.HCM',
    en: 'Nguyễn Văn Binh St., Bến Nghé Ward, Dist. 1, HCMC',
  },
  footerEmail: { vi: 'lienhe@duongsach.vn', en: 'lienhe@duongsach.vn' },
  footerPhone: { vi: '+84 (028) 0000 0000', en: '+84 (028) 0000 0000' },
  footerRights: {
    vi: '© 2026 Đường Sách TP.HCM. Bản quyền thuộc Ban quản lý.',
    en: '© 2026 Đường Sách HCMC. All rights reserved by Management.',
  },

  // Common
  close: { vi: 'Đóng', en: 'Close' },
  upcomingEvents: { vi: 'SỰ KIỆN SẮP DIỄN RA', en: 'UPCOMING EVENTS' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  const entry = translations[key];
  return entry[lang];
}
