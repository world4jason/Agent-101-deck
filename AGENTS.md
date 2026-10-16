# AGENTS.md — Agent 101 Deck

> **最高優先：先讀 [Rev13 投影片設計原則](docs/rev13-design-principles.md)。它高於本文件其他段落與所有 Rev13 規格；衝突時以它為準。禁用內部代號與自創術語（面向新手）。**


本 Repository 是給軟體開發零基礎學員的互動教材；正式投影片目前是 Rev12，下一版 Rev13 **開場必須先呈現「人／流程／文件／版本管理」四要素，再在相同畫面新增 Agent 第五要素**；之後才沿軟體開發流程講同一個案例。

## Rev13 mandatory instructions (authoring, docs, slides, exports, PR review)

**Before touching any Rev13 outline, slide, notes, script, export, or QA:**
1. Read [Rev13 全域投影片分鏡契約](docs/rev13-visual-narrative-contract.md) **in full**. It is the single canonical source of all Rev13 scene rules and blocking review gates.
   - **Mandatory original Rev12 Agent content:** [five-principles preservation contract](docs/rev13-agent-five-principles-preservation.md) maps **External Task State, Bounded Execution, Role Separation, Independent Verification, Goal Re-anchoring** to A05–A11 in CORE. Do not omit or hide in appendix. These content principles are separate from P18–P23 presentation principles.
   - **Executable gate:** [Rev13 Gate Plan](docs/rev13-gates.md), [machine-readable scene metadata](docs/rev13-scene-manifest.json), `python3 tests/rev13_contract_check.py` + regression tests. A planning PASS does not mean slides rendered or G1–G5 passed.
   - **P18–P23 global Principles** are mandatory for all Rev13+ slides/docs/demos/HTML/PPTX: audience-led DIG/FIG, stable four-pillar shared mother-map, focus+context staging, visible People↔Process↔Documents/Ticket/AC↔Versioning/GitHub relationships, and before→after history/extract/closure. Do not treat these as inspiration or optional research.
2. Read [presentation research: 林大班／BFA × Shneiderman](docs/rev13-presentation-research-lin-shneiderman.md) for DIG/FIG, seven visual tasks (especially Relate/History/Extract) and correct attribution. Do NOT force a separate 7-element UI on every slide; the binding criteria remain in the visual contract.
3. Read **[Rev13 v5 Two-Part Learning Architecture](docs/rev13-two-part-learning-architecture-v5.md) FIRST** and [v5 machine-readable plan](docs/rev13-two-part-manifest-v5.json). Part 1 Pre-training defines Stage Target/Input/Output/Exit, Roles×Stages, Documents and Git/GitHub. Part 2 uses [the v4 42-scene original storyboard](docs/rev13-workflow-first-content-refinement-v4.md), scene O03–X01, as the single Matching evidence timeline. Legacy v1–v4 are source/traceability, not a second active chapter order. Read README P1–P23 and G1–G5.
4. Every Rev13 work phase must tell **where in workflow / who co-works / what document or Ticket/AC is being created or updated / which Git-controlled version or GitHub Issue/PR relates / resulting state delta**. Use one repeated visual mother-map and **Overview → Spotlight (dim unrelated regions) → Work / Artifact → Updated Overview**. These four are semantic beats; may span or combine slides.
5. Keep mapping to **seven Kanban columns**; Brainstorming/Refinement are activities and Human Gate is an external decision, not extra columns. Keep Role ≠ person ≠ Agent and Chat ≠ Session ≠ Workflow.
6. Use the existing Matching App / #3 ticket and verifiable A FAIL → B-pre partial PASS with duplicate NOT RUN → B-post supplemental PASS timeline. Mark teaching hypotheticals and any UI/E2E/Release/Goal test as NOT RUN unless real evidence exists.
7. Treat violations as **blocking P1**, not subjective visual feedback. A new chapter cannot be a set of isolated static text slides. For each scene record metadata, focus targets, Ticket delta, GitHub mapping and cross-slide continuity.
8. Do **not** flatten full slides to PNG for editable PowerPoint. Real photos/screenshots may remain images; text and key diagrams must be selectable native elements. Preserve HTML/PPTX/Notes consistency.
9. No self-merge: leave Owner Human Gate, independent QA status and unrun gates explicit.

## Workflow freeze (explicit Owner instruction)

**Do NOT edit, trigger, tune or otherwise touch `.github/workflows/` while GitHub Actions is unavailable.** No runner, billing, permissions or required-status-check experiments in this content-refinement work. Validate structure locally with `python3 tests/rev13_v5_two_part_check.py`; this is NOT an Actions PASS or a substitute for G1–G5. Only revisit Actions if Owner explicitly changes the instruction.

## Version boundary / safe working scope

- [Rev12 frozen demo, tag \`rev12-demo-107\`](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107) = \`5eb43fe9efb031ad7fb0582270a75df1c312a6ae\`.
- Rev13 planning branch: \`rev13/reorg\`, [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60), [Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61). Plan/Review first; implementation in a separate scoped PR after G1 clearance.
- Do not silently change main, the live \`/slides/\` route, older variants, or the open Post-Demo / Native-PPTX work in PR #57 / #59.
