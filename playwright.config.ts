import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: true,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  testDir: "./src",
});
