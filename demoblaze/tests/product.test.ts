import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { productName } from "../utils/testData";

// Test suite for Product detail page
test.describe("Product Page Tests", () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.open();
  });

  test("should open product detail page on product click", async ({ page }) => {
    await homePage.selectPhones();
    await homePage.clickProduct(productName);

    // Product page should show product name
    await page.waitForSelector(".name");
    const title = await productPage.getProductTitle();
    expect(title.toLowerCase()).toContain("samsung");
  });

  test("should display product price on detail page", async ({ page }) => {
    await homePage.selectPhones();
    await homePage.clickProduct(productName);

    await page.waitForSelector(".price-container");
    const price = await productPage.getProductPrice();
    // Price should not be empty
    expect(price.trim().length).toBeGreaterThan(0);
  });

  test("should add product to cart successfully", async ({ page }) => {
    await homePage.selectPhones();
    await homePage.clickProduct(productName);

    await page.waitForSelector("a.btn");
    await productPage.addToCart();

    // After adding, we should still be on the product page (no redirect)
    await expect(page).toHaveURL(/prod\.html/);
  });
});
