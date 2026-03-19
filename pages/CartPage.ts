import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async removeItemFromCart(productName: string) {
    await this.page.locator(`[data-test="remove-${productName}"]`).click();
  }
}