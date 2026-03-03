// spec: specs/search-items.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search Items', () => {
  test('Exact match — search for HD Monitor', async ({ page }) => {
    // 1. Navigate to the shopping page
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // 2. Type an exact product title into the search box and submit
    await page.getByPlaceholder('Search for items').fill('HD Monitor');
    await page.getByPlaceholder('Search for items').press('Enter');

    // 3. Verify at least one product card title contains the exact search term
    await page.waitForSelector('div.cursor-pointer h3');
    const titles = await page.locator('div.cursor-pointer h3').allTextContents();
    console.log('Search results titles:', titles);

    expect(titles.length).toBeGreaterThan(0);
    for (const t of titles) {
      expect(t).toContain('HD Monitor');
    }
  });
});
