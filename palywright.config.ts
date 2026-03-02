import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  reporter: [['list'], ['html', { open: 'always' }]],

  use: {
    baseURL: 'https://practiceautomatedtesting.com/shopping',
    headless: false,          // IMPORTANT for demo (browser visible)
    trace: 'on-first-retry',
  },
});