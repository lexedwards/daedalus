---
name: principle-test-observable-behavior
description: Apply when writing, changing, or assessing tests. Exercise public behavior and assert observable outcomes against independent expected values.
disable-model-invocation: true
---

# Test Observable Behavior

Call the system through its public interface and assert the outcome its users observe.

- Keep expected values independent of the implementation under test.
- Assert returned results, resulting state, or meaningful external effects.
- Prefer real implementations when they are fast, deterministic, and safe. Use test doubles at external boundaries when needed.
- Avoid assertions about private methods, internal call order, or incidental structure.
- Assert required interactions when they are part of the public contract, not merely because the implementation currently makes those calls.
- Name the behavior and valuable outcome the check establishes.
- Keep checks that can fail for a relevant defect. Rewrite or remove checks that only restate fixtures or implementation details.

**The tests:**

- "What concrete defect would make this assertion fail?" If none can be named, strengthen the assertion or remove the check.
- "Could the implementation and the expected value contain the same mistake?" Replace implementation-derived expectations with an independently established result.
- "Would a behavior-preserving refactor break this test?" If yes, remove its dependence on private structure or incidental calls.
- "If the subject returned a wrong value or skipped its side effect, would this test notice?" Assert the returned result or resulting state directly.
