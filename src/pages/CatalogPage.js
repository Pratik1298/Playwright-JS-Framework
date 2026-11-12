const { BasePage } = require('./BasePage');

class CatalogPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.sortSelect = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
    this.sortingCompleted = page.getByTestId('sorting_completed');
    this.filterCompleted = page.getByTestId('filter_completed');
  }

  async goto() {
    await this.open('/');
    await this.productNames.first().waitFor();
  }

  /** @param {string} name  category label, e.g. 'Hammer' */
  categoryCheckbox(name) {
    return this.page.getByLabel(name, { exact: true });
  }

  /** @param {'name,asc' | 'name,desc' | 'price,asc' | 'price,desc'} option */
  async sortBy(option) {
    await this.sortSelect.selectOption(option);
    await this.sortingCompleted.waitFor();
  }

  async filterByCategory(name) {
    await this.categoryCheckbox(name).check();
    await this.filterCompleted.waitFor();
  }

  async getProductNames() {
    const names = await this.productNames.allTextContents();
    return names.map((name) => name.trim());
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }
}

module.exports = { CatalogPage };