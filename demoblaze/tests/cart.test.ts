import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { productName } from "../utils/testData";

// Test suite for Shopping Cart functionality
test.describe("Cart Tests", () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  // Helper: adds a product to cart before cart-related tests
  async function addProductToCart(page: any) {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await homePage.open();
    await homePage.selectPhones();
    await homePage.clickProduct(productName);
    await page.waitForSelector("a.btn");
    await productPage.addToCart();
    await page.waitForTimeout(1000);
  }

  test("should add product and verify it appears in cart", async ({ page }) => {
    await addProductToCart(page);
    await cartPage.open();

    const itemNames = await cartPage.getCartItemNames();
    const found = itemNames.some((name) =>
      name.toLowerCase().includes("samsung")
    );
    expect(found).toBeTruthy();
  });

  test("should show total price in cart", async ({ page }) => {
    await addProductToCart(page);
    await cartPage.open();

    await page.waitForSelector("#totalp", { state: "visible", timeout: 10000 });
    const total = await cartPage.getTotalPrice();
    expect(Number(total)).toBeGreaterThan(0);
  });

  test("should complete a full purchase flow", async ({ page }) => {
    await addProductToCart(page);
    await cartPage.open();

    await cartPage.clickPlaceOrder();
    await cartPage.completePurchase("John Doe", "4111111111111111");

    const isSuccess = await cartPage.isOrderSuccessful();
    expect(isSuccess).toBeTruthy();

    await cartPage.confirmOrder();
  });
});
