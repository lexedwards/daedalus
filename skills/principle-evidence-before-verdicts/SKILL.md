---
name: principle-evidence-before-verdicts
description: Apply when investigating, reviewing, or reporting conclusions. Support verdicts with inspected evidence and distinguish defects from uncertainty and preferences.
disable-model-invocation: true
---

# Evidence Before Verdicts

Support each conclusion with inspected evidence. Keep uncertainty explicit.

- Ground a defect finding in a concrete reachable trigger, affected behavior, and meaningful impact.
- Check whether tests, types, contracts, or verification results disprove a suspicion.
- Distinguish confirmed defects, missing evidence, hypotheses, and preferences.
- Do not recommend a correction as necessary until the evidence establishes the defect.
- Treat worker reports and suspected counterexamples as claims to validate.
- When assessing work, look for proof that it does what it claims: executed checks, observed behavior, or tests that fail without the change. Report a claim without proof as a finding; do not accept it.
- Accept no findings as a valid result. Do not invent defects or expand the scope to justify a review.
- State what was verified and what remains unknown. Do not present an unperformed check as passing.

## Reporting Findings

Each finding states:

- **Severity:** by user impact, correctness, security, data loss, or operational risk.
- **Location:** file and line, symbol, or precise scope.
- **Trigger and impact:** the reachable input or state, and what fails under it.
- **Evidence:** the inspected behavior or check that supports it.
- **Correction:** the smallest root-cause fix or next investigation, without writing the patch.

When a defect is suspected but not proven, split by evidence. Partial evidence becomes a low-confidence finding that says what would confirm it. No evidence either way becomes an open question, not a finding.

Report low-severity findings briefly, in a group separate from the others. They never block.

The consumer sets the output layout. This principle owns only what each finding contains.

**The tests:**

- "What reachable input or state makes this claim true?" Identify the trigger and trace its consequence before reporting a defect.
- "What evidence would disprove my conclusion, and have I checked it?" Inspect the relevant contract, guarantee, or counterexample.
- "Does this observation establish the claim, or could it reflect a different cause or a proxy?" Check the connection before drawing the conclusion.
- "Am I reporting a failure, missing evidence, or a preference?" Label it accurately and do not promote uncertainty into a defect.
- "Would I make this claim without the worker's summary?" Validate it against the actual target and report only what the evidence supports.
