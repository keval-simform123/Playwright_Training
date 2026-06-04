import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// HomePage covers the main landing page of demoblaze
export class HomePage extends BasePage {
  // Locators
  private navHome = "a.nav-link:has-text('Home')";
  private navCart = "a#cartur";
  private navLogin = "#login2";
  private navSignup = "#signin2";
  private navLogout = "#logout2";
  private welcomeUser = "#nameofuser";
  private categoryPhones = "a:has-text('Phones')";
  private categoryLaptops = "a:has-text('Laptops')";
  private categoryMonitors = "a:has-text('Monitors')";
  private productCards = ".card-title a";
  private navContact = "a:has-text('Contact')";

  constructor(page: Page) {
    super(page);
  }

  // Open the home page
  async open() {
    await this.goto("/index.html");
  }

  // Click the Login link in navbar
  async clickLogin() {
    await this.waitAndClick(this.navLogin);
  }

  // Click the Sign up link in navbar
  async clickSignup() {
    await this.waitAndClick(this.navSignup);
  }

  // Click Cart in navbar
  async clickCart() {
    await this.waitAndClick(this.navCart);
  }

  // Click on Phones category
  async selectPhones() {
    await this.waitAndClick(this.categoryPhones);
    await this.page.waitForTimeout(1500); // wait for products to load
  }

  // Click on Laptops category
  async selectLaptops() {
    await this.waitAndClick(this.categoryLaptops);
    await this.page.waitForTimeout(1500);
  }

  // Click on Monitors category
  async selectMonitors() {
    await this.waitAndClick(this.categoryMonitors);
    await this.page.waitForTimeout(1500);
  }

  // Click Contact link
  async clickContact() {
    await this.waitAndClick(this.navContact);
  }

  // Click on a product by its name
  async clickProduct(name: string) {
    await this.page.locator(this.productCards).filter({ hasText: name }).click();
  }

  // Get all visible product names on current page
  async getProductNames(): Promise<string[]> {
    await this.page.waitForSelector(this.productCards);
    return await this.page.locator(this.productCards).allTextContents();
  }

  // Get the welcome username text shown after login
  async getLoggedInUser(): Promise<string> {
    await this.page.locator(this.welcomeUser).waitFor({ state: "visible" });
    return (await this.page.locator(this.welcomeUser).textContent()) || "";
  }

  // Check if logout button is visible (means user is logged in)
  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.navLogout);
  }

  // Logout the current user
  async logout() {
    await this.waitAndClick(this.navLogout);
  }
}
