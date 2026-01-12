module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: [
      "features/step-definitions/**/*.ts",
      "features/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "html:reports/cucumber-report.html"
    ],
    timeout: 60000,
    publishQuiet: true
  }
};
