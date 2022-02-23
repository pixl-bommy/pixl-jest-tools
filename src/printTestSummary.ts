import { AssertionResult } from "@jest/types/build/TestResult";

export default function printTestSummary(
    result: AssertionResult,
    useColor?: boolean
): void {
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
