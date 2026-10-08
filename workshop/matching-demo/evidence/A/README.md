# Version A evidence

Version A SHA-256: `ce09ee4c8091325bb40c71d7b5e74114af77b05be7457110a6274e5ea91e22b4`.

`test-red.txt` is the actual focused test run against the intentionally incorrect candidate; the one-way assertion fails because the output has one `M01` while AC1 expects zero. `one-way.json` is the direct Version A run and preserves its expected/actual state with exit status 1. This is a deliberate teaching defect, not a claim about a production app.

The separate `two-way.json` run passes with one `M01`; this does not erase the one-way failure. [`snapshot.json`](snapshot.json) records both results and the pending acceptance/authorization state.

`ticket-read-final.txt` and `source-read.txt` preserve the actual ticket and initial candidate source reads. `test-red.txt` and `one-way.json` were both captured with real Python tool runs. The candidate was then edited from A to B; [`../A-to-B.diff`](../A-to-B.diff) is the resulting source diff.

The initial ticket/test transcript used the shorter display name `安`; after checking the storyboard, the final ticket and fixture use `小安`. The account ID and rule did not change. The final Version A JSON run uses the aligned name.
