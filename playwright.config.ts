import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:3000';
const serverPort = new URL(baseURL).port || '80';

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
    ['html', { open: 'never' }],
    ['list'],
  ],
  
  use: {
    baseURL,
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
      testIgnore: /real-media\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /research-carousel\.spec\.ts/,
      testIgnore: /real-media\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: /research-carousel\.spec\.ts/,
      testIgnore: /real-media\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    // Opt-in CDN check. Absent unless E2E_REAL_MEDIA=1, so routine runs stay local.
    ...(process.env.E2E_REAL_MEDIA === '1'
      ? [
          {
            name: 'real-media',
            testMatch: /real-media\.spec\.ts/,
            retries: 1,
            use: { ...devices['Desktop Chrome'] },
          },
        ]
      : []),
  ],

  webServer: process.env.CI ? {
    command: `npm run start -- --hostname 127.0.0.1 --port ${serverPort}`,
    url: `http://127.0.0.1:${serverPort}`,
    reuseExistingServer: false,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  } : {
    command: `npm run start -- --hostname 127.0.0.1 --port ${serverPort}`,
    url: `http://127.0.0.1:${serverPort}`,
    reuseExistingServer: false,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
