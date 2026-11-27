# Description Patterns

Templates and examples for the rules in [Names and descriptions](../SKILL.md#names-and-descriptions). Host-specific fields, such as Claude Code's `when_to_use` or `paths`, belong to [harness-configuration](../../harness-configuration/SKILL.md); put triggers in `description`, which every host reads.

## Templates

### Model-invoked skill

```text
Use for <broad trigger condition>[, including <distinct case>]. <What it adds or requires beyond default behavior>. [Use <sibling> for <near miss>.]
```

### User-invoked skill

```text
<Outcome in one line>.
```

Add `Use only when the user explicitly invokes this skill.` when a target host ignores `disable-model-invocation`.

### Principle

```text
Apply when <situation in which the decision arises>. <One-sentence rule>.
```

## Trigger conditions

A trigger condition describes the request's situation, so it matches however the request is worded.

| Kind | Example |
| --- | --- |
| Work mode | "any task that changes, debugs, or reviews code" |
| Artifact | "editing a `SKILL.md`, principle, or skill reference" |
| Observable state | "a test fails, throws, or slows down" |
| Workflow stage | "before the first commit", "before declaring work done" |
| File scope | "reading or editing `.ts` or `.tsx` files" |
| Vocabulary the user types | a command name, or a term the user habitually uses for the work |

Quoted example requests are not triggers. "Fix this bug" does not match "why does this return null?", but "any debugging task" does.

## Request vocabulary

Measured session history shows how requests are actually worded. Refresh these patterns with the [session history script](../SKILL.md#improve-an-existing-skill).

- **Openings state a problem or goal, not a work mode.** They run to a few sentences: "I want…", "I have this problem where…", "how does…", or a verb on an artifact, such as "review the…" or "inspect the…". They rarely name a skill. Match the situation they describe.
- **Steering turns are short go-aheads.** "Do it", "yes", "keep going", "commit and push", and "merged" often change the work mode, from planning to implementation or from implementation to delivery, without naming it. Workflow skills need stage triggers, such as "before the first edit" or "before committing", plus handoffs in the body of the skill that is already loaded.
- **Users rarely load skills by name.** Selection depends almost entirely on descriptions and body handoffs.
- **Distinctive vocabulary selects reliably.** Skills tied to URLs, named artifacts, or a domain term load far more often than process skills whose work reads like default behavior.
- **Pasted material is not the user's wording.** Exclude logs, quotes, and transcripts before judging how requests are phrased.

## Examples

### Workflow skill read as default behavior

Weak:

```text
Investigate, verify, and change code or documentation with proportionate checks. Use when asked to "fix this bug" or "update these docs". Pair with technical-writing for prose, incremental-commits before committing, and pr-delivery before publication.
```

- "Investigate, verify, and change code" is what the model does anyway, so it skips the skill.
- The quoted requests match only those words.
- The "Pair with" clause routes between skills instead of helping select this one.

Stronger:

```text
Use for any task that changes, debugs, or reviews code or maintained docs, including investigations. Sets the trace, test, and delivery gates and loads the matching principles. Use technical-writing for prose-only work.
```

### Knowledge skill without a trigger

Weak:

```text
Help the user understand the current topic visually.
```

Stronger, if model-invoked:

```text
Use when an explanation involves structure, flow, or relationships that a diagram shows faster than prose. Produces concise diagrams and code-shape sketches.
```

Otherwise, make it user-invoked and keep the one-line summary.

### Siblings that compete

Point each sibling to the other with the boundary between them:

```text
...Explains runtime flow and where code belongs. Use why for rationale and history.
...Explains why a design or decision was made, with cited sources. Use how for runtime behavior.
```

## Anti-patterns

- **Routing tails:** "Pair with…", "Use alongside…", and lists of companion skills. Move them to the body.
- **Instructions:** "Recheck…", "Always…", or "Before X, do Y" written into a description. They are not reliably followed from a listing.
- **Identity padding:** adjectives such as "powerful", "thorough", or "efficient", methodology lists, and implementation details that do not change selection.
- **Synonym lists:** several phrasings of one case. Keep one condition per case.
- **Missing trigger:** a model-invoked description that states only capability.
- **Mismatched mode:** trigger lists on user-invoked skills, or explicit-only wording without the flag.
