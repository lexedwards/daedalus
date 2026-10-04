# Testing and TDD

Read this reference when selecting a check, writing a test, or deciding whether a test double is justified.

## Red-Green-Refactor

For a behavior change with a runnable harness:

1. Write one failing check through the public interface ([principle-test-observable-behavior](../../principle-test-observable-behavior/SKILL.md)).
2. Implement the least code that passes it.
3. Refactor only while the check remains green.
4. Repeat for the next behavior.

For a bug, first reproduce the failure. Preserve the reproduction as a regression check when the harness and failure mode allow it.

If no harness exists, use the smallest durable manual, runtime, or boundary check available and state the testing gap. A trivial, low-risk one-liner may rely on an existing relevant check.

## Choose the Check

- **Unit:** pure logic with no meaningful side effects.
- **Integration:** real boundaries such as APIs, databases, filesystems, queues, or framework wiring.
- **End-to-end or runtime:** critical user flows and cross-system behavior.

Choose the cheapest check that proves the behavior, and escalate when the affected boundary or risk requires it ([principle-verify-in-proportion-to-risk](../../principle-verify-in-proportion-to-risk/SKILL.md)).

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

## Readable Checks

- Structure test descriptions so the suite names the capability or context and
  each test names the valuable observable outcome; together they should read as
  a behavioral specification. Prefer concise behavioral wording. Use
  Given/When/Then for scenarios with meaningful context, not as mandatory
  ceremony. Capture enduring user or system value in the test name when useful,
  but keep historical implementation rationale in documentation or ADRs
  ([principle-preserve-decision-context](../../principle-preserve-decision-context/SKILL.md)).
- Use Arrange, Act, Assert when it improves clarity.
- Prefer clear, DAMP tests over indirection that hides the scenario.
