module.exports = {
    projects: ["<rootDir>/packages/**/jest.config.js"],
    reporters: [
        [
            "jest-minimal-reporter",
            { color: true, lineLength: 25, hideErrorReport: false },
        ],
    ],
    coverageReporters: ["lcov"],
};
