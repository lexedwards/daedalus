# Jira Epic Requirements

Use this workflow when the user asks to capture requirements in a Jira Epic, create a requirements Epic, or update an existing requirements Epic.

## Artifact

Jira Epic requirements live in a Jira space selected by the user with the work item type `Epic`.

Use the Epic summary for the feature name and the description for the complete requirements document. Create and update the Epic with `twg`.

The user must provide the target Jira space key or ID. If they have not provided it, ask for it before reading metadata or creating or updating an Epic. Do not infer or hard-code a space.

Every Epic created or updated through this workflow must have the `AI` label. Use `--labels ci` when creating an Epic. Use `--add-labels ci` when updating an Epic so existing labels are preserved.

## Creating A Jira Epic

1. **Identify the Jira space**
   - Use the space key or ID supplied by the user.
   - If no space is given, ask the user for it before continuing.

2. **Name the Epic**
   - Derive a concise summary from the scoped work.
   - Ask only if multiple plausible summaries would change the meaning or scope.

3. **Gather context**
   - Use the current conversation first.
   - Explore the codebase lightly to align terminology, current behavior, and constraints.
   - Ask targeted questions only for contradictions, scope boundaries, or material decisions.

4. **Discover create metadata**
   - Query the current fields, schemas, and allowed values for an Epic:

     ```bash
     twg jira workitem field create-metadata --space <SPACE> --type Epic
     ```

   - Treat the live response as authoritative because Jira field configuration can change.
   - Gather values for every field marked as required.
   - Use returned `customfield_*` IDs for custom fields.

5. **Write the description**
   - Use the template below.
   - Cover the complete product scope of the requested work.
   - Put user stories inside numbered requirements so each story remains traceable to acceptance criteria.
   - Write Markdown and pass `--description-format markdown` so `twg` produces content compatible with Jira's Rich Text Editor.
   - Do not use Jira wiki markup.

6. **Create the Epic**
   - Create the work item with the required `AI` label:

     ```bash
     twg jira workitem create \
       --space <SPACE> \
       --type Epic \
       --summary "<feature> requirements" \
       --description "<completed Markdown template>" \
       --description-format markdown \
       --labels AI
     ```

   - Add metadata fields with `--field` or `--fields-json` when the create metadata requires them.
   - Read the created Epic and confirm its type, summary, description, and labels.

## Updating A Jira Epic

1. **Identify the Epic**
   - Use the Jira space supplied by the user.
   - If no space is given, ask the user for it before continuing.
   - Use the Jira key supplied by the user.
   - If no key is given, ask the user to identify the Epic when more than one plausible work item exists.
   - Confirm the Epic belongs to the supplied Jira space.

2. **Review current requirements**
   - Read the current Epic before changing it:

     ```bash
     twg jira workitem get <KEY> --fields summary,description,labels,issuetype
     ```

   - Confirm the work item is an Epic.
   - Preserve existing intent unless the user asks to change it.
   - Look for contradictions, obsolete assumptions, duplicated requirements, and missing scope boundaries.

3. **Gather targeted context**
   - Use light codebase exploration when current behavior or terminology matters.
   - Ask targeted questions only when ambiguity materially changes the update.

4. **Discover update metadata**
   - Query editable fields and allowed values before changing custom fields:

     ```bash
     twg jira workitem field update-metadata --id <KEY> --include-system-fields
     ```

   - Use returned `customfield_*` IDs and respect the advertised schemas and operations.

5. **Update the Epic**
   - Keep the description aligned with the template.
   - Maintain requirement numbering and acceptance criteria traceability.
   - Add the required label without replacing existing labels:

     ```bash
     twg jira workitem update \
       --id <KEY> \
       --description "<completed Markdown template>" \
       --description-format markdown \
       --add-labels AI
     ```

   - Include only the other fields that the requested update changes.
   - Read the updated Epic and confirm its summary, description, and `AI` label.

## Template

```markdown
# [Feature] Requirements

Brief statement of the product requirement and why it exists.

## Problem Statement

From the perspective of a user or affected actor, state what problem is being faced.

## Outcome

Describe the user-facing result that should be achieved.

## Requirements

### Requirement 1

**User Story**: As an <actor>, I want <feature change>, so that <benefit>.

#### Acceptance Criteria

1. **Given** <an action or state>, **when** <a situation occurs>, **then** <expected result>.

### Requirement 2

**User Story**: As an <actor>, I want <feature change>, so that <benefit>.

#### Acceptance Criteria

1. **Given** <an action or state>, **when** <a situation occurs>, **then** <expected result>.

## Decisions and Constraints

- Capture clarified product decisions, technical constraints, policy constraints, or compatibility requirements that shape the requirements.

## Out of Scope

- List related work that is intentionally excluded from this spec.

## Further Notes

- Add useful context that does not fit elsewhere.
```

## Pitfalls

- **Hard-coding a Jira space** - use the space key or ID supplied by the user and ask for it when absent.
- **Skipping metadata discovery** - required fields and allowed values can change by space and work item type.
- **Omitting the required label** - every create or update must leave the Epic with the `AI` label.
- **Replacing existing labels during an update** - use `--add-labels AI`, not `--labels AI`.
- **Using Jira wiki markup** - pass Markdown with `--description-format markdown`.
- **Duplicating user stories** - keep user stories inside numbered requirements, not in a separate top-level section.
- **Weak acceptance criteria** - Given/When/Then criteria should be observable and testable.
- **Turning constraints into implementation plans** - constraints may shape requirements, but should not prescribe task breakdowns or code structure.
- **Leaving scope implicit** - use `Out of Scope` to prevent adjacent work from being assumed.
