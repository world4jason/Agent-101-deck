# A12–A15 facilitator exercise

These steps use the same ticket, fake accounts, reset command, and B artifact. They teach delegation and evidence review; they do not claim a live learner trial has occurred. **Live learner trial: NOT RUN.**

## A12 — Give one bounded assignment

Give the learner this assignment:

> From the repository root, work only on Matching ticket #3. Read `workshop/matching-demo/ticket.md`, `workshop/matching-demo/versions/B/matching.py`, and `workshop/matching-demo/fixtures/users.json`. Use the supplied runner and run this exact command:
>
> ```sh
> python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case one-way
> ```
>
> Report the artifact SHA-256, expected and actual records and counts, command result, and anything not run. Do not change the ticket, add behavior, or claim UI/product acceptance. Stop and report if the ticket, artifact, fixture, or runner is unavailable.

Facilitator checks that the assignment names the ticket, version/artifact, scope, AC, executable entry point, evidence, and stop condition. The action and returned output must be actual tool results, not narrated intent.

## A13 — Request the missing evidence

Starting from the B pre-supplement snapshot, the learner sees:

- one-way: PASS, expected and actual `0` records;
- two-way: PASS, expected and actual one `M01` record;
- duplicate Like: **NOT RUN**, because that case has not yet been executed in this snapshot.

Ask the learner to request that exact missing case on the same B artifact, without editing its rule code. From the repository root, copy and run this exact command:

```sh
python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case duplicate
```

The runner resets the fixture, creates `M01` in separately listed `setup_actions`, captures `before_match_count: 1`, then executes only the repeated Like in `actions`. Compare the output artifact SHA-256 with the B pre-supplement evidence, then record the updated result. PASS is recorded only after this command returns it and confirms one record before and after.

## A14 — Rewind for a handoff, then return to the mainline

This is a historical evidence rewind, not a new product result:

1. Show [`evidence/B-pre-supplement/`](evidence/B-pre-supplement/) as the current handoff snapshot. Keep the B source hash fixed; show duplicate Like as NOT RUN. Do not delete or overwrite the post-supplement record.
2. Ask the incoming session to read `ticket.md`, identify the B artifact hash, state what one-way and two-way already established, identify duplicate Like as untested at this point, and name the next bounded action.
3. End the handoff exercise with the explicit transition: **「接手演練結束。回到補驗完成的主線，核對更新證據，再進入 Human Gate 決定是否放行。」**
4. Restore [`evidence/B-post-supplement/`](evidence/B-post-supplement/) as the current mainline view before the Human Gate decision. Verify the same B hash and the actual duplicate PASS. Human acceptance, merge, and release are still not granted by these test results.

The ticket remains one item in progress through evidence review; changing sessions does not change its test state, WIP count, or authorization. This handoff exercise is **NOT RUN as a separate live session**; the package supplies the evidence snapshots and facilitator steps.

## A15 — Transfer the ticket shape

Ask learners to choose a small tool they care about and write only its first bounded ticket:

- who needs it and what it should help them do;
- the first deliverable;
- one situation that should succeed and one that should not;
- how they would inspect the result and its version;
- what should make the Agent stop and report.

Facilitator checks that another person could identify the scope, expected result, verification action, and stop condition. Do not ask the learner to build a second product during this exercise.
