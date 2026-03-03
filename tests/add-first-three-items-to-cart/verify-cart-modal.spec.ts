// spec: specs/add-first-three-items-to-cart.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Add First Three Items to Cart', () => {
  test('Verify cart contents by opening the cart modal', async ({ page }) => {
    await page.goto('https://practiceautomatedtesting.com/shopping');

    // add three items to cart
    await page.getByTestId('add-to-cart-5').click();
    await page.getByTestId('add-to-cart-9').click();
    await page.getByTestId('add-to-cart-10').click();

    // open cart modal
    await page.getByTestId('cart-button').click();

    // verify first item
    await expect(page.locator('h4:has-text("Bluetooth Headphones")')).toBeVisible();
    await expect(page.locator('text=Qty: 1 × $59.99')).toBeVisible();

    // verify second item
    await expect(page.locator('h4:has-text("Desk Lamp")')).toBeVisible();
    await expect(page.locator('text=Qty: 1 × $24.99')).toBeVisible();

    // verify third item
    await expect(page.locator('h4:has-text("Ergonomic Chair")')).toBeVisible();
    await expect(page.locator('text=Qty: 1 × $199.99')).toBeVisible();

    // verify totals
    const subtotalLabel = page.locator('text=Subtotal:');
    await expect(subtotalLabel).toBeVisible();
    await expect(subtotalLabel.locator('xpath=..').locator('text=$284.97')).toBeVisible();

    const taxLabel = page.locator('text=Tax (21%):');
    await expect(taxLabel).toBeVisible();
    await expect(taxLabel.locator('xpath=..').locator('text=$59.84')).toBeVisible();

    const totalLabel = page.locator('text=/^Total:$/');
    await expect(totalLabel).toBeVisible();
    await expect(totalLabel.locator('xpath=..').locator('text=$344.81')).toBeVisible();
  });
});