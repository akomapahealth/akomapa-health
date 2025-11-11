import { Page } from '@playwright/test';

/**
 * Helper functions for E2E tests
 */

/**
 * Wait for page to be fully loaded and interactive
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  // Wait a bit for any initial animations
  await page.waitForTimeout(1000);
}

/**
 * Scroll to a section by text content
 */
export async function scrollToSection(page: Page, text: string | RegExp) {
  const element = page.getByText(text).first();
  if (await element.isVisible().catch(() => false)) {
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  } else {
    // If not visible, scroll down gradually
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
  }
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Wait for counter animation to complete
 */
export async function waitForCounterAnimation(page: Page, timeout = 3000) {
  // Wait for animation to start and complete
  await page.waitForTimeout(timeout);
  
  // Verify counters have values
  const counters = page.locator('text=/\\d+\\+?/');
  const count = await counters.count();
  return count > 0;
}

/**
 * Take screenshot of section
 */
export async function screenshotSection(
  page: Page,
  sectionSelector: string,
  filename: string
) {
  const section = page.locator(sectionSelector);
  if (await section.isVisible()) {
    await section.screenshot({ path: `test-results/${filename}` });
  }
}

/**
 * Check for horizontal overflow
 */
export async function checkHorizontalOverflow(page: Page): Promise<boolean> {
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = page.viewportSize()?.width || 0;
  return bodyWidth > viewportWidth + 20; // Allow small margin
}

/**
 * Wait for carousel to advance
 */
export async function waitForCarouselAdvance(
  page: Page,
  initialContent: string,
  timeout = 2000
) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const currentContent = await page.locator('blockquote, [class*="slide"]').first().textContent().catch(() => '');
    if (currentContent && currentContent !== initialContent) {
      return true;
    }
    await page.waitForTimeout(100);
  }
  return false;
}

/**
 * Get all visible sections
 */
export async function getVisibleSections(page: Page): Promise<string[]> {
  return await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections
      .filter(section => {
        const rect = section.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map(section => section.textContent?.trim().substring(0, 50) || '');
  });
}

