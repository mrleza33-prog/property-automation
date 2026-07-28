import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../../src/pages/login.page";

//Given("I login as admin", async function (this: CustomWorld) {
//  console.log("✅ Admin already logged in via Before hook");
//});

Given("I login as {string}",
  { timeout: 30_000 },
  async function (this: CustomWorld, role: string) {

    this.currentRole = role;
    
    const credentials = {
      admin: {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
      },
      manager: {
        username: process.env.MANAGER_USERNAME,
        password: process.env.MANAGER_PASSWORD
      },
      agent: {
        username: process.env.AGENT_USERNAME,
        password: process.env.AGENT_PASSWORD
      }
    };

    const user = credentials[role as keyof typeof credentials];

    if (!user) {
      throw new Error(`Unknown role: ${role}`);
    }

    const loginPage = new LoginPage(this.page);

    await loginPage.login(user.username!, user.password!);

    // 🔹 Define success and error locators
const dashboard = this.page.getByText("Property Search", { exact: true });
const loginRejected = this.page.getByText(/login rejected/i);

// 🔹 Wait for either dashboard OR login error
const result = await Promise.race([
  dashboard.waitFor({ timeout: 15000 }).then(() => "dashboard"),
  loginRejected.waitFor({ timeout: 15000 }).then(() => "error")
]);

// 🔹 Handle login rejection
if (result === "error") {
  console.log("🚨 Login rejected detected — capturing screenshot");

  const screenshot = await this.page.screenshot({ fullPage: true });

  if (screenshot) {
    await this.attach(screenshot, "image/png");
  }

  throw new Error("Login rejected - account already logged in");
}

console.log(`🔐 ${role} login successful`);

  }
);


When(
  "I search for {string}",
  { timeout: 30_000 },
  async function (this: CustomWorld, property: string) {

    const searchInput = this.page.getByPlaceholder(/Find properties by name/);

    await expect(searchInput).toBeVisible({ timeout: 10_000 });

    await searchInput.clear();
    await searchInput.fill(property);
    await searchInput.press("Enter");

    // Give the UI time to update after the search
    await this.page.waitForTimeout(2000);
  }
);


Then("I should see property results", async function (this: CustomWorld) {

  const resultsElement = this.page.getByText(/^\d+\s+results$/).first();

  await expect(resultsElement).toBeVisible({ timeout: 10000 });

  const finalText = await resultsElement.textContent();
  const match = finalText?.match(/\d+/);
  const resultCount = match ? parseInt(match[0], 10) : 0;

  expect(resultCount).toBeGreaterThan(0);

  console.log(`✅ Property search returned ${resultCount} result(s).`);
});





Then("I logout successfully", async function (this: CustomWorld) {
  await this.dashboard.logout();
  console.log("✅ Logout confirmed");
});
