import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html');
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

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await inventoryPage.cartIcon.click();
  await expect(page).toHaveURL(/cart/);
  await cartPage.checkoutButton.click();
  await expect(page).toHaveURL(/checkout-step-one/);
  await checkoutStepOnePage.fillForm('Mathijs', 'van Dam', 'J0R 1T0');
  await checkoutStepOnePage.continueButton.click();
  await expect(page).toHaveURL(/checkout-step-two/);
  await checkoutStepTwoPage.finishButton.click();
  await expect(page).toHaveURL(/checkout-complete/);
  await checkoutCompletePage.assertTitle('Checkout: Complete!');
});
