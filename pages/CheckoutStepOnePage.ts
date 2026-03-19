import { type Locator, type Page } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly postalCodeField: Locator

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('[data-test="firstName"]')
    this.lastNameField = page.locator('[data-test="lastName"]')
    this.postalCodeField = page.locator('[data-test="postalCode"]')
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }
}