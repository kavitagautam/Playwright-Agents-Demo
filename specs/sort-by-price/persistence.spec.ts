// spec: specs/sort-by-price.plan.md
// seed: seed.spec.ts

import { test, expect, Page } from '@playwright/test';

// Helper to extract product prices from the listing (only clickable cards)
const productPriceLocator = async (page: Page): Promise<number[]> => {
  // Get prices from product cards - extract the first price (sale price if on sale, otherwise regular price)
  const cards = page.locator('div.cursor-pointer').filter({ has: page.locator('h3') });
  const prices: number[] = [];
  
  for (let i = 0; i < await cards.count(); i++) {
    const card = cards.nth(i);
    // Get the first price element within the card using getByText to match price pattern
    const priceText = await card.getByText(/^\$\d+\.\d{2}$/).first().textContent();
    if (priceText) {
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    }
  }
  
  return prices;
};

test.describe('Sort by Price', () => {
  test('Sort persistence when navigating pages', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // Apply ascending sort by price
    await page.getByRole('button', { name: /Sort by Price/ }).click();
    await page.waitForSelector('div.cursor-pointer h3');

    // Get prices on page 1
    const pricesPage1 = await productPriceLocator(page);
    console.log('Prices on page 1:', pricesPage1);
    
    // Verify page 1 is sorted ascending
    for (let i = 1; i < pricesPage1.length; i++) {
      expect(pricesPage1[i]).toBeGreaterThanOrEqual(pricesPage1[i - 1]);
    }

    // Navigate to next page
    await page.getByRole('button', { name: 'Next page' }).click();
    await page.waitForSelector('div.cursor-pointer h3');

    // Verify sort button still shows ascending (or descending if toggled)
    const sortButton = page.getByRole('button', { name: /Sort by Price/ });
    await expect(sortButton).toBeVisible();

    // Get prices on page 2
    const pricesPage2 = await productPriceLocator(page);
    console.log('Prices on page 2:', pricesPage2);
    
    // Verify page 2 is also sorted ascending
    for (let i = 1; i < pricesPage2.length; i++) {
      expect(pricesPage2[i]).toBeGreaterThanOrEqual(pricesPage2[i - 1]);
    }

    // Navigate back to previous page
    await page.getByRole('button', { name: 'Previous page' }).click();
    await page.waitForSelector('div.cursor-pointer h3');

    // Get prices on page 1 again
    const pricesPage1Again = await productPriceLocator(page);
    console.log('Prices on page 1 again:', pricesPage1Again);
    
    // Verify original page still has same sort applied
    expect(pricesPage1Again).toEqual(pricesPage1);
  });
});
