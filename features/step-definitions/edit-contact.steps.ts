import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { ContactPage } from "../../src/pages/contact.page";
import { CustomWorld } from "../support/world";

When(
    "I search for contact {string}",
    { timeout: 30000 },
    async function (this: CustomWorld, contactName: string) {
        const contactPage = new ContactPage(this.page);

        await contactPage.searchContact(contactName);
    },
);

When("I open the first contact in the results", async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.openFirstContact();
});

When("I click Update", async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.waitForContactInformation();
    await contactPage.clickUpdate();
});

When("I change the first name to {string}", async function (this: CustomWorld, brokerName: string) {
    const contactPage = new ContactPage(this.page);

    await contactPage.updateBrokerName(brokerName);
});

When("I save the contact", async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.saveContact();
});

Then("the contact should be updated successfully", async function (this: CustomWorld) {
    const contactPage = new ContactPage(this.page);

    await contactPage.verifyReturnedToContactList();
});
