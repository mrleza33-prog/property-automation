import { chromium } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import "dotenv/config";

(async () => {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    throw new Error("❌ Admin credentials missing in .env");
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.open();

  await loginPage.login(
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD
  );

  // ⏳ wait for successful login signal
  await page.waitForURL("**/dashboard", { timeout: 15000 });

  await context.storageState({ path: "auth/admin.json" });

  await browser.close();
  console.log("✅ Admin storageState saved");
})();
