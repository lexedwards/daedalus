---
name: ideation
description: Grilling session that interviews and challenges the user until reaching a shared understanding, resolving each branch of the decision tree. If present, contrast against existing domain model, sharpening terminology and updating documentation as decisions crystallise. Use when a user wants to discuss an idea or stress-test a plan with or without existing project documentation.
---

# Ideation

## Workflow

1. **Interview the user relentlessly** about every aspect of this plan until we reach a shared understanding
    - Walk down each branch of the design tree, resolving dependencies between decisions one-by-one
    - If a question can be answered by exploring the codebase, explore the codebase instead
    - For each question, provide your recommended answer
    - Ask the questions one at a time, waiting for feedback on each question before continuing.

## Pitfalls

- **Challenge against established terminology** - when the user uses a term that conflicts convention, call it out immediately.
- **Use precise canonical terminology** - propose precise language when user uses vague or overloaded teams.
- **Discuss scenarios** - stress-test specific scenarios and probe for edge cases that validate the boundaries between concepts.
- **Validate user claims against existing code** - when users claim how something works, check if the code agrees, and surface contradictions.
- **Update terminology in documentation** - terminology and understandings evolve and should be captured inline with discussion.
- **Use the question tool if present** - it's a better experience.
