import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, QrCode, ExternalLink, Copy, Check, RefreshCw } from 'lucide-react';
import { heritageSites } from '@/data/mockData';

export default function HeritageQR({ heritageId: initialHeritageId = 'nha-tho-duc-ba' }: { heritageId?: string }) {
  const [selectedId, setSelectedId] = useState<string>(initialHeritageId);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialHeritageId) {
      setSelectedId(initialHeritageId);
      setQrCode(null);
      setTargetUrl(null);
    }
  }, [initialHeritageId]);

  const fetchQRCode = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await axios.get(`/api/admin/heritages/${selectedId}/qr`);
      setQrCode(response.data.qrCode); // Nhận chuỗi Base64 ảnh từ Backend
      setTargetUrl(response.data.url);
    } catch (error) {
      console.error("Lỗi lấy mã QR:", error);
      setErrorMsg("Không thể kết nối API hoặc tạo mã QR. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    if (targetUrl) {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          <QrCode size={22} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">Mã QR Check-in</h3>
          <p className="text-xs text-slate-500">Sinh mã QR đích cho landing page di sản đô thị</p>
        </div>
      </div>

      {/* Heritage Selector */}
      <div className="mb-4 space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Chọn di sản hoặc nhập ID:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setQrCode(null);
              setTargetUrl(null);
            }}
            className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="nha-tho-duc-ba">Nhà thờ Đức Bà (Mẫu: nha-tho-duc-ba)</option>
            {heritageSites.map((site) => (
              <option key={site.id} value={String(site.id)}>
                #{String(site.id).padStart(2, '0')} - {site.nameVi}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setQrCode(null);
              setTargetUrl(null);
            }}
            placeholder="ID hoặc Slug..."
            className="w-full sm:w-36 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Action button */}
      <div className="flex items-center gap-3">
        <button
          onClick={fetchQRCode}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" /> Đang tạo mã QR...
            </>
          ) : (
            <>
              <QrCode size={16} /> Tạo & Xem mã QR
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* QR Code Result Preview */}
      {qrCode && (
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 animate-fadeIn">
          <div className="relative group bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
            <img
              src={qrCode}
              alt="QR Code Di Sản"
              className="w-48 h-48 border border-slate-100 rounded-lg bg-white p-1"
            />
            <a
              href={qrCode}
              download={`qr-disan-${selectedId}.png`}
              className="text-sm text-green-600 hover:text-green-700 font-medium underline mt-3 inline-flex items-center gap-1"
            >
              <Download size={14} /> Tải mã QR xuống
            </a>
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-400">Đường dẫn quét QR:</span>
              <p className="text-sm font-mono text-slate-700 break-all mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {targetUrl}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={copyUrl}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-md font-medium transition-colors inline-flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                {copied ? 'Đã sao chép link' : 'Sao chép link'}
              </button>

              {targetUrl && (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-md font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink size={14} /> Mở trang đích
                </a>
              )}
            </div>

            <div className="text-xs text-slate-400 leading-relaxed pt-2">
              💡 Mã QR chuẩn độ phân giải 300x300px, phù hợp để in ấn bảng thông tin tại di sản hoặc trình chiếu trên standee.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
