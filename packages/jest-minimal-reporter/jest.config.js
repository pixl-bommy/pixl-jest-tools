module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    testRegex: ".*.test.ts$",
    collectCoverageFrom: ["**/*.ts"],
    coveragePathIgnorePatterns: ["coverage", "node_modules", "examples", "lib"],
};
