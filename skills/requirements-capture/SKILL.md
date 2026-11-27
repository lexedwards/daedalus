---
name: requirements-capture
description: Capture product requirements before implementation. Use when asked to "define this feature", "write a PRD", or create or update a requirements issue, local .specs/<spec-name>/REQUIREMENTS.md, Jira Epic, or Linear project or milestone. Pair with technical-writing for the artifact, implementation-planning for task breakdown, and code-crafting for maintained requirements documents or codebase assessments.
---

# Requirements Capture

Capture product requirements for newly scoped user-facing work. Use this skill when the user wants to capture requirements, create or update a local requirements spec, create or update a PRD, or define user-facing scope before implementation.

Do not use this skill for implementation planning, task breakdown, solution design, or open-ended ideation unless the user asks for requirements output.

## Workflow

1. **Determine the artifact**
   - Read [public-work-public-tracking](../principle-public-work-public-tracking/SKILL.md). Honor an explicit artifact request or existing artifact; otherwise follow the established tracker. For public GitHub repositories without an established alternative, default to a GitHub issue. Do not publish sensitive requirements publicly.
   - For GitHub, create or update a requirements issue. See [GitHub Issue](references/github-issue.md).
   - For Jira, create or update the requirements Epic. See [Jira Epic](references/jira-epic.md).
   - For Linear, create or update a Linear project for standalone or project-wide scope. Target a project milestone when the requirements are one stage of a larger project organized by milestones. See [Linear Project and Milestone](references/linear-project.md).
   - If no tracker or other artifact is selected, create or update a local spec. See [Local Spec](references/local-spec.md).
   - If the user asks for a PRD or product requirements document, produce PRD-style output. See [PRD](references/prd.md).
   - If the user references an existing artifact, update that artifact using the matching workflow.

2. **Gather context**
   - Use the current conversation first.
   - Explore the codebase lightly and only as needed to align terminology, current behavior, and known constraints.
   - Do not turn requirements capture into implementation design.

3. **Clarify only material ambiguity**
   - Ask targeted questions when missing information affects scope, contradicts known context, or materially changes the artifact.
   - Otherwise synthesize from known context and make assumptions explicit when useful.

4. **Create or update the artifact**
   - Before drafting, load [technical-writing](../technical-writing/SKILL.md). For maintained requirements documents, also load [code-crafting](../code-crafting/SKILL.md) before the first write; this does not authorize implementation.
   - Read and apply [keep-gates-traceable](../principle-keep-gates-traceable/SKILL.md) before turning recommendations or unresolved choices into acceptance criteria.
   - Follow the selected reference workflow and template.
   - Keep the artifact focused on product requirements and user-facing outcomes.
   - Before saving, trace each acceptance criterion and `Decisions and Constraints` entry to confirmed context. Keep unconfirmed defaults in the artifact's assumptions or open questions, not only in chat or the PR description. Approval to write the artifact does not by itself accept every earlier recommendation; surface a newly identified safety dependency for a decision instead of silently choosing its product policy.

If the user later requests a commit or publication of a local document, load [incremental-commits](../incremental-commits/SKILL.md) before committing and [pr-delivery](../pr-delivery/SKILL.md) before pushing or preparing a PR.

## Shared Guidance

- Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) when collecting or validating artifacts. Automate stable structural checks where useful; keep product scope and acceptance decisions with the agent, without turning capture into implementation.
- Prefer product terminology already used by the project.
- Use precise actors, behaviors, outcomes, constraints, and scope boundaries.
- Use `Decisions and Constraints` for clarified choices that shape requirements.
- Avoid implementation plans, task breakdowns, file paths, code snippets, and low-level technical design.

## Pitfalls

- **Over-specifying solutions** - requirements should preserve implementation flexibility.
- **Using vague language** - terms like "user friendly" or "fast" need concrete interpretation.
- **Skipping scope boundaries** - unclear out-of-scope work invites scope creep.
- **Duplicating artifact structures** - PRDs and local specs have different levels of detail.
