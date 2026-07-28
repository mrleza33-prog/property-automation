
console.log("=== generate-report.js started ===");

const report = require("multiple-cucumber-html-reporter");
const fs = require("fs");
const path = require("path");

// Create timestamp
const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, "-");

const reportRoot = path.join("reports", timestamp);
const htmlPath = path.join(reportRoot, "html");

// Ensure directory exists
fs.mkdirSync(htmlPath, { recursive: true });

// Move latest cucumber.json into this folder
fs.copyFileSync(
  path.join("reports", "cucumber.json"),
  path.join(reportRoot, "cucumber.json")
);

report.generate({
  jsonDir: reportRoot,
  reportPath: htmlPath,
  reportName: 'Phoenix Project Automation E2E Report',
  metadata: {
    browser: {
      name: "chromium",
      version: "latest"
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "10"
    }
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Phoenix Project" },
      { label: "Environment", value: "QA" },
      { label: "Executed", value: new Date().toLocaleString() }
    ]
  }
});

console.log(`✅ Report generated at: ${htmlPath}`);
