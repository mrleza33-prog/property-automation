import { Given, Then } from "@cucumber/cucumber";
import { request } from "playwright";
import { SearchAPI } from "../../src/api/search.api";

let aiResponse: any;

Given(
  "I perform an AI search with prompt {string}",
  { timeout: 30 * 1000 },
  async function (prompt: string) {
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL!
    });

    const searchApi = new SearchAPI(apiContext);

    aiResponse = await searchApi.aiPrompt(prompt);
  }
);

Then(
  "the AI response should contain tenant {string}",
  function (tenant: string) {
    const responseText = JSON.stringify(aiResponse).toLowerCase();

    if (!responseText.includes(tenant.toLowerCase())) {
      throw new Error(`Tenant ${tenant} not found in AI response`);
    }
  }
);
