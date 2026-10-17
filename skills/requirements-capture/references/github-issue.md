# GitHub Issue Requirements

Use this workflow when GitHub Issues is the selected requirements destination under [public-work-public-tracking](../../principle-public-work-public-tracking/SKILL.md).

## Workflow

1. Confirm the target repository, its visibility, and its contribution guidance. Check for an existing issue before creating one. Resolve sensitive information and publication authorization before any public write.
2. For an existing issue, read it with `gh issue view <number> --repo <owner/repo>`. Preserve its intent and existing context unless the requested update changes them.
3. Follow the repository's issue template when available. Otherwise use the [requirements template](local-spec.md#template) as the issue body; do not create a local spec merely to copy the template.
4. Create or update the issue:

   ```bash
   gh issue create --repo <owner/repo> --title "<feature> requirements" --body "<requirements>"
   gh issue edit <number> --repo <owner/repo> --body "<updated requirements>"
   ```

5. Use an existing suitable milestone to group related work or delivery goals. Create a new milestone only when needed and authorized; do not require a milestone for every issue.
6. Read the resulting issue, verify its requirements and milestone if used, and return its URL.

Keep requirements focused on user-facing outcomes. Implementation task breakdown belongs in Implementation Planning.
