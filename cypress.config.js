const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'hvcvmn',
  e2e: {
    baseUrl:"http://localhost:3000/",
  },
});
