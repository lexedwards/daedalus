---
name: incremental-commits
description: Use before any commit, including "commit and push", and when checkpointing verified work mid-task. Owns staging only the increment, checking the staged snapshot, commit messages in the repository convention, and issue references. Use pr-delivery for pushing and pull requests.
---

# Incremental Commits

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) for repeatable checks and evidence collection. Prefer existing Git and project commands; saved automation must preserve explicit staging, commit authorization, and unrelated work.

Checkpoint verified implementation as it grows, or prepare existing changes when asked to commit. Do not wait until an entire task is finished. Read [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) and [smallest-complete-change](../principle-smallest-complete-change/SKILL.md) when choosing boundaries. Follow explicit user or repository instructions not to commit.

Load this skill before the first commit even when a domain skill or message-generation agent already applies. The commit agent writes the message only; verification, staging, and committing remain this workflow's responsibility. A request to push also requires [pr-delivery](../pr-delivery/SKILL.md); this skill does not publish.

## Checkpoint Workflow

1. Inspect `git status`, the diff, and recent commit conventions. Identify the increment's outcome and the known issues connected to it, including parent or wider-context issues supplied with the task.
2. Pair a new behavior expectation with its implementation in a passing checkpoint. Observe the check fail before the implementation when appropriate; do not commit that intentionally failing intermediate state. Behavior-preserving and documentation increments use their relevant checks instead of artificial tests.
3. Stage only the increment's files and hunks. Keep unrelated or pre-existing work out; never use `git add -A` blindly. Run relevant checks for the staged change, inspect `git diff --cached` and `git diff --cached --check`, and exclude secrets, generated debris, and incomplete work. A passing run that includes unstaged fixes does not verify the staged snapshot. Run checks directly, or preserve their failure status with the shell's supported pipeline handling; `test-command | tail` alone does not gate a commit on test success. Stop on a failed or unknown check result.
4. Write the subject and contextual references using the guidance below, then commit with repository hooks and signing intact. If controls or permissions block the commit, report the blocker rather than bypassing them.
5. Verify the commit exists and inspect the resulting working tree. Report the checkpoint and any remaining work. Publication, tracker completion, and merge are outside this skill; do not infer their authorization from a commit.

## Subject and Scope

Follow the repository's commit convention. When none is established, default to Conventional Commits: `<type>(<scope>): <imperative summary>`. The following type and scope guidance applies when using that convention. Choose the type by intent: `feat` adds behavior, `fix` corrects behavior, `refactor` preserves behavior while changing structure, and `docs`, `test`, `perf`, or `chore` describe their respective changes.

The scope names the affected component or capability, such as `parser`, `tracing`, or `skills`. Reuse established scopes. Do not use an issue ID, branch name, or words such as `small` as the scope. Omit the optional scope when no single meaningful area applies; do not invent one to satisfy the syntax. If unrelated areas cannot share one clear outcome, split the commit.

Explain non-obvious reasons in the body. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer when the repository uses Conventional Commits' breaking-change convention.

## Issue References

Include references to every known issue materially connected to the increment, including a parent issue when it explains the wider purpose. Use the project's accepted syntax; distinguish contextual references from closure. Do not fabricate IDs, require a tracker for untracked work, or list unrelated issues merely because they appeared in the conversation.

Default to non-closing references in checkpoint commits. This does not govern completing PRs: read and apply [PR Delivery's issue-pairing rules](../pr-delivery/SKILL.md#pair-issues-with-prs) when publishing. Use commit-level closing keywords only when repository policy and the requested operation justify their effect.

```text
fix(parser): reject empty identifiers

Reject the missing identifier at the parse boundary.

Refs: #42
```

```text
feat(tracing): record request duration

Add the first measurement needed by the observability rollout.

Refs: ALE-7, PROJ-123
```

```text
docs(skills): explain publication permissions
```
