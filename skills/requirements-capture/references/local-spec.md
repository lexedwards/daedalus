# Local Requirements Spec

Use this workflow when the user asks to create or update a local spec, or when artifact selection in [Requirements Capture](../SKILL.md) chooses a local spec. Gather context, clarify ambiguity, and review existing requirements as described in the [Requirements Capture workflow](../SKILL.md#workflow).

This file also holds the requirements [template](#template) shared by the GitHub, Jira, and Linear references.

## Artifact

Local requirements specs live inside the project under `.specs/<spec-name>/REQUIREMENTS.md`.

Spec names must be lower-case, kebab-case, concise, and representative of the scoped work.

## Creating A Local Spec

1. **Name the spec**
   - Derive a concise kebab-case name from the scoped work.
   - Ask only if multiple plausible names would change meaning or placement.

2. **Create the spec directory**
   - Use `.specs/<spec-name>/`.

3. **Write `REQUIREMENTS.md`** using the [template](#template).

## Updating A Local Spec

1. **Identify the spec**
   - If the user gives a spec name, read `.specs/<spec-name>/REQUIREMENTS.md`.
   - If no spec name is given, inspect `.specs/` and ask the user to choose when more than one plausible spec exists.

2. **Update `REQUIREMENTS.md`** following the [template](#template).

## Template

When creating requirements, cover the complete product scope of the requested work. Put user stories inside numbered requirements so each story remains traceable to acceptance criteria. When updating, keep the document aligned with the template and maintain requirement numbering and acceptance criteria traceability.

```markdown
# [Feature] Requirements

Brief statement of the product requirement and why it exists.

## Problem Statement

From the perspective of a user or affected actor, state what problem is being faced.

## Outcome

Describe the user-facing result that should be achieved.

## Requirements

### Requirement 1

**User Story**: As an <actor>, I want <feature change>, so that <benefit>.

#### Acceptance Criteria

1. **Given** <an action or state>, **when** <a situation occurs>, **then** <expected result>.

### Requirement 2

**User Story**: As an <actor>, I want <feature change>, so that <benefit>.

#### Acceptance Criteria

1. **Given** <an action or state>, **when** <a situation occurs>, **then** <expected result>.

## Decisions and Constraints

- Capture clarified product decisions, technical constraints, policy constraints, or compatibility requirements that shape the requirements.

## Out of Scope

- List related work that is intentionally excluded from this spec.

## Further Notes

- Add useful context that does not fit elsewhere.
```

## Pitfalls

These apply to every artifact that uses the template.

- **Duplicating user stories** - keep user stories inside numbered requirements, not in a separate top-level section.
- **Weak acceptance criteria** - Given/When/Then criteria should be observable and testable.
- **Turning constraints into implementation plans** - constraints may shape requirements, but should not prescribe task breakdowns or code structure.
- **Leaving scope implicit** - use `Out of Scope` to prevent adjacent work from being assumed.
