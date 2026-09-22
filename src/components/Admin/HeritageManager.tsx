import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Pencil,
  Trash2,
  QrCode,
  Download,
  Search,
  RefreshCw,
  ExternalLink,
  Lock,
  CheckCircle,
  X,
  Image as ImageIcon,
  Building2,
  Calendar,
  Copy,
  Check,
  FileText
} from 'lucide-react';

export interface Heritage {
  id: string;
  slug: string;
  name_vi: string;
  name_en: string;
  content_vi: string;
  content_en: string;
  image_url: string;
  source: string;
  created_at: string;
  updated_at: string;
  _count?: {
    feedbacks: number;
  };
}

// Helper sinh slug tiếng Việt chuẩn phía frontend để preview trực tiếp khi nhập
const generateSlugClient = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function HeritageManager() {
  const [heritages, setHeritages] = useState<Heritage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingHeritage, setEditingHeritage] = useState<Heritage | null>(null);
  const [deletingHeritage, setDeletingHeritage] = useState<Heritage | null>(null);
  const [qrModalHeritage, setQrModalHeritage] = useState<Heritage | null>(null);

  // QR Code preview data
  const [qrCodeData, setQrCodeData] = useState<{ url: string; qrCode: string } | null>(null);
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Form State (dùng chung cho Add và Edit)
  const [formData, setFormData] = useState({
    name_vi: '',
    name_en: '',
    content_vi: '',
    content_en: '',
    image_url: '',
    source: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchHeritages();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchHeritages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/heritages');
      if (Array.isArray(res.data)) {
        setHeritages(res.data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách di sản:', err);
      showToast('error', 'Không thể kết nối đến máy chủ để lấy danh sách di sản!');
    } finally {
      setLoading(false);
    }
  };

  // Mở modal thêm mới
  const handleOpenAddModal = () => {
    setFormData({
      name_vi: '',
      name_en: '',
      content_vi: '',
      content_en: '',
      image_url: '',
      source: '',
    });
    setIsAddModalOpen(true);
  };

  // Mở modal sửa
  const handleOpenEditModal = (item: Heritage) => {
    setEditingHeritage(item);
    setFormData({
      name_vi: item.name_vi,
      name_en: item.name_en || '',
      content_vi: item.content_vi || '',
      content_en: item.content_en || '',
      image_url: item.image_url || '',
      source: item.source || '',
    });
  };

  // Mở modal xem QR
  const handleOpenQRModal = async (item: Heritage) => {
    setQrModalHeritage(item);
    setQrCodeData(null);
    setQrLoading(true);
    try {
      const res = await axios.get(`/api/admin/heritages/${item.id}/qr`);
      setQrCodeData(res.data);
    } catch (err) {
      console.error('Lỗi lấy mã QR:', err);
      showToast('error', 'Không thể tạo mã QR cho di sản này!');
    } finally {
      setQrLoading(false);
    }
  };

  // Submit Thêm mới
  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_vi.trim()) {
      alert('Vui lòng nhập Tên tiếng Việt cho di sản!');
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post('/api/admin/heritages', formData);
      setHeritages((prev) => [res.data, ...prev]);
      setIsAddModalOpen(false);
      showToast('success', `Đã thêm thành công di sản "${res.data.name_vi}"!`);
    } catch (err: any) {
      console.error('Lỗi thêm di sản:', err);
      showToast('error', err.response?.data?.error || 'Có lỗi xảy ra khi tạo mới di sản!');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Sửa (Khóa Slug)
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHeritage) return;
    if (!formData.name_vi.trim()) {
      alert('Vui lòng nhập Tên tiếng Việt cho di sản!');
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.put(`/api/admin/heritages/${editingHeritage.id}`, formData);
      setHeritages((prev) => prev.map((h) => (h.id === editingHeritage.id ? res.data : h)));
      setEditingHeritage(null);
      showToast('success', `Đã cập nhật di sản "${res.data.name_vi}"! Mã QR và Slug được giữ nguyên.`);
    } catch (err: any) {
      console.error('Lỗi cập nhật di sản:', err);
      showToast('error', err.response?.data?.error || 'Lỗi khi cập nhật thông tin di sản!');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Xóa
  const handleConfirmDelete = async () => {
    if (!deletingHeritage) return;
    try {
      await axios.delete(`/api/admin/heritages/${deletingHeritage.id}`);
      setHeritages((prev) => prev.filter((h) => h.id !== deletingHeritage.id));
      showToast('success', `Đã xóa di sản "${deletingHeritage.name_vi}" khỏi CSDL!`);
      setDeletingHeritage(null);
    } catch (err) {
      console.error('Lỗi xóa di sản:', err);
      showToast('error', 'Lỗi khi xóa di sản!');
    }
  };

  // Tải ảnh QR Code
  const handleDownloadQR = () => {
    if (!qrCodeData || !qrModalHeritage) return;
    const link = document.createElement('a');
    link.href = qrCodeData.qrCode;
    link.download = `QR_${qrModalHeritage.slug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy URL
  const handleCopyUrl = async () => {
    if (qrCodeData?.url) {
      await navigator.clipboard.writeText(qrCodeData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Lọc theo từ khóa tìm kiếm
  const filteredHeritages = heritages.filter((h) => {
    const q = searchTerm.toLowerCase();
    return (
      h.name_vi.toLowerCase().includes(q) ||
      (h.name_en && h.name_en.toLowerCase().includes(q)) ||
      h.slug.toLowerCase().includes(q)
    );
  });

  return (
    <>
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center justify-between shadow-lg transition-all animate-in fade-in slide-in-from-top-3 duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className={notification.type === 'success' ? 'text-emerald-600' : 'text-red-600'} />
            {notification.message}
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Danh mục Di sản ({heritages.length})</h2>
            <p className="text-xs text-slate-500">Quản trị nội dung song ngữ, ảnh và mã QR in ấn cho 27 di sản</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={fetchHeritages}
            disabled={loading}
            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1 text-sm font-medium"
            title="Làm mới dữ liệu"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-emerald-600' : ''} />
            <span className="hidden md:inline">Làm mới</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Plus size={18} />
            <span>Thêm Di sản mới</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên tiếng Việt, tiếng Anh hoặc mã slug..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Xóa tìm kiếm
          </button>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw size={28} className="animate-spin text-emerald-600 mx-auto" />
            <p className="text-sm text-slate-500 font-medium">Đang tải dữ liệu di sản từ cơ sở dữ liệu...</p>
          </div>
        ) : filteredHeritages.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Building2 size={36} className="text-slate-300 mx-auto" />
            <p className="text-base font-semibold text-slate-700">Không tìm thấy di sản nào</p>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {searchTerm ? 'Thử thay đổi từ khóa tìm kiếm để tìm bản ghi phù hợp.' : 'Cơ sở dữ liệu đang trống. Bạn có thể nhấn nút "Thêm Di sản mới" ở trên để bắt đầu.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Di sản</th>
                  <th className="px-4 py-3.5">Mã Slug & QR Link</th>
                  <th className="px-4 py-3.5">Nguồn tài liệu</th>
                  <th className="px-4 py-3.5 text-center">Góp ý</th>
                  <th className="px-4 py-3.5">Ngày cập nhật</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHeritages.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Di sản: Thumbnail + Tên song ngữ */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name_vi}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                            <ImageIcon size={20} />
                          </div>
                        )}
                        <div className="max-w-xs sm:max-w-sm">
                          <p className="font-semibold text-slate-900 line-clamp-1">{item.name_vi}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{item.name_en || 'Chưa có tên tiếng Anh'}</p>
                        </div>
                      </div>
                    </td>

                    {/* Slug & QR Link */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md w-fit border border-slate-200/80">
                        <Lock size={12} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[160px]">{item.slug}</span>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-600 line-clamp-2 max-w-[180px]">
                        {item.source || '—'}
                      </span>
                    </td>

                    {/* Góp ý liên kết */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item._count?.feedbacks || 0} phản hồi
                      </span>
                    </td>

                    {/* Ngày cập nhật */}
                    <td className="px-4 py-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{item.updated_at ? new Date(item.updated_at).toLocaleDateString('vi-VN') : '—'}</span>
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenQRModal(item)}
                          className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Xem & Tải mã QR in ấn"
                        >
                          <QrCode size={17} />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa nội dung"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => setDeletingHeritage(item)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa di sản"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    {/*
      4 modal bên dưới CỐ Ý đặt ngoài div.space-y-6 ở trên: utility "space-y-6" của Tailwind
      áp margin-top cho MỌI phần tử con không phải con đầu tiên (kể cả phần tử position:fixed),
      khiến overlay fixed inset-0 bị đẩy lệch xuống 24px và hở phần trên màn hình. Đặt là anh em
      của space-y-6 (trong cùng Fragment) để margin đó không áp lên overlay.
    */}

      {/* ======================================================== */}
      {/* MODAL: THÊM MỚI DI SẢN (TỰ ĐỘNG SINH SLUG) */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 h-dvh z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Thêm Di sản mới</h3>
                  <p className="text-xs text-slate-500">Hệ thống sẽ tự động sinh mã QR tĩnh và slug định danh cố định</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitAdd} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Tên tiếng Việt & Preview Slug */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Tên di sản (Tiếng Việt) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name_vi}
                  onChange={(e) => setFormData({ ...formData, name_vi: e.target.value })}
                  placeholder="VD: Cột Cờ Thủ Ngữ Sài Gòn"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                {formData.name_vi && (
                  <p className="mt-1.5 text-xs text-emerald-700 flex items-center gap-1 font-mono">
                    <QrCode size={13} />
                    <span>Slug tạo tự động: <strong>{generateSlugClient(formData.name_vi)}</strong></span>
                  </p>
                )}
              </div>

              {/* Tên tiếng Anh */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Tên di sản (Tiếng Anh - English Name)
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="VD: Thu Ngu Flagpole Saigon"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Ảnh đại diện & Nguồn */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Hình ảnh đại diện
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Nguồn tài liệu xác thực
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="VD: Sở Du lịch TP.HCM & Trung tâm Di tích"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Nội dung bài viết tiếng Việt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Bài viết giới thiệu (Tiếng Việt)
                </label>
                <textarea
                  rows={4}
                  value={formData.content_vi}
                  onChange={(e) => setFormData({ ...formData, content_vi: e.target.value })}
                  placeholder="Nội dung thuyết minh lịch sử, kiến trúc di sản..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Nội dung bài viết tiếng Anh */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Bài viết giới thiệu (Tiếng Anh - English Content)
                </label>
                <textarea
                  rows={4}
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  placeholder="Historical and architectural background in English..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
                  <span>{submitting ? 'Đang lưu CSDL...' : 'Lưu & Sinh mã QR'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CHỈNH SỬA DI SẢN (KHÓA SLUG) */}
      {/* ======================================================== */}
      {editingHeritage && (
        <div className="fixed inset-0 h-dvh z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Pencil size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Chỉnh sửa di sản</h3>
                  <p className="text-xs text-slate-500">Mã QR và đường dẫn tĩnh được bảo vệ an toàn</p>
                </div>
              </div>
              <button
                onClick={() => setEditingHeritage(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Cảnh báo khóa slug */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                <Lock size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Định danh Slug đã khóa: <span className="font-mono">{editingHeritage.slug}</span></p>
                  <p className="text-amber-700 mt-0.5">
                    Trường slug không được phép sửa đổi để đảm bảo mã QR in trên biển bảng vật lý không bị hỏng link.
                  </p>
                </div>
              </div>

              {/* Tên tiếng Việt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Tên di sản (Tiếng Việt) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name_vi}
                  onChange={(e) => setFormData({ ...formData, name_vi: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Tên tiếng Anh */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Tên di sản (Tiếng Anh - English Name)
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Ảnh đại diện & Nguồn */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Hình ảnh đại diện
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Nguồn tài liệu xác thực
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Nội dung bài viết tiếng Việt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Bài viết giới thiệu (Tiếng Việt)
                </label>
                <textarea
                  rows={4}
                  value={formData.content_vi}
                  onChange={(e) => setFormData({ ...formData, content_vi: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Nội dung bài viết tiếng Anh */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Bài viết giới thiệu (Tiếng Anh - English Content)
                </label>
                <textarea
                  rows={4}
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingHeritage(null)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <RefreshCw size={16} className="animate-spin" /> : <Pencil size={16} />}
                  <span>{submitting ? 'Đang cập nhật...' : 'Cập nhật thay đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: XÁC NHẬN XÓA DI SẢN */}
      {/* ======================================================== */}
      {deletingHeritage && (
        <div className="fixed inset-0 h-dvh z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Xác nhận xóa di sản?</h3>
              <p className="text-sm text-slate-500 mt-1">
                Bạn có chắc chắn muốn xóa vĩnh viễn di sản <strong>"{deletingHeritage.name_vi}"</strong>? Toàn bộ các phản hồi liên quan trong CSDL cũng sẽ bị xóa.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingHeritage(null)}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow-sm"
              >
                Xóa vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: XEM & TẢI MÃ QR IN ẤN */}
      {/* ======================================================== */}
      {qrModalHeritage && (
        <div className="fixed inset-0 h-dvh z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <QrCode size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Mã QR Check-in</h3>
                  <p className="text-xs text-slate-500 truncate max-w-[240px]">{qrModalHeritage.name_vi}</p>
                </div>
              </div>
              <button onClick={() => setQrModalHeritage(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            {/* QR Image Display */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
              {qrLoading ? (
                <div className="py-12 space-y-2 text-center">
                  <RefreshCw size={28} className="animate-spin text-emerald-600 mx-auto" />
                  <p className="text-xs text-slate-500">Đang sinh mã QR độ phân giải cao...</p>
                </div>
              ) : qrCodeData ? (
                <>
                  <img
                    src={qrCodeData.qrCode}
                    alt={qrModalHeritage.slug}
                    className="w-56 h-56 rounded-xl border border-white shadow-md bg-white p-2"
                  />
                  <div className="mt-3 text-center">
                    <p className="font-mono text-xs font-semibold text-slate-700">/{qrModalHeritage.slug}</p>
                    <p className="text-[11px] text-slate-400">Định dạng PNG 300x300 sẵn sàng in ấn</p>
                  </div>
                </>
              ) : null}
            </div>

            {/* Target URL */}
            {qrCodeData && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Đường dẫn đích (Landing Page):</span>
                  <button onClick={handleCopyUrl} className="text-emerald-600 hover:underline flex items-center gap-1">
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? 'Đã chép!' : 'Sao chép link'}</span>
                  </button>
                </div>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-xs font-mono text-slate-700 truncate border border-slate-200">
                  {qrCodeData.url}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleDownloadQR}
                disabled={!qrCodeData}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <Download size={16} />
                <span>Tải ảnh QR (PNG)</span>
              </button>
              {qrCodeData?.url && (
                <a
                  href={qrCodeData.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                  title="Mở link thử nghiệm"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
