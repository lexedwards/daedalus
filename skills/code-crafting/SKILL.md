---
name: code-crafting
description: Guide pragmatic coding with minimal design, cohesive modules, test-driven behavior changes, vertical slices, root-cause fixes, and disciplined verification. Use when implementing, fixing, refactoring, or reviewing code.
---

# Code Crafting

Build the smallest correct change with one clear purpose, proven through behavior-focused checks, delivered in working vertical slices.

## When To Use

Use this skill for coding tasks that change behavior, structure, or risk:

- Implementing features.
- Fixing bugs.
- Refactoring code.
- Reviewing design choices.
- Choosing where logic should live.
- Deciding how much testing is enough.

Do not use it for pure documentation or static content changes unless the user asks for engineering guidance.

## Core Principles

- Understand the real code path before changing it.
- Prefer the least code that correctly satisfies the requirement.
- Design small, cohesive modules that do one thing well.
- Use deep modules only for directly-related business logic, never as god modules.
- Test behavior through public interfaces, not implementation details.
- Deliver one vertical slice at a time.
- Fix root causes once at the shared point, not symptoms across callers.
- Refactor only when checks are green.
- Stop when the requirement is satisfied.

## Craft Loop

```text
TRACE -> CHOOSE SLICE -> DESIGN LOCAL SEAM -> RED -> GREEN -> REFACTOR -> VERIFY
```

## 1. Trace

Before editing:

- Read the path end to end.
- Identify the observable behavior.
- Find existing helpers, modules, seams, tests, and callers.
- Explore for existing strong conventions to follow, and any clear reason to diverge.
- For bugs, inspect sibling callers and shared functions before patching the reported path.
- Ask one short question if the intended behavior or public interface is unclear.

Never use laziness as a substitute for understanding. The smallest change in the wrong place is just another bug.

## 2. Choose Slice

Choose the smallest complete vertical slice that proves one behavior.

Good slices:

- A parser handles one new case.
- A user completes one flow.
- An endpoint supports one operation.
- A bug reproduction fails before the fix and passes after.

Avoid horizontal work such as writing all tests, building all models, or creating all scaffolding before anything works.

Use risk-first slicing when the unknown is expensive. Prove the risky path before polishing safe parts.

## 3. Design Local Seam

Use this vocabulary:

- **Module**: anything with an interface and implementation.
- **Interface**: everything callers must know to use the module correctly, including types, invariants, ordering constraints, error modes, configuration, and performance expectations.
- **Seam**: where behavior can vary without editing the caller.
- **Adapter**: a concrete implementation at a seam.
- **Depth**: leverage gained when a small interface hides useful cohesive behavior.

Good module design is Unix-like:

```text
Do one thing.
Do it well.
Expose the smallest useful interface.
Hide only the complexity that belongs to that one thing.
```

Prefer:

- Plain functions before classes.
- Existing interfaces before new ones.
- Explicit data flow over hidden orchestration.
- Composition of small modules over one broad module.
- Deep modules only around one cohesive business concern.

Avoid:

- God modules.
- Manager objects that coordinate everything.
- Utility dumping grounds.
- Pass-through layers.
- Interfaces with one implementation unless the seam is already real.
- Abstractions created for hypothetical future variation.

Before adding or expanding a seam, ask:

- Does this behavior vary for a real reason?
- Are the rules directly related?
- Would this reduce caller knowledge without hiding unrelated work?
- Would deleting this module spread the same cohesive logic across callers?
- Am I simplifying the system, or just moving complexity into a larger box?

## 4. Red

For behavior changes, write one failing check before implementation when practical.

The check should:

- Use the public interface.
- Assert outcomes, not internal calls.
- Use independent expected values, not values recomputed with the implementation logic.
- Read like a specification.
- Fail before the implementation or bug fix.

For bug fixes, use the Prove-It Pattern:

```text
reproduce bug -> confirm failure -> fix root cause -> confirm pass -> run relevant regression checks
```

Do not write all tests first and then all implementation. Use one test, one implementation, one verification loop.

## 5. Green

Write the least code that passes the current check.

Use the lazy ladder after tracing the real flow:

1. Does this need to exist at all?
2. Is it already in the codebase?
3. Does the standard library solve it?
4. Does the native platform solve it?
5. Does an already-installed dependency solve it?
6. Can it be one straightforward line?
7. Only then, add the minimum custom code that works.

Do not add speculative abstractions, future-proofing, generic helpers, broad modules, or new dependencies.

Never simplify away input validation at trust boundaries, security, accessibility basics, data-loss prevention, clear error handling, or explicitly requested behavior.

## 6. Refactor

Refactor only after checks pass.

Prefer:

- Less code.
- Clearer names.
- Smaller interfaces.
- More cohesive modules.
- Removing pass-through layers.
- Moving directly-related business rules behind one local seam.

Never refactor while red. Run relevant checks after each refactor step.

## Testing Guidance

Choose the cheapest check that proves the behavior.

Use the test pyramid as a cost guide:

- Unit tests for pure logic with no side effects.
- Integration tests for real boundaries such as APIs, databases, filesystems, queues, or framework wiring.
- End-to-end or runtime checks for critical user flows.

Prefer real behavior over simulated behavior:

```text
real implementation -> fake -> stub -> mock
```

- Use real implementations when they are fast, deterministic, and safe.
- Use fakes for lightweight working replacements, such as in-memory repositories.
- Use stubs for canned responses.
- Use mocks sparingly, mainly for external side effects that are slow, unsafe, or non-deterministic.

Good tests:

- Test state and outcomes, not internal interactions.
- Use Arrange, Act, Assert structure when it improves clarity.
- Name the behavior being specified.
- Keep expected values independent from the implementation.
- Prefer DAMP clarity over DRY indirection.

Bad tests:

- Assert private methods or call sequences.
- Pass immediately without proving anything changed.
- Recompute expected values with the same logic under test.
- Mock internal collaborators by default.
- Use vague names like `works`, `handles errors`, or `test 1`.

## Scope Discipline

Do not:

- Clean up unrelated code while passing through.
- Modernize nearby files.
- Add unrequested features.
- Create utilities for one use.
- Mix refactors with behavior changes unless required for the slice.
- Repeat the same verification command on unchanged code just for reassurance.

Mention unrelated improvements separately instead of doing them.

## Verification

After each slice:

- Run the narrowest relevant check first.
- Run broader verification before declaring done.
- Keep the system working after every increment.
- If no automated test harness exists, perform the smallest reliable manual check and state the gap.

Non-trivial logic should leave behind one durable runnable check. Trivial one-liners may not need a new test.

## Done Means

A change is done when:

- The requested behavior works.
- The design does one thing well.
- The interface is no larger than necessary.
- The behavior is proven through a test or durable check.
- Relevant existing checks pass.
- Any deliberate simplification or testing gap is stated clearly.

## Output Style

Lead with the change, then summarize briefly:

```text
Implemented: [behavior]
Verified: [checks run]
Skipped: [only if relevant], add when [condition]
```
