import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { ContactPage } from "../../src/pages/contact.page";
import { CustomWorld } from "../support/world";

When("I select the first contact", { timeout: 30000 }, async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.selectFirstContact();
});

Then("the contact should be selected", { timeout: 30000 }, async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.verifyContactSelected();
});

When("I delete the selected contact", { timeout: 30000 }, async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.deleteSelectedContact();
});

Then(
    "the contact should be deleted successfully",
    { timeout: 30000 },
    async function (this: CustomWorld) {
        const contactPage = new ContactPage(this.page);

        await contactPage.verifyContactDeleted();
    },
);
