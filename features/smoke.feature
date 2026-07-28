Feature: Smoke Test

  Scenario: Upload document via API
  Given the test framework is initialized
  Given a document file is loaded into memory
  Given the document is uploaded via the API

  Scenario: Upload document via UI and verify via API
  Given the test framework is initialized
  Given the document is uploaded via the UI
  Then the document should exist via the API
