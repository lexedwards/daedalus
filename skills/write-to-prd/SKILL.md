---
name: write-to-prd
description: Turn the current context into a PRD. Use when the user wants to capture planned work, or specifically asks for one.
---

# Write to PRD

Takes the current conversation and context (codebase, terminology...) and produces a PRD. Synthesizing without interviewing the user - only use what is already known.

## Workflows

## Features

### PRD Template

```markdown
# [Feature]

## Problem Statement

From the perspective of a user, state what problem is being faced.

## Outcome

From the perspective of the user, propose the solution to the problem and what should be achieved.

## User Stories

A prioritized list of user stories, each in the format of:

- As an <actor>, I want <feature change>, so that <benefit>

<example>
As a user, I want to log in to the application so that I can access my account.
</example>

The list should be extensive and cover all aspects of the feature, including edge cases.

## Implementation Decisions

An incremental list of decisions that have been made to facilitate changes. Some examples:

- What modules / services that will be modified/built
- Technical clarifications
- Architectural decisions
- API / Schema changes

## Out of Scope

A description of the things that are out of scope for this PRD.

## Further Notes

Any further notes about the feature.
```

## Pitfalls

- **Focus on outcomes, not solutions** - over specifying or providing implementation details can stifle creativity.
- **Use specific terminology** - vague language like "user friendly" leads to conflicting interpretations.
- **Never include specific file paths or code snippets** - specifying code or implementation details become outdated very quickly.
- **Be sure to cover extensive user stories** - any missing use cases won't be addressed in later work.
- **Set a strongly defined scope early** - scope creep happens without a strong scope boundary, and make use of the out of scope section instead.
