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

## Choose a Mode

Select the mode before doing detailed work:

- **Implementation or refactor:** `TRACE -> CHOOSE SLICE -> DESIGN SEAM -> PROVE -> IMPLEMENT -> REFACTOR -> VERIFY`
- **Bug fix:** `TRACE -> REPRODUCE -> FIX ROOT CAUSE -> REGRESSION CHECK -> VERIFY`
- **Code review:** `SCOPE -> TRACE -> GATHER EVIDENCE -> ASSESS -> REPORT`
- **Design review:** `CONTEXT -> OPTIONS -> TRADE-OFFS -> RECOMMEND`

Review modes do not edit code unless the user explicitly asks for changes. See [review workflows](references/review-workflows.md) for detailed branches.

## Core Principles

- Trace the real path before changing or judging it.
- Use the least code that correctly satisfies the requirement.
- Let one cohesive module hide useful complexity, but do not create abstractions for hypothetical variation.
- Test observable behavior through public interfaces, not implementation details.
- Deliver one complete vertical slice at a time and fix shared root causes at their shared point.
- Refactor only after relevant checks are green.
- Preserve validation, security, accessibility, data-loss prevention, and clear error handling.
- Stop when the requested outcome is satisfied.

## Trace

Before editing or assessing:

- Read the relevant path end to end.
- Identify observable behavior, callers, helpers, seams, tests, and boundaries.
- Check existing conventions and constraints before introducing a new pattern.
- For bugs, inspect sibling callers and shared functions before patching the reported path.
- Ask one short question only when ambiguity changes the public behavior or risk; otherwise state a reasonable assumption.

Never use laziness as a substitute for understanding. The smallest change in the wrong place is still a bug.

## Choose a Slice

For implementation work, choose the smallest complete slice that proves one behavior:

- A parser handles one new case.
- A user completes one flow.
- An endpoint supports one operation.
- A bug reproduction fails before the fix and passes after it.

Prefer risk-first slicing when an unknown is expensive. Avoid building all tests, models, or scaffolding before one useful path works.

## Make Precise, Strategic Changes

The goal is not the fewest changed lines; it is the smallest complete and coherent change. Before and during implementation:

- Understand the real path, affected callers, and shared boundaries before editing.
- Fix the root cause at the shared point instead of patching symptoms in several callers.
- Touch every relevant surface needed to keep behavior consistent, but do not broaden the task with unrelated cleanup or modernization.
- Reuse existing helpers, interfaces, conventions, and dependencies before creating new ones.
- Keep the change easy to review: one purpose, explicit scope, clear names, and no speculative future-proofing.

Read [precise change strategy](references/change-strategy.md) when a task crosses multiple files, callers, or boundaries.

## Design the Seam

Use a local seam only when it reduces caller knowledge around one cohesive concern or represents real variation. Prefer existing interfaces, plain functions, explicit data flow, and composition before adding classes, managers, adapters, or broad utilities.

Read [module design](references/module-design.md) when choosing module depth, interfaces, or abstractions.

## Prove the Behavior

Use this precedence for behavior changes:

1. If a runnable test harness exists, write one failing public-behavior check before implementation.
2. For a bug, reproduce the failure and preserve it as a regression check when practical.
3. If no harness exists, use the cheapest durable manual, runtime, or boundary check available and state the gap.
4. For a genuinely trivial, low-risk one-liner, an existing relevant check may be enough; do not add a test solely for ceremony.

If a failing check cannot be created for a legitimate reason, record the reason and use the nearest reliable check. Keep expected values independent from the implementation.

Read [testing and TDD](references/testing-and-tdd.md) for test selection, test doubles, and examples.

## Implement and Refactor

Write the least code that passes the current check, applying the **lazy ladder** after tracing the real flow: prefer existing code, the standard library, the native platform, and already-installed dependencies before adding minimal custom code, and stop at the first option that correctly satisfies the behavior. See [precise change strategy](references/change-strategy.md) for the full ladder.

Do not add speculative exports, future-proofing, generic helpers, unrelated cleanup, or new dependencies. Never trade away trust-boundary validation, security, accessibility, data-loss protection, error handling, or explicitly requested behavior.

Refactor only after the behavior is green. Prefer less code, clearer names, smaller interfaces, cohesive modules, and removal of pass-through layers. Run the relevant check after each behaviorally meaningful or risk-changing refactor increment.

## Verify

- Run the narrowest relevant check first.
- Broaden verification when the change crosses a shared boundary, public API, schema, configuration, migration, security-sensitive path, or when targeted checks reveal wider risk.
- Keep the system working after every slice.
- Leave one durable runnable check for non-trivial logic when the repository supports it.
- If no automated harness exists, perform the smallest reliable manual check and state the gap.

Read [verification](references/verification.md) for risk-based escalation guidance.

## Review Evidence

For code review, report only findings supported by the inspected code or checks. For each finding, state severity, location or scope, concrete impact, recommendation, and confidence. Distinguish a confirmed defect from missing evidence or a preference.

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
