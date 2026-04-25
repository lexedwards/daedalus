# ADRs

Unless specified by the user, expect ADRs to be located in `docs/adrs/` and use sequential numbering; `001-slug.md`, `002-slug.md` etc.

## ADR Template

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

## Sequence Numbering

Scan `docs/adrs/` for the highest existing number and increment by one.

## What to capture

- **Architecture**
- **Integration patterns between systems and services**
- **Technology choices that are difficult to reverse**
- **Deliberate deviations**
- **Non-codified constraints**
- **Not-obvious rejections**

## Pitfalls

- Only offer ADRs for decisions that match all:
  - hard to reverse
  - require context to be understood
  - genuine alternatives were available.
- Use `[[wiki-links]]` to reference other documentation
- Exclude code snippets or implementation details
- Be concise
