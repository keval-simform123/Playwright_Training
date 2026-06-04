import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// SignupPage handles the sign up modal dialog
export class SignupPage extends BasePage {
  private signupModal = "#signInModal";
  private usernameInput = "#sign-username";
  private passwordInput = "#sign-password";
  private signupButton = "#signInModal .btn-primary";

  constructor(page: Page) {
    super(page);
  }

  // Wait for the signup modal to be visible
  async waitForModal() {
    await this.page.locator(this.signupModal).waitFor({ state: "visible" });
  }

  // Fill in signup form and submit
  async signup(username: string, password: string) {
    await this.waitForModal();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.signupButton).click();
  }
}
