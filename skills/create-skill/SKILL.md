---
name: create-skill
description: Create agent skills. Use when authoring a new skill or asking about SKILL.md
---

# Creating agent skills

Guided creation of effective Agent Skills. Skills are Markdown files that teach the agent how to perform specific tasks. Examples: Reviewing PRs using team standards, generating commit messages in a preferred format, or any other specialized workflow.

## Gather requirements upfront

Before creating a skill, gather essential information from the user about:

1. **Purpose and scope**: What specific task or workflow should this skill help with?
2. **Target location**: Should this be a global user or local project skill?
3. **Triggers**: When should an agent apply this skill?
4. **Output preferences**: Are there any required structured templates or styles?
5. **Existing wisdom**: Are there any examples or existing proofs and conventions to follow?

### Context inference

If there is previous conversation context, infer information about the skill from what was discussed. Often the best and most concise skills emerge from conversations, domain knowledge, or workflows.

### User direction

If the user directs exact wording to use in the skill, respect it and use it **verbatim**. Do not alter, expand, or paraphrase the text. Do not soften or add additional headings or commentary that change the interpretation.

## Skill file structure

### Directory layout

```text
skill-name/     # kebab-case, alpha-numeric characters
├── SKILL.md    # Required: main instructions
├── references/ # Optional: detailed supplemental documentation
└── scripts/    # Optional: utility scripts
```

### Storage location

| Type | Path | Scope |
| --- | --- | --- |
| Project | `.agents/skills/<skill-name>/` | Shared with anyone using the project |
| User | `~/.agents/skills/<skill-name>/` | Available in every project and every session |

## SKILL.md structure

Every skill requires a `SKILL.md` file with YAML frontmatter and a Markdown body.

```markdown
---
name: skill-name
description: concise description of intent and when it should be used
---

# Skill Name

## Instructions

## Workflow

## Pitfalls

## Examples

```

### Frontmatter metadata

| Field | Required? | Description |
| --- | --- | --- |
| `name` | required | kebab-case, alpha-numeric name. Identical to the directory name |
| `description` | required | max 1024 characters, single line text. Informs agents when to apply or make use of the skill |
| `disable-model-invocation` | optional | boolean. Prevents agents from auto-invoking the skill from ambient context, only include if value is to be `true` |

## Core Principles

### Concise is key

The agent is already very smart. Only add context it doesn't already have. If in doubt, delete. Keep prose that changes a decision. Tell it to do the thing and skip the reason unless it is confusing without one. Point to structural sources (READMEs, configuration files, etc.) or skills by path.

### Descriptions direct the usage

Descriptions are critical for discovery and help the agent decide when to apply the skill. Include both **what** the skill does and **when** the agent should use it. Write the description in the third person. Be specific and include trigger terms.

### Keep `SKILL.md` < 500 lines

Main instructions should be concise, and leverage progressive disclosure to supplement with detailed documentation only when needed. Keep all references one-level deep in the `references/` sub-directory.

### Freedom is determined by fragility

- **High**: For multiple valid approaches, with ambiguity, or subjectivity. I.e. Code review guidance.
- **Medium**: Tasks that have a preferred structure with acceptable variance such as report generation.
- **Low**: Deterministic outcomes are critical and reliable tested scripts should be used. I.e. Database migrations

### Use defaults and specific escape hatches rather than options

Keep variability low by having a default decision made, with specific use-cases for divergence.

### Always validate the skill

- Frontmatter is valid with `name` and `description`
- Reference files exist
- Cross-skill links resolve
- It abides by the Core Principles

## Example

```text
incremental-commits/
└── SKILL.md
```

```markdown
---
name: incremental-commits
description: Checkpoint implementation through verified Conventional Commits with meaningful scopes and contextual issue references.
---

# Incremental Commits

Use during implementation, including untracked work. Follow explicit user or repository instructions not to commit.

1. Check `git status` before work and again before committing. Keep unrelated or pre-existing changes out of the commit; stage only files and hunks belonging to the completed slice. Never use `git add -A` blindly.
2. Run relevant checks, inspect `git diff --cached` and `git diff --cached --check`, and confirm the staged changes form a passing increment. Do not commit secrets, generated debris, or partial work as a completed task.
3. Use a Conventional Commit subject: `<type>(<scope>): <imperative summary>` (for example, `feat(otel): trace agent executions`). Choose a type that describes the change, such as `feat`, `fix`, `docs`, or `refactor`.
4. Name the affected component in the scope and reference known related issues in a footer, for example `Refs: #42` or `Refs: ALE-7, PROJ-123`. Omit references for untracked work.
5. Verify the commit exists and the working tree state afterward. Report the checkpoint and any remaining work; a commit does not authorize publication or issue closure.

```
