# A09 new teaching replay

**Replay status:** performed now, on 2026-10-08, as a new teaching reenactment authorized by the parent task. This is not a reconstruction or backdating of an earlier conversation. The assignment and plan were recorded and sent before the first replay command; see [`assignment.md`](assignment.md) and [`plan-before-execution.md`](plan-before-execution.md).

The replay uses ticket #3, preserves the original A and B artifacts, and changes only [`working/matching.py`](working/matching.py), a temporary copy under this directory. The historical evidence snapshots remain separate and untouched. In particular, [`../B-pre-supplement/snapshot.json`](../B-pre-supplement/snapshot.json) still records duplicate Like as **NOT RUN**.

## Recorded action sequence

Commands were run from the repository root. `tee` output and command results are preserved here.

1. Read `ticket.md` and Version A with `rtk cat`; both reads exited `0`. Raw output: [`ticket-read.txt`](ticket-read.txt), [`version-a-read.txt`](version-a-read.txt).
2. Ran `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/A/matching.py --candidate-id A --case one-way`; exit code `1`. The actual result is FAIL: AC1 expected zero records, while A created `M01`/one record. Raw output: [`version-a-one-way.json`](version-a-one-way.json).
3. Copied Version A into the temporary replay folder, then edited only the temporary rule so it requires the reverse Like. The captured `rtk diff -u workshop/matching-demo/versions/A/matching.py workshop/matching-demo/evidence/A09-replay/working/matching.py` exited `1` because it found the A-to-candidate changes. Raw diff: [`A-to-working.diff`](A-to-working.diff).
4. Reran the same one-way case against the temporary candidate with `--candidate-id B`; exit code `0`, status PASS, expected and actual count both zero. Raw output: [`candidate-b-one-way.json`](candidate-b-one-way.json).
5. `rtk proxy shasum -a 256` returned the same B hash for the temporary file and preserved `versions/B/matching.py`; `rtk cmp -s` exited `0`, confirming byte equality. Raw hashes: [`identity-hashes.txt`](identity-hashes.txt).
6. A final integrity command exited `0` after checking both replay results, the exact B bytes/hash, and the unchanged B-pre **NOT RUN** boundary; output: [`integrity-check.txt`](integrity-check.txt).

The temporary source hash is `0415bddc460265e1ef7c91fe96859b3a507cb345d2edd25ddccf6f061fbfc682`, identical to Version B. This replay did not execute duplicate Like, UI, or full-product checks.
