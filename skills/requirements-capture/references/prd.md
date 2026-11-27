# PRD-Style Output

Use this workflow when the user asks for a PRD, product requirements document, or PRD-style product framing.

## Artifact

By default, produce the PRD in the response. Write to a file only when the user specifies a destination.

PRD-style output captures product context, outcomes, user stories, decisions, and scope. It does not include requirement-level Given/When/Then acceptance criteria by default; use a local requirements spec when that level of detail is needed.

Gather context, clarify ambiguity, and review existing content as described in the [Requirements Capture workflow](../SKILL.md#workflow).

## Creating A PRD

1. **Write the PRD**
   - Use the template below.
   - Keep the document product-oriented and outcome-focused.
   - Include extensive user stories, including edge cases, without turning them into implementation tasks.

2. **Place the PRD**
   - Return the PRD in the response by default.
   - If the user names a file, update or create that file instead.

## Updating A PRD

1. **Read the existing PRD**
   - If the user references a file, read that file before editing.
   - If no destination is provided, update the PRD content in the response.

2. **Update the PRD**
   - Keep the document aligned with the template.
   - Keep acceptance criteria out unless the user explicitly asks for them.

## Template

```markdown
# [Feature]

## Problem Statement

From the perspective of a user or affected actor, state what problem is being faced.

## Outcome

Describe the user-facing result that should be achieved.

## User Stories

- As an <actor>, I want <feature change>, so that <benefit>.

## Decisions and Constraints

- Capture clarified product decisions, technical constraints, policy constraints, or compatibility requirements that shape the requirements.

## Out of Scope

- List related work that is intentionally excluded from this PRD.

## Further Notes

- Add useful context that does not fit elsewhere.
```

## Pitfalls

- **Adding spec-level acceptance criteria by default** - Given/When/Then criteria belong in local requirements specs unless explicitly requested for the PRD.
- **Writing implementation tasks** - PRDs should frame the product need, not plan the work.
- **Skipping edge cases** - user stories should cover important alternate paths and boundary cases.
- **Inventing a storage convention** - do not create a PRD directory unless the user asks for one.
