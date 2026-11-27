---
name: principle-prove-bugs-before-fixing
description: Apply when a bug or defect is reported and before any fix work starts. Prove the faulty behavior first; an unproven report is a claim, not a defect.
disable-model-invocation: true
---

# Prove Bugs Before Fixing

A bug report is a claim. Prove it before changing anything, because a fix for an unproven bug can break correct behavior or fix the wrong cause.

- Before editing code for a reported bug, obtain proof of the faulty behavior: a reproduction, a check that fails against the unchanged code, or directly observed evidence such as logs, output, or state.
- Prove the reported behavior, not a nearby one. The proof must show the symptom the report describes, under the conditions it describes.
- Separate the observed failure from its suspected cause. Proof that the symptom exists does not establish which cause produces it.
- When the bug cannot be proven, do not fix it speculatively. Report what was tried, what was observed, and what would prove it, then ask how to proceed.
- Keep the proof as a regression check when the harness and failure mode allow it. The fix is done when that proof passes.

**The tests:**

- "What did I observe that shows this bug exists?" If the answer is the report itself, prove it before editing.
- "Does my proof fail for the reason the report describes?" A failure for another reason proves a different bug.
- "Would my proof pass without the fix?" If so, it does not show the fix worked.
