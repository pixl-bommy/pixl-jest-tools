# Jest-Minimal-Reporter

This project offers a custom reporter for the test framework `jest`.

It target is to show test results in an simple way, while highlighting unexpected states.

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

- `.` test case a succeeded
- `F` test case failed
- `*` test is pending (e.g. fetch or promise that doesn't resolved within timeout)
- `t` test.todo
