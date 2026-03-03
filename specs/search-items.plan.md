# Search Items Test Plan

## Application Overview

This plan verifies the search functionality on the shopping page of the e-commerce testing application. It covers normal (happy) paths, edge cases, interactions with filters and pagination, and failure modes.

## Assumptions

- Starting state for each scenario is a fresh session and the page at `https://practiceautomatedtesting.com/shopping`.
- `seed.spec.ts` will provide any global setup needed.
- Product cards are identifiable by `div.cursor-pointer` containing an `h3` heading and a visible price string like `$12.34`.
- The search box is accessible via the placeholder text `Search for items` or a test id such as `search-input`.

## Test Scenarios

### 1. Happy path — exact match

**File:** `specs/search-items/exact-match.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Navigate to the shopping page.
  2. Type an exact product title into the search box (e.g., "HD Monitor").
  3. Submit the search (press Enter or click search control).

**Expected outcomes:**
  - At least one product card is visible.
  - Each visible product's title contains the search term exactly.

**Success criteria:** Visible product titles include the exact search text.

---

### 2. Partial and case-insensitive match

**File:** `specs/search-items/partial-case-insensitive.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Enter a partial product term with mixed case (e.g., "moNItor").
  2. Submit the search.

**Expected outcomes:**
  - Products whose titles include the partial term (case-insensitive) appear.
  - Results list is non-empty for common partials.

**Success criteria:** All visible titles contain the partial term ignoring case.

---

### 3. No results / empty results message

**File:** `specs/search-items/no-results.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Enter a gibberish string unlikely to match any product (e.g., "qwertyxyz123").
  2. Submit the search.

**Expected outcomes:**
  - No product cards are displayed.
  - A user-facing message appears (e.g., "No products found" or similar).

**Success criteria:** Empty results are handled gracefully and message is shown.

---

### 4. Search with active category/price filters

**File:** `specs/search-items/search-with-filters.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Apply a category filter (e.g., `Electronics`) and a price range (e.g., $20–$150).
  2. Perform a search for a term that exists but may have items outside the selected filters.

**Expected outcomes:**
  - Only products that match the search term and the active filters are shown.
  - Pagination or counts reflect the filtered result set.

**Success criteria:** Search respects filters and returns only items that meet both search and filter constraints.

---

### 5. Search persistence across navigation and sort

**File:** `specs/search-items/persistence-and-sort.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Perform a search.
  2. Sort results (e.g., by price ascending).
  3. Navigate to the next page and back.

**Expected outcomes:**
  - The search query and sort state persist while navigating pages.
  - Returned items remain consistent with the search and sort selection.

**Success criteria:** Search + sort + pagination behave consistently and preserve state.

---

### 6. Input edge cases (leading/trailing whitespace, special chars)

**File:** `specs/search-items/input-edge-cases.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Run searches with leading/trailing whitespace (e.g., "  Webcam  ").
  2. Run searches containing special characters (e.g., "HD Monitor!@#").

**Expected outcomes:**
  - Trimming: whitespace is ignored and matches succeed when appropriate.
  - Special characters: handled safely; either sanitized or used literally with no security impact.

**Success criteria:** Application normalizes input and returns correct results without errors.

---

### 7. Performance smoke — basic responsiveness

**File:** `specs/search-items/performance-smoke.spec.ts`

**Starting state:** Fresh page load

**Steps:**
  1. Run 5 different searches sequentially (common terms) and measure time-to-results.

**Expected outcomes:**
  - Search results render quickly (no UI freeze). If a threshold exists, assert it (e.g., results appear within 2s).

**Success criteria:** No unacceptable delays in search responsiveness.

---

## Test design notes and best practices

- Use stable locators: the product grid uses `div.cursor-pointer h3` for titles and a visible price text like `$12.34`.
- Prefer `getByRole` / `getByPlaceholder` / `getByLabelText` for the search input when available (or the placeholder text `Search for items`).
- Assert visible text using `toContainText`, `allTextContents()`, or numeric comparisons for price checks.
- Keep scenarios independent so they can run in any order.

## Next steps

- If you want, I can scaffold the Playwright spec files from this plan (one test file per scenario) and run them. Let me know which scenarios to prioritize.
