// features/support/world.ts
import { Browser, BrowserContext, Page, APIRequestContext } from "playwright";
import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { DashboardPage } from "../../src/pages/dashboard.page";
import { ContactPage } from "../../src/pages/contact.page";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    api?: APIRequestContext;
    dashboard!: DashboardPage;
    contactPage!: ContactPage;
    userMenuVisible?: boolean;

    // ADD THESE TWO LINES
    currentRole!: string;
    createdContactEmail!: string;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);
