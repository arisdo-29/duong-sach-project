import { useEffect, useState } from 'react';
import QRCodeLib from 'qrcode';

/**
 * Mã QR thật của một di sản.
 *
 * Khác với component QRCode (chỉ vẽ họa tiết bằng CSS để minh họa), component
 * này mã hóa đúng đường dẫn landing page nên quét bằng điện thoại sẽ mở được
 * trang di sản. Lấy origin từ trình duyệt để chạy đúng ở cả localhost lẫn
 * bản deploy, không cần cấu hình thêm.
 */

interface HeritageQRCodeProps {
  slug: string;
  label: string;
  size?: number;
}

export function HeritageQRCode({ slug, label, size = 180 }: HeritageQRCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const targetUrl = `${window.location.origin}/di-san/${slug}`;

  useEffect(() => {
    let active = true;

    QRCodeLib.toDataURL(targetUrl, {
      width: size,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    })
      .then((url) => {
        if (active) setDataUrl(url);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [targetUrl, size]);

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div
        className="bg-white rounded-lg border-2 border-ink p-2 shadow-soft flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {dataUrl ? (
          <img src={dataUrl} alt={`Mã QR ${label}`} className="w-full h-full" />
        ) : (
          <span className="text-[11px] text-ink-muted text-center px-2">
            {failed ? 'Không tạo được mã QR' : 'Đang tạo mã QR...'}
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <p className="text-[11px] text-ink-muted mt-0.5 break-all">/di-san/{slug}</p>
      </div>
    </div>
  );
}
