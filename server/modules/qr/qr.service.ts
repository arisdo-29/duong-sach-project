import QRCode from 'qrcode';
import { config } from '../../core/config.js';
import { getSetting } from '../../core/settings.js';
import { AppError } from '../../core/errors.js';
import { getByIdOrSlug } from '../heritages/heritages.service.js';

/**
 * Sinh mã QR check-in cho một di sản.
 *
 * URL luôn dựng theo SLUG, không theo id: mã QR được in lên vật liệu đặt tại
 * Đường Sách, nên đường dẫn phải cố định vĩnh viễn. Domain đọc từ WebsiteAttributes
 * (QR_BASE_URL) để BQL đổi domain qua SSMS mà không cần sửa code/khởi động lại server;
 * rỗng mới dự phòng biến môi trường PUBLIC_BASE_URL.
 */
export async function generate(idOrSlug: string, size = 300) {
  const configuredDomain = (await getSetting('QR_BASE_URL')) ?? config.publicBaseUrl;
  const domain = configuredDomain.replace(/\/+$/, '');

  // Production bắt buộc phải resolve ra domain thật, không âm thầm dùng localhost
  if (config.isProduction && domain.includes('localhost')) {
    throw new AppError(
      500,
      'INTERNAL',
      'Cấu hình thiếu domain hợp lệ (QR_BASE_URL trong WebsiteAttributes hoặc PUBLIC_BASE_URL) trên môi trường production',
    );
  }

  const heritage = await getByIdOrSlug(idOrSlug);

  const targetUrl = `${domain}/di-san/${heritage.slug}`;

  const qrImageBase64 = await QRCode.toDataURL(targetUrl, {
    width: size,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
  });

  return {
    url: targetUrl,
    qrCode: qrImageBase64,
    heritage: {
      id: heritage.id,
      slug: heritage.slug,
      name_vi: heritage.name_vi,
      name_en: heritage.name_en,
    },
  };
}
