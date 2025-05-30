module.exports = {
  default: {
    dryRun: false,
    formatOptions: {
      snippetInterface: 'async-await'
    },
    format: [
      'cucumberjs-allure2-reporter'
    ],
    paths: ['src/tests/api/features/**/*.feature',
      'src/tests/gui/features/**/*.feature'
    ],
    require: ['src/tests/api/steps/**/*.ts',
      'src/tests/gui/steps/**/*.ts',
      'src/tests/hooks/**/*.ts'
    ],
    requireModule: ['ts-node/register']
  }
};

