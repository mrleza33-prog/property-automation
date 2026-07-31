import { Page } from "playwright";

export class LoginPage {
    constructor(private page: Page) {}

    async open() {
        try {
            await this.page.goto(process.env.BASE_URL!, {
                waitUntil: "load",
                timeout: 60_000,
            });
        } catch (error) {
            console.log("⚠️ First navigation failed. Retrying once...");

            await this.page.goto(process.env.BASE_URL!, {
                waitUntil: "load",
                timeout: 60_000,
            });
        }
    }

    async login(username: string, password: string) {
        const usernameField = this.page.locator("#username");

        // Wait until the username field is actually visible
        await usernameField.waitFor({
            state: "visible",
            timeout: 30000,
        });

        await usernameField.fill(username);
        await this.page.locator("#password").fill(password);
        await this.page.getByRole("button", { name: /sign in/i }).click();
        await this.page.waitForURL("**/dashboard/properties", {
            timeout: 30000,
        });
    }
}
