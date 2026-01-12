import { Page } from "playwright";

export class DocumentUploadPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/documents/upload");
  }

  async uploadFile(filePath: string) {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
    await this.page.click("button:has-text('Upload')");
  }
}
