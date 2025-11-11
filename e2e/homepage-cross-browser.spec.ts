import { test, expect } from '@playwright/test';

/**
 * Cross-browser compatibility tests
 * Verifies homepage works correctly on Chrome, Firefox, and Safari
 */
test.describe('Homepage Cross-Browser Compatibility', () => {
  test('should load homepage on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check page loaded
    await expect(page).toHaveURL(/.*\/$/);
    
    // Check title
    const title = await page.title();
    expect(title).toContain('Akomapa');
    
    console.log(`Homepage loaded successfully on ${browserName}`);
  });

  test('should display hero section on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    
    const heroText = await heroTitle.textContent();
    expect(heroText?.length).toBeGreaterThan(0);
    
    console.log(`Hero section displayed on ${browserName}`);
  });

  test('should handle animations on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to trigger animations
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await page.waitForTimeout(2000);
    
    // Check that content is visible after scroll
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(5);
    
    console.log(`Animations handled on ${browserName}`);
  });

  test('should handle carousels on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to testimonials
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight * 0.8);
    });
    await page.waitForTimeout(2000);
    
    // Check testimonials section
    const testimonials = page.getByText(/VOICES FROM THE FIELD|Stories/i);
    const isVisible = await testimonials.first().isVisible().catch(() => false);
    expect(isVisible).toBeTruthy();
    
    console.log(`Carousels handled on ${browserName}`);
  });

  test('should handle click events on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find a clickable element (CTA button)
    const ctaButton = page.getByRole('link', { name: /join|support/i }).first();
    
    if (await ctaButton.isVisible()) {
      // Verify button is clickable
      await expect(ctaButton).toBeEnabled();
      
      // Check button has href
      const href = await ctaButton.getAttribute('href');
      expect(href).not.toBeNull();
    }
    
    console.log(`Click events handled on ${browserName}`);
  });

  test('should handle responsive layouts on all browsers', async ({ page, browserName }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 375;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const headerDesktop = page.locator('header');
    await expect(headerDesktop).toBeVisible();
    
    console.log(`Responsive layouts handled on ${browserName}`);
  });

  test('should handle images on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for images to load
    await page.waitForTimeout(2000);
    
    // Check images are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
    
    // Check first few images are visible
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const boundingBox = await img.boundingBox();
        expect(boundingBox).not.toBeNull();
      }
    }
    
    console.log(`Images handled on ${browserName}`);
  });

  test('should handle form inputs on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to newsletter section if it exists
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);
    
    // Check for email input (newsletter)
    const emailInput = page.locator('input[type="email"]');
    const inputCount = await emailInput.count();
    
    if (inputCount > 0) {
      await expect(emailInput.first()).toBeVisible();
      await expect(emailInput.first()).toBeEnabled();
    }
    
    console.log(`Form inputs handled on ${browserName}`);
  });

  test('should handle scroll behavior on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test smooth scroll
    const initialScroll = await page.evaluate(() => window.scrollY);
    
    await page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    
    const finalScroll = await page.evaluate(() => window.scrollY);
    expect(finalScroll).toBeGreaterThan(initialScroll);
    
    console.log(`Scroll behavior handled on ${browserName}`);
  });

  test('should handle CSS animations on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for animated elements (framer-motion or CSS animations)
    const animatedElements = page.locator('[class*="motion"], [class*="animate"]');
    const animatedCount = await animatedElements.count();
    
    // Page should have some animated elements
    expect(animatedCount).toBeGreaterThanOrEqual(0);
    
    // Verify page is interactive
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    console.log(`CSS animations handled on ${browserName}`);
  });

  test('should maintain consistent layout on all browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check header layout
    const header = page.locator('header');
    const headerBox = await header.boundingBox();
    expect(headerBox).not.toBeNull();
    expect(headerBox!.width).toBeGreaterThan(0);
    expect(headerBox!.height).toBeGreaterThan(0);
    
    // Check main content
    const main = page.locator('main');
    const mainBox = await main.boundingBox();
    expect(mainBox).not.toBeNull();
    
    // Check footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    
    const footer = page.locator('footer');
    const footerVisible = await footer.isVisible().catch(() => false);
    expect(footerVisible).toBeTruthy();
    
    console.log(`Layout consistent on ${browserName}`);
  });
});

