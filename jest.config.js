module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/examples"],
    testRegex: ".*.test.ts$",
    reporters: [
        [
            "<rootDir>/lib/index.js",
            { color: true, lineLength: 25, hideErrorReport: true },
        ],
    ],
};
