import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

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

  async open() {
    await this.goto("/index.html");
  }

  async clickLogin() {
    await this.waitAndClick(this.navLogin);
  }

  async clickSignup() {
    await this.waitAndClick(this.navSignup);
  }
  async clickCart() {
    await this.waitAndClick(this.navCart);
  }

  async selectPhones() {
    await this.waitAndClick(this.categoryPhones);
    await this.page.waitForTimeout(1500); // wait for products to load
  }

  async selectLaptops() {
    await this.waitAndClick(this.categoryLaptops);
    await this.page.waitForTimeout(1500);
  }

  async selectMonitors() {
    await this.waitAndClick(this.categoryMonitors);
    await this.page.waitForTimeout(1500);
  }

  async clickContact() {
    await this.waitAndClick(this.navContact);
  }

  async clickProduct(name: string) {
    await this.page.locator(this.productCards).filter({ hasText: name }).click();
  }

  async getProductNames(): Promise<string[]> {
    await this.page.waitForSelector(this.productCards);
    return await this.page.locator(this.productCards).allTextContents();
  }

  async getLoggedInUser(): Promise<string> {
    await this.page.locator(this.welcomeUser).waitFor({ state: "visible" });
    return (await this.page.locator(this.welcomeUser).textContent()) || "";
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.navLogout);
  }

  async logout() {
    await this.waitAndClick(this.navLogout);
  }
}
