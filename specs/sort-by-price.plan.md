# Sort Items by Price Test Plan

## Application Overview

This plan focuses on verifying the sorting functionality of the product grid by price in the e-commerce shopping application. It ensures that products are ordered by price in ascending and descending order when using the sort control.

## Test Scenarios

### 1. Sort by Price

**Seed:** `seed.spec.ts`

#### 1.1. Sort items by price ascending

**File:** `specs/sort-by-price/sort-ascending.spec.ts`

**Steps:**
  1. Navigate to the shopping page with default state
    - expect: The shopping page loads with product listings
    - expect: Price sort control is available
  2. Click the 'Sort by Price' button to ensure ascending order
    - expect: Products are listed in lowest to highest price order
    - expect: First product card price is the smallest among visible products
    - expect: Last product card price is the largest
  3. Validate that each consecutive product price is numerically greater than or equal to the previous
    - expect: No out‑of‑order prices appear in the list

#### 1.2. Sort items by price descending

**File:** `specs/sort-by-price/sort-descending.spec.ts`

**Steps:**
  1. From ascending state or default, click the 'Sort by Price' button again to toggle descending
    - expect: The button state indicates descending sort
    - expect: Products are listed in highest to lowest price order
    - expect: First product card price is the largest
    - expect: Last product card price is the smallest
  2. Validate descending sequence across visible products
    - expect: Each product price is numerically less than or equal to the previous

#### 1.3. Sort persistence when navigating pages

**File:** `specs/sort-by-price/persistence.spec.ts`

**Steps:**
  1. Apply ascending sort by price
    - expect: Products displayed in lowest to highest price order
  2. Click 'Next page' pagination control
    - expect: New page also respects price ascending order
    - expect: Sort button state is preserved
  3. Return to previous page and verify sort still applied
    - expect: Original page remains sorted by price ascending

#### 1.4. Edge case – add to cart doesn't break sort

**File:** `specs/sort-by-price/cart-sort.spec.ts`

**Steps:**
  1. Sort items by price (ascending)
    - expect: Products ordered by price
  2. Add the first visible item to the cart
    - expect: Cart counter updates
  3. Verify remaining list stays sorted properly
    - expect: Order of product prices unaffected by cart operations

#### 1.5. Sort with price filters applied

**File:** `specs/sort-by-price/filtered-sort.spec.ts`

**Steps:**
  1. Apply a price range filter (e.g., $50–$200)
    - expect: Only items within range are displayed
  2. Apply sort by price ascending
    - expect: Filtered items are sorted by price low to high
    - expect: All displayed prices fall within the selected range
  3. Toggle to descending sort
    - expect: Filtered items now sorted high to low
    - expect: Price range filter remains applied
