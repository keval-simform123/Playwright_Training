import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 40000,
  retries: 0,
  reporter: "html",

  use: {
    baseURL: "https://www.demoblaze.com",
    headless: true,
    screenshot: "only-on-failure",
    actionTimeout: 15000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
