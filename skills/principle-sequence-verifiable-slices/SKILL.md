---
name: principle-sequence-verifiable-slices
description: Apply when planning or executing multi-step work, migrations, or delivery. Build complete, useful slices and verify each before building on it.
disable-model-invocation: true
---

# Sequence Verifiable Slices

Order work into small, complete slices that each end in a verifiable, working state.

- Carry each slice through every integration layer needed to deliver its outcome.
- Address expensive unknowns early with the smallest slice that proves the risky path.
- Verify the current slice before building dependent work on it.
- Keep refactoring increments green with the relevant checks.
- Deliver documentation and necessary decision context with the behavior they describe.
- Order commits and tasks around independently complete outcomes and explicit dependencies.

**The tests:**

- "What useful outcome works at the end of this slice?" If the answer is only scaffolding for later work, reshape it around one complete path.
- "Can I verify this slice before the next one exists?" If not, include the missing integration or make the dependency explicit.
- "Am I building on an unchecked change?" Verify the current state before adding dependent work.
- "Which expensive assumption could invalidate the later slices?" Prove it in the earliest useful slice.
