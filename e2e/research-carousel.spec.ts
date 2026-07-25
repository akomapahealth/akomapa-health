import { expect, test, type Page } from '@playwright/test';
import { announcementCampaign } from '../src/data/announcements';

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
  await page.addInitScript(
    ({ storedTheme, announcementVersion }) => {
      window.localStorage.setItem('akomapa-theme', storedTheme);
      window.localStorage.setItem(
        'akomapa-announcements-dismissed',
        announcementVersion,
      );
    },
    { storedTheme: theme, announcementVersion: announcementCampaign.version },
  );
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
          page.getByRole('heading', { name: /designed with evidence/i })
        ).toBeVisible();

        const carousel = page
          .getByRole('region', { name: /designed with evidence/i })
          .getByTestId('partner-logos');
        await carousel.scrollIntoViewIfNeeded();
        await expect(carousel).toBeVisible();

        const logos = carousel.locator('img');
        expect(await logos.count()).toBeGreaterThanOrEqual(12);
        await expect(logos.first()).toBeVisible();

        // The marquee track is wider than the (overflow-hidden) viewport...
        const { trackWidth, viewportWidth, overflowX } = await carousel.evaluate(
          (el) => {
            const element = el as HTMLElement;
            const track = element.firstElementChild as HTMLElement | null;
            return {
              trackWidth: track?.scrollWidth ?? 0,
              viewportWidth: element.clientWidth,
              overflowX: getComputedStyle(element).overflowX,
            };
          }
        );
        expect(overflowX).toBe('hidden');
        expect(trackWidth).toBeGreaterThan(viewportWidth);

        // ...but it must not cause horizontal overflow on the page.
        expect(await hasHorizontalOverflow(page)).toBe(false);
      });
    }
  }
});
