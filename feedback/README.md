# Feedback

To review the effectiveness of customization of an agents harness.

1. All feedback must be provided using [the template](./RAW_TEMPLATE.md).
2. Subdirectory folder structure must remain organized:

    ```text
    <feedback>/
    ├─ agents/                          # Agents, Commands, and Skills follow the same structure
    ├─ commands/
    └─ skills/
        └─ my-awesome-skill/            # Name of the resource
            └─ randomlyGenerated.md     # The name is of little consequence, it's the contents that matter
    ```

3. Once complete, report summary to user.

## Skills

A good skill reliably improves real task outcomes enough to justify its context, latency, and maintenance cost. The decisive measure is an ablation: compare repeated runs with and without the skill.

| Measure               | How to assess it                                                                |
| :-------------------- | :------------------------------------------------------------------------------ |
| Trigger quality       | Precision and recall across positive and negative prompts                       |
| Outcome uplift        | Pass-rate or rubric-score improvement over the no-skill baseline                |
| Reliability           | Success rate and variance across repeated isolated trials                       |
| Efficiency            | Tokens, latency, tool calls, retries, and total cost per successful task        |
| Procedural compliance | Required actions occur; prohibited or obsolete patterns do not                  |
| Safety                | Frequency and severity of known failure modes                                   |
| Context efficiency    | Small entry point, progressive disclosure, little duplicated or unused guidance |
| Source alignment      | Instructions agree with current authoritative docs and APIs                     |
| Maintainability       | Clear structure, low duplication, straightforward ownership and updating        |
| Durability            | Encodes lasting domain preferences rather than temporary model limitations      |

When evaluating a skill without a prompt or eval suite, review the theory and do not take action.

### Skill Structure

Skills must stick to this specific structure

```text
skill-name/
├── SKILL.md            # Required. Main and concise instructions. < 500 lines, `use references/` if >500.
├── assets/             # Optional. Templates, images, schemas, and other static resources
├── references/*.md     # Optional. Progressive disclosure of detailed documents agent reads when needed
└── scripts/            # Optional. Reusable code agent can run.
```

## Agents
