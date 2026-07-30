import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

Then("I should see a contacts list", async function (this: CustomWorld) {
    await expect(this.page.getByRole("heading", { name: "Contact List" })).toBeVisible({
        timeout: 10000,
    });
    await expect(this.page.locator("tbody tr").first()).toBeVisible({ timeout: 10000 });
});
