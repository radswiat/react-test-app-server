module.exports = {
  // root dir
  // this is from all paths will be calculated,
  // it also specify location of your .spec files!!
  // @default '../../bin'
  rootDir: '../../bin',
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)(spec|test|spec-int).js?(x)',
  ],
  // should stop after error ?
  // keep it off, or you won't see any console.logs!!
  // @default: false
  bail: false,
  // verbose output
  // @default: true
  verbose: true,
  // collect coverage
  // @default: true
  collectCoverage: true,
  // collect coverage from
  // specify what has impact on coverage stats
  // @default: true
  collectCoverageFrom: [
    '**/*.js',
    '!**/**/index.js',
    '!main.js',
    '!server.js',
    '!core/**/**',
    '!config/**/**',
  ],
  reporters: [
    'default',
    [
      '<rootDir>../test/unit/reporters/json.js',
      {
        output: 'coverage/report.json',
      },
    ],
  ],
  // coverage reporter
  // generate html as output
  // @default: html
  coverageReporters: [
    'html', 'json', 'lcov',
  ],
  // where to store coverage output
  coverageDirectory: '../coverage',
  // collect threshold
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 80,
      statements: 0,
    },
  },
  // test environment
  // @default: 'node'
  testEnvironment: 'node',
  // framework file
  // this is pre-test execution file
  // it can modify execution env
  // @default: '../test/framework-config.js'
  setupTestFrameworkScriptFile: '../test/unit/framework-config.js',
  // transform
  // transformers to help jest understand es6, skip on css/scss files and others
  transform: {
    '^.+.(js|jsx)$': '<rootDir>../test/unit/jest-compilers/babel-transform.js',
    '^.+.(css|scss)': '<rootDir>../test/unit/jest-compilers/css-transform.js',
    '^(?!.*.(js|jsx|css|scss|json)$)': '<rootDir>../test/unit/jest-compilers/file-transform.js',
  },
};
