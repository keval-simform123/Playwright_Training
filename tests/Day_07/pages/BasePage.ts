import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async waitAndClick(selector: string) {
    await this.page.locator(selector).waitFor({ state: "visible" });
    await this.page.locator(selector).click();
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) || "";
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
}
