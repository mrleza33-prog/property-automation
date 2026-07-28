import { Page, expect } from "@playwright/test";

export class ContactPage {
    constructor(private page: Page) {}

    async searchContact(contactName: string) {
        console.log("1. searchContact started");
        console.log("2. Looking for search box");

        const searchInput = this.page.getByRole("textbox", {
            name: "Search contacts...",
        });

        await expect(searchInput).toBeVisible({ timeout: 10000 });

        await searchInput.clear();
        await searchInput.fill(contactName);
        await searchInput.press("Enter");

        // Give the UI time to refresh
        await this.page.waitForTimeout(2000);
    }

    async openFirstContact() {
        console.log("3. Looking for View button");

        const viewButton = this.page.getByRole("button", { name: "View" }).nth(1);

        await expect(viewButton).toBeVisible({ timeout: 10000 });

        console.log("4. Clicking View");

        await viewButton.click();

        console.log("5. View clicked");
    }

    async waitForContactInformation() {
        await expect(
            this.page.getByRole("heading", {
                name: "View Contact Information",
            }),
        ).toBeVisible({ timeout: 10000 });
    }

    async clickUpdate() {
        const updateButton = this.page.getByRole("button", {
            name: "Update",
        });

        await expect(updateButton).toBeVisible({ timeout: 10000 });

        await updateButton.click();
    }

    async updateBrokerName(brokerName: string) {
        const brokerTextbox = this.page.getByRole("textbox", {
            name: "Broker Name",
        });

        await expect(brokerTextbox).toBeVisible({ timeout: 10000 });

        await brokerTextbox.fill(brokerName);
    }

    async saveContact() {
        const saveButton = this.page.getByRole("button", {
            name: "Save Changes",
        });

        await expect(saveButton).toBeVisible({ timeout: 10000 });

        await saveButton.click();
    }

    async verifyReturnedToContactList() {
        await expect(
            this.page.getByRole("heading", {
                name: "Contact List",
            }),
        ).toBeVisible({ timeout: 10000 });
    }

    async selectFirstContact(): Promise<void> {
        await this.page.locator('tbody input[type="checkbox"]').first().check();
    }

    async verifyContactSelected(): Promise<void> {
        const checkbox = this.page.locator('tbody input[type="checkbox"]').first();

        await expect(checkbox).toBeChecked();
    }

    async deleteSelectedContact(): Promise<void> {
        await this.page.getByRole("button", { name: "Delete Selected" }).click();

        await this.page.getByRole("button", { name: "Delete" }).click();
    }

    async verifyContactDeleted(): Promise<void> {
        const successToast = this.page.getByText("contact(s) deleted", {
            exact: false,
        });

        await expect(successToast).toBeVisible();
    }
}
