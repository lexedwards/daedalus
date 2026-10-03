---
name: principle-preserve-decision-context
description: Apply when making consequential decisions or documenting changed behavior. Preserve non-obvious rationale, constraints, and rejected alternatives for future maintainers.
disable-model-invocation: true
---

# Preserve Decision Context

Preserve the consequential, non-obvious rationale future maintainers need to understand a decision.

- Record the chosen direction, the constraints that shaped it, and meaningful alternatives that were rejected.
- Use ADRs for decisions that are hard to reverse, require context to understand, and had genuine alternatives.
- Keep one decision per ADR. Supersede existing decisions explicitly rather than deleting their history.
- Keep durable rationale in maintained documentation alongside the system it explains.
- Reference the authoritative decision instead of duplicating it across documents.
- Document only what is known. Do not invent motivations or restate obvious code.

**The tests:**

- "Could the next maintainer undo this choice because its constraint is invisible?" Record the constraint and the rationale in the maintained source of context.
- "Was this decision hard to reverse, context-dependent, and made among genuine alternatives?" If all three hold, use an ADR. Otherwise keep the rationale at the appropriate local scope.
- "Does this document add a reason the code cannot show?" If not, remove the restatement.
- "Is this rationale already recorded elsewhere?" Reference the authoritative record; supersede it explicitly if the decision has changed.
