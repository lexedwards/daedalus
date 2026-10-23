---
name: implementation-planning
description: Plan incremental implementation by breaking a plan, spec, PRD, Jira Epic, or Linear project or project milestone into vertical work slices. Use when the user wants to create implementation tasks or break down work into manageable tasks.
---

# Implementation Planning

Break a plan into independently actionable tasks. Implementation tasks are vertical slices with incremental value, left in a working and deployable state. Investigation tasks instead deliver reviewed evidence against an agreed question; their artifacts need not become maintained product surface.

## Workflows

### Creating Tasks

1. **Gather context**
    - Work from existing context
    - Apply [smallest-complete-change's build, adopt, or extend guidance](../principle-smallest-complete-change/SKILL.md#build-adopt-or-extend). Carry forward the solution decision, alternatives considered, and evidence; revisit consequential unresolved assumptions before dependent implementation, planning a bounded investigation when needed.
    - Read [public-work-public-tracking](../principle-public-work-public-tracking/SKILL.md) and select the task destination separately from the source document. Honor explicit user direction and the established tracker; otherwise default to GitHub Issues and suitable milestones for public GitHub repositories. Keep sensitive work private.
    - Read [integrate-through-review](../principle-integrate-through-review/SKILL.md) and establish the project's completion gate and any explicit delivery exception.
    - Distinguish investigations from implementation. Before experimental execution, agree the [investigation contract](../code-crafting/references/investigations.md): question or decision, bounds, evidence, stopping condition, reviewer, findings destination, and artifact disposition. Plan maintained diagnostic tooling explicitly rather than inferring adoption from a successful experiment.
    - If the user passes a github issue: fetch with `gh issue view <number>`
    - if the user references a spec: look up `.specs/<spec-name>/*.md`
    - If the user passes a Jira Epic: read it as the source using [Jira Epic](resources/jira-epic.md)
    - If the user passes a Linear project or project milestone: read it as the source using [Linear Project and Milestone](resources/linear-project.md)

2. **Explore the codebase (optional)**
    - If not already in context, explore the codebase to understand the current state of the code

3. **Draft vertical slices**
    - Read [automate-mechanics](../principle-automate-mechanics/SKILL.md). Include useful saved automation and its checks in the slice that needs it; do not plan repeated agent reconstruction of stable procedures. Planning alone does not authorize implementing those scripts.
    - Read [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) for dependency order and [smallest-complete-change](../principle-smallest-complete-change/SKILL.md) for task and review boundaries.
    - Create implementation tasks from thin vertical slices that implement through all required integration layers end-to-end.
    - Each implementation slice delivers a narrow but complete path through every required layer (tests, schema, API, UI, etc.) and is verifiable on its own, with relevant documentation and architecture diagrams.
    - Ensure that important or critical decisions are preserved and captured in ADRs during the task, using the `/decision-capture` skill.
    - For each implementation slice, name its proposed PR boundary, dependency base, and verification recipe using the project's real checks. Identify any smaller passing commit increments within it.
    - For an investigation, use its findings-review gate instead of requiring a production PR. Track any subsequent adoption separately unless maintained tooling is an explicit part of this task's agreed outcome; carry forward conclusions, limitations, and remaining verification requirements.

4. **Confirm with the user**:
    - Present the proposed breakdown, for each task include:
        - Selected tracker or local destination, and any suitable milestone
        - Short descriptive title
        - User stories covered
        - Blocking relationships with other tasks
        - Proposed PR boundaries, stack order where dependent, and verification recipes
    - Confirm with the user:
        - Are the tasks set to the right granularity (too coarse / too fine). Highlight what could potentially be split / merged
        - Are the dependency links correct
    - Iterate until user approves

5. **Create the tasks**
    - Create the tasks in dependency order (blockers first) so that they can be referenced correctly in the related tasks
    - Use the selected destination, not just the source document's location. Confirm publication authorization and check for existing tasks before creating new ones; report blocked access rather than switching trackers.
    - If GitHub Issues is selected:
        - create tasks using `gh issue create`, reference the source and parent issue when present, and use a suitable milestone for related work or delivery goals
    - If local task files are selected, or no tracker is selected and the plan came from a spec in `.specs/<spec-name>/`:
        - create ordered tasks as markdown files in `.specs/<spec-name>/tasks/`
    - If Jira is selected:
        - create child work items by following [Jira Epic](resources/jira-epic.md)
    - If Linear is selected:
        - create issues by following [Linear Project and Milestone](resources/linear-project.md)

## Features

### Task Template

```markdown
## Outcome

A concise description of what will be achieved by completing this task.

## Context

What has brought about this task and why.

### Related Tasks

Provide context of related work or omit section if none.

- Blocked by ... (if any)

## Delivery and Verification

- Delivery outcome and scope: PR for maintained changes, or reviewed findings for an investigation.
- Base (if a PR): default branch, or the parent PR for dependent work.
- Verification: commands or observable checks, expected results, and known gaps.
- Completion gate: the project's agreed state for marking this task Done.

## Acceptance Criteria

Prioritized prefixed list of detailed scenarios, capturing measurable targets, edge cases, and technical or regulation requirements

Each A.C. should be in the format of:

AC# - **Given** <an action>, **when** <in a situation>, **then** <result>

<example>
AC1 - **Given** a registered user, **when** entering a valid username and password, **then** a session should be created.
</example>

## Further Notes

```

## Pitfalls

- Always rollup documentation along side implementation to avoid drift.
