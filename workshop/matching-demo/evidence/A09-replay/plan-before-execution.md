# Plan — recorded before replay commands

This plan is part of a new, explicitly labelled teaching replay. At the time this plan was written, no replay command had been run yet.

1. Read the current ticket and immutable Version A source so the task boundary and starting artifact are visible.
2. Run only the Version A one-way case from the repository root. Capture the real command output and exit code, then compare its actual record count with AC1's expected zero.
3. If the output is a rule failure, copy the preserved A source to `evidence/A09-replay/working/matching.py`; change only the condition that creates a match, so the reverse Like must already exist.
4. Capture the actual A-to-temporary-candidate diff.
5. Rerun the same one-way case against the temporary candidate and record its expected/actual result and exit code.
6. Compute SHA-256 and compare the temporary candidate byte-for-byte with preserved Version B. Keep all existing A/B snapshots unchanged.

Scope stop: do not execute duplicate Like, UI, or full-product checks in this replay.
