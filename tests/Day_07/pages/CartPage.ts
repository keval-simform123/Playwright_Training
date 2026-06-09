import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private cartItems = "tbody tr";
  private cartItemNames = "tbody tr td:nth-child(2)";
  private totalPrice = "#totalp";
  private placeOrderButton = ".btn-success";
  private deleteButtons = "a:has-text('Delete')";

  private orderNameInput = "#name";
  private orderCardInput = "#card";
  private purchaseButton = "#orderModal .btn-primary";
  private orderModal = "#orderModal";
  private successModal = ".sweet-alert";
  private confirmButton = ".sweet-alert .confirm";

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto("/cart.html");
  }

  async getCartItemCount(): Promise<number> {
    await this.page.locator(this.cartItems).first().waitFor({ state: "visible", timeout: 10000 });
    const items = await this.page.locator(this.cartItems).count();
    return items;
  }

  async getCartItemNames(): Promise<string[]> {
    await this.page.locator(this.cartItemNames).first().waitFor({ state: "visible", timeout: 10000 });
    return await this.page.locator(this.cartItemNames).allTextContents();
  }

  async getTotalPrice(): Promise<string> {
    const total = this.page.locator(this.totalPrice);
    await total.waitFor({ state: "attached", timeout: 10000 });
    return (await total.textContent())?.trim() || "";
  }

  async deleteFirstItem() {
    this.page.once("dialog", async (dialog) => await dialog.accept());
    await this.page.locator(this.deleteButtons).first().click();
    await this.page.waitForTimeout(1500);
  }

  async clickPlaceOrder() {
    await this.waitAndClick(this.placeOrderButton);
    await this.page.locator(this.orderModal).waitFor({ state: "visible" });
  }

  async completePurchase(name: string, card: string) {
    await this.page.locator(this.orderNameInput).fill(name);
    await this.page.locator(this.orderCardInput).fill(card);
    await this.page.locator(this.purchaseButton).click();
  }

  async isOrderSuccessful(): Promise<boolean> {
    await this.page.locator(this.successModal).waitFor({ state: "visible" });
    return await this.isVisible(this.successModal);
  }

  async confirmOrder() {
    await this.page.locator(this.confirmButton).click();
  }
}
