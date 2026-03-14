import { test, expect } from '@playwright/test';

test('user can log in to Swag Labs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('user sees error with invalid login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('wrong_user');
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('user sees error when attempting to login with empty fields', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username is required'
  );
});

test('user sees error when attempting to login providing username only', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  await page.locator('[data-test="username"]').fill('standard_user');
  
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Password is required'
  );
});

test('user sees error when attempting to login providing password only', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});