import { When, Then } from "@cucumber/cucumber";

When("I navigate to Contacts", async function () {
    await this.dashboard.goToContacts();
});

When("I click Add Contact", async function () {
    const addButton = this.page.getByRole("button", { name: "Add Contact" });

    await addButton.waitFor({ state: "visible" });
    await addButton.click();
});

When("I complete all required contact fields", { timeout: 30000 }, async function () {
    await this.page.waitForLoadState("domcontentloaded");

    const uniqueEmail = `auto${Date.now()}@test.com`;

    // Broker Name
    await this.page.locator('input[name="broker_name"]').fill("Auto Broker");
    // Listing Company
    await this.page.locator('input[name="listing_company"]').fill("Auto Listing Company");
    // Phone
    await this.page.locator('input[name="phone"]').fill("0123456789");
    // Email
    await this.page.locator('input[name="email"]').fill(uniqueEmail);
    // Website
    await this.page.locator('input[name="website"]').fill("www.autotesting.com");

    //Assign to Property
    // Select Property from dropdown
    const propertyDropdown = this.page.getByRole("button", {
        name: /Select property/i,
    });
    await propertyDropdown.click();

    const searchInput = this.page.locator('[data-slot="command-input"]');
    await searchInput.waitFor({ state: "visible" });

    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.waitFor({ state: "visible" });

    const firstOptionText = await firstOption.textContent();

    if (firstOptionText) {
        await searchInput.fill(firstOptionText.trim());
        await this.page.keyboard.press("Enter");
    }

    // Assign to Lease

    // 1️⃣ Open dropdown trigger (NOT the input)
    const leaseTrigger = this.page.getByRole("button", {
        name: /Select lease/i,
    });

    await leaseTrigger.click();

    // 2️⃣ Wait for dropdown options to appear
    const firstLeaseOption = this.page.locator("[cmdk-item]").first();
    await firstLeaseOption.waitFor({ state: "visible" });

    // 3️⃣ Click first option directly
    await firstLeaseOption.click();

    //Relation
    await this.page
        .locator('input[data-slot="input"][placeholder="Owner, Broker, Tenant Rep..."]')
        .fill("Tenant");

    // Relation Comment
    await this.page
        .locator('textarea[placeholder="Additional notes..."]')
        .fill("Testing Relation Comment");
    // Contact Comments
    await this.page
        .locator('textarea[placeholder="Optional notes..."]')
        .fill("Testing Contact Comment");

    this.createdContactEmail = uniqueEmail;
});

When("I submit the contact form", async function () {
    const saveButton = this.page.getByRole("button", {
        name: /Save Contact/i,
    });

    await saveButton.waitFor({ state: "visible" });
    await saveButton.click();
});

//Then("validation should pass", async function () {
//await this.contactPage.expectNoValidationErrors();
//});

Then("the contact should be saved successfully", { timeout: 30000 }, async function () {
    console.log("1 - Waiting for success toast");

    await this.page.getByText(/contact created/i).waitFor({
        state: "visible",
        timeout: 5000,
    });

    console.log("2 - Success toast received");

    console.log("3 - Waiting for success toast to disappear");

    const successToast = this.page.getByRole("listitem").filter({ hasText: "Contact created" });

    await successToast.waitFor({
        state: "hidden",
        timeout: 10000,
    });

    console.log("4 - Success toast disappeared");

    console.log("5 - Waiting for contacts table");

    await this.page.waitForLoadState("networkidle");

    await this.page.waitForSelector("tbody tr", {
        state: "visible",
        timeout: 10000,
    });

    console.log("4 - Contacts table loaded");

    const row = this.page.locator("tbody tr", {
        has: this.page.getByText(this.createdContactEmail),
    });

    console.log(`5 - Looking for ${this.createdContactEmail}`);

    await row.waitFor({
        state: "visible",
        timeout: 5000,
    });

    console.log("✅ Broker added successfully");
});
