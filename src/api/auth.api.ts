import { request, APIRequestContext } from "playwright";

export class AuthAPI {
  private api!: APIRequestContext;

  async init() {
    this.api = await request.newContext({
      baseURL: process.env.BASE_URL
    });
  }

  async login(username: string, password: string) {
    const response = await this.api.post("/api/auth/login", {
      data: { username, password }
    });

    if (!response.ok()) {
      throw new Error("Login failed");
    }

    return response.json();
  }
}
