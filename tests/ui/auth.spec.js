const { test, expect } = require('../../src/fixtures');
const { env } = require('../../src/utils/env');

test.describe('Login', () => {
  test('customer can log in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(env.customer);

    await expect(page).toHaveURL(/\/account$/);
    await expect(loginPage.pageTitle).toHaveText('My account');
    await expect(loginPage.navMenu).toHaveText(/Jane Doe/);
  });

  test('wrong password shows an error', async ({ loginPage, page }) => {
    await loginPage.login({ ...env.customer, password: 'wrong-password' });

    await expect(loginPage.loginError).toHaveText('Invalid email or password');
    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  test('empty form shows required-field errors', async ({ loginPage }) => {
    await loginPage.submitButton.click();

    await expect(loginPage.emailError).toContainText('Email is required');
    await expect(loginPage.passwordError).toContainText('Password is required');
  });

  test('customer can log out', async ({ loginPage }) => {
    await loginPage.login(env.customer);
    await expect(loginPage.pageTitle).toHaveText('My account');

    await loginPage.logout();

    await expect(loginPage.navSignIn).toBeVisible();
  });
});