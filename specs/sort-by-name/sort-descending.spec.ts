// spec: specs/sort-by-name.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Helper to capture product titles
// Helper to capture product titles (only clickable cards)
const productTitleLocator = async (page: Page): Promise<string[]> => {
  return await page.locator('[cursor="pointer"] h3').allTextContents();
};

test.describe('Sort by Name', () => {
  test('Sort items by name descending', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    const sortByName = page.getByTestId('sort-by-name');
    const getTitles = async () => await productTitleLocator(page);
    const isDescending = (list: string[]) => {
      for (let i = 1; i < list.length; i++) {
        if (list[i].localeCompare(list[i - 1]) > 0) return false;
      }
      return true;
    };

    // click until descending order achieved (max 2 clicks)
    console.log('initial arrow:', await sortByName.textContent());
    await sortByName.click();
    console.log('after first click arrow:', await sortByName.textContent());
    let titles = await getTitles();
    console.log('titles after first click', titles);
    if (!isDescending(titles)) {
      await sortByName.click();
      console.log('after second click arrow:', await sortByName.textContent());
      titles = await getTitles();
      console.log('titles after second click', titles);
    }
    await expect(sortByName).toHaveText(/▼/);

    expect(isDescending(titles)).toBe(true);
  });
});