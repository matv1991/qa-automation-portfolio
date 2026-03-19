import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in to Swag Labs', async ({ page }) => {
  // GIVEN I am on the login page
  // WHEN I enter a valid username and password
  // AND I click the login button
  // THEN I am redirected to the inventory page

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(loginPage.pageTitle).toHaveText('Products');
});

test('user sees error with invalid login', async ({ page }) => {
  // GIVEN I am on the login page
  // WHEN I enter an invalid username and password
  // AND I click the login button
  // THEN an error message is displayed

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('wrong_user', 'wrong_password');
  await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');

});

test('user sees error when attempting to login with empty fields', async ({ page }) => {
  // GIVEN I am on the login page
  // WHEN I click the login button without entering credentials
  // THEN an error message is displayed

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.clickLogin();

  await loginPage.assertErrorMessage('Epic sadface: Username is required');
});

test('user sees error when attempting to login providing username only', async ({ page }) => {
  // GIVEN I am on the login page
  // WHEN I enter a valid username only
  // AND I click the login button
  // THEN an error message is displayed

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsername('standard_user');
  await loginPage.clickLogin();
  await loginPage.assertErrorMessage('Epic sadface: Password is required');
});

test('user sees error when attempting to login providing password only', async ({ page }) => {
  // GIVEN I am on the login page
  // WHEN I enter a valid password only
  // AND I click the login button
  // THEN an error message is displayed

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillPassword('secret_sauce');
  await loginPage.clickLogin();

  await loginPage.assertErrorMessage('Epic sadface: Username is required');
});