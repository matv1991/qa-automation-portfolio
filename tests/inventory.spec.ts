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


test('user can sort items in reverse alphabetic order', async ({ page }) => {
  // GIVEN I am on the inventory page
  // WHEN I select 'Name (Z to A)' from the sort dropdown
  // THEN the displayed items are sorted reverse alphabetically

  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});

test('user can sort items by ascending price', async ({ page }) => {
  // GIVEN I am on the inventory page
  // WHEN I select 'Price (low to high)' from the sort dropdown
  // THEN the displayed items are sorted by ascending price

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  const price = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const sorted = [...price].sort((a, b) => parseFloat(a.slice(1)) - parseFloat(b.slice(1)));
  expect(price).toEqual(sorted);
});

test('user can sort items by descending price', async ({ page }) => {
  // GIVEN I am on the inventory page
  // WHEN I select 'Price (high to low)' from the sort dropdown
  // THEN the displayed items are sorted by descending price

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  const price = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const sorted = [...price].sort((a, b) => parseFloat(b.slice(1)) - parseFloat(a.slice(1)));
  expect(price).toEqual(sorted);
});

test('user can click on product name to visit product details page', async ({ page }) => {
// GIVEN I am on the inventory page
// WHEN I click on an item in the list
// THEN I am redirected to the corresponding details page

await page.locator('[data-test="inventory-item-name"]').first().click();
await expect(page).toHaveURL(/inventory-item/);
});
