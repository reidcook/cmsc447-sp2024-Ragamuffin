module.exports = {
  // Specifies the environment in which the test scripts will be executed
  testEnvironment: 'node',

  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  coverageDirectory: 'coverage',

  collectCoverage: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],

  // The test match pattern to find test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Timeout settings for tests that may take longer
  testTimeout: 10000, // in milliseconds
};
