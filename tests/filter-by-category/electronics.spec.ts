// spec: specs/filter-by-category.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Category Filters', () => {
  test('Filter by Electronics', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // locate category dropdown using the native select element
    const category = page.locator('select');

    // helper for product cards – use the Tailwind `cursor-pointer` class which
    // reliably identifies the clickable product containers.
    const cards = page.locator('div.cursor-pointer').filter({ has: page.locator('h3') });

    // log existing titles before selecting
    console.log('pre-filter titles:', await cards.locator('h3').allTextContents());

    // select Electronics category by label
    await category.selectOption({ label: 'Electronics' });

    // wait for results to render (at least one card title should be visible)
    await page.waitForSelector('div.cursor-pointer h3');

    // verify all displayed products belong to Electronics category
    const cardCount = await cards.count();
    console.log('post-filter card count', cardCount);
    const titles = await cards.locator('h3').allTextContents();
    console.log('post-filter titles', titles);
    expect(cardCount).toBeGreaterThan(0);
    for (let i = 0; i < cardCount; i++) {
      await expect(cards.nth(i)).toContainText('Electronics');
    }
  });
});