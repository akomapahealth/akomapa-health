import { expect, test, type Page } from '@playwright/test';

const themes = ['light', 'dark'] as const;
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

async function openHomeWithTheme(
  page: Page,
  theme: (typeof themes)[number],
  viewport: (typeof viewports)[number]
) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.addInitScript((storedTheme) => {
    window.localStorage.setItem('akomapa-theme', storedTheme);
  }, theme);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth > 1
  );
}

test.describe('Homepage partner logos', () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${theme} ${viewport.name} renders the partner logo grid without overflow`, async ({
        page,
      }) => {
        await openHomeWithTheme(page, theme, viewport);

        await expect(
          page.getByRole('heading', { name: /who we work with/i })
        ).toBeVisible();

        const grid = page.getByTestId('partner-logos');
        await grid.scrollIntoViewIfNeeded();
        await expect(grid).toBeVisible();

        const logos = grid.locator('img');
        expect(await logos.count()).toBeGreaterThanOrEqual(6);
        await expect(logos.first()).toBeVisible();

        // The flat grid replaces the old scrolling carousel — no overflow.
        const gridOverflowsX = await grid.evaluate(
          (el) => (el as HTMLElement).scrollWidth - (el as HTMLElement).clientWidth > 1
        );
        expect(gridOverflowsX).toBe(false);
        expect(await hasHorizontalOverflow(page)).toBe(false);
      });
    }
  }
});
