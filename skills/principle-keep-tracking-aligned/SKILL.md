---
name: principle-keep-tracking-aligned
description: Apply when starting, switching, handing off, or completing tracked work. Keep authoritative workflow state, ownership, and relationships aligned with actual progress.
disable-model-invocation: true
---

# Keep Tracking Aligned

Keep the authoritative tracker consistent with the actual work state and relationships, without claiming transitions that have not occurred.

This governs tracking accuracy, not tracker selection, completion-gate definition, or merge authority. Use the project's established tracker and agreed delivery gate.

- Identify the active issue before execution, discover supported states and metadata conventions, and state it when starting or switching tasks. Distinguish it from parent milestones and follow-up work; do not require issues for untracked work.
- With write authorization, reflect starting, blocking, entering review, and completing through supported states or equivalent metadata. Preserve unrelated assignments, labels, and dependencies; confirm missing conventions or ownership before introducing metadata.
- Prefer structured state, assignments, labels, dependency relationships, and implementation or review links over narrative updates. A linked PR carries implementation evidence; do not duplicate it in progress comments. Use comments for clarification that metadata and linked artifacts cannot convey, such as a blocker's cause or a handoff limitation.
- Mark complete only when accepted criteria and the agreed delivery gate are met. Investigation acceptance is not implementation delivery; publishing a PR is not integration. Represent partial and contextual work without implying resolution.
- Read back each update. If access, authorization, or tooling prevents it, report the actual tracker state and unapplied transition rather than implying synchronization.

**The tests:**

- "Can another contributor identify the active task, responsible actor, and current stage from the tracker?" Update applicable metadata using established conventions.
- "Would an assignment, label, state, or PR relationship convey this without a comment?" Prefer that mechanism; comment only to clarify missing context.
- "Does this completion or relationship describe what actually happened?" Check acceptance and delivery evidence, then read back the resulting state.
