const { test, expect } = require('../../src/fixtures');
const { LoginPage } = require('../../src/pages/LoginPage');
const { createUser } = require('../../src/utils/dataFactory');
const { env } = require('../../src/utils/env');

test.describe('Registration', () => {
  test('new customer can register and then log in', async ({ registerPage, page }) => {
    const user = createUser();

    await registerPage.register(user);
    await expect(page).toHaveURL(/\/auth\/login$/);

    const loginPage = new LoginPage(page);
    await loginPage.login(user);

    await expect(loginPage.pageTitle).toHaveText('My account');
    await expect(loginPage.navMenu).toContainText(`${user.firstName} ${user.lastName}`);
  });

  test('registering with an existing email is rejected', async ({ registerPage, page }) => {
    const user = createUser({ email: env.customer.email });

    await registerPage.register(user);

    await expect(registerPage.registerError).toContainText('already exists');
    await expect(page).toHaveURL(/\/auth\/register$/);
  });

  test('weak password shows a password error', async ({ registerPage }) => {
    const user = createUser({ password: 'abc' });

    await registerPage.register(user);

    await expect(registerPage.passwordError).toBeVisible();
  });

  test('empty form shows an error for every required field', async ({ registerPage }) => {
    const requiredFields = [
      'first-name', 'last-name', 'dob', 'country', 'postal_code', 'house_number',
      'street', 'city', 'state', 'phone', 'email', 'password',
    ];

    await registerPage.submitButton.click();

    for (const field of requiredFields) {
      await expect(registerPage.fieldError(field)).toBeVisible();
    }
  });
});