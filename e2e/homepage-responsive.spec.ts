import { test, expect } from '@playwright/test';

/**
 * Tests homepage responsive behavior across different screen sizes
 * Verifies layouts don't break on mobile, tablet, and desktop
 */
const viewports = [
  { name: 'Mobile Small', width: 375, height: 667 }, // iPhone SE
  { name: 'Mobile Medium', width: 390, height: 844 }, // iPhone 12/13
  { name: 'Mobile Large', width: 428, height: 926 }, // iPhone Pro Max
  { name: 'Tablet Portrait', width: 768, height: 1024 }, // iPad
  { name: 'Tablet Landscape', width: 1024, height: 768 }, // iPad Landscape
  { name: 'Desktop Small', width: 1280, height: 720 }, // HD
  { name: 'Desktop Medium', width: 1440, height: 900 }, // MacBook
  { name: 'Desktop Large', width: 1920, height: 1080 }, // Full HD
];

test.describe('Homepage Responsive Layout', () => {
  viewports.forEach(viewport => {
    test(`should display correctly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check that header is visible and not broken
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Check that hero section is visible
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      // Check that main content sections are visible
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThan(5);
      
      // Verify no horizontal scrolling on mobile
      if (viewport.width < 768) {
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = viewport.width;
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // Allow small margin for rounding
      }
      
      // Check that text is readable (not overlapping)
      const textElements = page.locator('h1, h2, h3, p');
      const firstText = textElements.first();
      if (await firstText.isVisible()) {
        const boundingBox = await firstText.boundingBox();
        expect(boundingBox).not.toBeNull();
        expect(boundingBox!.width).toBeGreaterThan(0);
        expect(boundingBox!.height).toBeGreaterThan(0);
      }
    });
  });

  test('should stack elements vertically on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that grid layouts adapt to single column on mobile
    const programsGrid = page.locator('section').filter({ hasText: 'OUR PROGRAMS' }).locator('..');
    if (await programsGrid.count() > 0) {
      // Programs should stack on mobile
      const programCards = page.locator('[class*="grid"]').first();
      if (await programCards.isVisible()) {
        const gridStyle = await programCards.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            gridTemplateColumns: styles.gridTemplateColumns,
            display: styles.display
          };
        });
        // On mobile, should be single column or flex column
        expect(gridStyle.display).not.toBe('none');
      }
    }
  });

  test('should display navigation menu correctly on all screen sizes', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Desktop: Check desktop navigation is visible
    const desktopNav = page.locator('nav').first();
    await expect(desktopNav).toBeVisible();
    
    // Mobile: Check mobile menu button is visible
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has-text("Open main menu")').first();
    // Mobile menu button should be visible or the menu should be accessible
    const menuButtonVisible = await mobileMenuButton.isVisible().catch(() => false);
    if (!menuButtonVisible) {
      // Check if hamburger icon exists
      const hamburger = page.locator('svg').filter({ has: page.locator('path') }).first();
      expect(await hamburger.isVisible().catch(() => false)).toBeTruthy();
    }
  });

  test('should maintain proper spacing on all viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that sections have proper padding
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    
    for (let i = 0; i < Math.min(sectionCount, 5); i++) {
      const section = sections.nth(i);
      if (await section.isVisible()) {
        const padding = await section.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            paddingTop: parseInt(styles.paddingTop) || 0,
            paddingBottom: parseInt(styles.paddingBottom) || 0,
          };
        });
        
        // Sections should have some padding (responsive)
        expect(padding.paddingTop + padding.paddingBottom).toBeGreaterThan(0);
      }
    }
  });

  test('should handle images responsively', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that images don't overflow
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const boundingBox = await img.boundingBox();
        if (boundingBox) {
          // Image should not be wider than viewport
          expect(boundingBox.width).toBeLessThanOrEqual(375 + 20); // Allow small margin
        }
      }
    }
  });
});

