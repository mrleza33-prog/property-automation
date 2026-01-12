import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import fs from "fs";
import { request } from "playwright";
import { DocumentsAPI } from "../../src/api/documents.api";
import { DocumentUploadPage } from "../../src/pages/documentUpload.page";
import { SearchAPI } from "../../src/api/search.api";




Given(
  "the test framework is initialized",
  { timeout: 30 * 1000 },
  async function (this: CustomWorld) {
    await this.page.goto("https://example.com", {
      waitUntil: "domcontentloaded"
    });
  }
);


Given("a document file is loaded into memory", async function (this: CustomWorld) {
  const fileBuffer = fs.readFileSync("src/test-data/sample.pdf");

  // simple safety check
  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error("File buffer is empty");
  }

  // store buffer on World so other steps can use it
  
  (this as any).fileBuffer = fileBuffer;
});

Given(
  "the document is uploaded via the API",
  async function (this: CustomWorld) {
    // 1. Create API context
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL
    });

    // 2. Create Documents API client
    const documentsApi = new DocumentsAPI(apiContext);

    // 3. Get buffer created earlier
    const fileBuffer = (this as any).fileBuffer;

    if (!fileBuffer) {
      throw new Error("File buffer not found. Did Step 2 run?");
    }

    // 4. Upload document
    await documentsApi.uploadDocument(
      "12345",                // propertyId (dummy for now)
      "sample.pdf",            // file name
      "application/pdf",       // mime type
      fileBuffer               // buffer
    );
  }
);

Given(
  "the document is uploaded via the UI",
  async function (this: CustomWorld) {
    const uploadPage = new DocumentUploadPage(this.page);


    await uploadPage.open();
    await uploadPage.uploadFile("src/test-data/sample.pdf");
  }
);

Then(
  "the document should exist via the API",
  async function () {
    // 1. Create API context
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL
    });

    // 2. Create Search API client
    const searchApi = new SearchAPI(apiContext);

    // 3. Search for uploaded document
    const result = await searchApi.aiSearch("sample.pdf");

    // 4. Simple validation
    if (!result || result.length === 0) {
      throw new Error("Uploaded document not found via API");
    }
  }
);


