---
name: write-to-adr
description: create and update an ADR to capture important and hard-to-reverse decisions as they crystalise. Use when a user wants to capture important or critical implementation decisions.
---

# Write to ADR

Takes the current conversation and context (codebase, terminology...) and produces ADRs. Synthesize without interviewing the user - only use what is already in known.

## Workflows

### Creating an ADR

1. **Gather Context** of existing decisions and code, if not already
    - Scan the ADR directory and understand decisions made already

2. **Only offer to capture important decisions**

3. **Write the ADR**
    - One scope per ADR
    - Follows the common file structure location

### Update by superseding an ADR

1. **Never delete ADRs**

2. **Update the status in frontmatter** to mark when and where an ADR has been superseded

### ADR Template

```markdown
---
name: Short title of decision
status: <proposed | accepted | deprecated | superseded by [[NNN-slug]]>
---
# [Short title of decision]

## Context

1-3 sentences on why the decision needs to be made

## Decision

1-3 sentences on what we decided and why

```

### ADR Location

Unless specified by the user, expect ADRs to be located in `docs/adrs/` with a flat structure.

Use sequence numbering with a meaningful short slug in the name.

### Sequence Numbering

Scan the folder location for the highest existing number and increment by one, using sequential numbering; `001-slug.md`, `002-slug.md` etc.

### What to capture

- **Architecture**
- **Integration patterns between systems and services**
- **Technology choices that are difficult to reverse**
- **Deliberate deviations**
- **Non-codified constraints**
- **Not-obvious rejections**

## Pitfalls

- Never delete ADRs, only supersede
- Only offer ADRs for decisions that match all:
  - hard to reverse
  - require context to be understood
  - genuine alternatives were available.
- Use `[[wiki-links]]` to reference other documentation
- Exclude code snippets or implementation details
- Be concise
