import { APIRequestContext } from "playwright";

export class SearchAPI {
  constructor(private request: APIRequestContext) {}

  async aiSearch(query: string) {
    const response = await this.request.post("/api/search", {
      data: { query }
    });

    return response.json();
  }
}

export {};