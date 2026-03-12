import { expect, test } from '@playwright/test';

const viewports = [
  {
    name: 'mobile',
    width: 390,
    height: 844,
    expectedRowDistribution: [1, 1, 1, 1],
  },
  {
    name: 'tablet',
    width: 768,
    height: 1024,
    expectedRowDistribution: [2, 2],
  },
  {
    name: 'ipad-pro-portrait',
    width: 1024,
    height: 1366,
    expectedRowDistribution: [2, 2],
  },
  {
    name: 'ipad-pro-landscape',
    width: 1366,
    height: 1024,
    expectedRowDistribution: [4],
  },
  {
    name: 'desktop',
    width: 1280,
    height: 960,
    expectedRowDistribution: [4],
  },
];

for (const viewport of viewports) {
  test(`renders the Young Advocates impact section correctly on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/programs/akomapa-young-advocates', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText(/mental health/i).first()).toBeVisible();
    await page.waitForTimeout(600);

    const impactSection = page.getByTestId('young-advocates-impact-section');
    await impactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    await expect(impactSection.getByRole('heading', { name: 'Our Impact' })).toBeVisible();

    const impactGrid = page.getByTestId('young-advocates-impact-grid');
    await expect(impactGrid).toBeVisible();
    await expect
      .poll(async () => impactGrid.evaluate((element) => window.getComputedStyle(element).display))
      .toBe('grid');

    const cards = page.getByTestId('young-advocates-impact-card');
    await expect(cards).toHaveCount(4);
    await expect(cards.first()).toBeVisible();

    const columnCount = await impactGrid.evaluate((element) => {
      const templateColumns = window.getComputedStyle(element).gridTemplateColumns;
      return templateColumns.split(' ').filter(Boolean).length;
    });

    expect(columnCount).toBe(viewport.expectedRowDistribution[0]);

    const hasHorizontalOverflow = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      return (
        document.documentElement.scrollWidth > viewportWidth + 1 ||
        document.body.scrollWidth > viewportWidth + 1
      );
    });

    expect(hasHorizontalOverflow).toBe(false);
  });
}
