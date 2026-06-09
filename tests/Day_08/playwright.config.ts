import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

// Load values from .env file before tests run
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.BROWSER_HEADLESS === "true",
    viewport: { width: 1280, height: 720 },
  },
});
