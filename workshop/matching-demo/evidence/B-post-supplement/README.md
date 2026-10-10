# Version B after A13's supplement

Candidate artifact: `versions/B/matching.py`.

SHA-256: `0415bddc460265e1ef7c91fe96859b3a507cb345d2edd25ddccf6f061fbfc682` — unchanged from the pre-supplement snapshot.

The one-way and two-way outputs are retained from the pre-supplement snapshot. `duplicate.json` is the actual A13 rerun: the reset fixture is followed by two separate setup actions that create `M01`; `before` records one match; the tested `actions` contains only the repeated Like; and the actual state still contains one `M01`. The full focused suite in `test-green.txt` passes all three cases.

`duplicate-baseline-test-red.txt` and `duplicate-action-boundary-test-red.txt` preserve test-first checks that exposed missing setup/before evidence in the first runner draft. Those failures were in the evidence harness; the final duplicate scenario records the pre-existing `M01` and tests only the repeated Like. The focused duplicate check and final suite pass.

This is rule-level teaching evidence only. UI/full product integration and human acceptance, merge, and release remain **NOT RUN**.

[`snapshot.json`](snapshot.json) records all three case results, current WIP 1/1, Human Gate acceptance pending, and no merge/release authorization.
