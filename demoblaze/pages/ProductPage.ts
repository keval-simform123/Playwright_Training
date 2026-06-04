import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// ProductPage handles the individual product detail page
export class ProductPage extends BasePage {
  private productTitle = ".name";
  private productPrice = ".price-container";
  private addToCartButton = "a.btn:has-text('Add to cart')";

  constructor(page: Page) {
    super(page);
  }

  // Get product title from the detail page
  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  // Get product price text
  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  // Click Add to cart and handle the browser alert
  async addToCart() {
    // Listen for the confirmation alert before clicking
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.page.locator(this.addToCartButton).click();
  }
}
