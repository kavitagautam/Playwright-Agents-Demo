// spec: specs/filter-by-category.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Category Filters', () => {
  test('Reset category filter to All', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    const category = page.locator('select');
    // apply some filter first
    await category.selectOption({ label: 'Electronics' });
    await page.waitForSelector('div.cursor-pointer h3');

    // reset to All
    await category.selectOption({ label: 'All' });
    await page.waitForSelector('div.cursor-pointer h3');

    // verify that full item list is visible (at least one non-electronics exists)
    const cards = page.locator('div.cursor-pointer').filter({ has: page.locator('h3') });
    const texts = await cards.allTextContents();
    expect(texts.some(t => !t.includes('Electronics'))).toBe(true);
  });
});