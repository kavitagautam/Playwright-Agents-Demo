// spec: specs/sort-by-name.plan.md
// seed: seed.spec.ts

import { test, expect, Page } from '@playwright/test';

// Helpers to extract product titles from the listing (only clickable cards)
const productTitleLocator = async (page: Page): Promise<string[]> => {
  // headings inside elements with cursor pointer correspond to products
  return await page.locator('[cursor="pointer"] h3').allTextContents();
};

test.describe('Sort by Name', () => {
  test('Sort items by name ascending', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // helper that toggles until order matches desired direction
    const sortByName = page.getByTestId('sort-by-name');
    const getTitles = async () => await productTitleLocator(page);
    const isAscending = (list: string[]) => {
      for (let i = 1; i < list.length; i++) {
        if (list[i].localeCompare(list[i - 1]) < 0) return false;
      }
      return true;
    };

    // attempt up to two clicks to achieve ascending order
    await sortByName.click();
    let titles = await getTitles();
    if (!isAscending(titles)) {
      await sortByName.click();
      titles = await getTitles();
    }

    // verify final ordering is ascending
    if (!isAscending(titles)) {
      for (let i = 1; i < titles.length; i++) {
        if (titles[i].localeCompare(titles[i - 1]) < 0) {
          console.log('order issue:', titles[i - 1], '>', titles[i]);
        }
      }
    }
    expect(isAscending(titles)).toBe(true);
  });
});