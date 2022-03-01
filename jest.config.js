module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    testRegex: ".*.test.ts$",
    reporters: [
        [
            "<rootDir>/lib/index.js",
            { color: true, lineLength: 25, hideErrorReport: false },
        ],
    ],

    collectCoverage: false,
    collectCoverageFrom: ["**/*.ts"],
    coveragePathIgnorePatterns: [
        "/coverage",
        "/node_modules/",
        "/examples/",
        "/lib/",
    ],
    coverageReporters: ["lcov"],
};
