/* eslint-disable */
// disable eslint to allow copy/paste of babelrc config from json format
module.exports = require('babel-jest').createTransformer({
  // disable babelrc file
  babelrc: false,
  // cache directory
  cacheDirectory: true,
  // presets
  "presets": [
    "env",
    "stage-2"
  ],
  "plugins": [
    "transform-runtime",
    "transform-export-extensions",
    ["module-resolver", {
      "alias": {
        "adapters": "./bin/adapters",
        "config": "./bin/config",
        "core": "./bin/core",
        "api": "./bin/api",
        "modules": "./bin/modules",
        "frameworks": "./bin/frameworks",
        "~test-core": "./test/_test-core"
      }
    }]
  ]
});
