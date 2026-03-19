import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly backHomeButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.title = page.locator('[data-test="title"]');

  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }

  async assertTitle(title: string) {
    await expect(this.title).toHaveText(title);
}
}