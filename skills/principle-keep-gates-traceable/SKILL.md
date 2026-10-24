---
name: principle-keep-gates-traceable
description: Apply when proposing blockers, planning work, or reporting completion. Require only gates traceable to accepted requirements or demonstrated safety dependencies.
disable-model-invocation: true
---

# Keep Gates Traceable

Make work mandatory only when it satisfies an accepted requirement or protects a demonstrated safety dependency; keep recommendations optional.

This governs obligation, not change size or verification technique. Scope belongs to [Smallest Complete Change](../principle-smallest-complete-change/SKILL.md); checks belong to [Verify in Proportion to Risk](../principle-verify-in-proportion-to-risk/SKILL.md).

- For each proposed blocker, name the accepted requirement or concrete safety dependency and explain how leaving it unresolved prevents the agreed outcome.
- Confirm behavior-changing restrictions and defaults before treating them as requirements. Broad goals do not authorize arbitrary policies.
- Explain newly discovered safety dependencies and escalate their scope or authorization implications before affected work proceeds. Do not silently omit a real dependency or expand the task to resolve it.
- Let users defer optional choices without accepting a new blocker. Record required work, optional follow-up, and residual risk separately in plans and completion reports.

**The tests:**

- "Which accepted requirement or demonstrated safety dependency does this gate protect?" Without one, present it as a recommendation, not unfinished mandatory work.
- "Can the agreed outcome safely hold without this decision?" If yes, permit deferral.
- "Did this new risk change what is safe to do?" Explain the dependency and seek a scope decision rather than hiding it or assuming expanded authority.
