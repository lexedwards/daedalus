# Local Requirements Spec

Use this workflow when the user asks to capture requirements, create a local spec, update a local spec, or does not specify another artifact.

## Artifact

Local requirements specs live inside the project under `.specs/<spec-name>/REQUIREMENTS.md`.

Spec names must be lower-case, kebab-case, concise, and representative of the scoped work.

## Creating A Local Spec

1. **Name the spec**
   - Derive a concise kebab-case name from the scoped work.
   - Ask only if multiple plausible names would change meaning or placement.

2. **Create the spec directory**
   - Use `.specs/<spec-name>/`.

3. **Gather context**
   - Use the current conversation first.
   - Explore the codebase lightly to align terminology, current behavior, and constraints.
   - Ask targeted questions only for contradictions, scope boundaries, or material decisions.

4. **Write `REQUIREMENTS.md`**
   - Use the template below.
   - Cover the complete product scope of the requested work.
   - Put user stories inside numbered requirements so each story remains traceable to acceptance criteria.

## Updating A Local Spec

1. **Identify the spec**
   - If the user gives a spec name, read `.specs/<spec-name>/REQUIREMENTS.md`.
   - If no spec name is given, inspect `.specs/` and ask the user to choose when more than one plausible spec exists.

2. **Review current requirements**
   - Preserve existing intent unless the user asks to change it.
   - Look for contradictions, obsolete assumptions, duplicated requirements, and missing scope boundaries.

3. **Gather targeted context**
   - Use light codebase exploration when current behavior or terminology matters.
   - Ask targeted questions only when ambiguity materially changes the update.

4. **Update `REQUIREMENTS.md`**
   - Keep the document aligned with the template.
   - Maintain requirement numbering and acceptance criteria traceability.

## Template

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

- **Duplicating user stories** - keep user stories inside numbered requirements, not in a separate top-level section.
- **Weak acceptance criteria** - Given/When/Then criteria should be observable and testable.
- **Turning constraints into implementation plans** - constraints may shape requirements, but should not prescribe task breakdowns or code structure.
- **Leaving scope implicit** - use `Out of Scope` to prevent adjacent work from being assumed.
