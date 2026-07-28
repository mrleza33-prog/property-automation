import "dotenv/config";
import { defineConfig } from "@playwright/test";

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL,
        headless: false,
        screenshot: "only-on-failure",
        trace: "on-first-retry",
    },
    testDir: "./src",
});
