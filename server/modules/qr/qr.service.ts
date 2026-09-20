import QRCode from 'qrcode';
import { config } from '../../core/config.js';
import { getByIdOrSlug } from '../heritages/heritages.service.js';

/**
 * Sinh mã QR check-in cho một di sản.
 *
 * URL luôn dựng theo SLUG, không theo id: mã QR được in lên vật liệu đặt tại
 * Đường Sách, nên đường dẫn phải cố định vĩnh viễn. Domain lấy từ cấu hình
 * (PUBLIC_BASE_URL) để bản deploy in ra QR trỏ domain thật chứ không phải localhost.
 */
export async function generate(idOrSlug: string, size = 300) {
  const heritage = await getByIdOrSlug(idOrSlug);

  const targetUrl = `${config.publicBaseUrl}/di-san/${heritage.slug}`;

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
