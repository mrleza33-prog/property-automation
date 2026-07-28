import { chromium } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ override: true });

(async () => {
  console.log("🔹 Starting admin auth script");

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🔹 Going to login page");

  // ✅ DO NOT wait for domcontentloaded
  await page.goto(`${process.env.BASE_URL}/login`, {
    waitUntil: "load",
    timeout: 60000
  });

  console.log("🔹 Page loaded, waiting for username field");

  // ✅ THIS is the real readiness signal
  await page.waitForSelector("#username", { timeout: 60000 });

  console.log("🔹 Filling credentials");

  await page.fill("#username", process.env.ADMIN_USERNAME!);
  await page.fill("#password", process.env.ADMIN_PASSWORD!);

  console.log("🔹 Clicking Sign In");
await page.click("button[type='submit']");

// ✅ WAIT UNTIL LOGIN FORM DISAPPEARS
await page.waitForSelector("#username", {
  state: "detached",
  timeout: 60000,
});

console.log("💾 Saving storage state");
await context.storageState({
  path: "auth/admin.json",
});

console.log("✅ admin.json created successfully");

  await browser.close();
})();
