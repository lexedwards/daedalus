---
name: code-crafting
description: Guide pragmatic implementation, bug fixing, refactoring, and code or design review with minimal design, behavior-focused checks, and risk-based verification.
---

# Code Crafting

Build the smallest correct change with one clear purpose, proven through observable behavior and delivered in a working slice. When no change is requested, produce an evidence-based assessment instead of forcing an implementation workflow.

## When To Use

Use this skill for:

- Implementing features.
- Fixing bugs.
- Refactoring code.
- Reviewing code or design choices.
- Choosing where logic should live.
- Deciding how much testing or verification is enough.

## Start Here

Before inspecting project files, identify every work mode present in the request, including review subtasks. Use the read tool to load the union of their starting principles. Resolve paths from this skill's base directory. Links name files to read; their contents are not loaded with this skill.

- Implementation, bug fix, or refactor: read [trace-before-changing](../principle-trace-before-changing/SKILL.md) and [smallest-complete-change](../principle-smallest-complete-change/SKILL.md).
- Code or design review: read [trace-before-changing](../principle-trace-before-changing/SKILL.md) and [evidence-before-verdicts](../principle-evidence-before-verdicts/SKILL.md).

Read each starting principle once.

## Choose Workflows

Use the relevant workflow for each part of the request:

- **Implementation or refactor:** `TRACE -> CHOOSE SLICE -> DESIGN SEAM -> PROVE -> IMPLEMENT -> REFACTOR -> VERIFY`
- **Bug fix:** `TRACE -> REPRODUCE -> FIX ROOT CAUSE -> REGRESSION CHECK -> VERIFY`
- **Code review:** `SCOPE -> TRACE -> GATHER EVIDENCE -> ASSESS -> REPORT`
- **Design review:** `CONTEXT -> OPTIONS -> TRADE-OFFS -> RECOMMEND`

Review modes do not edit code unless the user explicitly asks for changes. See [review workflows](references/review-workflows.md) for detailed branches.

## Trace

Before editing or assessing:

- Trace the affected behavior, callers, and boundaries before choosing a change or making an assessment ([principle-trace-before-changing](../principle-trace-before-changing/SKILL.md)).
- Locate the existing tests and seams. For bugs, inspect sibling callers and shared functions before choosing the fix location.
- Ask one short question only when ambiguity changes the public behavior or risk; otherwise state a reasonable assumption.

## Choose a Slice

When planning dependent implementation steps, read [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) before sequencing the work. Choose one complete slice that proves a behavior before building dependent work:

- A parser handles one new case.
- A user completes one flow.
- An endpoint supports one operation.
- A bug reproduction fails before the fix and passes after it.

Prove expensive unknowns in the earliest useful slice.

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
2. For a bug, reproduce the failure and preserve it as a regression check when practical.
3. If no harness exists, use the cheapest durable manual, runtime, or boundary check available and state the gap.
4. For a genuinely trivial, low-risk one-liner, an existing relevant check may be enough; do not add a test solely for ceremony.

If a failing check cannot be created for a legitimate reason, record the reason and use the nearest reliable check.

## Implement and Refactor

Implement the chosen behavior with the least code that passes the current check. Use the **lazy ladder** in [precise change strategy](references/change-strategy.md) to choose what to reuse or add.

Do not add speculative exports or new dependencies.

Refactor only after the behavior is green. Run the relevant check after each behaviorally meaningful or risk-changing refactor increment.

When making a consequential decision that needs durable rationale, read [preserve-decision-context](../principle-preserve-decision-context/SKILL.md) as the decision arises. Preserve its constraints and rationale.

## Verify

Before selecting completion checks, read [verify-in-proportion-to-risk](../principle-verify-in-proportion-to-risk/SKILL.md).

- Run focused checks first and expand them to cover affected boundaries and material risks.
- Keep the system working after every slice.
- Leave one durable runnable check for non-trivial logic when the repository supports it.
- If no automated harness exists, perform the smallest reliable manual check and state the gap.

Read [verification](references/verification.md) for risk-based escalation guidance.

## Review Evidence

For code review, report evidence-backed findings and distinguish defects from uncertainty and preferences ([principle-evidence-before-verdicts](../principle-evidence-before-verdicts/SKILL.md)). For each finding, state severity, location or scope, concrete impact, recommendation, and confidence.

For design review, compare viable options against the stated constraints, surface trade-offs, make one recommendation, and identify residual uncertainty. Do not turn a review into an implementation plan unless requested.

## Done and Output

Implementation is done when the requested behavior works, the design is no larger than necessary, relevant checks pass, and deliberate gaps are stated.

Review is done when the scope is answered, findings are evidence-backed, trade-offs or recommendations are clear, and residual uncertainty is explicit.

Use only the fields that apply:

```text
Implemented: [behavior or change]
Verified: [checks or evidence]
Remaining: [gap or risk, if any]
```

```text
Assessment: [review conclusion]
Evidence: [key inspected behavior or checks]
Findings: [ordered findings, if any]
Recommendation: [next decision]
Residual risk: [uncertainty, if any]
```
