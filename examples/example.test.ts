// these test should show each type of test result

describe("two level block", () => {
    describe.each([0, 1, 2, 3, 4])("subblock %p", () => {
        test.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])("test %p succeeds", () => {
            return;
        });
    });
});

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

test("undone test", (done) => {
    // nothing to be done
});

test.skip("skipped test", () => {
    // nothing will be done
});

test.todo("not implemented test");

describe("failing block", () => {
    describe("sub block in failing block", () => {
        test.skip("skipped test", () => {
            expect(null).toBeNull();
        });
    });

    describe.skip("skipped sub block in failing block", () => {
        test("should be skipped", () => {
            expect(null).toBeNull();
        });
    });
});

describe("snapshot tests", () => {
    test("successful snapshot test", () => {
        expect("Kekse").toMatchSnapshot();
    });

    test("failing snapshot test", () => {
        const failingSnapshot = "" + Math.floor(Math.random() * 1000000);
        expect(failingSnapshot).toMatchSnapshot();
    });
});
