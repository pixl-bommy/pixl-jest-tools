import { Config, Reporter } from "@jest/reporters";

import printTestFooter from "./printTestFooter";
import printTestSummary from "./printTestSummary";

const MAX_LINE_LENGTH = 80;

interface JestMinimalReporterOptions {
    lineLength: number;
    color?: boolean;
    hideErrorReport?: boolean;
}

export default class JestMinimalReporter implements Partial<Reporter> {
    private _numTestSuitesLeft: number = 0;
    private _options: JestMinimalReporterOptions;
    private _charsUntilLineBreak: number;

    constructor(_: Config.GlobalConfig, options: Partial<JestMinimalReporterOptions>) {
        const lineLength = options.lineLength || MAX_LINE_LENGTH;

        this._options = {
            ...options,
            lineLength,
        };

        this._charsUntilLineBreak = lineLength;
    }

    public onRunStart: Reporter["onRunStart"] = (results) => {
        this._numTestSuitesLeft = results.numTotalTestSuites;

        console.log();
        console.log(`Found ${results.numTotalTestSuites} test suites`);
        console.log();
    };

    public onRunComplete: Reporter["onRunComplete"] = (_, results) => {
        console.log();
        console.log();

        if (!this._options.hideErrorReport) {
            results.testResults
                .filter(({ failureMessage }) => failureMessage)
                .forEach(({ failureMessage }) => console.error(failureMessage));
        }

        if (!results.snapshot.didUpdate && results.snapshot.unchecked) {
            const count = results.snapshot.unchecked;
            const message = `${count} obsolete snapshot${count > 1 ? "s" : ""} found.`;

            const colorizedError = this._options.color ? `\x1b[31m${message}\x1b[0m` : message;

            console.error(colorizedError);
            console.log();
        }

        printTestFooter(results);
    };

    public onTestResult: Reporter["onTestResult"] = () => {
        const testSuitesLeft = this._numTestSuitesLeft - 1;
        this._numTestSuitesLeft = testSuitesLeft;
    };

    public onTestCaseResult: Reporter["onTestCaseResult"] = (_, testCaseResult) => {
        printTestSummary(testCaseResult, this._options.color);

        // add linebreak after {option.lineLenght} chars
        this._charsUntilLineBreak = this._charsUntilLineBreak - 1;
        if (this._charsUntilLineBreak <= 0) {
            this._charsUntilLineBreak = this._options.lineLength;
            process.stdout.write("\n");
        }
    };
}
