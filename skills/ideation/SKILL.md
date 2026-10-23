---
name: ideation
description: Interview and challenge the user until reaching a shared understanding, resolving each branch of the decision tree. If present, contrast against existing domain model, sharpening terminology and updating documentation as decisions crystallise. Use when a user wants to discuss an idea or stress-test a plan with or without existing project documentation.
---

# Ideation

## Workflow

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) when discussing repeatable work. Identify reusable mechanics separately from judgment; discussion alone does not authorize creating scripts.

1. **Interview the user relentlessly** about every aspect of this plan until we reach a shared understanding
    - Walk down each branch of the design tree, resolving dependencies between decisions one-by-one
    - If a llm wiki is available, query for relevant information
    - If a question can be answered by exploring the codebase, explore the codebase instead
    - For each question, provide your recommended answer
    - Distinguish accepted requirements from recommendations and unresolved choices. Confirm behavior-changing restrictions and defaults before treating them as requirements; broad goals do not authorize arbitrary policies.
    - Ask the questions one at a time, waiting for feedback on each question before continuing.
    - When discussing module boundaries, interfaces, or configuration ownership, load [code-crafting](../code-crafting/SKILL.md) and use its design-review workflow alongside this interview. Discussion alone does not authorize implementation.

## Build, Adopt, or Extend

For a new product, replacement, or substantial standalone capability, test whether building is necessary before committing to substantial implementation. Routine fixes and incremental changes do not need an alternatives survey.

- Establish the underlying need and material constraints first: required workflows, integrations, data control, operating cost, and any explicit learning or experimentation goal.
- Agree a research bound suited to the decision: a small shortlist, a time budget, or a stopping condition. Reuse an existing assessment while its requirements and evidence remain adequate.
- Compare building, adopting, and extending plausible existing solutions against those requirements, not feature counts. Include migration, maintenance, licensing, and operational constraints where material. Do not invent alternatives to fill a comparison.
- Separate documented claims, behavior actually verified, and unresolved uncertainty. Check a consequential differentiator with a focused trial when practical; record what could not be checked.
- Recommend a direction and explain the trade-offs. Respect an explicit reason to build, including learning; a suitable existing product does not automatically override that goal.
- At the planning handoff, carry forward the requirements, alternatives considered, evidence, chosen direction, and consequential unverified assumptions. Resolve assumptions that could change the approach before dependent implementation, or plan a bounded investigation rather than treating them as facts.

Stop researching when the evidence is sufficient for the decision. Reopen the assessment only when changed requirements, stale evidence, or a consequential new uncertainty warrants it.

## Pitfalls

- **Always establish well-reasoned motivation** - unless exploring proof of concepts, ensure either user, product, or business justification is captured.
- **Challenge against established terminology** - when the user uses a term that conflicts convention, call it out immediately.
- **Use precise canonical terminology** - propose precise language when user uses vague or overloaded teams.
- **Discuss scenarios** - stress-test specific scenarios and probe for edge cases that validate the boundaries between concepts.
- **Validate user claims against existing code** - when users claim how something works, check if the code agrees, and surface contradictions.
- **Update terminology in documentation** - terminology and understandings evolve and should be captured inline with discussion.
- **Use the question tool if present** - it's a better experience.
