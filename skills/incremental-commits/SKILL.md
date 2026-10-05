---
name: incremental-commits
description: Checkpoint implementation through small verified commits using Conventional Commits, meaningful component scopes, and references to known issues in the task context. Use during implementation or when preparing commits, whether or not the work has a tracked issue.
---

# Incremental Commits

Checkpoint verified implementation as it grows; do not wait until an entire task is finished. Read [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) and [smallest-complete-change](../principle-smallest-complete-change/SKILL.md) when choosing boundaries. Follow explicit user or repository instructions not to commit.

## Checkpoint Workflow

1. Inspect `git status`, the diff, and recent commit conventions. Identify the increment's outcome and the known issues connected to it, including parent or wider-context issues supplied with the task.
2. Pair a new behavior expectation with its implementation in a passing checkpoint. Observe the check fail before the implementation when appropriate; do not commit that intentionally failing intermediate state. Behavior-preserving and documentation increments use their relevant checks instead of artificial tests.
3. Stage only the increment's files and hunks. Keep unrelated or pre-existing work out; never use `git add -A` blindly. Run relevant checks for the staged change, inspect `git diff --cached` and `git diff --cached --check`, and exclude secrets, generated debris, and incomplete work. A passing run that includes unstaged fixes does not verify the staged snapshot.
4. Write the subject and contextual references using the guidance below, then commit with repository hooks and signing intact. If controls or permissions block the commit, report the blocker rather than bypassing them.
5. Verify the commit exists and inspect the resulting working tree. Report the checkpoint and any remaining work. Publication, tracker completion, and merge are outside this skill; do not infer their authorization from a commit.

## Subject and Scope

Use `<type>(<scope>): <imperative summary>`, following repository conventions. Choose the type by intent: `feat` adds behavior, `fix` corrects behavior, `refactor` preserves behavior while changing structure, and `docs`, `test`, `perf`, or `chore` describe their respective changes.

The scope names the affected component or capability, such as `parser`, `tracing`, or `skills`. Reuse established scopes. Do not use an issue ID, branch name, or words such as `small` as the scope. Omit the optional scope when no single meaningful area applies; do not invent one to satisfy the syntax. If unrelated areas cannot share one clear outcome, split the commit.

Explain non-obvious reasons in the body. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer when the repository uses Conventional Commits' breaking-change convention.

## Issue References

Include references to every known issue materially connected to the increment, including a parent issue when it explains the wider purpose. Use the project's accepted syntax; distinguish contextual references from closure. Do not fabricate IDs, require a tracker for untracked work, or list unrelated issues merely because they appeared in the conversation.

Default to non-closing references. Use closing keywords only when the project's completion policy and the requested operation justify their effect.

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
