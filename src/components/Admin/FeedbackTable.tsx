import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Clock, Eye, RefreshCw, MessageSquare } from 'lucide-react';

export interface Feedback {
  id: string;
  content: string;
  rating: number;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
  createdAt?: string;
  scope?: string;
  contact?: string;
}

export default function FeedbackTable({ initialFeedbacks = [] }: { initialFeedbacks?: Feedback[] }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'REVIEWED' | 'RESOLVED'>('ALL');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (initialFeedbacks && initialFeedbacks.length > 0) {
      setFeedbacks(initialFeedbacks);
    } else {
      fetchFeedbacks();
    }
  }, [initialFeedbacks]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/feedbacks');
      if (Array.isArray(response.data)) {
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách góp ý:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      // Gọi API cập nhật
      await axios.patch(`/api/admin/feedbacks/${id}/status`, { status: newStatus });

      // Cập nhật lại UI không cần reload trang
      setFeedbacks((prev) =>
        prev.map((fb) => (fb.id === id ? { ...fb, status: newStatus as Feedback['status'] } : fb))
      );

      setNotification(`Đã cập nhật trạng thái góp ý thành "${newStatus}"!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Lỗi khi cập nhật trạng thái góp ý!");
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filter === 'ALL') return true;
    return fb.status === filter;
  });

  const getStatusBadge = (status: Feedback['status']) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
            <Clock size={12} /> PENDING
          </span>
        );
      case 'REVIEWED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
            <Eye size={12} /> REVIEWED
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            <CheckCircle size={12} /> RESOLVED
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">{status}</span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="text-emerald-600" size={20} />
            <h3 className="font-bold text-lg text-slate-800">Quản lý Góp ý (Feedbacks)</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Xem và xử lý ý kiến đóng góp từ độc giả và du khách
          </p>
        </div>

        {/* Filter pills & Refresh */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-medium">
            {(['ALL', 'PENDING', 'REVIEWED', 'RESOLVED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filter === tab
                    ? 'bg-white text-slate-800 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'ALL'
                  ? `Tất cả (${feedbacks.length})`
                  : tab === 'PENDING'
                  ? `Chờ duyệt (${feedbacks.filter((f) => f.status === 'PENDING').length})`
                  : tab === 'REVIEWED'
                  ? 'Đã xem'
                  : 'Đã xử lý'}
              </button>
            ))}
          </div>

          <button
            onClick={fetchFeedbacks}
            disabled={loading}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            title="Làm mới dữ liệu"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Notification banner */}
      {notification && (
        <div className="px-5 py-2.5 bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center justify-between border-b border-emerald-100 animate-fadeIn">
          <span>✓ {notification}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-600 hover:underline">
            Đóng
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 border-b text-slate-600 text-xs uppercase tracking-wider">
              <th className="p-3.5 pl-5 font-semibold">Nội dung</th>
              <th className="p-3.5 font-semibold">Địa điểm / Thời gian</th>
              <th className="p-3.5 font-semibold text-center">Đánh giá</th>
              <th className="p-3.5 font-semibold">Trạng thái</th>
              <th className="p-3.5 pr-5 font-semibold text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                  Không có ý kiến góp ý nào trong bộ lọc này.
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((fb) => (
                <tr key={fb.id} className="border-b hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 pl-5 max-w-md">
                    <p className="font-medium text-slate-800">{fb.content}</p>
                    {fb.contact && (
                      <p className="text-xs text-slate-400 mt-1">Liên hệ: {fb.contact}</p>
                    )}
                  </td>
                  <td className="p-3.5 text-xs text-slate-500 whitespace-nowrap">
                    <p className="font-medium text-slate-700">{fb.scope || 'Đường Sách'}</p>
                    <p className="text-slate-400 mt-0.5">{fb.createdAt || 'Gần đây'}</p>
                  </td>
                  <td className="p-3.5 text-yellow-500 whitespace-nowrap text-center">
                    {'⭐'.repeat(Math.min(5, Math.max(1, fb.rating)))}
                    <span className="text-xs text-slate-400 ml-1">({fb.rating}/5)</span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    {getStatusBadge(fb.status)}
                  </td>
                  <td className="p-3.5 pr-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      {fb.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(fb.id, 'REVIEWED')}
                            className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1.5 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                          >
                            Đã xem xét
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(fb.id, 'RESOLVED')}
                            className="bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-green-700 transition-colors shadow-xs"
                          >
                            Đánh dấu Đã xử lý
                          </button>
                        </>
                      )}
                      {fb.status === 'REVIEWED' && (
                        <button
                          onClick={() => handleUpdateStatus(fb.id, 'RESOLVED')}
                          className="bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-green-700 transition-colors shadow-xs"
                        >
                          Đánh dấu Đã xử lý
                        </button>
                      )}
                      {fb.status === 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(fb.id, 'PENDING')}
                          className="text-xs text-slate-400 hover:text-slate-600 underline"
                        >
                          Đặt lại chờ duyệt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
