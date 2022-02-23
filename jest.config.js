module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/examples"],
    testRegex: ".*.test.ts$",
    reporters: ["<rootDir>/lib/index.js"],
};
