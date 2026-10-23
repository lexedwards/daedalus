---
name: principle-smallest-complete-change
description: Apply when sizing a change, fixing a defect, or choosing whether to build, adopt, or extend a solution. Make the smallest coherent change that satisfies the outcome across affected surfaces.
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
- Size review boundaries around useful outcomes, not line counts or a target number of PRs. Prefer several small, complete PRs to one large PR, but keep inseparable integration together. A dependent PR must deliver a useful, verifiable increment relative to its declared base without needing its descendants.

**The tests:**

- "If I remove this part of the diff, does the requested outcome still hold?" If yes, remove it unless it preserves a required constraint.
- "Am I fixing the cause, or adding the same guard to several callers?" Move the correction to the narrowest shared point that resolves the affected behavior and check its consumers.
- "Does this smaller diff leave a caller, configuration, or contract inconsistent?" Complete the change across the affected surfaces.
- "Which present requirement needs this abstraction or dependency?" If none does, omit it.
- "Could an existing solution meet the material requirements, and what evidence supports building instead?" Compare proportionately before committing to substantial custom work.
- "Does this review boundary deliver a useful outcome, or only scaffolding for a later change?" Complete the outcome rather than optimizing for a smaller diff.

## Build, Adopt, or Extend

Consider existing solutions before committing to custom work. At implementation scale, reuse local code and platform capabilities as above. For a new product, replacement, or substantial standalone capability, compare building, adopting, and extending plausible existing solutions before substantial implementation. Routine fixes and incremental changes do not need an alternatives survey.

- Compare against the underlying need and material requirements, not feature counts. Include workflows, integrations, data control, migration, licensing, maintenance, and operating cost where material. Do not invent alternatives to fill a comparison.
- Bound research to the decision with a small shortlist, time budget, or stopping condition. Reuse an existing assessment while its requirements and evidence remain adequate; stop when the evidence is sufficient.
- Separate documented claims, behavior actually verified, and unresolved uncertainty. Check consequential differentiators with focused trials when practical; record what could not be checked.
- Recommend a direction with its evidence and trade-offs. Respect explicit reasons to build, including learning or experimentation; a suitable existing product does not automatically override those goals.
- Resolve consequential unverified assumptions before dependent implementation, or use a bounded investigation rather than treating them as facts. Reopen an assessment only when changed requirements, stale evidence, or consequential new uncertainty warrants it.
