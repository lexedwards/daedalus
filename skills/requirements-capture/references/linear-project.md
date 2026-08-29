# Linear Project Requirements

Use this workflow when the user explicitly asks to capture requirements in Linear or to create or update a Linear requirements project.

## Artifact

Linear requirements live in a project's detailed description. Use the project name for the feature name, the summary for a brief outcome, and the description for the complete requirements document.

Create and update the project through the Linear MCP. A new project must belong to at least one team. Do not create issues, milestones, or a separate document during requirements capture unless the user explicitly requests them.

## Before Writing

1. Use `linear_get_workspace` to confirm the connected workspace.
2. If the user named a different workspace, stop and ask them to connect the intended workspace rather than writing elsewhere.
3. If the Linear MCP is unavailable or read-only, explain that the artifact cannot be written. Do not silently fall back to a local spec.

## Creating A Linear Project

1. **Identify the team or teams**
   - Resolve teams supplied by the user with `linear_get_team`.
   - If no team is supplied, use `linear_list_teams` to discover the available teams.
   - Select a team without asking only when one team is the sole plausible destination. Ask the user when multiple teams are plausible.

2. **Check for an existing project**
   - Search with `linear_list_projects` using the proposed feature name.
   - If a matching project already exists, ask whether to update it rather than creating a duplicate when the user's intent is unclear.

3. **Name the project**
   - Derive a concise feature name from the scoped work.
   - Use a short outcome-focused summary.
   - Ask only if multiple plausible names would change the meaning or scope.

4. **Gather context**
   - Use the current conversation first.
   - Explore the codebase lightly to align terminology, current behavior, and constraints.
   - Ask targeted questions only for contradictions, scope boundaries, or material decisions.

5. **Write the description**
   - Use the template below.
   - Cover the complete product scope of the requested work.
   - Put user stories inside numbered requirements so each story remains traceable to acceptance criteria.
   - Pass Markdown directly to the MCP using literal newlines.

6. **Create the project**
   - Use `linear_save_project` with `name`, `summary`, `description`, and `setTeams`.
   - Leave state, dates, priority, lead, labels, and initiatives unset unless the user supplies them or they are established requirements.
   - Read the created project with `linear_get_project` and confirm its name, summary, description, and teams.

## Updating A Linear Project

1. **Identify the project**
   - Resolve a supplied project name, ID, identifier, or slug with `linear_get_project`. Extract the slug first when the user supplies a Linear project URL.
   - Otherwise search with `linear_list_projects` and ask the user to choose when more than one project is plausible.
   - If no matching project exists, ask before creating one when the user requested an update.

2. **Review current requirements**
   - Read the project with `linear_get_project` before changing it.
   - Preserve existing intent unless the user asks to change it.
   - Look for contradictions, obsolete assumptions, duplicated requirements, and missing scope boundaries.

3. **Gather targeted context**
   - Use light codebase exploration when current behavior or terminology matters.
   - Ask targeted questions only when ambiguity materially changes the update.

4. **Update the project**
   - Keep the description aligned with the template.
   - Maintain requirement numbering and acceptance criteria traceability.
   - Use `linear_save_project` with the project `id` and only the fields being changed.
   - Use `patch` for a targeted description edit and `description` when replacing the complete requirements document.
   - Omit teams, state, dates, priority, lead, labels, initiatives, and links unless the requested update changes them.
   - Read the updated project with `linear_get_project` and confirm the requested changes.

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

- List related work that is intentionally excluded from this project.

## Further Notes

- Add useful context that does not fit elsewhere.
```

## Pitfalls

- **Writing to the wrong workspace** - confirm the connected workspace before making changes.
- **Guessing the owning team** - discover available teams and ask when more than one is plausible.
- **Creating duplicate projects** - search for an existing project before creating one.
- **Overwriting project metadata** - omit fields that the requested update does not change.
- **Creating implementation work** - issues and milestones belong to implementation planning, not requirements capture.
- **Weak acceptance criteria** - Given/When/Then criteria should be observable and testable.
- **Turning constraints into implementation plans** - constraints may shape requirements, but should not prescribe task breakdowns or code structure.
- **Leaving scope implicit** - use `Out of Scope` to prevent adjacent work from being assumed.
