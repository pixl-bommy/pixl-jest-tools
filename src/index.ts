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

const MAX_LINE_LENGTH = 80;

interface JestMinimalReporterOptions {
    color?: boolean;
    lineLength: number;
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
        printTestResult(testCaseResult, this._options.color);

        // add linebreak after {option.lineLenght} chars
        this._charsUntilLineBreak = this._charsUntilLineBreak - 1;
        if (this._charsUntilLineBreak <= 0) {
            this._charsUntilLineBreak = this._options.lineLength;
            process.stdout.write("\n");
        }
    }
}

function printTestResult(result: AssertionResult, useColor?: boolean): void {
    switch (result?.status) {
        case "disabled": {
            const format = useColor ? silent : noformat;
            process.stdout.write(format("_"));
            break;
        }

        case "failed": {
            const format = useColor ? redBg : noformat;
            process.stdout.write(format("F"));
            break;
        }

        case "passed": {
            const format = useColor ? silent : noformat;
            process.stdout.write(format("."));
            break;
        }

        case "pending": {
            const format = useColor ? yellow : noformat;
            process.stdout.write(format("*"));
            break;
        }

        case "skipped": {
            const format = useColor ? silent : noformat;
            process.stdout.write(format("»"));
            break;
        }

        case "todo": {
            const format = useColor ? yellow : noformat;
            process.stdout.write(format("t"));
            break;
        }

        default:
            process.stdout.write("?");
            break;
    }
}

function pluralize(word: string, count: number) {
    return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function noformat(text: string) {
    return text;
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
