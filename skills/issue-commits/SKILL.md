---
name: issue-commits
description: Commit verified work at issue boundaries when completing Linear, Jira, GitHub, or other tracked tasks, using Conventional Commits and issue references.
---

# Issue Commits

Use when implementing tracked work in a Git repository. Finish each coherent issue-sized slice with a commit before marking the issue Done or moving to the next task. Follow any explicit user or repository instruction not to commit.

1. Check `git status` before work and again before committing. Keep unrelated or pre-existing changes out of the commit; stage only files and hunks belonging to the completed slice. Never use `git add -A` blindly.
2. Run relevant checks, inspect `git diff --cached` and `git diff --cached --check`, and confirm the staged changes match the issue. Do not commit secrets, generated debris, or partial work as a completed task.
3. Use a Conventional Commit subject: `<type>(<scope>): <imperative summary>` (for example, `feat(otel): trace agent executions`). Choose a type that describes the change, such as `feat`, `fix`, `docs`, or `refactor`.
4. Explain non-obvious context in the body and reference every issue covered in a footer, for example `Refs: ALE-7, ALE-8` or `Refs: PROJ-123`. Prefer one commit per independently complete issue; one commit may reference several issues when the change is genuinely inseparable.
5. Verify the commit exists and the working tree state afterward. Only then update issue status, including the commit hash when the tracker supports it. Report any uncommitted work accurately.

If signing, hooks, or permissions block the commit, report the blocker and seek direction rather than silently bypassing the repository's controls or marking the issue complete. Do not push, amend existing commits, or rewrite history unless requested.
