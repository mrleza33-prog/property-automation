import { Page } from "playwright";

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(process.env.BASE_URL!, {
    waitUntil: "load",
    timeout: 60_000
    });
  }

async login(username: string, password: string) {

  const usernameField = this.page.locator("#username");

  // If login form not visible, assume already logged in
  if (!(await usernameField.isVisible().catch(() => false))) {
    console.log("🔐 Already authenticated");
    return;
  }

  await usernameField.fill(username);
  await this.page.locator("#password").fill(password);
  await this.page.getByRole("button", { name: /sign in/i }).click();
}

}

