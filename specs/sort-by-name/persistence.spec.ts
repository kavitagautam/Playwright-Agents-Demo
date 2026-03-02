// spec: specs/sort-by-name.plan.md
// seed: seed.spec.ts

import { test, expect, Page } from '@playwright/test';

// helper titles from clickable product cards only
const titles = async (page: Page) => {
  return await page.locator('[cursor="pointer"] h3').allTextContents();
};

test.describe('Sort by Name', () => {
  test('Sort persistence when navigating pages', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    const sortByName = page.getByTestId('sort-by-name');
    const getTitles = async () => await titles(page);
    const isAscending = (list: string[]) => {
      for (let i = 1; i < list.length; i++) {
        if (list[i].localeCompare(list[i - 1]) < 0) return false;
      }
      return true;
    };
    // ensure ascending order on first page
    await sortByName.click();
    let firstPageTitles = await getTitles();
    if (!isAscending(firstPageTitles)) {
      await sortByName.click();
      firstPageTitles = await getTitles();
    }
    expect(isAscending(firstPageTitles)).toBe(true);

    // go to next page and verify sorting holds
    // use numeric page-button locator instead of text to avoid arrow icons
    const page2 = page.locator('button').filter({ hasText: '2' }).first();
    await page2.click();
    const secondPageTitles = await titles(page);
    for (let i = 1; i < secondPageTitles.length; i++) {
      expect(secondPageTitles[i].localeCompare(secondPageTitles[i - 1])).toBeGreaterThanOrEqual(0);
    }

    // return to first page and re-check
    const page1 = page.locator('button').filter({ hasText: '1' }).first();
    await page1.click();
    const firstPageTitlesAgain = await titles(page);
    for (let i = 1; i < firstPageTitlesAgain.length; i++) {
      expect(firstPageTitlesAgain[i].localeCompare(firstPageTitlesAgain[i - 1])).toBeGreaterThanOrEqual(0);
    }
  });
});