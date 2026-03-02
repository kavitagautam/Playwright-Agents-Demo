# Sort Items by Name Test Plan

## Application Overview

This plan focuses on verifying the sorting functionality of the product grid by name in the e-commerce shopping application. It ensures that products are ordered alphabetically ascending and descending when using the sort control.

## Test Scenarios

### 1. Sort by Name

**Seed:** `seed.spec.ts`

#### 1.1. Sort items by name ascending

**File:** `specs/sort-by-name/sort-ascending.spec.ts`

**Steps:**
  1. Navigate to the shopping page with default state
    - expect: The shopping page loads with product listings
    - expect: Sort control defaults to name ascending or neutral
  2. Click the 'Sort by Name ▲' button to ensure ascending order
    - expect: The button state indicates ascending sort
    - expect: Products are listed in A–Z order
    - expect: First product card title is alphabetically smallest among visible products
    - expect: Last product card title is alphabetically largest
  3. Validate that each consecutive product title is lexicographically greater than or equal to the previous
    - expect: No out‑of‑order titles appear in the list

#### 1.2. Sort items by name descending

**File:** `specs/sort-by-name/sort-descending.spec.ts`

**Steps:**
  1. From ascending state or default, click the 'Sort by Name ▲' button again to toggle descending
    - expect: The button state indicates descending sort
    - expect: Products are listed in Z–A order
    - expect: First product card title is alphabetically largest
    - expect: Last product card title is alphabetically smallest
  2. Validate descending sequence across visible products
    - expect: Each product title is lexicographically less than or equal to the previous

#### 1.3. Sort persistence when navigating pages

**File:** `specs/sort-by-name/persistence.spec.ts`

**Steps:**
  1. Apply ascending sort by name
    - expect: Products displayed in A–Z order
  2. Click 'Next page' pagination control
    - expect: New page also respects name ascending order
    - expect: Sort button remains in ascending state
  3. Return to previous page and verify sort still applied
    - expect: Original page remains sorted A–Z

#### 1.4. Edge case – add=to cart doesn’t break sort

**File:** `specs/sort-by-name/cart-sort.spec.ts`

**Steps:**
  1. Sort items by name (ascending)
    - expect: Products ordered
  2. Add the first visible item to the cart
    - expect: Cart counter updates
  3. Verify remaining list stays sorted properly
    - expect: Order of product titles unaffected by cart operations
