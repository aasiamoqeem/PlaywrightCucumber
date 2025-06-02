module.exports = {
  default: {
    dryRun: false,
    formatOptions: {
      snippetInterface: 'async-await',
      resultsDir: "allure-results",
    },
    format: ['progress', 
      "allure-cucumberjs/reporter"],
    paths: ['src/tests/api/features/**/*.feature',
      'src/tests/gui/features/**/*.feature'
    ],
    require: [
      'src/tests/gui/steps/common.steps.ts',
      'src/tests/api/steps/**/*.ts',
      'src/tests/gui/steps/**/*.ts',
      'src/tests/hooks/**/*.ts'
    ],
    requireModule: ['ts-node/register']
  }
};

