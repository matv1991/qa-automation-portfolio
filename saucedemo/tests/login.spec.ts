import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const loginErrorScenarios = [
  { description: 'invalid credentials', username: 'nonexistant user', password: 'test123', expectedError: 'Epic sadface: Username and password do not match any user in this service' },
  { description: 'empty fields', username: '', password: '', expectedError: 'Epic sadface: Username is required' },
  { description: 'username only', username: 'standard_user', password: '', expectedError: 'Epic sadface: Password is required' },
  { description: 'password only', username: '', password: 'secret_sauce', expectedError: 'Epic sadface: Username is required' },
];

test('user can log in to Swag Labs', {
  tag: ['@smoke', '@regression']
}, async ({ page }) => {
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

for (const { description, username, password, expectedError } of loginErrorScenarios) {
  test(`login error: ${description}`, {
    tag: ['@regression'],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    if (username) await loginPage.fillUsername(username);
    if (password) await loginPage.fillPassword(password);
    await loginPage.clickLogin();
    await loginPage.assertErrorMessage(expectedError);
  });
}