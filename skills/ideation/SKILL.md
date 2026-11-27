---
name: ideation
description: Use when the user wants to think an idea through, challenge it, or resolve open decisions before requirements or a plan exist. Interviews the user and stress-tests the idea against the existing domain model and code. Use requirements-capture once the scope is settled.
---

# Ideation

## Workflow

Read and apply [act-on-explicit-authority](../principle-act-on-explicit-authority/SKILL.md). This workflow discusses and records; it stops before creating scripts, implementing, or changing maintained documentation without a request for that action.

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) when discussing repeatable work; propose scripts rather than creating them.

1. **Resolve material decisions** until the outcome, constraints, and remaining uncertainty are understood.
    - Read and apply [keep-gates-traceable](../principle-keep-gates-traceable/SKILL.md) when identifying decisions or blockers, including the handoff to planning.
    - If a llm wiki is available, query for relevant information
    - Before asking, read and apply [trace-before-changing](../principle-trace-before-changing/SKILL.md) to answer what the codebase can answer.
    - For each question, provide your recommended answer
    - Ask the questions one at a time, waiting for feedback on each question before continuing.
    - Apply [smallest-complete-change's build, adopt, or extend guidance](../principle-smallest-complete-change/SKILL.md#build-adopt-or-extend) when evaluating solution choices. Establish the user's material requirements and goals, assess alternatives with them, and hand the decision, evidence, and unresolved assumptions to planning.
    - When discussing module boundaries, interfaces, or configuration ownership, load [code-crafting](../code-crafting/SKILL.md) and use its design-review workflow alongside this interview. Stop at the review findings.

2. **Record an approved handoff** when the user asks for a maintained discussion brief or documentation change.
    - Before the first write, load [technical-writing](../technical-writing/SKILL.md) and [code-crafting](../code-crafting/SKILL.md). Keep settled constraints, recommendations and unresolved questions distinct. Stop at the brief.
    - If the user later requests a commit or publication, load [incremental-commits](../incremental-commits/SKILL.md) before committing and [pr-delivery](../pr-delivery/SKILL.md) before pushing or preparing a PR.

## Pitfalls

- **Always establish well-reasoned motivation** - unless exploring proof of concepts, ensure either user, product, or business justification is captured.
- **Challenge against established terminology** - when the user uses a term that conflicts convention, call it out immediately.
- **Use precise canonical terminology** - propose precise language when user uses vague or overloaded teams.
- **Discuss scenarios** - stress-test specific scenarios and probe for edge cases that validate the boundaries between concepts.
- **Validate user claims against existing code** - when users claim how something works, check if the code agrees, and surface contradictions.
- **Capture terminology within the approved scope** - propose terminology during discussion; change maintained documentation only when asked.
- **Use the question tool if present** - it's a better experience.

## Handoffs

- When the scope is settled, use [requirements-capture](../requirements-capture/SKILL.md) to define it.
- When a consequential, hard-to-reverse decision emerges, use [decision-capture](../decision-capture/SKILL.md) to record it.
