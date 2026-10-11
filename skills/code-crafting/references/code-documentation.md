# Code Documentation

Read this reference when creating or reviewing declaration documentation, or deciding whether to add a code comment.

## Default to No Comments

- Improve names and structure before explaining code with comments.
- Add documentation only when the declaration's name and signature cannot convey meaningful information needed to use it correctly.
- Place documentation on top-level declarations using the language's native documentation format, not inside implementation blocks.
- Do not narrate implementation steps, restate names or types, or document every declaration for consistency alone.
- Do not capture change history, user feedback, or explanations of past revisions in code comments. Keep that history in Git.
- Respect required repository and public-interface documentation conventions without adding unnecessary prose.

## Document the Current Contract

Include only information the caller cannot infer reliably:

- Parameter meaning, units, or constraints not evident from names and types.
- What returned values represent: their interpretation, units, ordering, or the meaning of empty or special values. Do not merely repeat their types.
- Ownership, lifecycle, side effects, and failure behavior that affect correct use.
- Current non-obvious guarantees or constraints, not the history of how they were introduced.

Omit sections that add no information. Keep architectural rationale in maintained design documentation rather than turning code comments into decision records ([preserve-decision-context](../../principle-preserve-decision-context/SKILL.md)).

## Usage Examples

Use correct-use difficulty, not implementation size, as the threshold. Add a minimal usage example only for a public interface whose correct use requires a non-obvious sequence, coordinated inputs or options, lifecycle management, or interpreting results to choose the next action.

Ask: "Would a competent caller still need to infer an important usage step after reading the name, signature, and concise contract documentation?" If yes, demonstrate that step. Otherwise, omit the example.

Verify the example against the actual interface; use the repository's existing example checks when available. Do not add examples merely to demonstrate an obvious invocation.

## Verify

- Does the documentation add current contract information that names and signatures cannot express?
- Does it explain what the returned values mean rather than repeat their types?
- Is each example justified by a specific correct-use difficulty?
- Is the documentation free of implementation narration, change history, and feedback?
- Does it match the actual behavior and the project's documentation conventions?
