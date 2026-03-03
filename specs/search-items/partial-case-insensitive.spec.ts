// spec: specs/search-items.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search Items', () => {
  test('Partial and case-insensitive match — search for moNItor', async ({ page }) => {
    // Navigate to shopping page
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // Type a partial product term with mixed case and submit
    await page.getByPlaceholder('Search for items').fill('moNItor');
    await page.getByPlaceholder('Search for items').press('Enter');

    // Wait for results and collect titles
    await page.waitForSelector('div.cursor-pointer h3');
    const titles = await page.locator('div.cursor-pointer h3').allTextContents();
    console.log('Partial match titles:', titles);

    expect(titles.length).toBeGreaterThan(0);
    for (const t of titles) {
      expect(t.toLowerCase()).toContain('monitor');
    }
  });
});
