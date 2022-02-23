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

interface JestMinimalReporterOptions {
    color?: boolean;
}

export default class JestMinimalReporter implements Partial<Reporter> {
    private _numTestSuitesLeft: number = 0;
    private _options: JestMinimalReporterOptions = {};

    constructor(
        globalConfig: Config.GlobalConfig,
        options: JestMinimalReporterOptions
    ) {
        this._options = options;
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
        results.testResults.map(({ failureMessage }) => {
            if (failureMessage) {
                console.error(failureMessage);
            }
        });

        if (!results.snapshot.didUpdate && results.snapshot.unchecked) {
            const obsoleteError =
                pluralize("obsolete snapshot", results.snapshot.unchecked) +
                " found.";
            if (this._options.color)
                console.error(`\x1b[31m${obsoleteError}\x1b[0m`);
            else console.error(obsoleteError);
        }

        const padLen = ("" + results.numTotalTests).length;
        console.log(`Ran ${results.numTotalTests} tests in ${testDuration()}`);
        console.log(`  ${pad(padLen, results.numPassedTests || 0)} passing`);
        console.log(`  ${pad(padLen, results.numFailedTests || 0)} failing`);
        console.log(`  ${pad(padLen, results.numPendingTests || 0)} pending`);
        console.log(`  ${pad(padLen, results.numTodoTests || 0)} todo`);
        console.log();

        function testDuration() {
            const end = new Date().valueOf();
            const start = new Date(results.startTime).valueOf();

            const seconds = (end - start) / 1000;
            return `${seconds} s`;
        }
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
        printTestResult(testCaseResult);
    }
}

function printTestResult(result: AssertionResult): void {
    switch (result?.status) {
        case "disabled":
            process.stdout.write(silent("_"));
            break;

        case "failed":
            process.stdout.write(redBg("F"));
            break;

        case "passed":
            process.stdout.write(silent("."));
            break;

        case "pending":
            process.stdout.write(yellow("*"));
            break;

        case "skipped":
            process.stdout.write(silent("»"));
            break;

        case "todo":
            process.stdout.write(yellow("t"));
            break;

        default:
            process.stdout.write("?");
            break;
    }
}

function pluralize(word: string, count: number) {
    return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function silent(text: string) {
    return `\x1b[2m${text}\x1b[0m`;
}

function yellow(text: string) {
    return `\x1b[33m${text}\x1b[0m`;
}

function redBg(text: string) {
    return `\x1b[41m${text}\x1b[0m`;
}

function pad(len: number, value: number): string {
    return ("" + (value || 0)).padStart(len, " ");
}
