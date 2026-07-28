// import { Given, When, Then } from "@cucumber/cucumber";
// import { CustomWorld } from "../support/world";
// import { LoginPage } from "../../src/pages/login.page";
// //import { credentials } from "../../src/config/credentials";
// import { DashboardPage } from "../../src/pages/dashboard.page";
// import { expect } from "@playwright/test";

// When(
//   "I navigate to all application modules",
//   { timeout: 90 * 1000 },
//   async function (this: CustomWorld) {

//     console.log("➡️ Properties");
//     await this.dashboard!.goToProperties();

//     console.log("➡️ Documents");
//     await this.dashboard!.goToDocuments();

//     console.log("➡️ Users");
//     await this.dashboard!.goToUsers();

//     console.log("➡️ Audit");
//     await this.dashboard!.goToAudit();
//   }
// );

// Then(
//   "I should have full access to all modules",
//   { timeout: 30_000 },
//   async function (this: CustomWorld) {

//     const adminMenus = [
//       "Property Search",
//       "Tenants",
//       "Contacts",
//       "Documents",
//       "Statistics",
//       "Review",
//       "Audit Trail",
//       "Users",
//     ];

//     for (const menu of adminMenus) {
//       await this.page.getByText(menu, { exact: true }).waitFor({
//         timeout: 10_000,
//       });
//     }

//     console.log("✅ Admin menus verified");
//   }
// );


