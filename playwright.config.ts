import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  outputDir: 'reports/test-results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'reports/playwright-report', open: 'never' }]],
  use: {
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-test-id',
    baseURL: process.env.STAND_URL,
    trace: 'on-first-retry',

    actionTimeout: 30000,
    navigationTimeout: 30000,
    extraHTTPHeaders: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'auth-tests',
      testMatch: /.*auth\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'chromium',
      testMatch: /^(?!.*auth\.spec\.ts).*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, '.auth', 'user.json'),
      },
      dependencies: ['setup'],
    },
  ],
});
