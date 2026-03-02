// spec: specs/sort-by-name.plan.md
// seed: seed.spec.ts

import { test, expect, Page } from '@playwright/test';

const titlesLocator = async (page: { locator: (arg0: string) => any; }) => {
  return await page.locator('[cursor="pointer"] h3').allTextContents();
};

async function verifyAscending(page: Page) {
  const list = await titlesLocator(page);
  for (let i = 1; i < list.length; i++) {
    expect(list[i].localeCompare(list[i - 1])).toBeGreaterThanOrEqual(0);
  }
}

test.describe('Sort by Name', () => {
  test('Edge case – add-to cart doesn’t break sort', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    const sortByName = page.getByTestId('sort-by-name');
    const getTitles = async () => await titlesLocator(page);
    const isAscending = (list: string[]) => {
      for (let i = 1; i < list.length; i++) {
        if (list[i].localeCompare(list[i - 1]) < 0) return false;
      }
      return true;
    };
    // make sure ascending order
    await sortByName.click();
    let list = await getTitles();
    if (!isAscending(list)) {
      await sortByName.click();
      list = await getTitles();
    }
    expect(isAscending(list)).toBe(true);

    // add first visible item to cart
    const firstAdd = page.locator('[data-testid^="add-to-cart"]').first();
    await firstAdd.click();

    // list should remain sorted
    await verifyAscending(page);
  });
});