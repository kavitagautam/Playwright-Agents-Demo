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
  test('Sort items by price descending', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // Click Sort by Price button once to go ascending
    await page.getByRole('button', { name: /Sort by Price/ }).click();
    await page.waitForSelector('div.cursor-pointer h3');

    // Click Sort by Price button again to toggle descending
    await page.getByRole('button', { name: /Sort by Price/ }).click();
    await page.waitForSelector('div.cursor-pointer h3');

    // Get prices and verify descending order
    const prices = await productPriceLocator(page);
    console.log('Prices in descending order:', prices);
    
    expect(prices.length).toBeGreaterThan(0);
    
    // Validate that each consecutive price is numerically less than or equal to the previous
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });
});
