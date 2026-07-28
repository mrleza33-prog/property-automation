import { Page, expect } from "@playwright/test";

export class DocumentUploadPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/documents/upload");
    await expect(
      this.page.locator("input[type='file']")
    ).toBeVisible();
  }

  async uploadFile(filePath: string) {
    const fileInput = this.page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    const uploadButton = this.page.getByRole("button", { name: "Upload" });
    await uploadButton.click();
  }

  async verifyUploadSuccess() {
    await expect(
      this.page.locator("text=Upload successful")
    ).toBeVisible({ timeout: 10000 });
  }
}
