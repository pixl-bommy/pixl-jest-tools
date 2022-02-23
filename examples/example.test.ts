// these test should show each type of test result

test("succeeding test", () => {
    return;
});

test("failing test", () => {
    throw "error";
});

test("pending test", async () => {
    return new Promise(() => {
        // nothing will be done
    });
});

test.skip("skipped test", () => {
    // nothing will be done
});

test.todo("not implemented test");
