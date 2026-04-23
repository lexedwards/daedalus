---
name: write-a-skill
description: Create new agent skills with proper location, structure, progressive disclosure, and bundled resources. Use when the user wants to create, write, or build a new skill.
---

# Write a Skill

Create a reusable skill, instructions on how to reliably handle a specific type of task.

## Trigger Phrases

- "Create a skill for X"
- "Add a new skill that handles X"

## Workflow Process

1. **Gather requirements** - if unable to infer from context, ask the user:
    - What task/domain does the skill cover?
    - What specific use cases should it handle?
    - What executable scripts are needed, if any?
    - Are there any additional reference material needed?

2. **Draft a skill** - create:
    - A concise instruction within SKILL.md.
    - Additional references if needed.
    - Additional scripts if needed.

3. **Review** - present to the user and confirm:
    - Does it cover expected use cases?
    - Is there any ambiguity that requires cleaning up?
    - Is the level of detail correct?

## Placement Locations

Choose based on scope:

| Scope   | Path                             |
|---------|----------------------------------|
| Project | `.agents/skills/<skill-name>/`   |
| Global  | `~/.agents/skills/<skill-name>/` |
| Custom  | User specified                   |

Default to project-local (`.agents/skills/`) unless the user specifies otherwise

## Skill Structure

```text
skill-name/
├── SKILL.md            # Required. Main and concise instructions, < 500 lines.
├── assets/             # Optional. Templates, images, schemas, and other static resources
├── references/*.md     # Optional. Detailed documents
└── scripts/            # Optional.
```

## SKILL.md

### Template

```markdown
---
name: skill-name
description: One to three sentences in a single line. What it does and when to use it. No more than 1024 characters 
license: MIT 
compatibility: bash, my-tool
metadata:
    key: value
---

# Skill Name

## Workflow

[Step-by-step instructions to follow with checklists for complex tasks]

## Features

[Link to separate files: See [aws.md](./references/aws.md)]

## Quick Examples

[Optional. One or two working examples to show input -> output]

```

### Frontmatter Fields

- **name**
  - Required.
  - Matching directory name exactly.
  - 1-64 alphanumeric characters and kebab-case (no leading/trailing hyphens etc.).
- **description**
  - Required.
  - Must save as a single line. 1-1024 characters.
  - Be specific about triggers, the agent reads this to decide whether to load the skill
  - First sentence should be what is does.
- **license**
  - Optional
  - Shorthand license declaration.
- **compatibility**
  - Optional and rarely used.
  - State requirements to use this tool
- **metadata**
  - Optional
  - String-to-string map of key, values.

### Body Content Guidelines

A good skill body includes:

1. **When to use** — exact trigger phrases or conditions
2. **Be directive** - write instructions as commands, not suggestions
3. **Workflow or instructions** — step-by-step process the agent should follow
4. **Decision framework** — how to handle ambiguous cases
5. **Safety rules** — any constraints or things to never do
6. **Examples** — concrete input/output or command examples

**Keep it actionable**: Avoid restating things the agent already knows.
**Progressive disclosure**: Keep `SKILL.md` under 500 lines, moving large references to `references/` files and tell the agent when to read them.
**Keep the scope tight**: One skill is one task. Split the skill up if it is trying to do 5 different things.

## When to Add Scripts

Add utility scripts when:

- Operation is deterministic (validation, formatting)
- Same code would be generated repeatedly
- Errors need explicit handling

Scripts save tokens and improve reliability vs generated code.

## When to Split Files

Split into separate files when:

- SKILL.md exceeds 500 lines
- Content has distinct domains (finance vs sales schemas)
- Advanced features are rarely needed

## Validation Checklist

Before finalizing:

- [ ] `SKILL.md` filename is all caps
- [ ] `name` in frontmatter matches the directory name
- [ ] Both `name` and `description` are present
- [ ] Name passes the regex `^[a-z0-9]+(-[a-z0-9]+)*$`
- [ ] Same-name skills across locations are intentional and won't cause unexpected overrides
- [ ] Body gives the agent enough context to act without further lookup
- [ ] SKILL.md under 500 lines
- [ ] No time-sensitive info
- [ ] Consistent terminology
- [ ] Concrete examples included
- [ ] References one level deep
