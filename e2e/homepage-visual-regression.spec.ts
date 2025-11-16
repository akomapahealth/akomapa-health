import { test, expect } from '@playwright/test';

/**
 * Visual regression tests
 * Takes screenshots of key sections to verify visual consistency
 * Note: These tests require visual comparison - run with --update-snapshots to update baseline images
 */
test.describe('Homepage Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should match homepage hero section snapshot', async ({ page }) => {
    // Wait for hero to fully load
    await page.waitForTimeout(2000);
    
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Take screenshot of hero section
    await expect(heroSection).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 100,
    });
  });

  test('should match homepage full page snapshot on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-desktop-full.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  test('should match homepage full page snapshot on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-tablet-full.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  test('should match homepage full page snapshot on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-mobile-full.png', {
      fullPage: true,
      maxDiffPixels: 500,
    });
  });

  test('should match programs section snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Scroll to programs section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.3);
    });
    await page.waitForTimeout(2000);
    
    const programsSection = page.getByText(/OUR PROGRAMS/i).locator('..').locator('..');
    if (await programsSection.isVisible()) {
      await expect(programsSection).toHaveScreenshot('programs-section.png', {
        maxDiffPixels: 200,
      });
    }
  });

  test('should match testimonials section snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Scroll to testimonials
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.8);
    });
    await page.waitForTimeout(2000);
    
    const testimonialsSection = page.getByText(/VOICES FROM THE FIELD/i).locator('..').locator('..');
    if (await testimonialsSection.isVisible()) {
      await expect(testimonialsSection).toHaveScreenshot('testimonials-section.png', {
        maxDiffPixels: 200,
      });
    }
  });

  test('should match header snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header-desktop.png', {
      maxDiffPixels: 100,
    });
  });

  test('should match mobile header snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('should match gallery section snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Scroll to gallery
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.9);
    });
    await page.waitForTimeout(2000);
    
    const gallerySection = page.getByText(/OUR WORK IN ACTION|Gallery/i).locator('..').locator('..');
    if (await gallerySection.isVisible()) {
      await expect(gallerySection).toHaveScreenshot('gallery-section.png', {
        maxDiffPixels: 200,
      });
    }
  });

  test('should match impact metrics section snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Scroll to metrics
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.7);
    });
    await page.waitForTimeout(3000); // Wait for counter animations
    
    const metricsSection = page.getByText(/OUR IMPACT/i).locator('..').locator('..');
    if (await metricsSection.isVisible()) {
      await expect(metricsSection).toHaveScreenshot('impact-metrics-section.png', {
        maxDiffPixels: 200,
      });
    }
  });
});

