import { AssertionResult } from "@jest/types/build/TestResult";

export default function printTestSummary(
    result: AssertionResult,
    useColor?: boolean,
    // istanbul-ignore-next: injection is for tests only
    writeout = process.stdout.write
): void {
    switch (result?.status) {
        case "disabled": {
            const format = useColor ? silent : noformat;
            writeout(format("_"));
            break;
        }

        case "failed": {
            const format = useColor ? redBg : noformat;
            writeout(format("F"));
            break;
        }

        case "passed": {
            const format = useColor ? silent : noformat;
            writeout(format("."));
            break;
        }

        case "pending": {
            const format = useColor ? yellow : noformat;
            writeout(format("*"));
            break;
        }

        case "skipped": {
            const format = useColor ? silent : noformat;
            writeout(format("»"));
            break;
        }

        case "todo": {
            const format = useColor ? yellow : noformat;
            writeout(format("t"));
            break;
        }

        default:
            const format = useColor ? magentaBg : noformat;
            writeout(format("?"));
            break;
    }
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

function magentaBg(text: string) {
    return `\x1b[45m${text}\x1b[0m`;
}
