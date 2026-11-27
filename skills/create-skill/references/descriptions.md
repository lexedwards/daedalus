# Description Patterns

Templates and examples for the rules in [Names and descriptions](../SKILL.md#names-and-descriptions). Host-specific fields, such as extra trigger or path-scoping fields, belong to [harness-configuration](../../harness-configuration/SKILL.md); put triggers in `description`, which every host reads.

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

Requests are worded around the situation, not the skill. Diagnose selection against how people actually phrase work, and refresh these patterns from real requests in recent transcripts when a skill is skipped.

- **Openings state a problem or goal, not a work mode.** They run to a few sentences: a want, a problem report, a question about how something works, or a verb on an artifact such as "review" or "inspect". They rarely name a skill, so the description must match the situation they describe.
- **Steering turns are short go-aheads.** Brief approvals often change the work mode, from planning to implementation or from implementation to delivery, without naming it. Workflow skills need stage triggers, such as "before the first edit" or "before committing", plus handoffs in the body of the skill that is already loaded.
- **Users rarely load skills by name.** Selection depends almost entirely on descriptions and body handoffs.
- **Distinctive vocabulary selects reliably.** Skills tied to URLs, named artifacts, or a domain term load far more often than workflow skills whose work reads like default behavior.
- **Pasted material is not the user's wording.** Exclude logs, quotes, and transcripts before judging how requests are phrased.

### What made workflow triggers work

Measured fixes for skipped workflow skills combined two moves:

- **Name what the model cannot know.** "Holds the user's engineering standards and preferences, which the model cannot infer" selected where "sets the trace, test, and delivery gates" did not. The model skips a skill that describes process, because it believes it already follows that process. It loads one that holds knowledge it lacks.
- **Cover the situations, including small ones.** Name the request shapes the skill applies to, such as problem reports and investigations, and say it applies "however small". Without that, a model treats a short edit or a question as below the skill's threshold. Quote an opener only if users actually type it.

## Examples

### Workflow skill read as default behavior

Weak:

```text
Investigate, verify, and change code or documentation with proportionate checks. Use when asked to "fix this bug" or "update these docs". Pair with technical-writing for prose, incremental-commits before committing, and pr-delivery before publication.
```

- "Investigate, verify, and change code" is what the model does anyway, so it skips the skill.
- The quoted requests match only those words.
- The "Pair with" clause routes between skills instead of helping select this one.

Still weak, because it describes process the model believes it already follows:

```text
Use for any task that changes, debugs, or reviews code or maintained docs. Sets the trace, test, and delivery gates. Use technical-writing for prose-only work.
```

Stronger, because it names what the model cannot know:

```text
Use for any task that changes, debugs, investigates, or reviews code or maintained docs. Holds the user's engineering standards and preferences, which the model cannot infer. Use technical-writing for prose-only work.
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
