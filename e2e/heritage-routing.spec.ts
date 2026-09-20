import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test, type Page } from '@playwright/test';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

/**
 * FE-01 (issue #24) – Quét QR phải mở đúng trang /di-san/<slug>.
 *
 * Lỗi gốc: app điều hướng bằng state `screen` trong AppContext và không đọc
 * window.location, nên link trong mã QR luôn mở ra trang chủ dù máy chủ đã
 * trả đúng HTML. Kiểm bằng HTTP không phát hiện được vì mọi đường dẫn đều
 * trả về cùng một khung HTML — phải mở trình duyệt thật.
 *
 * Kịch bản h (giải mã ảnh QR) là quan trọng nhất: trước đây khối QR chỉ là
 * họa tiết CSS, quét không ra gì. Test này đọc ảnh QR render trên trang rồi
 * giải mã, nên nếu ai đó lỡ thay lại bằng ảnh giả thì test sẽ đỏ.
 */

const DI_SAN = '/di-san';

/** Đọc slug và tên thật từ mockData để test bám nguồn dữ liệu, không chép cứng */
function docHeritageSites(): { id: number; slug: string; nameVi: string }[] {
  const duongDan = fileURLToPath(new URL('../src/data/mockData.ts', import.meta.url));
  const noiDung = readFileSync(duongDan, 'utf8');
  const doan = noiDung.slice(noiDung.indexOf('export const heritageSites'));

  return [...doan.matchAll(/id: (\d+),\s*[\r\n]+\s*slug: '([^']+)',\s*[\r\n]+\s*nameVi: '([^']+)'/g)].map(
    (m) => ({ id: Number(m[1]), slug: m[2], nameVi: m[3] })
  );
}

const heritageSites = docHeritageSites();
const TONG_SO_DI_SAN = heritageSites.length;

/** Ba di sản đại diện cho ba tình huống khác nhau */
const DI_SAN_KIEM_TRA = [
  { slug: 'nha-tho-duc-ba', ten: 'Nhà thờ Đức Bà', ghiChu: 'có trong prisma/seed.ts' },
  { slug: 'chua-ngoc-hoang', ten: 'Chùa Ngọc Hoàng', ghiChu: 'chỉ có trong mockData' },
  { slug: heritageSites[heritageSites.length - 1].slug, ten: heritageSites[heritageSites.length - 1].nameVi, ghiChu: 'phần tử cuối danh sách' },
];

/** Đọc ảnh QR đang render trên trang rồi giải mã ra chuỗi mà nó mã hóa */
async function giaiMaQR(page: Page): Promise<string> {
  const src = await page.getAttribute('img[alt^="Mã QR"]', 'src');
  expect(src, 'ảnh QR phải là PNG base64').toMatch(/^data:image\/png;base64,/);

  const png = PNG.sync.read(Buffer.from(src!.split(',')[1], 'base64'));
  const ketQua = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

  expect(ketQua, 'jsQR phải đọc được mã QR (ảnh giả sẽ trả về null)').not.toBeNull();
  return ketQua!.data;
}

/**
 * Ở khổ điện thoại, thanh nav desktop vẫn nằm trong DOM nhưng bị ẩn,
 * nên phải mở menu rồi bấm đúng nút đang hiển thị.
 */
async function bamMenuDienThoai(page: Page, nhan: string) {
  await page.click('button[aria-label="Mở menu"]');
  await page.getByRole('button', { name: nhan, exact: true }).filter({ visible: true }).first().click();
}

/**
 * Chặn mọi request ra ngoài localhost (ảnh Unsplash/Pexels trong mockData).
 * Bộ test này kiểm định tuyến và nội dung mã QR, không kiểm CDN ảnh; để trình
 * duyệt tải vài chục ảnh thật cho mỗi trang làm test chậm và phụ thuộc mạng.
 * Ảnh QR là data: URL nên không bị ảnh hưởng.
 */
test.beforeEach(async ({ page, baseURL }) => {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const noiBo = url.startsWith(baseURL!) || url.startsWith('data:') || url.startsWith('blob:');
    return noiBo ? route.continue() : route.abort();
  });
});

test.describe('Điều hướng di sản theo URL', () => {
  for (const diSan of DI_SAN_KIEM_TRA) {
    test.describe(`${diSan.ten} (${diSan.ghiChu})`, () => {
      test('a. vào /di-san/<slug> thì hiện đúng tên di sản', async ({ page }) => {
        await page.goto(`${DI_SAN}/${diSan.slug}`);
        await expect(page.locator('h1')).toContainText(diSan.ten);
      });

      test('b. reload ở URL sâu vẫn giữ đúng di sản', async ({ page }) => {
        await page.goto(`${DI_SAN}/${diSan.slug}`);
        await page.reload();
        await expect(page.locator('h1')).toContainText(diSan.ten);
        expect(new URL(page.url()).pathname).toBe(`${DI_SAN}/${diSan.slug}`);
      });

      test('c. bấm "Tất cả di sản" thì về danh sách', async ({ page }) => {
        await page.goto(`${DI_SAN}/${diSan.slug}`);
        await page.click('button:has-text("Tất cả di sản")');

        await page.waitForURL(`**${DI_SAN}`);
        await expect(page.locator('button.card-hover')).toHaveCount(TONG_SO_DI_SAN);
      });

      test('g. sang màn khác thì URL về "/"', async ({ page }) => {
        await page.goto(`${DI_SAN}/${diSan.slug}`);
        await bamMenuDienThoai(page, 'Gian hàng');

        await page.waitForURL('**/');
        expect(new URL(page.url()).pathname).toBe('/');
      });

      test('h. mã QR mã hóa đúng đường dẫn landing page', async ({ page, baseURL }) => {
        await page.goto(`${DI_SAN}/${diSan.slug}`);
        await expect(page.locator('h1')).toContainText(diSan.ten);

        expect(await giaiMaQR(page)).toBe(`${baseURL}${DI_SAN}/${diSan.slug}`);
      });
    });
  }

  test('d. bấm một thẻ trong danh sách thì URL đổi sang đúng slug của thẻ đó', async ({ page }) => {
    await page.goto(DI_SAN);

    const the = page.locator('button.card-hover').nth(4);
    const ten = (await the.locator('h3').textContent())!.trim();
    await the.click();

    await page.waitForURL(`**${DI_SAN}/*`);
    const mongDoi = heritageSites.find((h) => h.nameVi === ten);
    expect(mongDoi, `không tìm thấy di sản tên "${ten}" trong mockData`).toBeTruthy();
    expect(new URL(page.url()).pathname).toBe(`${DI_SAN}/${mongDoi!.slug}`);
  });

  test('e. nút Back/Forward của trình duyệt đi đúng màn hình', async ({ page }) => {
    await page.goto(DI_SAN);

    const the = page.locator('button.card-hover').nth(4);
    await the.click();
    await page.waitForURL(`**${DI_SAN}/*`);
    const duongDanChiTiet = new URL(page.url()).pathname;

    await page.goBack();
    await page.waitForURL(`**${DI_SAN}`);
    await expect(page.locator('button.card-hover')).toHaveCount(TONG_SO_DI_SAN);

    await page.goForward();
    await page.waitForURL(`**${duongDanChiTiet}`);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('f. slug không tồn tại thì báo không tìm thấy và quay về được danh sách', async ({ page }) => {
    await page.goto(`${DI_SAN}/khong-ton-tai`);

    await expect(page.locator('h1')).toHaveText('Không tìm thấy di sản');
    await expect(page.getByText(`${DI_SAN}/khong-ton-tai`)).toBeVisible();

    await page.click('button:has-text("Xem tất cả di sản")');
    await page.waitForURL(`**${DI_SAN}`);
    await expect(page.locator('button.card-hover')).toHaveCount(TONG_SO_DI_SAN);
  });

  test('mọi slug trong mockData đều duy nhất', async () => {
    const slugs = heritageSites.map((h) => h.slug);
    expect(new Set(slugs).size, 'có slug bị trùng nên QR sẽ mở nhầm di sản').toBe(slugs.length);
  });
});
