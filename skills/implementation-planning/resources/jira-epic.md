# Jira Epic Implementation Planning

Use this workflow when a Jira Epic is the requirements source and Jira is the task destination.

## Source

Use the Epic's Jira space as the task destination unless the user explicitly selects another space.

1. Read the Epic with:

   ```bash
   twg jira workitem get <EPIC-KEY> --full
   ```

2. Confirm the source work item has type `Epic`.
3. Use its description, native fields, linked work items, and relationships as planning context.
4. Query its work item links when the full read does not provide enough relationship detail:

   ```bash
   twg jira workitem link query --issue-id <EPIC-KEY>
   ```

## Work Item Types

Query the types available in the destination space:

```bash
twg jira space issue-types --id-or-key <SPACE>
```

Select the type that represents the task's intent:

| Type | Use |
| --- | --- |
| `Spike` | Bounded investigation, discovery, or uncertainty reduction |
| `Task` | Implementation or delivery work |
| `Bug` | Incorrect existing behavior or a regression |

Use only types advertised by the space. If a required type is unavailable, report the configuration gap and ask the user how to proceed.

## Jira Field Mapping

Discover create metadata separately for every selected work item type:

```bash
twg jira workitem field create-metadata --space <SPACE> --type <TYPE>
```

Treat the metadata as authoritative. Respect all required fields, schemas, operations, and allowed values. Use returned `customfield_*` IDs rather than display names when writing custom fields.

Map the task template to Jira fields:

| Task content | Jira destination |
| --- | --- |
| Short descriptive title | Summary |
| Selected intent | Work item type: `Spike`, `Task`, or `Bug` |
| Source Epic | Parent |
| Outcome, Context, and Further Notes | Description |
| Acceptance Criteria | Dedicated Acceptance Criteria field when advertised |
| Related and blocking tasks | Native work item relationships |

When metadata advertises a field for a specific section, store that section in the dedicated field instead of duplicating it in the description. In particular:

- Extract Acceptance Criteria from the task template and write them to the advertised Acceptance Criteria field with its returned `customfield_*` ID.
- If the space does not advertise an Acceptance Criteria field, retain the Acceptance Criteria section in the description.
- Omit Related Tasks from the description when native relationships fully express them. Keep only narrative context that a relationship cannot represent.

Write descriptions as Markdown and pass `--description-format markdown` so Jira's Rich Text Editor can render the content. Do not use Jira wiki markup.

## Creating Jira Tasks

Create tasks only after the user approves the proposed slices, work item types, and dependency graph.

1. Create blockers before the work items they block so their Jira keys are available.
2. Create each work item with the selected type and the Epic as its parent:

   ```bash
   twg jira workitem create \
     --space <SPACE> \
     --type <TYPE> \
     --summary "<TASK TITLE>" \
     --parent <EPIC-KEY> \
     --description "<OUTCOME, CONTEXT, AND FURTHER NOTES>" \
     --description-format markdown \
     --field "customfield_<ID>=<ACCEPTANCE CRITERIA>"
   ```

3. Include the Acceptance Criteria field only when create metadata advertises it.
4. Add other required metadata with `--field` or `--fields-json`. Do not provide the same field through both options.
5. Read each created work item and confirm its type, parent, mapped fields, and description.

## Work Item Relationships

Use Jira relationships for related tasks and dependencies, including blocked work.

1. Discover the site's available relationship types:

   ```bash
   twg jira workitem link-types query
   ```

2. Select an advertised relationship type. Do not guess its name, ID, or direction.
3. For a blocking dependency, orient the source and target so Jira represents the intended blocker and blocked work item.
4. Create the relationship:

   ```bash
   twg jira workitem link workitem \
     --id <SOURCE-KEY> \
     --target-id <TARGET-KEY> \
     --link-type-id <LINK-TYPE>
   ```

5. Use the advertised related-work relationship for non-blocking related tasks.
6. Query each created work item's links and confirm that the relationships match the approved dependency graph:

   ```bash
   twg jira workitem link query --issue-id <KEY>
   ```

## Pitfalls

- **Guessing Jira configuration** - discover work item types, fields, allowed values, and relationship types before writing.
- **Duplicating field content** - do not repeat Acceptance Criteria or relationships in the description when dedicated Jira fields represent them.
- **Flattening dependencies into prose** - use native work item relationships for related and blocked tasks.
- **Omitting the parent** - every task created from the Epic must use that Epic as its parent.
- **Using the wrong work item type** - select `Spike`, `Task`, or `Bug` according to the work's intent.
