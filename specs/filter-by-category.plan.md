# Filter Items by Category Test Plan

## Application Overview

This plan validates the category filtering feature on the shopping page. Each test selects a category from the filter dropdown and verifies that the product list updates to include only items belonging to that category. It also checks that selecting 'All' resets the filter.

## Test Scenarios

### 1. Category Filters

**Seed:** `seed.spec.ts`

#### 1.1. Filter by Electronics

**File:** `specs/filter-by-category/electronics.spec.ts`

**Steps:**
  1. Navigate to the shopping page and verify default state
    - expect: Page loads with product listings
    - expect: Category filter dropdown is present and set to 'All'
  2. Select 'Electronics' from category filter dropdown
    - expect: Filter value updates to 'Electronics'
    - expect: Product list refreshes
  3. Verify all displayed products belong to Electronics category
    - expect: Each product card shows category 'Electronics'
    - expect: No non-electronics items appear

#### 1.2. Filter by Accessories

**File:** `specs/filter-by-category/accessories.spec.ts`

**Steps:**
  1. Select 'Accessories' from category filter dropdown
    - expect: Filter value updates to 'Accessories'
    - expect: Product list refreshes
  2. Verify displayed products all have category 'Accessories'
    - expect: No items from other categories are present

#### 1.3. Filter by Office Supplies

**File:** `specs/filter-by-category/office-supplies.spec.ts`

**Steps:**
  1. Select 'Office Supplies' category
    - expect: Filter value updates accordingly
    - expect: Product list shows only office supplies
  2. Verify correct filtering results
    - expect: Every visible product is labeled 'Office Supplies'

#### 1.4. Filter by Furniture

**File:** `specs/filter-by-category/furniture.spec.ts`

**Steps:**
  1. Choose 'Furniture' as the category filter
    - expect: Filter updates
    - expect: Product list limited to furniture items
  2. Confirm every product category is 'Furniture'
    - expect: No products from other categories appear

#### 1.5. Reset category filter to All

**File:** `specs/filter-by-category/reset.spec.ts`

**Steps:**
  1. After applying any category filter, select 'All'
    - expect: Filter resets to 'All'
    - expect: Product list returns to full set of items
