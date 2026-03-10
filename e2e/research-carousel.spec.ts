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
  await expect(page.getByTestId('partner-logo-carousel')).toBeVisible();
}

test.describe('Research partner carousel', () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${theme} ${viewport.name} carousel fades logos at the viewport edges`, async ({ page }) => {
        await openHomeWithTheme(page, theme, viewport);

        const carousel = page.getByTestId('partner-logo-carousel');
        const styles = await carousel.evaluate((element) => {
          const htmlElement = element as HTMLElement;
          const style = window.getComputedStyle(htmlElement);
          const beforeStyle = window.getComputedStyle(htmlElement, '::before');
          const afterStyle = window.getComputedStyle(htmlElement, '::after');
          const track = htmlElement.firstElementChild as HTMLElement | null;
          const extendedStyle = style as CSSStyleDeclaration & {
            webkitMaskImage?: string;
            webkitMaskRepeat?: string;
            webkitMaskSize?: string;
          };

          return {
            beforeBackgroundImage: beforeStyle.backgroundImage,
            afterBackgroundImage: afterStyle.backgroundImage,
            leftRgb: style.getPropertyValue('--partner-carousel-left-rgb').trim(),
            rightRgb: style.getPropertyValue('--partner-carousel-right-rgb').trim(),
            maskImage: style.maskImage,
            maskRepeat: style.maskRepeat,
            maskSize: style.maskSize,
            overflowX: style.overflowX,
            supportsMask: CSS.supports('mask-image', 'linear-gradient(black, black)'),
            supportsWebkitMask: CSS.supports('-webkit-mask-image', 'linear-gradient(black, black)'),
            trackWidth: track?.scrollWidth ?? 0,
            viewportWidth: htmlElement.clientWidth,
            webkitMaskImage: extendedStyle.webkitMaskImage ?? '',
            webkitMaskRepeat: extendedStyle.webkitMaskRepeat ?? '',
            webkitMaskSize: extendedStyle.webkitMaskSize ?? '',
          };
        });

        expect(styles.leftRgb).toBe('0 151 178');
        expect(styles.rightRgb).toBe('15 76 92');
        expect(styles.overflowX).toBe('hidden');
        expect(styles.trackWidth).toBeGreaterThan(styles.viewportWidth);

        if (styles.supportsMask || styles.supportsWebkitMask) {
          const activeMaskImage = styles.maskImage !== 'none' ? styles.maskImage : styles.webkitMaskImage;
          expect(styles.maskImage !== 'none' || styles.webkitMaskImage !== 'none').toBe(true);
          expect(styles.maskRepeat !== 'repeat' || styles.webkitMaskRepeat !== 'repeat').toBe(true);
          expect(styles.maskSize !== 'auto' || styles.webkitMaskSize !== 'auto').toBe(true);
          expect(activeMaskImage).toContain('255, 255, 255');
          expect(styles.beforeBackgroundImage).toBe('none');
          expect(styles.afterBackgroundImage).toBe('none');
        } else {
          expect(styles.beforeBackgroundImage).not.toBe('none');
          expect(styles.afterBackgroundImage).not.toBe('none');
        }
      });
    }
  }
});
