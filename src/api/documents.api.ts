import { APIRequestContext } from "playwright";
import { Buffer } from "buffer";


export class DocumentsAPI {
  constructor(private api: APIRequestContext) {}

  async uploadDocument(
    propertyId: string,
    fileName: string,
    mimeType: string,
    fileBuffer: Buffer
  ) {
    const response = await this.api.post("/api/documents/upload", {
      multipart: {
        file: {
          name: fileName,
          mimeType: mimeType,
          buffer: fileBuffer
        }
      },
      params: { propertyId }
    });

    if (!response.ok()) {
      throw new Error("Upload failed");
    }

    return response.json();
  }
}

export {};
