---
name: write-to-tasks
description: Break a plan, spec, or PRD into work tasks, each accomplishing a vertical slice. Use this when the user wants to create implementation tasks or break down work into manageable tasks.
---

# Write to tasks

## Workflows

1. **Gather context**

2. **Explore the codebase**

3. **Draft vertical slices**

4. **Confirm with the user**:

5. **Create the tasks**

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

## Pitfalls
