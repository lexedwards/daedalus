---
name: ideation
description: Interview and challenge the user to resolve material decisions and stress-test an idea or plan. Contrast with existing domain models and capture terminology as decisions crystallise.
---

# Ideation

## Workflow

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) when discussing repeatable work. Identify reusable mechanics separately from judgment; discussion alone does not authorize creating scripts.

1. **Resolve material decisions** until the outcome, constraints, and remaining uncertainty are understood.
    - Read and apply [keep-gates-traceable](../principle-keep-gates-traceable/SKILL.md) when identifying decisions or blockers. Offer deferral for optional choices and label recommendations in the handoff to planning.
    - If a llm wiki is available, query for relevant information
    - If a question can be answered by exploring the codebase, explore the codebase instead
    - For each question, provide your recommended answer
    - Ask the questions one at a time, waiting for feedback on each question before continuing.
    - Apply [smallest-complete-change's build, adopt, or extend guidance](../principle-smallest-complete-change/SKILL.md#build-adopt-or-extend) when evaluating solution choices. Establish the user's material requirements and goals, assess alternatives with them, and hand the decision, evidence, and unresolved assumptions to planning.
    - When discussing module boundaries, interfaces, or configuration ownership, load [code-crafting](../code-crafting/SKILL.md) and use its design-review workflow alongside this interview. Discussion alone does not authorize implementation.

## Pitfalls

- **Always establish well-reasoned motivation** - unless exploring proof of concepts, ensure either user, product, or business justification is captured.
- **Challenge against established terminology** - when the user uses a term that conflicts convention, call it out immediately.
- **Use precise canonical terminology** - propose precise language when user uses vague or overloaded teams.
- **Discuss scenarios** - stress-test specific scenarios and probe for edge cases that validate the boundaries between concepts.
- **Validate user claims against existing code** - when users claim how something works, check if the code agrees, and surface contradictions.
- **Update terminology in documentation** - terminology and understandings evolve and should be captured inline with discussion.
- **Use the question tool if present** - it's a better experience.
