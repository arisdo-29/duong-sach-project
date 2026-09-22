/**
 * Làm sạch HTML do CKEditor 5 sinh ra trước khi lưu vào cột NVarChar(Max) (Item.Content,
 * Event.Description, Proposal.Description...). Tương đương một Sanitizer/Interceptor bên Spring
 * chạy trước khi entity được lưu, để chặn XSS dù người dùng có bypass được validate ở FE.
 */

import sanitizeHtmlLib, { type IOptions } from 'sanitize-html';

const SANITIZE_OPTIONS: IOptions = {
  allowedTags: [
    'p', 'br', 'h2', 'h3', 'h4',
    'strong', 'b', 'em', 'i', 'u', 's',
    'a', 'ul', 'ol', 'li', 'blockquote',
    'figure', 'figcaption', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'span', 'code', 'pre', 'hr',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  // Luôn ép rel="noopener noreferrer" trên thẻ a, kể cả khi input không gửi target.
  transformTags: {
    a: sanitizeHtmlLib.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
  },
};

/** Xóa mọi tag/script/attribute không nằm trong allowlist khớp output CKEditor 5 Classic build. */
export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, SANITIZE_OPTIONS);
}

/** Bỏ hết tag HTML, gộp khoảng trắng thừa — dùng làm mô tả ngắn/preview khi cần. */
export function htmlToText(html: string): string {
  const text = sanitizeHtmlLib(html, { allowedTags: [], allowedAttributes: {} });
  return text.replace(/\s+/g, ' ').trim();
}
