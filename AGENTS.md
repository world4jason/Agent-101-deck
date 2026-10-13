# AGENTS.md — Agent 101 Deck

本 Repository 是給軟體開發零基礎學員的互動教材；正式投影片目前是 Rev12，下一版 Rev13 將以「流程 × 版控 × 人 → Agent」重新組織課程。

## Rev13 mandatory instructions (authoring, docs, slides, exports, PR review)

**Before touching any Rev13 outline, slide, notes, script, export, or QA:**
1. Read [Rev13 全域投影片分鏡契約](docs/rev13-visual-narrative-contract.md) **in full**. It is the single canonical source of all Rev13 scene rules and blocking review gates.
2. Read [Rev13 Storyboard](docs/rev13-reorg-storyboard-v1.md) and [Rev13 107頁 migration matrix](docs/rev13-migration-matrix-v1.md), then the existing README P1–P17 and G1–G5.
3. Every Rev13 work phase must tell **where in workflow / which people co-work / what is being done to which Ticket / resulting state and output / GitHub artifact**. Use one repeated visual mother-map and **Overview → Spotlight (dim unrelated regions) → Work / Artifact → Updated Overview**. These four are semantic beats; may span or combine slides.
4. Keep mapping to **seven Kanban columns**; Brainstorming/Refinement are activities and Human Gate is an external decision, not extra columns. Keep Role ≠ person ≠ Agent and Chat ≠ Session ≠ Workflow.
5. Use the existing Matching App / #3 ticket and verifiable A FAIL → B-pre partial PASS with duplicate NOT RUN → B-post supplemental PASS timeline. Mark teaching hypotheticals and any UI/E2E/Release/Goal test as NOT RUN unless real evidence exists.
6. Treat violations as **blocking P1**, not subjective visual feedback. A new chapter cannot be a set of isolated static text slides. For each scene record metadata, focus targets, Ticket delta, GitHub mapping and cross-slide continuity.
7. Do **not** flatten full slides to PNG for editable PowerPoint. Real photos/screenshots may remain images; text and key diagrams must be selectable native elements. Preserve HTML/PPTX/Notes consistency.
8. No self-merge: leave Owner Human Gate, independent QA status and unrun gates explicit.

## Version boundary / safe working scope

- [Rev12 frozen demo, tag \`rev12-demo-107\`](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107) = \`5eb43fe9efb031ad7fb0582270a75df1c312a6ae\`.
- Rev13 planning branch: \`rev13/reorg\`, [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60), [Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61). Plan/Review first; implementation in a separate scoped PR after G1 clearance.
- Do not silently change main, the live \`/slides/\` route, older variants, or the open Post-Demo / Native-PPTX work in PR #57 / #59.
