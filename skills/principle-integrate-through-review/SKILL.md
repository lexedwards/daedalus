---
name: principle-integrate-through-review
description: Apply when delivering implementation work or deciding whether it is complete. Integrate changes through PRs with central checks and independent review rather than equating local verification with delivery.
disable-model-invocation: true
---

# Integrate Through Review

Use a PR as the integration boundary for implementation work. Local success is evidence to bring to review, not a substitute for review.

- Deliver through PRs by default unless the user or project explicitly requires local-only work or another integration process.
- Keep local verification, central CI, and independent review distinct. Local checks establish the prepared change; CI checks the shared integration context; an external reviewer challenges the change independently of its author.
- Do not infer publication or merge authority from the default method. Honor repository controls and explicit authorization; when publication is blocked, preserve the verified work and report what remains.
- Report delivery states separately: locally verified, PR opened, merge-ready, and merged. Opening a PR is not approval. Merge-ready requires current required checks, independent review, and resolved blockers under the project's policy.
- Bind evidence to the reviewed revision and its base. Changed code or dependency context may invalidate earlier checks or approval; refresh affected evidence and do not claim old results cover the new state.
- Mark tracked work complete only at its agreed delivery gate, recording a local-only exception rather than silently treating it as integrated.

**The tests:**

- "Who has checked this independently of the author?" A local self-check or PR link alone does not answer that question.
- "Which revision and integration context does this evidence describe?" Unknown or stale evidence cannot establish readiness.
- "Am I describing implementation, publication, readiness, or integration?" Report the state actually reached and the gate still pending.
