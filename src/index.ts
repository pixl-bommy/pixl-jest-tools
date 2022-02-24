import {
    AggregatedResult,
    Config,
    Context,
    Reporter,
    ReporterOnStartOptions,
    Test,
    TestResult,
} from "@jest/reporters";
import { AssertionResult } from "@jest/types/build/TestResult";

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

    constructor(
        globalConfig: Config.GlobalConfig,
        options: Partial<JestMinimalReporterOptions>
    ) {
        const lineLength = options.lineLength || MAX_LINE_LENGTH;

        this._options = {
            ...options,
            lineLength,
        };

        this._charsUntilLineBreak = lineLength;
    }

    onRunStart(
        results: AggregatedResult,
        options: ReporterOnStartOptions
    ): void | Promise<void> {
        this._numTestSuitesLeft = results.numTotalTestSuites;

        console.log();
        console.log(`Found ${results.numTotalTestSuites} test suites`);
        console.log();
    }

    onRunComplete(
        contexts: Set<Context>,
        results: AggregatedResult
    ): void | Promise<void> {
        console.log();
        console.log();

        if (!this._options.hideErrorReport) {
            results.testResults
                .filter(({ failureMessage }) => failureMessage)
                .forEach(({ failureMessage }) => console.error(failureMessage));
        }

        if (!results.snapshot.didUpdate && results.snapshot.unchecked) {
            const count = results.snapshot.unchecked;
            const message = `${count} obsolete snapshot${
                count > 1 ? "s" : ""
            } found.`;

            const colorizedError = this._options.color
                ? `\x1b[31m${message}\x1b[0m`
                : message;

            console.error(colorizedError);
            console.log();
        }

        printTestFooter(results);
    }

    onTestResult(
        test: Test,
        testResult: TestResult,
        aggregatedResult: AggregatedResult
    ): void | Promise<void> {
        const testSuitesLeft = this._numTestSuitesLeft - 1;
        this._numTestSuitesLeft = testSuitesLeft;
    }

    onTestCaseResult(
        test: Test,
        testCaseResult: AssertionResult
    ): void | Promise<void> {
        printTestSummary(testCaseResult, this._options.color);

        // add linebreak after {option.lineLenght} chars
        this._charsUntilLineBreak = this._charsUntilLineBreak - 1;
        if (this._charsUntilLineBreak <= 0) {
            this._charsUntilLineBreak = this._options.lineLength;
            process.stdout.write("\n");
        }
    }
}
