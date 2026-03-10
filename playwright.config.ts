import { defineConfig, devices } from '@playwright/test';

/**
 * E2E test configuration
 * Runs the full smoke suite in Chromium and targeted visual coverage in Firefox/WebKit.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
  ],
  
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Increase timeout for slow pages with animations
    actionTimeout: 15000,
  },
  
  // Increase test timeout for pages that take longer to render
  timeout: 60000, // 60 seconds

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /research-carousel\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: /research-carousel\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: process.env.CI ? {
    command: 'npm run start -- --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: false,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  } : {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
