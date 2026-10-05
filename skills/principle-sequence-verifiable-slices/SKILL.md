---
name: principle-sequence-verifiable-slices
description: Apply when planning or executing multi-step work, migrations, or delivery. Build complete, useful slices and verify each before building on it.
disable-model-invocation: true
---

# Sequence Verifiable Slices

Order work into small, complete slices that each end in a verifiable, working state.

A slice may deliver working behavior, a behavior-preserving refactor, or a verified answer to a risky assumption. It must not rely on unfinished dependent work.

- Carry each slice through every integration layer needed to deliver its outcome.
- Address expensive unknowns early with the smallest slice that proves the risky path.
- Verify the current slice before building dependent work on it.
- Keep refactoring increments green with the relevant checks.
- Include the artifacts needed to use and verify the slice.
- Order commits and tasks around independently complete outcomes and explicit dependencies.

## Incremental Delivery

- Start with the smallest useful behavior and grow its expectations and implementation together through passing commits. Run a new behavior check against the unchanged implementation first when practical, but deliver the check and implementation as one working increment, not an intentionally failing checkpoint.
- Treat commits as verification checkpoints and PRs as review and integration boundaries. A narrow PR may contain several passing increments that serve one coherent outcome.
- Prefer multiple small, complete PRs to one large PR. For dependent work, prefer a short stack of reviewable PRs to a continually growing branch. Independent work branches from the repository's default branch rather than acquiring artificial dependencies.
- Verify each PR against its actual base. The root targets the default branch; a stack child targets its parent branch and includes only its own incremental diff.
- Publish verified slices when authorized rather than holding every outcome until the whole effort is complete. Integrate dependent PRs bottom-up; after a parent changes or merges, reconcile descendants and refresh affected verification before proceeding.

**The tests:**

- "What useful outcome can I verify at the end of this slice?" If the answer is only scaffolding for later work, reshape it around one complete path or a concrete assumption it resolves.
- "Can I verify this slice before the next one exists?" If not, include the missing integration or make the dependency explicit.
- "Am I building on an unchecked change?" Verify the current state before adding dependent work.
- "Which expensive assumption could invalidate the later slices?" Prove it in the earliest useful slice.
- "Can a reviewer understand and check this PR without its descendants?" If not, reshape the boundary or include the missing integration.
