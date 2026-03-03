// spec: specs/search-items.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search Items', () => {
  test('No results — search for gibberish qwertyxyz123', async ({ page }) => {
    // Navigate to shopping page
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // Type a gibberish string and submit
    await page.getByPlaceholder('Search for items').fill('qwertyxyz123');
    await page.getByPlaceholder('Search for items').press('Enter');

    // Wait briefly for results to render; if no cards appear the wait will time out quickly
    try {
      await page.waitForSelector('div.cursor-pointer', { timeout: 2000 });
    } catch (e) {
      // no product cards appeared within timeout — that's acceptable for "no results"
    }

    // Collect any visible product titles (may be empty)
    const titles = await page.locator('div.cursor-pointer h3').allTextContents();
    console.log('No-results search titles:', titles);

    // Expect no matching visible product titles
    expect(titles.length).toBe(0);
  });
});
