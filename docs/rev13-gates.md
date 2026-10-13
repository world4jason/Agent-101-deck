# Rev13 Enforcement Plan — Code + Review + Protected Merge

> **Current status: Refinement; not Ready, not delivered.** Applies to [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60), [Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61). Source of instruction: [Global Principles P1–P23](../README.md), [Slide Contract](rev13-visual-narrative-contract.md), [Five Agent Principles](rev13-agent-five-principles-preservation.md).
>
> **Never call a planning CI PASS the same thing as a rendered slide QA PASS.** These are different scopes.

## Owner workflow freeze / Rev13 v5 two-part scope

**目前 Github Actions 因 account billing lock 不可用。Owner 要求本次停止動到 GitHub Workflow。** 不更新、不觸發、不調校 `.github/workflows/`；不把紅燈當教材錯誤，也不把本機 PASS 宣稱成 Required CI 或正式 Merge Gate。

- 現行全課是 [v5 Two-Part Architecture](rev13-two-part-learning-architecture-v5.md)，機讀資料 [v5 manifest](rev13-two-part-manifest-v5.json)。
- Part 1 認識：22 個 Scene、9 Stage Contracts（含 Stage Goal/Target、Input、Output、Exit、People、GitHub），7 個職能與 Documents / GitHub 物件關係。
- Part 2 應用：v4 的 O03–X01 原 40 Scene，唯一 Matching #3 Evidence Timeline，五項 Rev12 Agent 原則保持在 A05–A11。
- 本機獨立檢查：`python3 tests/rev13_v5_two_part_check.py` 和 `python3 -m unittest discover -s tests -p 'test_rev13_v5_two_part_check.py' -v`。
- 此檢查只保證**規格與來源沒遺失**；Part 1 避免過載、Part 2 能真正 Lead by Example、母圖可讀性及 PowerPoint 物件能編輯，仍需 G1／G4／Human Gate。

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

- `.github/workflows/rev13-contract.yml` runs Python standard-library validator + its **nine negative regression tests** on every PR/push (no skipped path filters).
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

### 2026-10-13 實際執行結果與遠端 CI 阻礙

- **Local execution on a fresh clone at `rev13/reorg`: PASS** — 42-scene refinement contract checked and **9/9 negative regression tests PASS**. This is *structural QA only*.
- **GitHub Actions: FAIL / JOB NOT STARTED** — [Actions run #38405484691](https://github.com/world4jason/Agent-101-deck/actions/runs/38405484691) 及其 Check Run annotation 說明：`The job was not started because your account is locked due to a billing issue.`。該 Job 沒有任何實際 steps，所以不能把遠端紅燈當 Python 斷言失敗，也不能把本機 PASS 當 GitHub CI PASS。
- Workflow 已改為 `pull_request` + `push main`（避免對同一 PR 的 branch push 重複消耗 runner），Job name 為 `rev13-contract`；**帳務鎖定未解除前，這項 CI 無法真正執行**。
- **main branch 仍未設定 required checks / protection**（2026-10-13 查詢 `protected=false`）。將它設成必需通過前，GitHub 不會因本腳本自動擋下所有 Merge。
- 若解決計費問題，再驗證最新 HEAD 的遠端 `rev13-contract` PASS，並由 Repo 管理者評估既有 PR #57/#59 的影響後啟用 required status checks／非作者審查。**此規劃 PR 不擅自更改 main 的分支保護規則。**

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

**Status**: Local structural contract + 9 regression tests PASS; **GitHub Actions FAIL (billing lock / steps not started)**. Main branch protection, independent G1, graphical G4, PowerPoint GUI QA, native Rev13 artifact and Human Gate **have not been completed**.
