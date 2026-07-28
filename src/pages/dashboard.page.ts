import { Page, expect } from "@playwright/test";

export class DashboardPage {
    constructor(private page: Page) {}

    async goToProperties() {
        await this.page.locator("text=Properties").first().click();
        await expect(this.page.locator("text=Properties").first()).toBeVisible({ timeout: 30000 });
    }

    async goToContacts() {
        await this.page.locator("text=Contacts").first().click();

        await expect(this.page.getByRole("heading", { name: "Contact List" })).toBeVisible({
            timeout: 30000,
        });
    }

    async goToDocuments() {
        await this.page.locator("text=Documents").first().click();
        await expect(this.page.locator("text=Documents").first()).toBeVisible({ timeout: 30000 });
    }

    async goToUsers() {
        await this.page.locator("text=Users").first().click();
        await expect(this.page.locator("text=Users").first()).toBeVisible({ timeout: 30000 });
    }

    async goToAudit() {
        await this.page.locator("text=Audit").first().click();
        await expect(this.page.locator("text=Audit").first()).toBeVisible({ timeout: 30000 });
    }

    //////
    async logout() {
        console.log("1. Looking for user menu");

        const userMenuTrigger = this.page.locator('[data-slot="dropdown-menu-trigger"]');

        await expect(userMenuTrigger).toBeVisible();
        console.log("2. User menu visible");

        await userMenuTrigger.click();
        console.log("3. User menu clicked");

        await expect(userMenuTrigger).toHaveAttribute("data-state", "open");
        console.log("4. Menu is open");

        const logoutOption = this.page.getByRole("menuitem", {
            name: /logout/i,
        });

        await expect(logoutOption).toBeVisible();
        console.log("5. Logout option visible");

        await logoutOption.click();
        console.log("6. Logout clicked");

        await this.page.waitForURL(/login/);
        console.log("7. Login page reached");
    }
}
