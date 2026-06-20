---
name: implementation-planning
description: Plan incremental implementation by breaking a plan, spec, or PRD into vertical work slices. Use when the user wants to create implementation tasks or break down work into manageable tasks.
---

# Implementation Planning

Break a plan into independently actionable implementation tasks. Tasks are vertical slices of work with incremental value and left in a working and deployable state.

## Workflows

### Creating Tasks

1. **Gather context**
    - Work from existing context
    - If the user passes a github issue: fetch with `gh issue view <number>`
    - if the user references a spec: look up `.specs/<spec-name>/*.md`

2. **Explore the codebase (optional)**
    - If not already in context, explore the codebase to understand the current state of the code

3. **Draft vertical slices**
    - Create tasks from thin vertical slices that implements through ALL integration layers end-to-end
    - Each slice delivers a narrow but complete path through every layer (tests, schema, api ,ui etc.) and is verifiable on its own, along with documentation and architecture diagrams.
    - Ensure that important or critical decisions are preserved and captured in ADRs during the task, using the `/decision-capture` skill.
    - Prefer many thin slices over few thick ones.

4. **Confirm with the user**:
    - Present the proposed breakdown, for each task include:
        - Short descriptive title
        - User sorties covered
        - Blocking relationships with other tasks
    - Confirm with the user:
        - Are the tasks set to the right granularity (too coarse / too fine). Highlight what could potentially be split / merged
        - Are the dependency links correct
    - Iterate until user approves

5. **Create the tasks**
    - Create the tasks in dependency order (blockers first) so that they can be referenced correctly in the related tasks
    - If the plan came from a github issue:
        - create tasks as github issues using `gh issue create` and reference parent github issue in related tasks
    - If the plan came from a spec in `.specs/<spec-name>/`:
        - create ordered tasks as markdown files in `.specs/<spec-name>/tasks/`

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

## Acceptance Criteria

Prioritized prefixed list of detailed scenarios, capturing measurable targets, edge cases, and technical or regulation requirements

Each A.C. should be in the format of:

AC# - **Given** <an action>, **when** <in a situation>, **then** <result>

<example>
AC1 - **Given** a registered user, **when** entering a valid username and password, **then** a session should be created.
</example>

## Further Notes

```
