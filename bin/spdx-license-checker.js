#!/usr/bin/env node

var fs = require("fs");
var args = process.argv.slice(2);

if (args[0] === "init") {
  console.log("Copying the default config file");

  var configFile = "spdx-license-checker-config.js"
  if(args[1]){
    console.log(" " + configFile + " -> " + args[1]);
    configFile = args[1];
  } else {
    console.log(" " + configFile);
  }

  fs.writeFileSync(configFile, "module.exports = " + JSON.stringify(require('../spdx-license-checker-config.js.js'), null, 2));
  process.exit();
}

var configPath = args[0];
var config;
var path = require('path');
var packageJson = require(path.join(process.cwd(), "package.json"));

if (configPath) {
  config = require(path.resolve(configPath));
} else {
  config = packageJson["spdx-license-checker"];

  if (!config) {
    config = require('../spdx-license-checker-config.js');
    configPath = __dirname + "/spdx-license-checker-config.js";
  }
}

if (configPath) {
  config.configPath = path.resolve(configPath);
}
config.__currentPackage = {
  name: packageJson.name,
  dependencies: packageJson.dependencies || [],
  devDependencies: packageJson.devDependencies || [],
  peerDependencies: packageJson.peerDependencies || [],
  optionalDependencies: packageJson.optionalDependencies || []
};

require("../index")(config).check();