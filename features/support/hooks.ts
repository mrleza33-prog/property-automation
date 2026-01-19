import { Before, After } from "@cucumber/cucumber";
import { CustomWorld } from "./world";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined. Check your .env file.");
}

Before({ timeout: 60 * 1000 }, async function (this: CustomWorld) {
  await this.init();
});

After({ timeout: 60 * 1000 }, async function (this: CustomWorld) {
  await this.cleanup();
});
