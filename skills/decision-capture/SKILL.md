---
name: decision-capture
description: Use when a hard-to-reverse architectural or process decision needs a durable record, including writing, updating, or superseding an ADR. Holds the ADR template and the default location, numbering, and supersede rules. Use technical-writing for other technical prose.
---

# Decision Capture

Preserve important decisions from the current conversation and context (codebase, terminology...) as ADRs. Synthesize without interviewing the user.

## Workflows

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) when repeating ADR numbering or structural validation. Reuse or save useful mechanics; keep decision significance and rationale with the agent.

### Creating an ADR

1. **Gather Context** of existing decisions and code, if not already
    - Scan the ADR directory and understand decisions made already

2. **Decide whether the decision warrants an ADR**
    - Read and apply [preserve-decision-context](../principle-preserve-decision-context/SKILL.md) before offering an ADR. It owns which decisions get an ADR, what each ADR must record, and how far each ADR's scope extends.

3. **Write the ADR**
    - Before the first maintained ADR write, load [technical-writing](../technical-writing/SKILL.md) and [code-crafting](../code-crafting/SKILL.md). Stop at the ADR; read and apply [act-on-explicit-authority](../principle-act-on-explicit-authority/SKILL.md) before implementing the decision.
    - Use the template, location, and numbering below

If the user later requests a commit or publication, load [incremental-commits](../incremental-commits/SKILL.md) before committing and [pr-delivery](../pr-delivery/SKILL.md) before pushing or preparing a PR.

### Update by superseding an ADR

1. **Apply [preserve-decision-context](../principle-preserve-decision-context/SKILL.md)'s supersede rule**: write the replacing decision as a new ADR; keep the original and change only its status

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

Examples of decisions and context that meet the principle's criteria:

- **Architecture**: e.g. event-driven writes, request/response reads; monolith-first with defined seam points for future extraction
- **Integration patterns between systems and services**: e.g. async messaging via queue vs direct REST call; who owns the contract when two teams share an API
- **Technology choices that are difficult to reverse**: e.g. PostgreSQL over MongoDB; Auth0 as identity provider; Kafka as the event backbone
- **Deliberate deviations**: e.g. skipping the org-standard API gateway because latency requirements ruled it out; using REST where the team default is GraphQL
- **Non-codified constraints**: e.g. "no PII outside EU regions" agreed verbally with legal; a vendor SLA that limits call frequency not written in any spec; auth must use SSO per a CISO directive
- **Not-obvious rejections**: e.g. ruled out CQRS despite the read/write split because team lacked the operational maturity; considered gRPC but dropped it due to browser client requirements

## Pitfalls

- Never include code snippets, implementation details, or references to specs, tasks or other schedules of work.
- Use markdown Reference-style links to refer to external information, never `[[wiki-links]]`.
