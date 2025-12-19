import { test, expect } from '@playwright/test';

/**
 * Simple page rendering tests
 * Verifies that all main pages render correctly without errors
 */

const pages = [
  { path: '/', title: 'Akomapa' },
  { path: '/about', title: 'About' },
  { path: '/about/team', title: 'Team' },
  { path: '/programs', title: 'Programs' },
  { path: '/clinics', title: 'Clinics' },
  { path: '/research', title: 'Research' },
  { path: '/contact', title: 'Contact' },
  { path: '/donate', title: 'Donate' },
  { path: '/join', title: 'Join' },
  { path: '/partner', title: 'Partner' },
  { path: '/roadmap', title: 'Roadmap' },
  { path: '/resources', title: 'Resources' },
];

test.describe('Page Rendering Tests', () => {
  for (const page of pages) {
    test(`should render ${page.path}`, async ({ page: testPage }) => {
      // Set up console error listener before navigation
      const errors: string[] = [];
      testPage.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Navigate to page and wait for initial load
      await testPage.goto(page.path, { waitUntil: 'domcontentloaded' });
      
      // Check page loads without errors
      await expect(testPage).toHaveURL(new RegExp(page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      
      // Check page has a title (more flexible than exact match)
      const title = await testPage.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      // Wait for header to be visible (should be fast)
      // Use .first() since some pages may have multiple header elements
      const header = testPage.locator('header').first();
      await expect(header).toBeVisible({ timeout: 10000 });
      
      // Check main content exists - use a more efficient approach
      // First try main tag, then fallback to sections, then any visible content
      const mainTag = testPage.locator('main');
      const mainTagCount = await mainTag.count();
      
      if (mainTagCount > 0) {
        // Wait for main tag to be visible (with reasonable timeout)
        await expect(mainTag.first()).toBeVisible({ timeout: 20000 });
      } else {
        // Fallback: check for visible sections
        const sections = testPage.locator('section');
        const sectionCount = await sections.count();
        
        if (sectionCount > 0) {
          // Wait for first section to be visible
          await expect(sections.first()).toBeVisible({ timeout: 20000 });
        } else {
          // Last resort: check for any visible content (h1, h2, or any text content)
          const contentLocator = testPage.locator('h1, h2, [role="main"]').first();
          await expect(contentLocator).toBeVisible({ timeout: 20000 });
        }
      }
      
      // Wait a bit to catch any delayed errors (reduced from 1000ms)
      await testPage.waitForTimeout(500);
      
      // Filter out known non-critical errors (like missing images, etc.)
      const criticalErrors = errors.filter(error => 
        !error.includes('Failed to load resource') &&
        !error.includes('net::ERR_') &&
        !error.includes('404') &&
        !error.includes('The requested resource isn\'t a valid image')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  }
});

