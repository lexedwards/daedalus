---
name: principle-smallest-complete-change
description: Apply when sizing a change, fixing a defect, or considering new code. Make the smallest coherent change that satisfies the outcome across affected surfaces.
disable-model-invocation: true
---

# Smallest Complete Change

Make the smallest complete and coherent change that satisfies the requested outcome.

- Fix the cause at the narrowest shared point that resolves the affected behavior.
- Update every affected caller, test, configuration, schema, and boundary needed for consistent behavior.
- For internal replacements, migrate affected callers and remove superseded paths within the change. Preserve compatibility where an existing contract requires it.
- Reuse existing code, the standard library, the native platform, and installed dependencies before adding custom code.
- Remove unnecessary structure where it serves the requested change. Reject speculative abstractions, future-proofing, and unrelated cleanup.
- Preserve validation, security, accessibility, data-loss protection, and clear error handling.
- Stop when the requested outcome is satisfied.

**The tests:**

- "If I remove this part of the diff, does the requested outcome still hold?" If yes, remove it unless it preserves a required constraint.
- "Am I fixing the cause, or adding the same guard to several callers?" Move the correction to the narrowest shared point that resolves the affected behavior and check its consumers.
- "Does this smaller diff leave a caller, configuration, or contract inconsistent?" Complete the change across the affected surfaces.
- "Which present requirement needs this abstraction or dependency?" If none does, omit it.
