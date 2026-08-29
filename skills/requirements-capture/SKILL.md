---
name: requirements-capture
description: Capture product requirements for new or changed user-facing work before implementation. Use when the user wants to capture requirements, create or update a local `.specs/<spec-name>/REQUIREMENTS.md` spec, Jira Epic, or Linear project, or draft/update a PRD-style product requirements document in the response unless a destination is specified.
---

# Requirements Capture

Capture product requirements for newly scoped user-facing work. Use this skill when the user wants to capture requirements, create or update a local requirements spec, create or update a PRD, or define user-facing scope before implementation.

Do not use this skill for implementation planning, task breakdown, solution design, or open-ended ideation unless the user asks for requirements output.

## Workflow

1. **Determine the artifact**
   - If the user asks for requirements without naming an artifact, create or update a local spec. See [Local Spec](references/local-spec.md).
   - If the user asks for a Jira Epic, create or update the requirements Epic. See [Jira Epic](references/jira-epic.md).
   - If the user explicitly asks to capture requirements in Linear, create or update a Linear project. See [Linear Project](references/linear-project.md).
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
   - Follow the selected reference workflow and template.
   - Keep the artifact focused on product requirements and user-facing outcomes.

## Shared Guidance

- Prefer product terminology already used by the project.
- Use precise actors, behaviors, outcomes, constraints, and scope boundaries.
- Use `Decisions and Constraints` for clarified choices that shape requirements.
- Avoid implementation plans, task breakdowns, file paths, code snippets, and low-level technical design.
- Do not include GitHub issue workflows unless the user provides a concrete use case.

## Pitfalls

- **Over-specifying solutions** - requirements should preserve implementation flexibility.
- **Using vague language** - terms like "user friendly" or "fast" need concrete interpretation.
- **Skipping scope boundaries** - unclear out-of-scope work invites scope creep.
- **Duplicating artifact structures** - PRDs and local specs have different levels of detail.
