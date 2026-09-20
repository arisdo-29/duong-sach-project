import QRCode from 'qrcode';
import { config } from '../../core/config.js';
import { AppError } from '../../core/errors.js';
import { getByIdOrSlug } from '../heritages/heritages.service.js';

/**
 * Sinh mã QR check-in cho một di sản.
 *
 * URL luôn dựng theo SLUG, không theo id: mã QR được in lên vật liệu đặt tại
 * Đường Sách, nên đường dẫn phải cố định vĩnh viễn. Domain lấy từ cấu hình
 * (PUBLIC_BASE_URL) để bản deploy in ra QR trỏ domain thật chứ không phải localhost.
 */
export async function generate(idOrSlug: string, size = 300) {
  // Production bắt buộc phải cấu hình PUBLIC_BASE_URL thật, không âm thầm fallback localhost
  if (config.isProduction && (!process.env.PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL.includes('localhost'))) {
    throw new AppError(500, 'INTERNAL', 'Cấu hình thiếu PUBLIC_BASE_URL trên môi trường production');
  }

  const heritage = await getByIdOrSlug(idOrSlug);

  const baseUrl = (config.publicBaseUrl || '').replace(/\/+$/, '');
  const targetUrl = `${baseUrl}/di-san/${heritage.slug}`;

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
