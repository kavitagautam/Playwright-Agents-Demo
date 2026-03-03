// spec: specs/search-items.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search Items', () => {
  test('Search with active category filter — Electronics + HD Monitor', async ({ page }) => {
    // Navigate to shopping page
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // Apply category filter to Electronics
    await page.locator('select').selectOption({ label: 'Electronics' });

    // Search for HD Monitor
    await page.getByPlaceholder('Search for items').fill('HD Monitor');
    await page.getByPlaceholder('Search for items').press('Enter');

    // Wait for results and collect titles and category labels
    await page.waitForSelector('div.cursor-pointer h3');
    const cards = page.locator('div.cursor-pointer').filter({ has: page.locator('h3') });
    const count = await cards.count();
    const titles = await cards.locator('h3').allTextContents();

    console.log('Filtered search titles:', titles);

    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toContainText('HD Monitor', { matchSubstring: true });
      await expect(cards.nth(i)).toContainText('Electronics');
    }
  });
});
