import { Page } from "@playwright/test";

// BasePage holds actions that are common across all pages
export class BasePage {
  constructor(protected page: Page) {}

  // Navigate to any URL
  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  // Wait for a locator to be visible before interacting
  async waitAndClick(selector: string) {
    await this.page.locator(selector).waitFor({ state: "visible" });
    await this.page.locator(selector).click();
  }

  // Get text content of an element
  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) || "";
  }

  // Check if an element is visible on the page
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
}
