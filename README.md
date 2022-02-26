# Jest-Minimal-Reporter

This project offers a custom reporter for the test framework `jest`.

It target is to show test results in an simple way, while highlighting unexpected states.

## Scripts

-   `build` builds javascript output to /lib folder
-   `start` same as `build` but with active watch mode
-   `test` runs code tests only
-   `test:exapmles` runs code tests and examples together

### Example

```
.........................t.......................
.................................................
.............FF..................................
.................................................
...................*.............................
.................................................
.......................................t.........
.................................................
..................

Ran 410 tests in 37.234 s
  405 passing
    2 failing
    1 pending
    2 todo
```

Possible output chars

-   `.` test case a succeeded
-   `F` test case failed
-   `*` test is pending (e.g. fetch or promise that doesn't resolved within timeout)
-   `t` test.todo

### Reporter options

-   `color` [boolean] highlight errors in red
-   `lineLength` [number] adds linebreak after given number of test cases
-   `hideErrorReport` [boolean] hide list of occured errors after tests are done
