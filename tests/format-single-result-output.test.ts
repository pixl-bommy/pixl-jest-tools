import printTestSummary from "../src/printTestSummary";

describe("format single test result output", () => {
    test.each([
        ["disabled", "_"],
        ["failed", "F"],
        ["passed", "."],
        ["pending", "*"],
        ["skipped", "»"],
        ["todo", "t"],
        ["__unknown_status__", "?"],
    ])("with status %p print out %p", (status, char) => {
        const writer = jest.fn();
        printTestSummary({ status } as any, undefined, writer);

        expect(writer).toHaveBeenCalledWith(char);
    });

    test.each([
        ["disabled", "_", "\x1b[2m"],
        ["failed", "F", "\x1b[41m"],
        ["passed", ".", "\x1b[2m"],
        ["pending", "*", "\x1b[33m"],
        ["skipped", "»", "\x1b[2m"],
        ["todo", "t", "\x1b[33m"],
        ["__unknown_status__", "?", "\x1b[45m"],
    ])("with color and status %p print out %p with given color", (status, char, escColor) => {
        const writer = jest.fn();
        const escReset = "\x1b[0m";

        printTestSummary({ status } as any, true, writer);

        expect(writer).toHaveBeenCalledWith(escColor + char + escReset);
    });
});
