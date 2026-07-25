# Precise Change Strategy

Read this reference when a change spans multiple files, callers, modules, or system boundaries.

## Define the Smallest Complete Change

The right target is not the fewest changed lines. It is the smallest coherent slice that:

- Satisfies one observable requirement.
- Fixes the root cause rather than a visible symptom.
- Preserves relevant validation, security, accessibility, error, and data-loss behavior.
- Wires all affected callers and boundaries consistently.
- Leaves the surrounding system easy to understand and review.

## Before Editing

- State the requested behavior and the non-goals.
- Trace the real path end to end, including sibling callers and shared helpers.
- Identify the riskiest unknown and prove that path first.
- Find existing conventions, interfaces, helpers, tests, and dependencies to reuse.
- Identify the smallest set of files and public surfaces that must change.

## While Editing

- Make surgical edits at the shared root cause.
- Keep one purpose per slice and avoid unrelated cleanup or modernization.
- Update every affected caller, test, configuration, schema, documentation, or boundary required for consistency.
- Prefer explicit data flow and existing seams over speculative abstractions.
- Keep error handling and trust-boundary validation visible.
- Do not hide uncertainty behind broad fallbacks or silent defaults.

## The Lazy Ladder

After tracing the real flow, ask these questions in order:

1. Does this need to exist at all?
2. Is it already in the codebase?
3. Does the standard library solve it?
4. Does the native platform solve it?
5. Does an already-installed dependency solve it?
6. Can it be one straightforward line?
7. Only then, add the minimum custom code that works.

The ladder prevents speculative code, not necessary design. Stop at the first option that correctly satisfies the behavior and its constraints.

## Before Finishing

- Inspect the complete diff for accidental scope expansion.
- Confirm the change is complete across relevant callers and boundaries.
- Run the narrowest behavior check first, then escalate according to risk.
- Record deliberate simplifications, unverified areas, and residual risks.
