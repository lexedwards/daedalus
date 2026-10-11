---
name: principle-make-structure-visible
description: Apply when creating or reviewing code, tests, documentation, or explanations. Make logical grouping, sequence, and branches visible to the next reader.
disable-model-invocation: true
---

# Make Structure Visible

Make intent, grouping, sequence, and alternatives visible. Keep closely related elements together and separate distinct logical units so readers can understand their relationships.

- Group elements that serve one purpose; separate changes in responsibility, phase, or reasoning.
- Make branches, their conditions, and their outcomes easy to distinguish.
- Use whitespace and structure to expose meaningful boundaries, not to mechanically separate every element or minimize length.
- Keep related elements close enough to understand together. Prefer explicit names and data over compact forms that hide meaning.
- Follow the surrounding conventions and explicit user preferences. Choose a representation appropriate to the medium and its readers.
- Explain non-obvious constraints and reasons rather than narrating mechanics already visible in the work.
- Re-read the resulting artifact for comprehension. Formatting consistency alone does not establish readability.

**The tests:**

- "Can the next reader identify the logical units and their relationships without reconstructing them?" Make missing boundaries visible.
- "Can the reader distinguish the sequence from its alternatives and outcomes?" Clarify the transitions and branches.
- "Does this separation expose a meaningful boundary or obscure a relationship?" Keep cohesive elements together.
- "Am I matching the surrounding work, or introducing my own style?" Follow the established conventions unless a change is requested.
