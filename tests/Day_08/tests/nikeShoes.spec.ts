import { test, expect } from "../fixtures/nike_fixtures";

test("page title should contain Nike", async ({ nikeShoesPage }) => {
  const title = await nikeShoesPage.title();
  expect(title.toLowerCase()).toContain("nike");
});

test("URL should have the shoes category path", async ({ nikeShoesPage }) => {
  const url = nikeShoesPage.url();
  // URL matches the men's shoes section
  expect(url).toContain("/men/men-s-shoes");
});

test("product cards should be visible on the page", async ({
  nikeShoesPage,
}) => {
  // Nike product cards have this class
  const products = nikeShoesPage.locator('.css-1jumelo');
  const count = await products.count();

  // At least a few products should load
  expect(count).toBeGreaterThan(0);
});

test("each product should have a name", async ({ nikeShoesPage }) => {
  const productNames = nikeShoesPage.getByText("Nike Downshifter 14");
  const count = await productNames.count();

  // product names visible
  expect(count).toBeGreaterThan(0);
});

test("each product should show a price", async ({ nikeShoesPage }) => {
  const prices = nikeShoesPage.locator('//*[@id="mainContent"]/div[2]/div/div[3]/div/div[2]/div/div/div[1]/div[1]/div/a/div[2]/h3');
  const count = await prices.count();

  expect(count).toBeGreaterThan(0);
});
