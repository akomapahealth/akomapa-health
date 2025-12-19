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
      
      await testPage.goto(page.path);
      await testPage.waitForLoadState('domcontentloaded');
      
      // Check page loads without errors
      await expect(testPage).toHaveURL(new RegExp(page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      
      // Check page title contains expected text
      const title = await testPage.title();
      expect(title.toLowerCase()).toContain(page.title.toLowerCase());
      
      // Check header exists
      const header = testPage.locator('header');
      await expect(header).toBeVisible();
      
      // Check main content exists (try multiple selectors)
      const mainContent = testPage.locator('main, [role="main"], body > div').first();
      await expect(mainContent).toBeVisible();
      
      // Wait a bit to catch any delayed errors
      await testPage.waitForTimeout(1000);
      
      // Filter out known non-critical errors (like missing images, etc.)
      const criticalErrors = errors.filter(error => 
        !error.includes('Failed to load resource') &&
        !error.includes('net::ERR_') &&
        !error.includes('404')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  }
});

