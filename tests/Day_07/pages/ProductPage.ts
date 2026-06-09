import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private productTitle = ".name";
  private productPrice = ".price-container";
  private addToCartButton = "a.btn:has-text('Add to cart')";

  constructor(page: Page) {
    super(page);
  }
  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async addToCart() {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.page.locator(this.addToCartButton).click();
  }
}
