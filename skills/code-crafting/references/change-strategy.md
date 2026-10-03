# Precise Change Strategy

Read this reference when a change spans multiple files, callers, modules, or system boundaries.

## Before Editing

- State the requested behavior and the non-goals.
- Trace shared helpers and sibling callers to locate the change ([principle-trace-before-changing](../../principle-trace-before-changing/SKILL.md)).
- Prove the riskiest unknown in the earliest useful slice ([principle-sequence-verifiable-slices](../../principle-sequence-verifiable-slices/SKILL.md)).
- Identify the smallest set of files and public surfaces that must change.

## While Editing

- Fix the shared cause and keep affected surfaces consistent ([principle-smallest-complete-change](../../principle-smallest-complete-change/SKILL.md)).
- Keep validation and error handling at the boundaries that own them ([principle-boundary-discipline](../../principle-boundary-discipline/SKILL.md)).

## The Lazy Ladder

After tracing the real flow, choose the first option that satisfies the behavior and its constraints ([principle-smallest-complete-change](../../principle-smallest-complete-change/SKILL.md)):

1. Does this need to exist at all?
2. Is it already in the codebase?
3. Does the standard library solve it?
4. Does the native platform solve it?
5. Does an already-installed dependency solve it?
6. Can it be one straightforward line?
7. Only then, add the minimum custom code that works.

## Before Finishing

- Inspect the complete diff for accidental scope expansion.
- Confirm the change is complete across relevant callers and boundaries.
- Run focused checks and expand them where the affected scope warrants it ([principle-verify-in-proportion-to-risk](../../principle-verify-in-proportion-to-risk/SKILL.md)).
- Record deliberate simplifications, unverified areas, and residual risks.
