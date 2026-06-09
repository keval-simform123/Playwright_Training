import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // Locators inside the login modal
  private loginModal = "#logInModal";
  private usernameInput = "#loginusername";
  private passwordInput = "#loginpassword";
  private loginButton = "#logInModal .btn-primary";
  private closeButton = "#logInModal .btn-secondary";

  constructor(page: Page) {
    super(page);
  }

  async waitForModal() {
    await this.page.locator(this.loginModal).waitFor({ state: "visible" });
  }

  async login(username: string, password: string) {
    await this.waitForModal();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async closeModal() {
    await this.page.locator(this.closeButton).click();
  }
}
