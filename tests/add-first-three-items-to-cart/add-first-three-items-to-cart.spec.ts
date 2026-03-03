// spec: specs/add-first-three-items-to-cart.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Add First Three Items to Cart', () => {
  test('Add first three items to cart sequentially', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // 1. Verify shopping page loads with empty cart
    const cartButton = page.locator('button:has-text("shopping_cart")').first();
    await expect(cartButton).toContainText('0 items');
    await expect(cartButton).toContainText('$0.00');

    // 2. Add Bluetooth Headphones ($59.99) to cart
    await page.getByTestId('add-to-cart-5').click();

    // 3. Verify cart updates to 1 items $59.99
    await expect(cartButton).toContainText('1 items');
    await expect(cartButton).toContainText('$59.99');

    // 4. Add Desk Lamp ($24.99) to cart
    await page.getByTestId('add-to-cart-9').click();

    // 5. Verify cart updates to 2 items $84.98
    await expect(cartButton).toContainText('2 items');
    await expect(cartButton).toContainText('$84.98');

    // 6. Add Ergonomic Chair ($199.99 sale price) to cart
    await page.getByTestId('add-to-cart-10').click();

    // 7. Verify cart updates to 3 items $284.97
    await expect(cartButton).toContainText('3 items');
    await expect(cartButton).toContainText('$284.97');
  });
});
