// features/support/hooks.ts
import { Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CustomWorld } from "./world";
import { LoginPage } from "../../src/pages/login.page";
import { DashboardPage } from "../../src/pages/dashboard.page";
import { ContactPage } from "../../src/pages/contact.page";
import "dotenv/config";

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

Before({ timeout: 60_000 }, async function (this: CustomWorld) {
    console.log("🚀 Before hook start");

    // Launch browser
    this.browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    this.context = await this.browser.newContext({
        viewport: null,
        storageState: undefined,
    });

    await this.context.clearCookies();

    this.page = await this.context.newPage();

    await this.page.waitForTimeout(2000);

    console.log("🌐 Navigating to login page...");

    await this.page.goto(process.env.BASE_URL!, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
    });

    await this.page.waitForLoadState("domcontentloaded");

    // Apply browser zoom
    await this.page.evaluate(() => {
        document.body.style.zoom = "80%";
    });

    console.log("🟢 Login page ready");

    this.dashboard = new DashboardPage(this.page);
    this.contactPage = new ContactPage(this.page);
});

After({ timeout: 60_000 }, async function (this: CustomWorld, scenario) {
    console.log("🧹 Cleaning up...");

    try {
        if (scenario.result?.status === "FAILED" && this.page && !this.page.isClosed()) {
            const screenshot = await this.page.screenshot({
                fullPage: true,
                timeout: 5000,
            });

            this.attach(screenshot, "image/png");
        }
    } catch (e) {
        console.log("Screenshot failed:", e);
    }

    try {
        if (this.browser) {
            console.log("Closing Browser...");

            await this.browser.close();

            console.log("Browser closed");

            // Allow Chromium to terminate completely before the next scenario.
            await delay(1000);
        }
    } catch (e) {
        console.log("Cleanup failed:", e);
    } finally {
        this.page = undefined as any;
        this.context = undefined as any;
        this.browser = undefined as any;
        this.dashboard = undefined as any;
        this.contactPage = undefined as any;

        console.log("✅ Cleanup complete");
    }
});
