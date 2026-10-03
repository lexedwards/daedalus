---
name: principle-verify-in-proportion-to-risk
description: Apply when choosing checks, review effort, or completion evidence. Match verification to affected boundaries, consequences, and observed failures.
disable-model-invocation: true
---

# Verify in Proportion to Risk

Use the narrowest reliable check that proves the outcome. Expand verification when the affected scope or evidence warrants it.

- Check the actual behavior and resulting artifact. Do not treat compilation or a worker's self-report as sufficient proof.
- Cover affected callers and integrations when changing shared logic.
- Check public contracts and relevant regressions when changing APIs, schemas, configuration, or migrations.
- Strengthen runtime and regression checks for security, authorization, data integrity, concurrency, and critical user flows.
- Use bounded independent review when the change's substance or risk warrants it. Do not increase effort merely because no findings appeared.
- Prefer an existing relevant check for trivial, low-risk changes. Do not add checks solely for ceremony.
- Use reliable manual or boundary checks when automation is unavailable, and state the remaining gap.

**The tests:**

- "Could these checks pass while the requested behavior is still broken?" Exercise the actual path or inspect the resulting artifact.
- "What callers, contracts, or persistent state can this change affect?" Cover those boundaries rather than relying on the local check alone.
- "What material failure could the next check catch that the current evidence does not?" Run it when that failure is plausible and consequential; stop when further checks add no relevant evidence.
- "Am I expanding review because of a concrete risk, or because no findings appeared?" Keep the agreed effort boundary unless new evidence warrants escalation.
