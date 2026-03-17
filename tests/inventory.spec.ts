import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

// cart tests
test('user can add item to cart from product page', async ({ page }) => {

  // GIVEN I am on the inventory page -- If I logged in correctly I assume I'm on this page already
  // WHEN I click on the 'Add to cart' button of a product
  // THEN the product is added to the cart
  // AND the 'Add to cart' button is changed to 'Remove'
  // AND the cart icon displays the correct amount of items added to it

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart("sauce-labs-backpack");
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('user can remove items from cart from product page', async ({ page }) => {

  // GIVEN I am on the inventory page and have at least one item in my cart
  // When I click on the 'Remove' button of the item added to my cart
  // THEN the item is removed from my cart
  // And the cart icon displays the correct amount of items added to it
  // AND the 'Remove' button is changed to 'Add to cart'

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart("sauce-labs-backpack");
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.removeItemFromCart("sauce-labs-backpack");
  await expect(inventoryPage.cartBadge).not.toBeVisible();
});

// sorting tests
test('user can sort items in alphabetic order', async ({ page }) => {
  // GIVEN I am on the inventory page
  // WHEN I select 'Name (A to Z)' from the sort dropdown
  // THEN the displayed items are sorted alphabetically

  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
  const sorted = [...names].sort();
  expect(names).toEqual(sorted);
});

// leave these as empty shells for now — finish the ones above first
test('user can sort items in reverse alphabetic order', async ({ page }) => {});
test('user can sort items by ascending price', async ({ page }) => {});
test('user can sort items by descending price', async ({ page }) => {});
test('user can click on product name to visit product details page', async ({ page }) => {});