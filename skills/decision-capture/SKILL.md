---
name: decision-capture
description: Capture important and hard-to-reverse decisions in ADRs as they crystalise. Use when a user wants to preserve important or critical implementation decisions.
---

# Decision Capture

Preserve important decisions from the current conversation and context (codebase, terminology...) as ADRs. Synthesize without interviewing the user - only use what is already known.

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
status: <proposed | accepted | deprecated | superseded by NNN-slug>
---
# [Short title of decision]

## Context

1-3 sentences on why the decision needs to be made

## Decision

1-3 sentences on what we decided and why

## Consequences (Optional)

- Concise pros and cons on mitigate/accepted risks 

```

### ADR Location

Unless specified by the user, expect ADRs to be located in `docs/adrs/` with a flat structure.

Use sequence numbering with a meaningful short slug in the name.

### Sequence Numbering

Scan the folder location for the highest existing number and increment by one, using sequential numbering; `001-slug.md`, `002-slug.md` etc.

### What to capture

- **Architecture**: e.g. event-driven writes, request/response reads; monolith-first with defined seam points for future extraction
- **Integration patterns between systems and services**: e.g. async messaging via queue vs direct REST call; who owns the contract when two teams share an API
- **Technology choices that are difficult to reverse**: e.g. PostgreSQL over MongoDB; Auth0 as identity provider; Kafka as the event backbone
- **Deliberate deviations**: e.g. skipping the org-standard API gateway because latency requirements ruled it out; using REST where the team default is GraphQL
- **Non-codified constraints**: e.g. "no PII outside EU regions" agreed verbally with legal; a vendor SLA that limits call frequency not written in any spec; auth must use SSO per a CISO directive
- **Not-obvious rejections**: e.g. ruled out CQRS despite the read/write split because team lacked the operational maturity; considered gRPC but dropped it due to browser client requirements

## Pitfalls

- Never delete ADRs, only supersede
- Never include code snippets, implementation details, or references to specs, tasks or other other schedules of work.
- Only offer ADRs for decisions that match all:
  - hard to reverse
  - require context to be understood
  - genuine alternatives were available.
- Use markdown Reference-style links to refer to external information, never `[[wiki-links]]`.
- Only include one topic per ADR
- Be concise
