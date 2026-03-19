import { type Locator, type Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('.inventory_item_price');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
}