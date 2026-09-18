export interface Feedback {
  id: string;
  content: string;
  rating: number;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
  createdAt?: string;
  scope?: string;
  contact?: string;
}

export const feedbacksStore: Feedback[] = [
  {
    id: 'fb-001',
    content: 'Không gian Nhà thờ Đức Bà rất ấn tượng, nhưng cần bổ sung thêm biển chỉ dẫn bằng tiếng Anh tại cổng phụ.',
    rating: 4,
    status: 'PENDING',
    createdAt: '2026-09-17 14:30',
    scope: 'Nhà thờ Đức Bà Sài Gòn',
    contact: 'dukhach@example.com',
  },
  {
    id: 'fb-002',
    content: 'Mã QR tại Bưu điện Trung tâm quét rất nhanh, âm thanh thuyết minh rõ ràng và thông tin lịch sử rất đầy đủ.',
    rating: 5,
    status: 'REVIEWED',
    createdAt: '2026-09-16 10:15',
    scope: 'Bưu điện Trung tâm Sài Gòn',
    contact: '0901234567',
  },
  {
    id: 'fb-003',
    content: 'Khu vực Dinh Độc Lập hôm cuối tuần hơi đông, mong ban quản lý bố trí thêm ghế nghỉ chân dưới bóng cây.',
    rating: 4,
    status: 'RESOLVED',
    createdAt: '2026-09-15 16:45',
    scope: 'Dinh Độc Lập',
    contact: '',
  },
  {
    id: 'fb-004',
    content: 'Đường sách Nguyễn Văn Bình rất sạch đẹp, nhiều gian sách hay. Mong có thêm sự kiện giao lưu tác giả sách thiếu nhi.',
    rating: 5,
    status: 'PENDING',
    createdAt: '2026-09-17 18:20',
    scope: 'Toàn khu vực Đường Sách',
    contact: 'lanhuong.nguyen@gmail.com',
  },
];
