import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before({ timeout: 60 * 1000 }, async function (this: CustomWorld) {
  await this.init();
});

After({ timeout: 60 * 1000 }, async function (this: CustomWorld) {
  await this.cleanup();
});
