# Version B before A13's supplement

Candidate artifact: `versions/B/matching.py`.

SHA-256: `0415bddc460265e1ef7c91fe96859b3a507cb345d2edd25ddccf6f061fbfc682`.

| Case | Expected | Actual | Status |
|---|---|---|---|
| One-way Like | 0 records | 0 records | PASS |
| Two-way Like | 1 record (`M01`) | 1 record (`M01`) | PASS |
| Duplicate Like | Not yet executed | Not yet observed | **NOT RUN** |

The one-way and two-way records are raw outputs from separate invocations, each reset from the shared fixture. `test-green.txt` is the focused two-case suite run before adding the duplicate case. The duplicate status describes this historical snapshot; its post-supplement evidence is kept separately.

[`snapshot.json`](snapshot.json) carries the case statuses, unchanged candidate hash, and teaching-ticket state: WIP remains 1/1 while duplicate evidence and Human Gate acceptance are pending; merge/release is not authorized.
