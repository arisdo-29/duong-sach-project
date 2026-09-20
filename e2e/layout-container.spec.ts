import { test, expect } from '@playwright/test';

// Lề trái của mọi khối .container-page (Header, nội dung, Footer) phải trùng nhau
// và giống nhau giữa các trang: cùng một khung dùng chung (#30).
const sizes = [375, 768, 1440];

for (const width of sizes) {
  test(`lề khung thẳng hàng ở ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const lefts: number[] = [];
    const navCount = 6;
    for (let i = 0; i < navCount; i++) {
      if (width < 1024) await page.getByRole('button', { name: /Mở menu/ }).click();
      const items = page.locator('header nav button:visible, header div.flex-col > button:visible');
      const btn = items.nth(i);
      if (await btn.count()) await btn.click();
      await page.waitForTimeout(300);
      const boxes = await page.locator('.container-page').evaluateAll((els) =>
        els.map((e) => {
          const r = e.getBoundingClientRect();
          const cs = getComputedStyle(e);
          return Math.round(r.left + parseFloat(cs.paddingLeft));
        }),
      );
      const uniq = new Set(boxes);
      expect(uniq.size, `trang ${i}: ${[...uniq]}`).toBe(1);
      lefts.push(boxes[0]);
    }
    expect(new Set(lefts).size).toBe(1);
  });
}
