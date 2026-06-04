import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";

// Test suite for Sign Up functionality
test.describe("Signup Tests", () => {
  let homePage: HomePage;
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    await homePage.open();
  });

  test("should open signup modal when signup is clicked", async () => {
    await homePage.clickSignup();
    await signupPage.waitForModal();

    const isVisible = await homePage.isVisible("#signInModal");
    expect(isVisible).toBeTruthy();
  });

  test("should show alert when registering an already existing user", async ({
    page,
  }) => {
    await homePage.clickSignup();

    // Listen for the alert that pops up when user already exists
    let alertMessage = "";
    page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Using a known existing username to trigger the alert
    await signupPage.signup("testuser_demo", "Test@1234");
    await page.waitForTimeout(2000);

    expect(alertMessage).toBeTruthy();
  });

  test("should show alert when username is empty", async ({ page }) => {
    await homePage.clickSignup();

    let alertMessage = "";
    page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Submit with empty username
    await signupPage.signup("", "Test@1234");
    await page.waitForTimeout(1500);

    expect(alertMessage).toBeTruthy();
  });
});
