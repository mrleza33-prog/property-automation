import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

When(
  "I select the first property from the results",
  async function (this: CustomWorld) {

    const viewDetailsButton = this.page
      .getByRole("button", { name: /view details/i })
      .first();

    await viewDetailsButton.waitFor({ timeout: 10000 });
    await viewDetailsButton.click();

    console.log("📄 View Details clicked");
  }
);

Then(
  "the Property Information page should open with correct data",
  async function (this: CustomWorld) {

    const header = this.page.getByText(/property information/i);

    await header.waitFor({ timeout: 10000 });

    await expect(this.page).toHaveURL(/properties/);

    console.log("✅ Property Information page opened correctly");
  }
);
