const { defineConfig } = require("cypress");
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
    },

  // Junit reporter
  "reporter": "junit",
  "reporterOptions": {
     "mochaFile": "cypress/results/results.xml",
     "toConsole": true,
  },
  e2e: {
    setupNodeEvents(on, config) {
        AllureWriter(on, config);
        return config;
    }
},
});
