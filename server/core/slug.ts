/**
 * Sinh slug cho di sản. Slug là định danh CỐ ĐỊNH: mã QR đã in trên vật liệu
 * tại Đường Sách trỏ vào <PUBLIC_BASE_URL>/di-san/<slug>, nên một khi đã tạo
 * thì không bao giờ đổi (xem AGENTS.md mục 4).
 */

/** Chuyển tên tiếng Việt có dấu thành slug: bỏ dấu, đ→d, chỉ còn a-z 0-9 và dấu gạch ngang */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-') // khoảng trắng và ký tự đặc biệt thành "-"
    .replace(/(^-|-$)+/g, ''); // bỏ gạch ngang thừa ở hai đầu
}

/**
 * Sinh slug duy nhất: nếu slug gốc đã tồn tại thì thêm hậu tố -1, -2...
 * `exists` do tầng service truyền vào (thường là một truy vấn Prisma).
 */
export async function uniqueSlug(
  name: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const base = generateSlug(name) || `di-san-${Date.now().toString().slice(-4)}`;
  let slug = base;
  let counter = 1;

  while (await exists(slug)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}
