# Investigation Completion

Before defining an investigation's deliverable, read and apply [match-delivery-to-task](../../principle-match-delivery-to-task/SKILL.md). Use the contract below to make its execution and handoff concrete.

## Agree Before Execution

Establish a short contract with the user before running experiments:

- **Question and decision:** what uncertainty must be resolved, and what decision will the evidence support?
- **Bounds:** permitted systems, data, side effects, time or effort budget, and stopping condition. Preserve authorization and safety boundaries even for disposable code.
- **Evidence:** observations and comparisons needed to support a conclusion, including how to recognize an inconclusive result.
- **Completion:** who reviews the findings, where they are recorded, and what constitutes acceptance. A reviewed report, issue comment, or reference artifact can be the delivery gate without a production merge.
- **Artifact disposition:** which artifacts will be discarded, retained as non-maintained references, or integrated as maintained tooling. Do not assume all experimental code must be merged or rejected. Confirm changes to this agreement before expanding the work.

Use isolated state for experiments ([isolate-mutable-state](../../principle-isolate-mutable-state/SKILL.md)). Keep useful reproduction instructions and sanitized evidence even when the executable artifacts are disposable. Discard only artifacts owned by this investigation and authorized for removal; do not delete pre-existing work or publish sensitive evidence.

## Findings and Handoff

Record the question, conclusion or remaining uncertainty, supporting evidence, constraints, decisions, limitations, and recommendation. Separate observed results from assumptions and explain what the experiment does not establish. Include the artifact disposition and the review outcome or pending reviewer. Link this evidence into the relevant implementation tasks with their remaining verification requirements.

If adoption is proposed, identify the separately tracked engineering work or explicit maintained-tooling slice and its integration gate.

## Example Completion Gates

| Investigation | Artifacts and evidence | Completion |
| --- | --- | --- |
| Determine whether batching reduces latency | Disposable benchmark in an isolated workspace; retain sanitized measurements, method, and limitations | Findings accepted by the agreed reviewer; remove owned disposable code as agreed. No production merge required, even if batching is recommended. |
| Determine why scheduled jobs stall and retain a diagnostic command | Reviewed diagnosis plus an explicitly maintained diagnostic tool with safe defaults, usage instructions, and behavior checks | Findings accepted and the tool reaches its agreed PR delivery gate. The experiment alone does not satisfy the maintained-tooling outcome. |

Neither case authorizes production adoption of the experimental approach. Report any additional approval or verification needed before using it there.
