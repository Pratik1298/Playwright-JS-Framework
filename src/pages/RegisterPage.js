const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dobInput = page.getByTestId('dob');
    this.countrySelect = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByTestId('register-submit');
    this.registerError = page.getByTestId('register-error');
    this.passwordError = page.getByTestId('password-error');
  }

  async goto() {
    await this.open('/auth/register');
  }

  async register(user) {
    const {
      firstName, lastName, dob, country, postalCode, houseNumber,
      street, city, state, phone, email, password,
    } = user;

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dobInput.fill(dob);
    await this.countrySelect.selectOption(country);
    await this.postalCodeInput.fill(postalCode);
    await this.houseNumberInput.fill(houseNumber);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  /** @param {string} field  e.g. 'first-name', 'email' */
  fieldError(field) {
    return this.page.getByTestId(`${field}-error`);
  }
}

module.exports = { RegisterPage };