---
name: implementation-planning
description: Use when a plan, spec, PRD, Jira Epic, or Linear project or milestone must become implementation tasks. Holds the user's slicing and tracking conventions, producing verifiable slices with explicit dependencies. Use requirements-capture to define the scope first.
---

# Implementation Planning

Break a plan into independently actionable tasks: working vertical slices for implementation, or evidence and handoffs for investigations.

## Workflows

### Creating Tasks

1. **Gather context**
    - Read and apply [keep-gates-traceable](../principle-keep-gates-traceable/SKILL.md) when selecting blockers and completion gates.
    - Apply [smallest-complete-change's build, adopt, or extend guidance](../principle-smallest-complete-change/SKILL.md#build-adopt-or-extend). Carry forward the solution decision, alternatives considered, and evidence; revisit consequential unresolved assumptions before dependent implementation, planning a bounded investigation when needed.
    - Read [public-work-public-tracking](../principle-public-work-public-tracking/SKILL.md) and select the task destination separately from the source document.
    - Read [integrate-through-review](../principle-integrate-through-review/SKILL.md) and establish the project's completion gate and any explicit delivery exception.
    - Read and apply [match-delivery-to-task](../principle-match-delivery-to-task/SKILL.md) to classify deliverables. For investigations, read and agree the [investigation contract](../code-crafting/references/investigations.md) before experiments.
    - For tracked work, read and apply [keep-tracking-aligned](../principle-keep-tracking-aligned/SKILL.md). Carry the discovered conventions into the task's execution handoff.
    - If the user passes a github issue: fetch with `gh issue view <number>`
    - if the user references a spec: look up `.specs/<spec-name>/*.md`
    - If the user passes a Jira Epic: read it as the source using [Jira Epic](resources/jira-epic.md)
    - If the user passes a Linear project or project milestone: read it as the source using [Linear Project and Milestone](resources/linear-project.md)

2. **Explore the codebase (optional)**
    - If not already in context, explore the codebase to understand the current state of the code

3. **Draft vertical slices**
    - Read [automate-mechanics](../principle-automate-mechanics/SKILL.md). Include useful saved automation and its checks in the slice that needs it; do not plan repeated agent reconstruction of stable procedures. Planning alone does not authorize implementing those scripts.
    - Read [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) for dependency order and slice shape, and [smallest-complete-change](../principle-smallest-complete-change/SKILL.md) for task and review boundaries.
    - Keep accepted correctness and safety constraints in the first slice that exposes the behavior; narrow the feature's scope rather than shipping known-invalid output and deferring its correction.
    - Include the checks and maintained documentation needed to use each implementation slice; add architecture diagrams when they explain a material boundary.
    - Ensure that important or critical decisions are preserved and captured in ADRs during the task, using the `/decision-capture` skill.
    - For each implementation slice, name its proposed PR boundary, dependency base, and verification recipe using the project's real checks. Identify any smaller passing commit increments within it.
    - For investigations, name the evidence destination and acceptance gate.

4. **Confirm with the user**:
    - Present the proposed breakdown, for each task include:
        - Selected tracker or local destination, and any suitable milestone
        - Short descriptive title
        - User stories covered
        - Blocking relationships with other tasks
        - Delivery boundaries (PRs or investigation handoffs), dependency order, and verification recipes
    - Confirm with the user:
        - Are the tasks set to the right granularity (too coarse / too fine). Highlight what could potentially be split / merged
        - Are the dependency links correct
    - Iterate until user approves

5. **Create the tasks**
    - Before writing maintained task files, load [technical-writing](../technical-writing/SKILL.md) and [code-crafting](../code-crafting/SKILL.md). Planning authorizes only the approved task artifacts, not implementation.
    - Create the tasks in dependency order (blockers first) so that they can be referenced correctly in the related tasks
    - Create tasks in the destination selected in step 1. Confirm publication authorization and check for existing tasks before creating new ones.
    - If GitHub Issues is selected:
        - create tasks using `gh issue create`, reference the source and parent issue when present, and use a suitable milestone for related work or delivery goals
    - If local task files are selected, or no tracker is selected and the plan came from a spec in `.specs/<spec-name>/`:
        - create ordered tasks as markdown files in `.specs/<spec-name>/tasks/`
    - If Jira is selected:
        - create child work items by following [Jira Epic](resources/jira-epic.md)
    - If Linear is selected:
        - create issues by following [Linear Project and Milestone](resources/linear-project.md)

If the user later requests a commit or publication of local task files, load [incremental-commits](../incremental-commits/SKILL.md) before committing and [pr-delivery](../pr-delivery/SKILL.md) before pushing or preparing a PR.

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
- Gate justification: accepted requirement or demonstrated safety dependency protected by each required gate.
- Tracking conventions: supported transitions and applicable ownership, labels, and relationships.

## Acceptance Criteria

Prioritized prefixed list of detailed scenarios, capturing measurable targets, edge cases, and technical or regulation requirements

Each A.C. should be in the format of:

AC# - **Given** <an action>, **when** <in a situation>, **then** <result>

<example>
AC1 - **Given** a registered user, **when** entering a valid username and password, **then** a session should be created.
</example>

## Handoffs

When the scope or acceptance criteria are missing or contested, use [requirements-capture](../requirements-capture/SKILL.md) before slicing.

## Further Notes

```
