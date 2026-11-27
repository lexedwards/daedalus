---
name: code-crafting
description: Use for any bug or problem report, investigation, change, or review involving code or maintained docs, including requests that start "I have this problem where". Holds the user's engineering standards and preferences, which the model cannot infer, for tracing, testing, sizing, and delivering changes. Use technical-writing for prose drafted outside the repository.
---

# Code Crafting

Build the smallest correct change with one clear purpose, proven through observable behavior and delivered in a working slice. When no change is requested, produce an evidence-based assessment instead of forcing an implementation workflow.

## When To Use

Use this skill for:

- Implementing features.
- Fixing bugs.
- Refactoring code.
- Reviewing code or design choices.
- Running bounded technical investigations or experiments.
- Assessing a ticket's claims against a codebase.
- Editing maintained documentation.
- Choosing where logic should live.
- Deciding how much testing or verification is enough.

## Start Here

Select workflow skills alongside domain, tracker, and platform skills; a narrower match does not replace this workflow. Reassess selection when a new turn changes the work mode, not only at session start.

Before the first write, commit, or publish action, load any missing skill for that action: this skill for maintained code or documentation changes, [technical-writing](../technical-writing/SKILL.md) before drafting technical prose, [incremental-commits](../incremental-commits/SKILL.md) before committing, and [pr-delivery](../pr-delivery/SKILL.md) before publication. Apply the loaded guidance before the action, not retrospectively. Do not reload skills already active or treat selection as authorization to write.

Before inspecting project files, identify every work mode present in the request, including review subtasks. Use the read tool to load the union of their starting principles. Resolve paths from this skill's base directory. Links name files to read; their contents are not loaded with this skill.

- Implementation, bug fix, or refactor: read [trace-before-changing](../principle-trace-before-changing/SKILL.md) and [smallest-complete-change](../principle-smallest-complete-change/SKILL.md). For a bug fix, also read [prove-bugs-before-fixing](../principle-prove-bugs-before-fixing/SKILL.md) before the first edit.
- Code or design review: read [trace-before-changing](../principle-trace-before-changing/SKILL.md) and [evidence-before-verdicts](../principle-evidence-before-verdicts/SKILL.md).
- Investigation or experiment: read [trace-before-changing](../principle-trace-before-changing/SKILL.md) and [evidence-before-verdicts](../principle-evidence-before-verdicts/SKILL.md). Agree the investigation contract below before experimental execution; apply implementation principles to any tooling intentionally retained as maintained code.

Read each starting principle once.

Before generating code, tests, or explanations, read [make-structure-visible](../principle-make-structure-visible/SKILL.md). Use it to expose logical grouping, sequence, and branches in the chosen representation.

For implementation modes, also read [integrate-through-review](../principle-integrate-through-review/SKILL.md) to establish the delivery gate and any explicit local-only exception.

This skill owns the implementation lifecycle for feature, bug-fix, refactor, and review-fix requests. Isolation and incremental checkpoints are defaults, not extra instructions the user must include. Use PR Delivery directly when the user wants existing work published rather than new implementation.

## Choose Workflows

Use the relevant workflow for each part of the request:

- **Implementation or refactor:** `TRACE -> CHOOSE SLICE -> DESIGN SEAM -> PROVE -> IMPLEMENT -> REFACTOR -> VERIFY -> DELIVER`
- **Bug fix:** `TRACE -> REPRODUCE -> FIX ROOT CAUSE -> REGRESSION CHECK -> VERIFY -> DELIVER`
- **Code review:** `SCOPE -> TRACE -> GATHER EVIDENCE -> ASSESS -> REPORT`
- **Design review:** `CONTEXT -> OPTIONS -> TRADE-OFFS -> RECOMMEND`
- **Investigation:** `QUESTION -> BOUNDS -> EXPERIMENT -> ASSESS EVIDENCE -> REVIEW FINDINGS -> DISPOSE OR HAND OFF`

Review modes do not edit code unless the user explicitly asks for changes. Investigation artifacts follow the agreed contract below, not an assumed production-delivery goal. See [review workflows](references/review-workflows.md) for detailed review branches.

## Trace

Before editing or assessing:

- Read and apply [keep-gates-traceable](../principle-keep-gates-traceable/SKILL.md) when establishing blockers or completion gates.
- For tracked work, read and apply [keep-tracking-aligned](../principle-keep-tracking-aligned/SKILL.md). Pass the active issue and conventions to PR Delivery for review-stage updates; retain ownership of subsequent execution changes.
- Trace the affected behavior, callers, and boundaries before choosing a change or making an assessment ([principle-trace-before-changing](../principle-trace-before-changing/SKILL.md)).
- Locate the existing tests and seams.
- When the trace leaves ambiguity, state a reasonable assumption unless the trace principle's ask condition holds.

## Choose a Slice

For an investigation, first read [investigation completion](references/investigations.md), apply its delivery principle, and agree the execution contract. Give intentionally maintained tooling an explicit implementation slice and verification requirements.

Before writing or delegating implementation work, read and apply [isolate-mutable-state](../principle-isolate-mutable-state/SKILL.md). Establish the working environment before editing, not at PR publication time.

Read and apply [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) when choosing implementation, commit, and PR boundaries. Choose one complete slice that proves a behavior before building dependent work:

- A parser handles one new case.
- A user completes one flow.
- An endpoint supports one operation.
- A bug reproduction fails before the fix and passes after it.

## Make Precise, Strategic Changes

Fix the shared cause and update affected surfaces without unrelated cleanup ([principle-smallest-complete-change](../principle-smallest-complete-change/SKILL.md)).

Read [precise change strategy](references/change-strategy.md) when a task crosses multiple files, callers, or boundaries.

## Design the Seam

Before choosing a module or abstraction, read [hide-useful-complexity](../principle-hide-useful-complexity/SKILL.md). Use a seam that hides cohesive complexity or represents real variation.

When changing input validation, authorization, or external-data handling, read [boundary-discipline](../principle-boundary-discipline/SKILL.md) before choosing the fix. Place validation at trust boundaries and keep domain decisions independent of framework and I/O wiring.

Read [module design](references/module-design.md) when choosing module depth, interfaces, or abstractions.

## Prove the Behavior

For non-trivial observable behavior changes with a runnable harness, read [test-observable-behavior](../principle-test-observable-behavior/SKILL.md) and [testing and TDD](references/testing-and-tdd.md) before editing production behavior.

Use this precedence for behavior changes:

1. For a non-trivial behavior change with a runnable harness, first add a public-behavior check and run it against the unchanged implementation. Confirm that it fails because the requested behavior is missing. Only then edit the implementation.
2. For a bug, prove the failure under [prove-bugs-before-fixing](../principle-prove-bugs-before-fixing/SKILL.md) before editing.
3. Otherwise, choose the check under [verify-in-proportion-to-risk](../principle-verify-in-proportion-to-risk/SKILL.md), which covers missing harnesses and trivial changes.

If a failing check cannot be created for a legitimate reason, record the reason and use the nearest reliable check.

## Implement and Refactor

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) when choosing how to execute work. Reuse existing tools and proactively save stable, useful procedures as verified automation within scope; keep contextual decisions with the agent.

Implement the chosen behavior with the least code that passes the current check. Use the **lazy ladder** in [precise change strategy](references/change-strategy.md) to choose what to reuse or add.

Default to no code comments. Read [code documentation](references/code-documentation.md) when creating or reviewing declaration documentation, or considering a new comment.

Refactor only after the behavior is green. Run the relevant check after each behaviorally meaningful or risk-changing refactor increment.

Load [incremental-commits](../incremental-commits/SKILL.md) and checkpoint each verified increment before building on it, subject to the environment's permissions and explicit exceptions. Do this for untracked work too; several checkpoints can contribute to one complete reviewable outcome.

When making a consequential decision that needs durable rationale, read [preserve-decision-context](../principle-preserve-decision-context/SKILL.md) as the decision arises. Preserve its constraints and rationale.

## Verify

Before selecting completion checks, read [verify-in-proportion-to-risk](../principle-verify-in-proportion-to-risk/SKILL.md).

- Keep the system working after every slice.
- Leave one durable runnable check for non-trivial logic when the repository supports it.
- Re-read the resulting implementation and tests under [make-structure-visible](../principle-make-structure-visible/SKILL.md).

Read [verification](references/verification.md) for risk-based escalation guidance. For multi-stage automation, use its stateful-workflow checks to exercise consequential handoffs and distinguish static validity from authenticated runtime evidence.

## Review Evidence

For code review, report evidence-backed findings and distinguish defects from uncertainty and preferences ([principle-evidence-before-verdicts](../principle-evidence-before-verdicts/SKILL.md)). For each finding, state severity, location or scope, concrete impact, recommendation, and confidence.

For design review, compare viable options against the stated constraints, surface trade-offs, make one recommendation, and identify residual uncertainty. Do not turn a review into an implementation plan unless requested.

## Done and Output

For investigations, use the agreed contract and the investigation reference's completion record. Report inconclusive findings honestly; reaching a stopping condition does not mean the uncertainty was resolved. The implementation requirements below apply to maintained changes.

Implementation is locally verified when the requested behavior works, the design is no larger than necessary, relevant checks pass, and deliberate gaps are stated.

When verified increments form one complete reviewable outcome under the sizing principle, hand its commits and evidence to [pr-delivery](../pr-delivery/SKILL.md), unless an explicit local-only or alternative integration instruction applies.

Remain the owner of any requested corrections: trace the finding, implement and check the correction, checkpoint it, then resume publication with the updated evidence. Do not restart the whole task at a skill handoff.

Report completion at the agreed delivery gate under the integration principle.

Review is done when the scope is answered, findings are evidence-backed, trade-offs or recommendations are clear, and residual uncertainty is explicit.

Use only the fields that apply:

```text
Implemented: [behavior or change]
Verified: [checks or evidence]
Delivery: [reached state, PR links or local-only exception, and outstanding gates]
Remaining: [required work, optional follow-up, and residual risk, distinguished if present]
```

```text
Assessment: [review conclusion]
Evidence: [key inspected behavior or checks]
Findings: [ordered findings, if any]
Recommendation: [next decision]
Residual risk: [uncertainty, if any]
```
