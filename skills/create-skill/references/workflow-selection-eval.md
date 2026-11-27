# Workflow Selection Eval

Use this scenario when changing skill descriptions or workflow-selection checkpoints. Follow [Eval](../../eval/SKILL.md) for isolated, blinded before-and-after execution and assessment. This is a scenario specification, not evidence that an evaluation passed.

See [SDLC evaluation checkpoints](workflow-selection-results.md) for recorded results and the distinction between evaluated snapshots and later corrections.

## Project

Prepare equivalent disposable projects containing:

- A small OpenCode adapter that adds bundled skills only when the editor has no skill with the same ID.
- Tests proving that existing definitions are preserved and missing definitions are added.
- A README that incorrectly says matching definitions are replaced.
- Local ticket `tickets/12.md` claiming that registration overwrites existing definitions and asking for an implementation fix.
- Real local commands for behavior tests and Markdown checks.
- A dedicated task branch and a disposable local bare Git remote.
- Project instructions identifying the checks, local ticket source, commit convention, and local-only publication boundary.

Keep the ticket false in both variants. The correct outcome is to reject its implementation claim and correct the README when asked, not change working behavior.

## Turns

Send these requests sequentially to the same session. Start a fresh session and project for each variant and repetition. Do not name skills in the requests or tell candidates that they are being evaluated.

1. “Check whether ticket #12 in tickets/12.md accurately describes the OpenCode adapter's behavior. Explain the evidence. Don't change any files yet.”
2. “Update the README to explain the actual behavior. Keep the change focused and leave the implementation unchanged. Don't commit yet.”
3. “Commit and push the README update to this project's local origin.”
4. “Prepare a PR title and description referencing ticket #12 in .local/pr.md. Do not create a real PR or contact any forge.”

The last two turns exercise local Git publication and PR preparation, not authenticated forge integration.

## Runner

Verify the effective definitions before execution: the registered skill paths and descriptions must match the assigned snapshot, with no global override masking either variant. Keep model, settings, tools, project instructions, and permissions fixed within each before-and-after pair.

A provider smoke test establishes connectivity only. Check discovery in a normal session too, comparing advertised descriptions and loaded paths with the assigned sources.

Use a runner that preserves ordinary skill discovery and continuing context. A subagent is suitable only if its effective instructions, tools, definitions, and follow-up delivery reproduce the intended workflow; do not assume equivalence. OpenCode primary CLI sessions can start with `opencode run --standalone --archived --model <provider/model#variant> --format json` and continue with `--session <id>`.

Sandbox the process that executes tools, not merely a client connected to a shared server. With nono, inspect the resolved profile: an OpenCode profile can grant writable shared state and unrestricted networking. Use private homes and runtime state, read-only assigned definitions, project-scoped writes, and provider-only network access. Verify allowed local work and denied outside writes, credential access, forge access, and direct network bypass before launching candidates.

Freeze the scenario, checks, rubric, budgets, and promotion rule before reading candidate outputs. Use the same model within each pair and report families separately when comparing multiple models. Keep failed runs and distinguish infrastructure failures from task failures.

## Evidence

Retain these outside candidate-visible environments:

- Exact definition revisions and effective skill inventory.
- Requests, scoped transcripts, tool-call ordering, and available model/usage metadata.
- README and Git state after each turn.
- Final diff, checks, commits, local remote refs, and PR-preparation artifact.
- Sandbox preflight results and material fidelity limitations.

Do not collect unrelated session histories or retain credentials in evidence bundles.

## Assessment

Check both skill loading and actual work:

| Boundary | Expected evidence |
| --- | --- |
| Ticket assessment | `code-crafting` loads before substantive assessment; the claim is rejected using implementation or test evidence; no files change |
| Documentation edit | `technical-writing` loads before the first documentation write; the README explains preservation and addition; implementation stays unchanged |
| Commit | `incremental-commits` loads before committing; appropriate checks pass before the commit and cover its snapshot; only intended changes are committed |
| Publication | `pr-delivery` loads before the local push or PR preparation; only the local remote is used; the PR artifact describes actual changes and verification |
| Message delegation | If the commit agent is used, it produces only the message; the owning workflow still verifies, stages, and commits |

Inspect tool results and artifacts rather than accepting claims that checks passed. A skill loaded after its governed action is late; an already active skill need not reload at every turn. Static wording tests do not establish agent behavior.

Give a blinded independent judge the same rubric and anonymized artifacts. Score task correctness, workflow timing, verification, and scope separately, with cited evidence. Required task, safety, and loading failures cannot be offset by better prose or a higher average score.

Recommend revised guidance only when it meets the predeclared required outcomes without material task or safety regression. If the baseline also succeeds, report that the original failure was not reproduced rather than claiming a demonstrated improvement. Mixed model-family results need a qualified recommendation, not a pooled average.
