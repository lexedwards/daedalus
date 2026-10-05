---
name: issue-commits
description: Commit verified increments of Linear, Jira, GitHub, or other tracked work using Conventional Commits and issue references, and update completion only at the agreed delivery gate.
---

# Issue Commits

Use when implementing tracked work in a Git repository. Read and apply [sequence-verifiable-slices](../principle-sequence-verifiable-slices/SKILL.md) when choosing commit boundaries. Follow any explicit user or repository instruction not to commit.

1. Check `git status` before work and again before committing. Keep unrelated or pre-existing changes out of the commit; stage only files and hunks belonging to the completed slice. Never use `git add -A` blindly.
2. Run relevant checks, inspect `git diff --cached` and `git diff --cached --check`, and confirm the staged changes match the issue. Do not commit secrets, generated debris, or partial work as a completed task.
3. Use a Conventional Commit subject: `<type>(<scope>): <imperative summary>` (for example, `feat(otel): trace agent executions`). Choose a type that describes the change, such as `feat`, `fix`, `docs`, or `refactor`.
4. Explain non-obvious context in the body and reference every issue covered in a footer, for example `Refs: ALE-7, ALE-8` or `Refs: PROJ-123`. An issue may have several complete increments; one commit may reference several issues when the change is genuinely inseparable. Use non-closing references until the issue's completion gate is met.
5. Verify the commit exists and the working tree state afterward. Record progress with the commit hash when the tracker supports it, but mark the issue Done only at the project's agreed delivery gate. If that gate is unspecified, report progress without marking Done. Report any uncommitted work accurately.

If signing, hooks, or permissions block the commit, report the blocker and seek direction rather than silently bypassing the repository's controls or marking the issue complete. Do not push, amend existing commits, or rewrite history unless requested.
