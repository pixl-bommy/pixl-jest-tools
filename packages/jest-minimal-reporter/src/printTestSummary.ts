import { AssertionResult } from "@jest/types/build/TestResult";

export default function printTestSummary(
    result: AssertionResult,
    useColor?: boolean,
    // istanbul-ignore-next: injection is for tests only
    writer = process.stdout
): void {
    switch (result?.status) {
        case "disabled": {
            const format = useColor ? silent : noformat;
            writer.write(format("_"));
            break;
        }

        case "failed": {
            const format = useColor ? redBg : noformat;
            writer.write(format("F"));
            break;
        }

        case "passed": {
            const format = useColor ? silent : noformat;
            writer.write(format("."));
            break;
        }

        case "pending": {
            const format = useColor ? yellow : noformat;
            writer.write(format("*"));
            break;
        }

        case "skipped": {
            const format = useColor ? silent : noformat;
            writer.write(format("»"));
            break;
        }

        case "todo": {
            const format = useColor ? yellow : noformat;
            writer.write(format("t"));
            break;
        }

        default:
            const format = useColor ? magentaBg : noformat;
            writer.write(format("?"));
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
