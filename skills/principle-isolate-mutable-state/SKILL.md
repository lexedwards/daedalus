---
name: principle-isolate-mutable-state
description: Apply before writing or delegating work when actors may share files, branches, runtime resources, or other mutable state. Separate independent writers before coordinating unavoidable shared writes.
disable-model-invocation: true
---

# Isolate Mutable State

Remove unnecessary shared write targets before adding coordination. Apply this to implementation, experiments, and verification, whether or not a PR is planned.

- Identify what each actor can mutate, including source files, branch refs, generated artifacts, ports, databases, and caches.
- Give independent writers separate state and explicit ownership. Use a dedicated branch and worktree for a code-writing task; safely reuse one only when its ownership and existing changes are understood.
- Keep one active writer per workspace and branch. A separate worktree does not isolate shared Git refs, configuration, credentials, or external services.
- Separate runtime resources when checks or experiments can interfere. Use a separate clone, container, or environment when worktree isolation is insufficient.
- For genuinely shared invariants, enforce a single writer, sequential phase, lock, or atomic update. Serialize stack-topology changes across the clone; worktrees do not make concurrent rebases safe.
- Preserve pre-existing and uncommitted work. Do not reset, stash, transfer, or remove another actor's state to obtain a clean environment without authorization.

**The tests:**

- "What can another actor change underneath this work?" Separate that state or establish structural coordination before writing.
- "Does this check mutate the implementation environment?" Isolate the verifier's state when it could collide with a writer.
- "Is sharing necessary, or merely convenient?" Split independent state; coordinate only the invariant that remains shared.
