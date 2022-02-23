import { AggregatedResult } from "@jest/reporters";

export default function printTestFooter(
    results: AggregatedResult,
    now = Date.now()
): void {
    const numTotalTests = results.numTotalTests || 0;
    const numPassedTests = results.numPassedTests || 0;
    const numFailedTests = results.numFailedTests || 0;
    const numPendingTests = results.numPendingTests || 0;
    const numTodoTests = results.numTodoTests || 0;
    const startTime = results.startTime || 0;

    const padLen = ("" + numTotalTests).length;

    const end = now;
    const start = startTime;
    const seconds = (end - start) / 1000;

    console.log(`Ran ${numTotalTests} tests in ${seconds} s`);
    console.log(`  ${pad(padLen, numPassedTests)} passing`);
    console.log(`  ${pad(padLen, numFailedTests)} failing`);
    console.log(`  ${pad(padLen, numPendingTests)} pending`);
    console.log(`  ${pad(padLen, numTodoTests)} todo`);
    console.log();
}

function pad(len: number, value: number): string {
    return ("" + (value || 0)).padStart(len, " ");
}
