# Verification

Read this reference when deciding how far checks should extend beyond the first targeted result.

## Risk-Based Escalation

Start with the narrowest relevant check. Broaden only when the affected scope or evidence justifies it.

| Risk or boundary | Minimum useful verification |
| --- | --- |
| Pure local logic | Focused behavior check |
| Shared module or multiple callers | Focused check plus affected caller or integration checks |
| Public API, schema, configuration, or migration | Boundary checks plus compatible regression coverage |
| Security, authorization, validation, data loss, or critical user flow | Targeted checks plus broader regression or runtime verification |
| Targeted check exposes an unexpected failure | Investigate the shared cause and expand checks to its callers |

The table is a guide, not a reason to skip a relevant existing check.

## No Automated Harness

Use the smallest reliable check available:

- Run the documented command if the repository provides one.
- Exercise the public behavior manually or at the real boundary.
- Inspect the resulting state or output independently.
- Record what was not covered.

Do not invent a test runner, build step, or passing result.

## Completion Check

Before declaring implementation complete, confirm:

- The requested observable behavior works.
- The change is limited to the requested slice.
- Relevant existing checks pass.
- Any unverified risk or deliberate simplification is stated.
