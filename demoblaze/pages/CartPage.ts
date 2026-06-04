import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// CartPage handles the shopping cart page
export class CartPage extends BasePage {
  private cartItems = "tbody tr";
  private cartItemNames = "tbody tr td:nth-child(2)";
  private totalPrice = "#totalp";
  private placeOrderButton = ".btn-success";
  private deleteButtons = "a:has-text('Delete')";

  // Order modal fields
  private orderNameInput = "#name";
  private orderCardInput = "#card";
  private purchaseButton = "#orderModal .btn-primary";
  private orderModal = "#orderModal";
  private successModal = ".sweet-alert";
  private confirmButton = ".sweet-alert .confirm";

  constructor(page: Page) {
    super(page);
  }

  // Open the cart page directly
  async open() {
    await this.goto("/cart.html");
  }

  // Get count of items in cart
  async getCartItemCount(): Promise<number> {
    await this.page.locator(this.cartItems).first().waitFor({ state: "visible", timeout: 10000 });
    const items = await this.page.locator(this.cartItems).count();
    return items;
  }

  // Get names of all products in cart
  async getCartItemNames(): Promise<string[]> {
    await this.page.locator(this.cartItemNames).first().waitFor({ state: "visible", timeout: 10000 });
    return await this.page.locator(this.cartItemNames).allTextContents();
  }

  // Get the total price shown in cart
  async getTotalPrice(): Promise<string> {
    const total = this.page.locator(this.totalPrice);
    await total.waitFor({ state: "attached", timeout: 10000 });
    return (await total.textContent())?.trim() || "";
  }

  // Delete the first item in the cart
  async deleteFirstItem() {
    // Handle possible confirm dialog
    this.page.once("dialog", async (dialog) => await dialog.accept());
    await this.page.locator(this.deleteButtons).first().click();
    await this.page.waitForTimeout(1500);
  }

  // Click Place Order button to open order modal
  async clickPlaceOrder() {
    await this.waitAndClick(this.placeOrderButton);
    await this.page.locator(this.orderModal).waitFor({ state: "visible" });
  }

  // Fill in order details and click Purchase
  async completePurchase(name: string, card: string) {
    await this.page.locator(this.orderNameInput).fill(name);
    await this.page.locator(this.orderCardInput).fill(card);
    await this.page.locator(this.purchaseButton).click();
  }

  // Check if the success confirmation is shown
  async isOrderSuccessful(): Promise<boolean> {
    await this.page.locator(this.successModal).waitFor({ state: "visible" });
    return await this.isVisible(this.successModal);
  }

  // Dismiss the success alert
  async confirmOrder() {
    await this.page.locator(this.confirmButton).click();
  }
}
