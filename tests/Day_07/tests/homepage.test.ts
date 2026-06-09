import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Home Page Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test("should load home page and display products", async () => {
    const products = await homePage.getProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test("should filter products by Phones category", async () => {
    await homePage.selectPhones();
    const products = await homePage.getProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test("should filter products by Laptops category", async () => {
    await homePage.selectLaptops();
    const products = await homePage.getProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test("should filter products by Monitors category", async () => {
    await homePage.selectMonitors();
    const products = await homePage.getProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test("should navigate to cart page", async ({ page }) => {
    await homePage.clickCart();
    await expect(page).toHaveURL(/cart\.html/);
  });
});
