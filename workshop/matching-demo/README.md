# Matching #3 teaching demo

This is a small, executable **teaching environment** for ticket #3. It uses two fake accounts and a local in-memory state. It is not the Matching App, a server, or a UI acceptance test.

## Files and candidate identity

- [`ticket.md`](ticket.md) is the rule and acceptance contract.
- [`fixtures/users.json`](fixtures/users.json) is the resettable fake account fixture.
- [`candidate/matching.py`](candidate/matching.py) is the corrected candidate after the recorded A-to-B edit.
- [`versions/A/matching.py`](versions/A/matching.py) and [`versions/B/matching.py`](versions/B/matching.py) are preserved source artifacts. Their SHA-256 values are printed by each run; the hash identifies the exact Python artifact, not a Git commit or production release.
- [`run_case.py`](run_case.py) starts fresh from the fixture, applies one case, and prints the expected and actual records, counts, candidate ID, and artifact hash. A mismatch exits nonzero.
- [`evidence/`](evidence/) contains raw command output and distinct A, B pre-supplement, and B post-supplement snapshots.

Run commands from the repository root with Python 3; the demo uses only the standard library.

Version A SHA-256: `ce09ee4c8091325bb40c71d7b5e74114af77b05be7457110a6274e5ea91e22b4`.
Version B SHA-256: `0415bddc460265e1ef7c91fe96859b3a507cb345d2edd25ddccf6f061fbfc682`.
[`evidence/SHA256SUMS.txt`](evidence/SHA256SUMS.txt) confirms that the working candidate and both B evidence snapshots have the same bytes.

For duplicate Like, the runner resets the fixture, applies the two setup Likes to create the pre-existing `M01`, captures that state as `before`, then applies only the repeated Like listed in `actions`.

## New A09 teaching replay

This is a separate replay captured now; it does not replace or backdate the original A/B timeline. See the [replay record](evidence/A09-replay/README.md), its [assignment](evidence/A09-replay/assignment.md), and the [plan recorded before execution](evidence/A09-replay/plan-before-execution.md).

## Replaying the demonstrated timeline

Version A deliberately creates a match after one Like. Run the one-way case; its nonzero exit is the expected teaching failure:

```sh
python3 workshop/matching-demo/run_case.py \
  --artifact workshop/matching-demo/versions/A/matching.py \
  --candidate-id A --case one-way
```

After inspecting [`evidence/A-to-B.diff`](evidence/A-to-B.diff), replay B's initial evidence. Each command resets the same fixture. Before the supplement, only one-way and two-way are recorded; duplicate Like is explicitly **NOT RUN**.

```sh
python3 workshop/matching-demo/run_case.py \
  --artifact workshop/matching-demo/versions/B/matching.py \
  --candidate-id B --case one-way
python3 workshop/matching-demo/run_case.py \
  --artifact workshop/matching-demo/versions/B/matching.py \
  --candidate-id B --case two-way
```

For A13, run the previously untested duplicate case against the same B artifact. Its hash must match the B-pre-supplement outputs:

```sh
python3 workshop/matching-demo/run_case.py \
  --artifact workshop/matching-demo/versions/B/matching.py \
  --candidate-id B --case duplicate
```

Focused checks:

```sh
python3 -m unittest discover -s workshop/matching-demo/tests -v
```

The full product and UI remain **NOT RUN**. A rule-level PASS establishes only the #3 rule cases in this local teaching environment.
