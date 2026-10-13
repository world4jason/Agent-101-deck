# Rev13 Enforcement Plan — Code + Review + Protected Merge

> **Current status: Refinement; not Ready, not delivered.** Applies to [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60), [Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61). Source of instruction: [Global Principles P1–P23](../README.md), [Slide Contract](rev13-visual-narrative-contract.md), [Five Agent Principles](rev13-agent-five-principles-preservation.md).
>
> **Never call a planning CI PASS the same thing as a rendered slide QA PASS.** These are different scopes.

## Why README and AGENTS.md alone are insufficient

A text guideline cannot stop a generator from omitting a role, changing a version, flattening a PPTX, skipping a five-principle lesson, or merging unchecked visual defects. Enforcement needs separate **traceable input spec → automatic rejection → rendered QA → independent human gate → merge protection**.

## Stage gates

| Stage | Mandatory evidence | Machine check / failure mode | Human decision |
|---|---|---|---|
| **Goal / Refinement (current)** | v4 42-scene Storyboard, 107-page legacy traceability, five-principle preservation contract, [JSON scene manifest](rev13-scene-manifest.json) | `python3 tests/rev13_contract_check.py`; fail if scene missing, out of order, empty Documents/Version, P18–P23 drift, five lost, no state delta, false B-pre PASS | G1 reviewer checks learning order and actual examples; owner approves Ready |
| **Ready** | G1 actual reviewer and evidence link, all new scenes feasible, no unresolved P0/P1 | Manifest `development_phase=ready` requires a review record `docs/reviews/rev13-gates.json` with G1 reviewer & evidence | Owner explicitly moves Ticket to Ready |
| **Dev** | Rendered slides generated from canonical scenes, all necessary source materials/links | `development_phase=implementation` requires `slides/rev13/index.html`, 1 scene per ID, shared mother-map `rev13-four-foundations` and scene metadata attributes for roles/docs/version/GitHub | Humans can edit, but no self-declaration of QA |
| **Review** | Source diff + slide-by-slide evidence, Matching #3 original tests, no extra fabricated claims | G2–G4 each need independent evidence records. Check full playback and source mapping, explicit NOT RUN, image/screenshots of final HEAD, native object editable PPTX (separate test) | Reviewer leaves findings; P0/P1 must be resolved |
| **Human Gate** | Latest SHA tested, reviewer verdicts and supporting screenshots; original source & HTML/PPTX parity | G5 latest-HEAD and release evidence; no status copied from old SHA | Only Owner decides Go/No-Go / release; no auto-merge |
| **Done** | Approved, merged & released with actual output; post-release validation recorded | Final artifact and report; no fake success | Human confirms goal state; learner outcomes can stay NOT RUN until actual pilot |

### CI that is implementable now

- `.github/workflows/rev13-contract.yml` runs Python standard-library validator + its **negative regression tests** on every PR/push (no skipped path filters).
- In Refinement the check validates **42/42 scene metadata, the five Rev12 Agent principles (Rev12 pp. 76–81, P42–P47), four foundations + fifth Agent, mandatory P18–P23, consistent scene sequence and A/B-pre/B-post evidence scopes**.
- A CI PASS is labeled **“refinement contract only”**. It does **not** verify accessibility, actual visual spotlight, human comprehension, factual UI tests, PowerPoint editability, or the efficacy of independent reviewers.
- Source of truth for semantics: v4 markdown table + JSON metadata. Validator compares **identical scene IDs and order** and enforces fields, so conflicting documents cannot silently diverge.
- To enter Implementation, flip the manifest development phase; missing Rev13 HTML causes hard failure. This is deliberate **fail closed**, not an excuse to flip the stage prematurely.

### Rendered slide metadata contract (implementation stage)

Each actual Rev13 rendered scene element must expose attributes:
`data-rev13-scene-id`, `data-phase`, `data-focus-roles`, `data-doc-ref`,
`data-version-ref`, `data-github-ref`, `data-beat`,
`data-mother-map-id="rev13-four-foundations"`.

A passing DOM check only confirms declared structure, **not what eyes actually see**. G4 still requires final screenshots at supported viewport/projector size, mask focus legibility, correct relationships, state transitions and human review. Also compare text/shape editability in native PPTX: whole-page PNG must fail.

### Branch protection: important limitation and remaining step

An Actions job in a repository is **not automatically a required Merge Gate**. On 2026-10-13 the repository's `main` was observed not protected. To make checks impossible to bypass through the normal PR merge UI, the repository owner must configure **GitHub Rulesets / Branch protection** for the target branch:
1. Require a PR and non-author review for the Rev13 changes;
2. Require latest-head **`rev13-contract`** status check before merging (plus existing functional/evidence/PPTX checks relevant to actual slides);
3. Prevent direct pushes and unintended bypasses; require up-to-date branch as appropriate;
4. Maintain explicit owner approval for Human Gate and release.

**Do not claim these restrictions are active until verified via GitHub repo settings / ruleset API.** Changing protection on `main` could affect other open PRs #57/#59, so this planning PR does not silently change repository governance.

Sources:
- [GitHub required status checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)
- [GitHub repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)

## Independent G1 review questions

- Does the **first scene** state People, Process, Documents, Version Control, and the **second** add Agent without deleting or reordering the first four?
- Across every scene can a beginner identify **where, who co-works, which document/Ticket/AC, which version/GitHub object, what changed** in five seconds?
- Are the original **External Task State / Bounded Execution / Role Separation / Independent Verification / Goal Re-anchoring** all taught with scenario, decision and output, rather than hidden in appendix? See A05–A11.
- Does the same Matching #3 actually progress A FAIL → B-pre partial PASS + duplicate NOT RUN → B-post duplicate PASS, with clearly marked simulation vs verified cases?
- Is every Updated Overview actually different from the previous and can the learner return to it?
- Do the source evidence, speech notes and delivery artifacts all tell the **same** story?

## Local commands

```sh
python3 tests/rev13_contract_check.py
python3 -m unittest discover -s tests -p 'test_rev13_contract_check.py' -v
```

**Status**: Gate code exists on planning branch and can validate the written plan. Full graphical enforcement, branch protection, G1 independent approval, PowerPoint UI check and new Rev13 artifact **have not been completed**.
