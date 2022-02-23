import { AggregatedResult } from "@jest/reporters";

export default function printTestFooter(results: AggregatedResult): void {
    const padLen = ("" + results.numTotalTests).length;

    const end = new Date().valueOf();
    const start = new Date(results.startTime).valueOf();
    const seconds = (end - start) / 1000;

    console.log(`Ran ${results.numTotalTests} tests in ${seconds} s`);
    console.log(`  ${pad(padLen, results.numPassedTests || 0)} passing`);
    console.log(`  ${pad(padLen, results.numFailedTests || 0)} failing`);
    console.log(`  ${pad(padLen, results.numPendingTests || 0)} pending`);
    console.log(`  ${pad(padLen, results.numTodoTests || 0)} todo`);
    console.log();
}

function pad(len: number, value: number): string {
    return ("" + (value || 0)).padStart(len, " ");
}