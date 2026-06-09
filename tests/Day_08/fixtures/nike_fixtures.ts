import { test as base, Page } from "@playwright/test";

type NikeFixtures = {
  nikeShoesPage: Page;
};

export const test = base.extend<NikeFixtures>({
  // Open Nike Shoes page before each test
  nikeShoesPage: async ({ page }, use) => {
    const shoesPath = process.env.SHOES_PAGE || "/men/men-s-shoes/c/92564";
    await page.goto(shoesPath);

    await page.waitForLoadState("domcontentloaded");

    await use(page);
  },
});

export { expect } from "@playwright/test";
