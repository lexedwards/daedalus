---
name: create-skill
description: Create and maintain agent skills and focused principles. Use when authoring, updating, or reviewing SKILL.md guidance.
---

# Creating and Maintaining Skills

Skills package task-specific instructions, references, and scripts. Apply this workflow to updates as well as new skills.

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md). During skill creation or updates, proactively identify and capture stable mechanics in `scripts/` when existing tools do not suffice. Keep triggers, judgment calls, and exceptions in `SKILL.md`; document script invocation relative to the skill directory, inputs, outputs, dependencies, side effects, and failures.

## Gather requirements upfront

Establish the following from the request and existing assets; ask only for missing information that changes the guidance:

1. **Purpose and scope**: What specific task or workflow should this skill help with?
2. **Target location**: Should this be a global user or local project skill?
3. **Triggers**: When should an agent apply this skill?
4. **Output preferences**: Are there any required structured templates or styles?
5. **Existing wisdom**: Are there any examples or existing proofs and conventions to follow?

### User direction

If the user directs exact wording to use in the skill, respect it and use it **verbatim**. Do not alter, expand, or paraphrase the text. Do not soften or add additional headings or commentary that change the interpretation.

## Choose the Owner

Before adding guidance, inspect related skills and principles. Give each shared decision rule one owner; keep sequence, tools, and handoffs in the consuming skills.

A principle expresses one durable decision rule across workflows, not a collection of related advice. Define:

- **Concern:** the single problem and when the rule applies.
- **Rule:** one sentence that guides a choice between competing actions.
- **Boundary:** what it does not govern and where that responsibility belongs.
- **Tests:** observable questions or scenarios that distinguish compliance from violation.

Extend an existing principle only when the addition clarifies its rule within its current scope. A second independently useful rule, or a title broadened to accommodate it, calls for a separate owner. Shared consumers alone do not justify combining rules; create a new principle only when the concern is genuinely reusable.

At each consuming decision point, instruct the agent to read and apply the principle using a resolvable path. Do not assume a link loads its contents or copy its policy into every skill. Replace superseded instructions and check affected consumers for contradictions. Register new assets in the host's inventory when required.

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

Keep instructions that change a decision, action, or check. Remove generic exhortations, repeated policy, and explanations the agent does not need. Prefer a concrete trigger and action to vague advice; point to authoritative files instead of paraphrasing them.

For every update, review the affected guidance subtractively: remove obsolete or conflicting instructions, consolidate repetition, and shorten wording without losing constraints or exceptions. Keep this review within the affected concern, not an unrelated repository-wide rewrite.

### Descriptions direct the usage

Descriptions are critical for discovery and help the agent decide when to apply the skill. Include both **what** the skill does and **when** the agent should use it. Write the description in the third person. Be specific and include trigger terms.

### Keep `SKILL.md` < 500 lines

The limit is a ceiling, not a quality target. Move genuinely occasional detail into `references/`, with an explicit read trigger; delete redundant prose instead of relocating it. Keep reference navigation one level deep.

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
- Bundled scripts pass representative success and failure checks; documented invocations work from outside the skill directory
- Each principle has one rule and a clear boundary; consumers load it at the relevant decision
- Walk through representative success, exception, and failure scenarios across affected skills; lint alone does not establish useful guidance
- Re-read the final guidance for instructions that do not change behavior, duplication, and avoidable verbosity
