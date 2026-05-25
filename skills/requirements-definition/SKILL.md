---
name: requirements-definition
description: Define scoped work requirements in a spec. Use when the user specifically asks for a spec or is following spec-driven development.
---

# Requirements Definition

Define scoped work requirements from the current conversation and context (codebase, terminology...) in a new spec. Synthesize without interviewing the user - only use what is already known.

## Workflows

### Spec Location

Specs are located within the project, specifically in the `.spec` directory

Specs are named lower-case, kebab-case, and concise to the topic of the spec.

### Creating a new spec

1. **Create the spec directory**: `.specs/<spec-name>`
    - The spec name must represent and reflect the scope of work
    - spec directories always live within the project

2. **Explore the codebase** to understand the current state, if not already

3. **Generate the requirements document**: `.specs/<spec-name>/REQUIREMENTS.md`
    - Use the requirements template (see below)
    - Create requirements that cover the complete scope of the work
    - For each requirement, encapsulate a meaningful user story and extensive acceptance criteria

### Updating a spec

When a user specifies to update a spec:

1. If no spec name was given: inspect existing and have the user choose
2. Read `.specs/<spec-name>/REQUIREMENTS.md` to understand the existing requirements
3. Explore the codebase to understand the current state, if not already
4. Inspect for implicit contradictions and interview the user for clarification

## Features

### Requirements Template

```markdown
# [Feature] Requirements

Brief statement of the feature and why it exists.

## Problem Statement

From the perspective of a user, state what problem is being faced.

## Requirements

### Requirement #

**User Story**: As an <actor>, I want <feature change>, so that <benefit>

#### Acceptance Criteria

#. **Given** <an action>, **when** <in a situation>, **then** <result>

<example-requirement>
### Requirement 1 

**User Story**: As a user, I want to log in to the application so that I can access my account.

#### Acceptance Criteria

1. **Given** a registered user, **when** entering a valid username and password, **then** a session should be created.
</example-requirement>
```

## Pitfalls

- **Focus on outcomes, not solutions** - over specifying or providing implementation details can stifle creativity.
- **Use specific terminology** - vague language like "user friendly" leads to conflicting interpretations.
- **Never include specific file paths or code snippets** - specifying code or implementation details become outdated very quickly.
- **Be sure to cover extensive user stories** - any missing use cases won't be addressed in later work.
- **Set a strongly defined scope early** - scope creep happens without a strong scope boundary, and make use of the out of scope section instead.
