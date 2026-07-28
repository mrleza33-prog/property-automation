module.exports = {
  default: {
    require: [
      "features/step-definitions/**/*.ts",
      "features/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber.json",
    ],
    
    timeout: 60000,
    publishQuiet: true
  }
};
