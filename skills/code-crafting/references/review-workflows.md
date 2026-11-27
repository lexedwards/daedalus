# Review Workflows

Read this reference when the task asks for code review, design review, or an assessment without edits.

## Code Review

Use:

```text
SCOPE -> TRACE -> GATHER EVIDENCE -> ASSESS -> REPORT
```

1. **Scope:** confirm the requested files, change set, behavior, and review criteria.
2. **Trace:** follow the relevant path through callers, shared logic, and boundaries ([principle-trace-before-changing](../../principle-trace-before-changing/SKILL.md)).
3. **Gather evidence:** inspect tests, configuration, error paths, and targeted checks where useful.
4. **Assess:** separate confirmed defects from risks, missing evidence, and style preferences ([principle-evidence-before-verdicts](../../principle-evidence-before-verdicts/SKILL.md)).
5. **Report:** order findings by severity, with the fields that principle specifies.

Do not edit code unless the user asks for changes.

## Design Review

Use:

```text
CONTEXT -> OPTIONS -> TRADE-OFFS -> RECOMMEND
```

1. Establish goals, constraints, assumptions, and non-goals.
2. Identify viable alternatives, including keeping the current design.
3. Compare them on correctness, complexity, safety, operability, and reversibility.
4. Recommend one option and state the residual uncertainty.

Do not present a preferred design as fact when the constraints are unknown.

## Review Output

```text
Assessment: [conclusion]
Evidence: [key facts]
Findings: [ordered findings, if any]
Recommendation: [decision or next action]
Residual risk: [remaining uncertainty, if any]
```
