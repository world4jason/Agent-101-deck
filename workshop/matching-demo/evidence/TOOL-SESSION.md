# Actual tool sequence

These records are outputs from actual local tool invocations. The commands are shown from the repository root; JSON and text output is preserved in the linked files.

1. Read the ticket and initial Version A candidate with:
   - `rtk cat workshop/matching-demo/ticket.md | rtk proxy tee workshop/matching-demo/evidence/A/ticket-read.txt`
   - `rtk cat workshop/matching-demo/candidate/matching.py | rtk proxy tee workshop/matching-demo/evidence/A/source-read.txt`
   The final ticket spelling was later aligned to 小安／小晴 and reread with `rtk cat workshop/matching-demo/ticket.md | rtk proxy tee workshop/matching-demo/evidence/A/ticket-read-final.txt`.
2. Ran `MATCHING_CANDIDATE_ID=A rtk python3 -m unittest discover -s workshop/matching-demo/tests -v`; exit code `1`. The one-way test failed with actual `M01`/count `1` against expected count `0`; two-way passed. Raw output: [`A/test-red.txt`](A/test-red.txt).
3. Ran `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/A/matching.py --candidate-id A --case one-way`; exit code `1`, status `FAIL`, expected count `0`, actual `M01`/count `1`. The command output was saved as [`A/one-way.json`](A/one-way.json). A separate two-way Version A run with the same command and `--case two-way` returned exit code `0`; output is [`A/two-way.json`](A/two-way.json).
4. Edited `candidate/matching.py` so a record is created only after the reverse Like exists. Captured the source diff with `rtk diff -u workshop/matching-demo/versions/A/matching.py workshop/matching-demo/candidate/matching.py`; its exit code `1` means the files differ. Output: [`A-to-B.diff`](A-to-B.diff). The corrected source was preserved as Version B.
5. Reran `MATCHING_CANDIDATE_ID=B rtk python3 -m unittest discover -s workshop/matching-demo/tests -v`; exit code `0`, both then-existing tests passed. Raw output: [`B-pre-supplement/test-green.txt`](B-pre-supplement/test-green.txt). Then ran these commands separately, each exit code `0`:
   - `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case one-way`
   - `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case two-way`
   Their raw JSON is in the matching files under [`B-pre-supplement/`](B-pre-supplement/). At this snapshot duplicate Like was **NOT RUN**.
6. For A13, ran `MATCHING_CANDIDATE_ID=B rtk python3 -m unittest discover -s workshop/matching-demo/tests -p test_matching_demo.py -k repeated_like -v`. The first duplicate baseline assertion exposed that the initial runner did not show an existing match before the repeated Like; raw red output: [`B-post-supplement/duplicate-baseline-test-red.txt`](B-post-supplement/duplicate-baseline-test-red.txt). After adding the setup state, the same focused test exposed setup actions leaking into the tested action list; raw red output: [`B-post-supplement/duplicate-action-boundary-test-red.txt`](B-post-supplement/duplicate-action-boundary-test-red.txt).
7. After separating setup from the tested action, reran the focused duplicate test; exit code `0`, output [`B-post-supplement/duplicate-test-green.txt`](B-post-supplement/duplicate-test-green.txt). Ran `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case duplicate`; exit code `0`, raw result [`B-post-supplement/duplicate.json`](B-post-supplement/duplicate.json). It shows one existing `M01` before and one afterward. The final full three-case suite also returned exit code `0`; output: [`B-post-supplement/test-green.txt`](B-post-supplement/test-green.txt).

[`SHA256SUMS.txt`](SHA256SUMS.txt) records the actual `shasum -a 256` output: Version A is `ce09ee4c8091325bb40c71d7b5e74114af77b05be7457110a6274e5ea91e22b4`; Version B and all B copies are `0415bddc460265e1ef7c91fe96859b3a507cb345d2edd25ddccf6f061fbfc682`.

## Separate new A09 replay

The replay below was captured later as a new teaching reenactment; it is not part of the earlier A/B session above and does not alter its historical snapshots. See the [new replay record](A09-replay/README.md), the [replay assignment](A09-replay/assignment.md), and the [plan recorded before execution](A09-replay/plan-before-execution.md).

The A defect is intentional for the lesson and is not evidence that a production Matching App fails. All runs are rule-level teaching results; UI and full product integration remain **NOT RUN**.
