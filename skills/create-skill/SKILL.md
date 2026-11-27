---
name: create-skill
description: Use before creating, editing, reviewing, or improving any skill or principle, including its body, frontmatter, description, name, or references. Owns the conventions for invocation mode, description shape, rule ownership, and trigger checks, and turns evidence of skipped or misused skills into fixes. Use harness-configuration for host fields, discovery, and agent definitions.
---

# Creating and Maintaining Skills

Skills package task-specific instructions, references, and scripts. Apply this workflow to new skills, updates, reviews, and improvements alike.

Before assessing or changing maintained skill guidance, load [code-crafting](../code-crafting/SKILL.md); before the first prose write, also load [technical-writing](../technical-writing/SKILL.md). This authoring workflow does not replace either companion. For host-specific fields, discovery, precedence, or registration, load [harness-configuration](../harness-configuration/SKILL.md). If the user later requests a commit or publication, load [incremental-commits](../incremental-commits/SKILL.md) before committing and [pr-delivery](../pr-delivery/SKILL.md) before pushing or preparing a PR.

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md). During skill creation or updates, proactively identify and capture stable mechanics in `scripts/` when existing tools do not suffice. Keep triggers, judgment calls, and exceptions in `SKILL.md`; document script invocation relative to the skill directory, inputs, outputs, dependencies, side effects, and failures.

## Gather requirements upfront

Establish the following from the request and existing assets; ask only for missing information that changes the guidance:

1. **Purpose and scope**: What specific task or workflow should this skill help with?
2. **Target location**: Should this be a global user or local project skill?
3. **Invocation**: Should the model load it on its own, only the user, or only a consuming skill?
4. **Triggers**: In which situations should it load, and which near misses belong to another skill?
5. **Output preferences**: Are there any required structured templates or styles?
6. **Existing wisdom**: Are there any examples or existing proofs and conventions to follow?

### User direction

If the user directs exact wording to use in the skill, respect it and use it **verbatim**. Do not alter, expand, or paraphrase the text. Do not soften or add additional headings or commentary that change the interpretation.

## Choose the Owner

Give each rule one owner. Skills own workflows: sequence, tools, and handoffs. Principles own durable decision rules.

### Principles

A principle is a class of skill that abstracts one reinforced pattern of behavior from the workflows that need it. It earns its place by being separable from any one workload, not by its number of consumers; a principle with a single consumer is valid, and the cost of loading it is accepted. Define:

- **Concern:** the single problem and when the rule applies.
- **Rule:** one sentence that guides a choice between competing actions.
- **Boundary:** what it does not govern and where that responsibility belongs.
- **Tests:** observable questions or scenarios that distinguish compliance from violation.

Extend an existing principle only when the addition clarifies its rule within its current scope. A second independently useful rule, or a title broadened to accommodate it, calls for a separate principle.

At each consuming decision point, instruct the agent to read and apply the principle using a resolvable path. Do not assume a link loads its contents or copy its policy into the consumer. Replace superseded instructions and check affected consumers for contradictions.

### Check for semantic duplication

Before adding or changing guidance, compare its meaning with related skills and principles. Matching keywords is not the test: "validate at trust boundaries" and "guard inputs where data enters" are the same rule.

- Read the candidate owners in full rather than searching for the new wording.
- When the meaning already has an owner, point to it from the decision point instead of restating it.
- When two assets own the same meaning, consolidate it into one owner within the requested scope; report duplication outside that scope instead of expanding the change.

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
description: trigger condition, then what the skill adds
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
| `description` | required | max 1024 characters, single line text. Selects when the skill loads; see [Names and descriptions](#names-and-descriptions) |
| `disable-model-invocation` | optional | boolean. Prevents agents from auto-invoking the skill from ambient context, only include if value is to be `true` |

## Names and descriptions

Agents choose a skill from its name and description alone, before reading the body. Read [description patterns](references/descriptions.md) when writing, reviewing, or diagnosing a name or description.

### Choose the invocation mode first

The mode decides who reads the description:

| Mode | Reader | Description |
| --- | --- | --- |
| Model-invoked | The model, every turn | Trigger condition, then what the skill adds |
| User-invoked (`disable-model-invocation: true`) | A person scanning a menu | One-line summary of the outcome |
| Principle, loaded by a consuming skill | The consuming workflow | `Apply when <situation>. <rule>.` |

Choose model invocation only when the agent or another skill must reach the skill without the user naming it. Keep explicit-only skills and principles explicit-only. When a target host ignores `disable-model-invocation`, add an explicit-only sentence to the description.

### Write descriptions for selection

- **Lead with the trigger condition.** Name the situation in broad terms: the work mode, artifact, or observable state, such as "any task that changes or debugs code".
- **State what the skill adds beyond default behavior.** A description that reads like what the model already does gets skipped.
- **One condition per distinct case.** Collapse synonyms for the same case.
- **Quote only words people actually type**, such as a command name or a term the user habitually uses. Do not use sample requests as triggers.
- **Point to the nearest sibling** when the two could compete: "Use technical-writing for prose."
- **Keep it to selection.** Put companion skills, handoffs, and instructions to the reader in the body, at the point where the work changes. A listing entry is not a reliable place for instructions.
- **Aim for about 300 characters.** The description is in context on every turn.

### Name for invocation

The name is the word people type to invoke the skill. Use the term for its outcome or work mode in kebab-case. Use a shared prefix only for a family of the same class, such as `principle-`. Avoid generic names, such as `helper` or `utils`.

## Improve an existing skill

Use this workflow when evidence shows a skill is skipped, misapplied, or producing poor results. Evidence includes session transcripts, evaluation results, retrospectives, and user reports.

1. **Collect the evidence.** Identify the request, the skill that should have applied, and what happened instead.
2. **Classify the failure:**
   - **Selection:** the skill did not load. Fix the description, invocation mode, or name.
   - **Load cost:** the skill loaded late or was skipped as too heavy. Make the first read usable alone and keep further reads conditional.
   - **Execution:** the skill loaded but its steps were not followed. Sharpen completion criteria or reorder steps.
   - **Ownership:** the rule lives in the wrong place or in several places. Apply [Choose the Owner](#choose-the-owner).
3. **Fix the owning asset** and review the affected guidance subtractively.
4. **Check the result again** with the trigger checks below and, for consequential changes, the original evidence.

## Core Principles

### Concise is key

Keep instructions that change a decision, action, or check. Remove generic exhortations, repeated policy, and explanations the agent does not need. Prefer a concrete trigger and action to vague advice; point to authoritative files instead of paraphrasing them.

For every update, review the affected guidance subtractively: remove obsolete or conflicting instructions, consolidate repetition, and shorten wording without losing constraints or exceptions. Keep this review within the affected concern, not an unrelated repository-wide rewrite.

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
- No rule duplicates the meaning of guidance owned elsewhere
- Trigger checks: write about three naturally worded requests that should load the skill and two near misses that should not. Compare them with the competing sibling descriptions and confirm the mode and its flag match
- Walk through representative success, exception, and failure scenarios across affected skills; lint alone does not establish useful guidance
- Re-read the final guidance for instructions that do not change behavior, duplication, and avoidable verbosity
