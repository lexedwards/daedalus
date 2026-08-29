# Linear Project and Milestone Implementation Planning

Use this workflow when a Linear project or project milestone is the requirements source and Linear is the issue destination.

## Linear MCP Requirement

This workflow requires the read-write Linear MCP. Use the Linear MCP for all discovery, issue creation, and verification.

1. Use `linear_get_workspace` to confirm the connected workspace.
2. If the user named a different workspace, stop and ask them to connect it rather than reading from or writing to the wrong workspace.
3. If the Linear MCP is unavailable, explain that the Linear source cannot be read or mapped.
4. If the Linear MCP is read-only, the issue breakdown may be drafted but cannot be created. Do not silently fall back to local files or another issue tracker.

## Source And Destination

The source project is also the destination project unless the user explicitly selects another existing project.

1. Resolve the referenced project with `linear_get_project`, using `includeMilestones` and the project name, ID, identifier, or slug. Extract the slug first when the user supplies a Linear project URL.
2. Use the project's description, summary, teams, milestones, and other native properties as planning context.
3. When a project milestone is referenced, resolve it with `linear_get_milestone`, passing the parent `project` and milestone name or ID as `query`. Use its description as the staged requirements source and read the parent project for broader context and scope boundaries.
4. Ask the user to choose when more than one project or milestone is plausible. Do not select by weak similarity.
5. Attach every created issue to the destination project.
6. When the source is a project milestone, attach every created issue to both the parent project and that milestone.
7. When the source is the whole project, assign an existing milestone only when the requirements or project structure map the issue to it unambiguously. Otherwise leave the milestone unset or ask when the assignment is material.

## Discover Issue Configuration

Linear projects may span multiple teams, while each issue belongs to one team. Discover configuration separately for every project team that may own an issue.

1. Use the teams returned by `linear_get_project` as the eligible issue teams. Resolve further team details with `linear_get_team` when needed.
2. Use `linear_list_templates` with `type: issue` and the team to list its team and workspace issue templates.
3. Use `linear_get_template` to inspect each plausible template's description structure, preset properties, sub-issues, and form fields before selecting it.
4. Use `linear_list_issue_labels` for the team to discover labels and label groups that express issue-kind conventions such as Bug, Feature, Improvement, Spike, or Investigation.
5. Use `linear_list_issue_statuses` for the team to discover its valid workflow states.
6. Use `linear_list_cycles` with the owning team's ID when the requirements or selected template call for cycle assignment.
7. Discover other allowed values only when they are relevant, using the matching Linear MCP tools for users, releases, milestones, or other referenced entities.
8. Ask the user when ownership, template selection, or an allowed value remains ambiguous after discovery.

Linear has no Jira-style native issue-type field, and the Linear MCP has no create-metadata operation that lists arbitrary fields. Treat existing issue templates and type-like labels as the team's advertised issue-type conventions. The writable native property set is the one supported by `linear_save_issue`; discovery supplies team-specific allowed values for those properties. Do not invent fields, labels, templates, statuses, or values.

## Select Templates And Issue Kinds

Select configuration according to each issue's intent:

| Intent | Preferred existing convention |
| --- | --- |
| Bounded investigation or uncertainty reduction | Spike or Investigation template or label |
| New user-facing behavior | Feature template or label |
| Change to existing behavior | Improvement template or label |
| Incorrect existing behavior or regression | Bug template or label |
| General implementation or delivery work | Task or equivalent template or label |

Use only conventions returned for the owning team. A matching standard issue template is preferred when it supplies useful structure or native properties. If no convention clearly matches, leave the template or type-like label unset rather than guessing.

Form templates applied through the MCP leave their forms unanswered. Do not select a form template merely because its name matches; use one only when the user explicitly accepts that behavior. Otherwise use a suitable standard template or no template.

Templates may also create sub-issues server-side. Select a template with sub-issues only when every generated sub-issue is part of the approved breakdown. Otherwise choose a template without sub-issues or create the approved issues explicitly.

## Linear Field Mapping

Map task content to native issue properties wherever the MCP supports a suitable property:

| Task content | Linear destination |
| --- | --- |
| Short descriptive title | `title` |
| Owning project team | `team` |
| Matching standard issue template | `template` |
| Source or selected destination project | `project` |
| Source or unambiguous staged milestone | `milestone` |
| Advertised issue-kind convention | `labels` and/or `template` |
| Workflow state | `state` |
| Priority, estimate, cycle, assignee, and releases | Matching native properties when established |
| Meaningful issue hierarchy | `parentId` |
| Blocking dependencies | `blocks` or `blockedBy` |
| Non-blocking related work | `relatedTo` |
| Outcome, context, acceptance criteria, and notes | `description` |

The source project takes precedence over a conflicting template default. Always pass `project` explicitly when creating an issue, and pass `milestone` explicitly for milestone-scoped work.

Use template-provided native properties unless they conflict with the approved plan or source scope. Do not set priority, estimate, cycle, state, assignee, delegate, due date, or releases only to make the issue look complete.

When using a template with a completed description, use its structure as the starting point. Passing `description` replaces rather than merges the template body, so retain every useful template section in the completed description. Keep acceptance criteria in the description because the Linear MCP does not expose a dedicated acceptance-criteria property.

Omit `### Related Tasks` and equivalent dependency prose when native issue relationships fully represent it. Keep only narrative context that cannot be represented by `blocks`, `blockedBy`, `relatedTo`, or `parentId`.

## Known Unknowns

Do not bury a material known unknown inside an implementation issue.

1. Create a bounded investigation issue for each uncertainty whose answer can change the implementation approach, scope, sequencing, or acceptance criteria.
2. Give the investigation a specific question, required evidence, expected decision or artifact, and a clear stopping condition.
3. Use an advertised Spike or Investigation template or label when available. Otherwise create an untyped investigation issue without fabricating configuration.
4. Create the investigation before the implementation issues that depend on it.
5. Set each dependent implementation issue's `blockedBy` relationship to the investigation. Do not represent the block only in its description.
6. Use `relatedTo` rather than a blocking relationship when the unknown is relevant but does not prevent implementation.

## Review Before Creation

Create no issues until the user approves the proposed breakdown.

For every proposed issue, present:

- Title and outcome
- User stories covered
- Owning team
- Selected template and type-like label, or an explicit statement that none applies
- Any sub-issues the selected template will generate
- Project and milestone assignment
- Blocking and related issue relationships
- Any investigation that must resolve a known unknown

Ask the user to confirm the granularity, team ownership, template and issue-kind mapping, milestone assignment, investigations, and dependency graph. Iterate until approved.

## Create Linear Issues

1. Create investigations and other blockers first so their Linear identifiers are available.
2. Use `linear_save_issue` for each approved issue with its `team`, `title`, completed `description`, and explicit `project`.
3. Include `milestone` for milestone-scoped issues.
4. Include the approved `template`, `labels`, and other native properties only after discovering that they are valid for the owning team.
5. If an approved template creates sub-issues, retrieve them with `linear_list_issues` using the created parent issue's identifier as `parentId`. Attach each generated sub-issue to the explicit project and applicable milestone with `linear_save_issue`; do not create a duplicate issue for the same approved work.
6. Create dependent issues with `blockedBy` references to their blockers.
7. Add `relatedTo` references for approved non-blocking relationships. Use `parentId` only for intentional issue hierarchy, not as a substitute for project membership.
8. Pass Markdown directly to the MCP using literal newlines.
9. If creation fails partway through, report the issues already created and the failure. Do not retry in a way that may create duplicates.

## Verify Created Issues

Read every created issue with `linear_get_issue` and `includeRelations: true`.

Confirm that each issue has:

- The approved team and title
- The destination project
- The source or approved milestone when applicable
- The approved labels and other native properties
- The intended template-derived properties exposed by the response
- The correct blocking, related, and parent relationships
- A description without duplicated relationship prose

Report created issue identifiers and URLs together with any property the MCP could not verify.

## Pitfalls

- **Using Linear without its MCP** - this workflow requires the Linear MCP for source discovery, writes, and verification.
- **Promising arbitrary field discovery** - discover allowed values for MCP-supported native properties; Linear has no Jira-style create metadata through the MCP.
- **Treating project configuration as team configuration** - discover statuses, labels, templates, and cycles separately for every eligible project team.
- **Inventing issue types** - Linear has no native issue-type field; use only advertised templates and type-like labels.
- **Applying an unanswered form template** - do not use a form template without explicit user approval.
- **Creating hidden template work** - include template-generated sub-issues in the approved breakdown and attach them to the correct project and milestone.
- **Omitting the project** - every created issue must explicitly reference the destination project.
- **Dropping milestone scope** - issues created from milestone requirements must reference both the parent project and the milestone.
- **Flattening dependencies into prose** - use native issue relationships for related, blocked, and blocking work.
- **Implementing through uncertainty** - create a bounded investigation and block affected implementation issues when a known unknown can change the work.
- **Overwriting template behavior** - preserve useful template structure and properties unless they conflict with the approved plan.
