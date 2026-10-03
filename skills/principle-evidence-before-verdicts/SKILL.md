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
- Recommend the smallest correction supported by the finding.
- Treat worker reports and suspected counterexamples as claims to validate.
- Accept no findings as a valid result. Do not invent defects or expand the scope to justify a review.
- State what was verified and what remains unknown. Do not present an unperformed check as passing.

**The tests:**

- "What reachable input or state makes this claim true?" Identify the trigger and trace its consequence before reporting a defect.
- "What evidence would disprove my conclusion, and have I checked it?" Inspect the relevant contract, guarantee, or counterexample.
- "Am I reporting a failure, missing evidence, or a preference?" Label it accurately and do not promote uncertainty into a defect.
- "Would I make this claim without the worker's summary?" Validate it against the actual target and report only what the evidence supports.
