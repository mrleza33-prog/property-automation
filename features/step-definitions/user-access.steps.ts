import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

When("I check the Users menu access", async function (this: CustomWorld) {
    const userMenuButton = this.page.locator("text=Users").first();
    const isVisible = await userMenuButton.isVisible().catch(() => false);
    this.userMenuVisible = isVisible;

    if (isVisible) {
        await userMenuButton.click();
    }
});

Then(
    "the Users list access should be correct for {string}",
    async function (this: CustomWorld, role: string) {
        const normalizedRole = role.toLowerCase();

        if (normalizedRole === "admin") {
            expect(this.userMenuVisible).toBe(true);
            await expect(this.page.getByText("Users").first()).toBeVisible({ timeout: 10000 });
        } else {
            expect(this.userMenuVisible).toBe(false);
            const userMenuButton = this.page.locator("text=Users").first();
            await expect(userMenuButton).not.toBeVisible();
        }
    },
);
