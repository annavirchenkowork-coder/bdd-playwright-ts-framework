module.exports = {
  default: {
    parallel: 2,
    paths: ["./features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["./steps/**/*.ts", "./hooks/**/*.ts"],
    format: [
      "progress-bar",
      "json:reports/cucumber-report.json",
      // add html formatter later if you install one
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
    worldParameters: {
      ...process.env,
    },
  },
};
