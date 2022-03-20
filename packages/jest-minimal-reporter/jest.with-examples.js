const jestConfig = require("./jest.config");

jestConfig.roots = [...jestConfig.roots, "<rootDir>/examples"];

module.exports = jestConfig;
