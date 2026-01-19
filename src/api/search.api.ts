import { APIRequestContext } from "playwright";

export class SearchAPI {
  constructor(private request: APIRequestContext) {}

  async aiSearch(query: string) {
    const response = await this.request.post("/api/search", {
      data: { query }
    });

    return response.json();
  }

  async aiPrompt(prompt: string) {
    const response = await this.request.post("/api/ai/search", {
      data: {
        prompt: prompt
      }
    });

    if (!response.ok()) {
      throw new Error("AI search failed");
    }

    return response.json();
  }
}

export {};
