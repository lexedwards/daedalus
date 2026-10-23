# Verification

Read this reference when deciding how far checks should extend beyond the first targeted result.

## Risk-Based Escalation

Start with the narrowest relevant check and broaden when affected boundaries or evidence warrant it ([principle-verify-in-proportion-to-risk](../../principle-verify-in-proportion-to-risk/SKILL.md)).

| Risk or boundary | Minimum useful verification |
| --- | --- |
| Pure local logic | Focused behavior check |
| Shared module or multiple callers | Focused check plus affected caller or integration checks |
| Public API, schema, configuration, or migration | Boundary checks plus compatible regression coverage |
| Security, authorization, validation, data loss, or critical user flow | Targeted checks plus broader regression or runtime verification |
| Targeted check exposes an unexpected failure | Investigate the shared cause and expand checks to its callers |

The table is a guide, not a reason to skip a relevant existing check.

## Stateful Workflows

For multi-stage automation, verify consequential transitions, not just isolated components. A valid generated file or passing unit test does not show that the next stage can consume it with the permissions and lifecycle state available there.

1. Identify the affected states and transitions, including generated artifacts, credentials or permissions, and persistent state. Cover bootstrap, normal execution, and recovery separately when their paths materially differ; do not enumerate unrelated states.
2. For each consequential handoff, name the starting state, action, expected downstream result, and observable evidence. Run generated outputs through their actual consumers where safe; parsing alone proves only static validity.
3. Use fixtures, temporary repositories, dry runs, or sandboxes to exercise transitions without production side effects. Inspect the resulting state, including partial failure and safe retry when relevant. A dry run that skips authorization or writes does not establish those behaviors.
4. Distinguish local simulation, static validation, and authenticated runtime execution. Live checks require appropriate authorization and a safe environment; do not publish, deploy, or mutate production merely to improve verification coverage.
5. Record each transition exercised, its result, and remaining live-only gaps. Bind readiness claims to that evidence and identify the check or approval still needed for unexercised transitions.

Use a short record such as:

| Transition | Check and expected observation | Evidence or gap |
| --- | --- | --- |
| Empty repository → first generated release PR | Run the generator in a fixture, then load its output with the downstream workflow's configuration loader | Fixture proves artifact compatibility, not forge permissions |
| Existing release → next release PR | Exercise the normal path with prior release state; inspect the resulting version and diff | Record the observed result and revision |
| Failed publication → retry | Simulate failure after generation; retry and check for duplicate or skipped releases | External publication and authenticated retry remain unverified unless exercised safely |

For example, a release generator's unit tests and YAML lint can pass while its generated version key is rejected by the publishing consumer. Passing the generated artifact to that consumer in a fixture catches the broken handoff. It still does not prove that a live token can create the release; report that separately rather than claiming end-to-end readiness.

## No Automated Harness

Use the smallest reliable check available:

- Run the documented command if the repository provides one.
- Exercise the public behavior manually or at the real boundary.
- Inspect the resulting state or output independently.
- Record what was not covered.

Report only checks actually performed and keep unverified behavior explicit ([principle-evidence-before-verdicts](../../principle-evidence-before-verdicts/SKILL.md)).

## Local Verification Check

Before reporting implementation as locally verified, confirm:

- The requested observable behavior works.
- The change is limited to the requested slice.
- Relevant existing checks pass.
- Any unverified risk or deliberate simplification is stated.

This checklist establishes local evidence, not integration completion. Use [integrate-through-review](../../principle-integrate-through-review/SKILL.md) for the delivery gate and [PR Delivery](../../pr-delivery/SKILL.md) for publication.
