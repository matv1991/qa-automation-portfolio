import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('sauce-labs-backpack');
});

test('user can complete the checkout flow', async ({ page }) => {
// GIVEN I have an item in my cart
// WHEN I click on the cart icon
// THEN the cart page is displayed

// WHEN I click on the Checkout button
// THEN the checkout step 1 page is displayed

// WHEN I fill in the form
// AND I click on the Continue button
// THEN the checkout step 2 page is displayed

// WHEN I click on the Finish button
// THEN the order confirmation page is displayed
// AND the title reads 'Checkout: Complete!'

});