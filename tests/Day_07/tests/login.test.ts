import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { validUser } from "../utils/testData";

test.describe("Login Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.open();
  });

  test("should login with valid credentials", async ({ page }) => {
    await homePage.clickLogin();
    await loginPage.login(validUser.username, validUser.password);

    await page.waitForSelector("#logout2", { state: "visible", timeout: 10000 });

    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    const welcomeText = await homePage.getLoggedInUser();
    expect(welcomeText).toContain(validUser.username);
  });

  test("should show login modal when login is clicked", async () => {
    await homePage.clickLogin();
    await loginPage.waitForModal();

    const isVisible = await homePage.isVisible("#logInModal");
    expect(isVisible).toBeTruthy();
  });

  test("should close login modal on close button click", async ({ page }) => {
    await homePage.clickLogin();
    await loginPage.waitForModal();
    await loginPage.closeModal();

    await page.waitForTimeout(500);
    const isVisible = await page.locator("#logInModal").isVisible();
    expect(isVisible).toBeFalsy();
  });
});
