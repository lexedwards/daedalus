# Testing and TDD

Read this reference when selecting a check, writing a test, or deciding whether a test double is justified.

## Red-Green-Refactor

For a behavior change with a runnable harness:

1. Write one failing check through the public interface.
2. Implement the least code that passes it.
3. Refactor only while the check remains green.
4. Repeat for the next behavior.

For a bug, first reproduce the failure. Preserve the reproduction as a regression check when the harness and failure mode allow it.

If no harness exists, use the smallest durable manual, runtime, or boundary check available and state the testing gap. A trivial, low-risk one-liner may rely on an existing relevant check.

## Choose the Check

- **Unit:** pure logic with no meaningful side effects.
- **Integration:** real boundaries such as APIs, databases, filesystems, queues, or framework wiring.
- **End-to-end or runtime:** critical user flows and cross-system behavior.

Choose the cheapest check that proves the behavior. Escalate when the affected boundary or risk requires it.

## Prefer Real Behavior

Prefer this order when each option is fast, deterministic, and safe:

```text
real implementation -> fake -> stub -> mock
```

- Use real implementations for fast, safe behavior.
- Use fakes for lightweight working replacements such as in-memory repositories.
- Use stubs for canned responses.
- Use mocks sparingly for slow, unsafe, or non-deterministic external side effects.

Do not mock internal collaborators by default.

## Good Checks

- Describe product behavior rather than implementation structure.
- Assert state and outcomes, not private methods or call sequences.
- Use independent expected values rather than recomputing them with the implementation.
- Name the behavior being specified.
- Use Arrange, Act, Assert when it improves clarity.
- Prefer clear, DAMP tests over indirection that hides the scenario.

## Weak Checks

- Assert private methods or internal call order.
- Pass immediately without proving the behavior.
- Reuse the implementation algorithm to calculate the expected value.
- Use vague names such as `works`, `handles errors`, or `test 1`.
