const { test, expect } = require('../../src/fixtures');

test.describe('Catalog', () => {
  test('sort by price low to high', async ({ catalogPage }) => {
    await catalogPage.sortBy('price,asc');

    const prices = await catalogPage.getProductPrices();
    const expected = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(expected);
  });

  test('sort by price high to low', async ({ catalogPage }) => {
    await catalogPage.sortBy('price,desc');

    const prices = await catalogPage.getProductPrices();
    const expected = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(expected);
  });

  test('sort by name A to Z', async ({ catalogPage }) => {
    await catalogPage.sortBy('name,asc');

    const names = await catalogPage.getProductNames();
    const expected = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(expected);
  });

  test('filter by category shows only matching products', async ({ catalogPage }) => {
    await catalogPage.filterByCategory('Hammer');

    const names = await catalogPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names.every((name) => name.toLowerCase().includes('hammer'))).toBe(true);
  });
});