// spec: specs/filter-by-category.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Category Filters', () => {
  test('Filter by Accessories', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    const category = page.locator('select');

    const cards = page.locator('div.cursor-pointer').filter({ has: page.locator('h3') });

    // select the desired category and wait for cards
    await category.selectOption({ label: 'Accessories' });
    await page.waitForSelector('div.cursor-pointer h3');

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toContainText('Accessories');
    }
  });
});