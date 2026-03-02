# Add First Three Items to Cart Test Plan

## Application Overview

This test plan covers scenarios for adding the first three available products to the shopping cart in the e-commerce testing practice application. The application displays a product listing with filters, sorting, and cart functionality. The test focuses on verifying that items can be successfully added to the cart from the product grid, with proper cart updates and validation.

## Test Scenarios

### 1. Add First Three Items to Cart

**Seed:** `seed.spec.ts`

#### 1.1. Add first item (Bluetooth Headphones) to cart

**File:** `specs/add-first-three-items-to-cart/add-first-item.spec.ts`

**Steps:**
  1. Navigate to the shopping page and verify the page loads successfully
    - expect: The shopping page is displayed with product listings
    - expect: The cart icon shows '0 items $0.00'
  2. Locate the first product 'Bluetooth Headphones' in the product grid
    - expect: The product card displays the title 'Bluetooth Headphones'
    - expect: The product displays a price of $59.99
    - expect: The product shows a 5-star rating
    - expect: An 'Add to Cart' button is visible
  3. Click the 'Add to Cart' button for the Bluetooth Headphones product
    - expect: The button click is processed
    - expect: A visual confirmation appears (e.g., button state change or toast notification)
    - expect: The cart counter updates
  4. Verify the cart icon updates to reflect the added item
    - expect: The cart icon now displays '1 items $59.99'
    - expect: The item count increments from 0 to 1
    - expect: The total price updates to $59.99

#### 1.2. Add second item (Desk Lamp) to cart

**File:** `specs/add-first-three-items-to-cart/add-second-item.spec.ts`

**Steps:**
  1. Start with the cart containing 1 item (Bluetooth Headphones) at $59.99
    - expect: The cart displays '1 items $59.99' before adding the second item
  2. Locate the second product 'Desk Lamp' in the product grid
    - expect: The product card displays the title 'Desk Lamp'
    - expect: The product displays a price of $24.99
    - expect: The product shows a 4-star rating
    - expect: An 'Add to Cart' button is visible
  3. Click the 'Add to Cart' button for the Desk Lamp product
    - expect: The button click is processed successfully
    - expect: No errors are displayed
  4. Verify the cart icon updates after adding the second item
    - expect: The cart icon now displays '2 items $84.98'
    - expect: The item count increments from 1 to 2
    - expect: The total price updates correctly to $84.98 (59.99 + 24.99)

#### 1.3. Add third item (Ergonomic Chair) to cart

**File:** `specs/add-first-three-items-to-cart/add-third-item.spec.ts`

**Steps:**
  1. Start with the cart containing 2 items (Bluetooth Headphones and Desk Lamp) at $84.98
    - expect: The cart displays '2 items $84.98' before adding the third item
  2. Locate the third product 'Ergonomic Chair' in the product grid
    - expect: The product card displays the title 'Ergonomic Chair'
    - expect: The product displays a sale price of $199.99
    - expect: The product displays the original price of $249.99 (struck through)
    - expect: The product shows a 'SALE' badge
    - expect: The product shows a 5-star rating
    - expect: An 'Add to Cart' button is visible
  3. Click the 'Add to Cart' button for the Ergonomic Chair product
    - expect: The button click is processed successfully
    - expect: The sale price ($199.99) is used for the cart calculation, not the original price
  4. Verify the cart icon updates after adding the third item
    - expect: The cart icon now displays '3 items $284.97'
    - expect: The item count increments from 2 to 3
    - expect: The total price updates correctly to $284.97 (59.99 + 24.99 + 199.99)

#### 1.4. Verify cart contents by opening the cart modal

**File:** `specs/add-first-three-items-to-cart/verify-cart-modal.spec.ts`

**Steps:**
  1. With 3 items added to the cart, click the cart icon button
    - expect: The cart modal opens and displays all added items
  2. Verify the first item (Bluetooth Headphones) displays correctly in the cart
    - expect: Product name displays as 'Bluetooth Headphones'
    - expect: Product price displays as $59.99
    - expect: Product quantity is 1
  3. Verify the second item (Desk Lamp) displays correctly in the cart
    - expect: Product name displays as 'Desk Lamp'
    - expect: Product price displays as $24.99
    - expect: Product quantity is 1
  4. Verify the third item (Ergonomic Chair) displays correctly in the cart
    - expect: Product name displays as 'Ergonomic Chair'
    - expect: Product price displays as $199.99 (sale price, not original $249.99)
    - expect: Product quantity is 1
  5. Verify the cart totals calculation
    - expect: Subtotal displays as $284.97
    - expect: Tax is calculated correctly based on subtotal
    - expect: Grand total is displayed and includes subtotal and tax
    - expect: The cart shows option to 'Continue Shopping' or 'Proceed to Checkout'

#### 1.5. Add items sequentially and verify cart updates in real-time

**File:** `specs/add-first-three-items-to-cart/sequential-add-verification.spec.ts`

**Steps:**
  1. Fresh start with empty cart (0 items $0.00)
    - expect: Cart is empty
  2. Add Bluetooth Headphones, Desk Lamp, and Ergonomic Chair one after another without opening the cart modal between additions
    - expect: Each item is added successfully
    - expect: Cart counter updates after each addition
    - expect: No error messages appear
  3. After all three items are added, verify final cart state
    - expect: Cart displays '3 items $284.97'
    - expect: All three items remain in the cart
    - expect: No items were lost during the sequential additions
  4. Add the items in a different order (optional edge case): Desk Lamp, then Bluetooth Headphones, then Ergonomic Chair
    - expect: All three items are successfully added regardless of order
    - expect: Final cart total is still $284.97
    - expect: Item order in cart may differ but all items are present

#### 1.6. Verify product interactions don't interfere with cart additions

**File:** `specs/add-first-three-items-to-cart/product-interaction-verification.spec.ts`

**Steps:**
  1. Click on the Bluetooth Headphones product card/image to open product details modal
    - expect: The product detail modal opens displaying detailed information
    - expect: The modal displays the product name, image, description, rating, and price
  2. Close the product detail modal by clicking the X button or clicking outside the modal
    - expect: The modal closes
    - expect: The user is returned to the product grid view
  3. Add Bluetooth Headphones to cart from the product grid
    - expect: Item is successfully added to cart
  4. Click on the Desk Lamp product card to view details
    - expect: Product detail modal opens for Desk Lamp
  5. Click the 'Add to Cart' button within the product detail modal
    - expect: The item is added to the cart from the modal
    - expect: The cart counter updates to show 2 items
    - expect: The modal can be closed after adding
  6. Return to the product grid and add Ergonomic Chair from the grid view
    - expect: The chair is successfully added to cart
    - expect: Final cart shows 3 items $284.97

#### 1.7. Edge case - Attempt to add out-of-stock item

**File:** `specs/add-first-three-items-to-cart/out-of-stock-edge-case.spec.ts`

**Steps:**
  1. With 3 items already in cart, locate the 'HD Monitor' product which shows 'Out of Stock' status
    - expect: The product card displays 'Out of Stock' label
    - expect: The 'Add to Cart' button is disabled (greyed out)
    - expect: The button text shows 'Out of Stock'
  2. Attempt to click the disabled 'Out of Stock' button
    - expect: The button click is not processed
    - expect: No error message appears
    - expect: The cart remains unchanged at 3 items $284.97
  3. Verify that out-of-stock items do not impact the cart operations
    - expect: The cart functionality remains intact
    - expect: No items were inadvertently added

#### 1.8. Verify cart persistence after adding items

**File:** `specs/add-first-three-items-to-cart/cart-persistence.spec.ts`

**Steps:**
  1. Add Bluetooth Headphones, Desk Lamp, and Ergonomic Chair to cart (3 items $284.97)
    - expect: All three items successfully added
  2. Click the cart icon to open the cart modal
    - expect: Cart modal displays all 3 items correctly
  3. Close the cart modal by clicking outside or the close button
    - expect: Modal closes
    - expect: User returns to product grid
  4. Verify the cart icon still shows '3 items $284.97'
    - expect: Cart state is preserved after closing modal
    - expect: Items have not been removed
  5. Open the cart modal again
    - expect: All 3 items are still present in the cart
    - expect: No items were lost
    - expect: Cart totals remain the same
