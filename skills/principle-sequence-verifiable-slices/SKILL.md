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
- Include the artifacts needed to use and verify the slice.
- Apply the same ordering to tasks, experiments, migrations, and delivery checkpoints. State the verified prerequisite for each dependent outcome; keep independent work independent.
- When a prerequisite changes, recheck the affected outcomes before relying on the sequence again.

**The tests:**

- "What useful outcome can I verify at the end of this slice?" If the answer is only scaffolding for later work, reshape it around one complete path or a concrete assumption it resolves.
- "Can I verify this slice before the next one exists?" If not, include the missing integration or make the dependency explicit.
- "Am I building on an unchecked change?" Verify the current state before adding dependent work.
- "Which expensive assumption could invalidate the later slices?" Prove it in the earliest useful slice.
