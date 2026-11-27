# SDLC Evaluation Checkpoints

## Protocol and limits

The six-skill experiment compares baseline `864ac68663c1c6cf2c7c3c7881f1c4366cad8f32` with revised `6bab5d46455edbddca69929be981f1b4205699f2`. Each skill has one scenario, two models, two variants and three repetitions: 12 candidate slots per skill, 72 total.

Models are `openai/gpt-6.2-sol#high` and `claude-agent/opus#medium`. Provider aliases are not independently pinned upstream versions. Each candidate uses a fresh private environment inside nono, ordinary skill discovery, and four fixed turns: read-only assessment, approved document creation, commit/local push, and local PR-description preparation.

Candidates do not receive variant identities, evaluator context or the rubric. Each completed batch receives independent, tool-disabled, blinded Opus judging. Artifact and Git checks are separate from judging. The source snapshots, prompts, rubric and budgets stay fixed while later corrections are checkpointed separately.

These are synthetic documentation scenarios, not live forge integration or evidence across every use of a skill. Final evaluator checks do not establish candidate pre-commit verification. Identical document captures can support reuse of earlier checks; a missing commit-turn rerun alone is not a failure. Pipelines that hide a test's exit code remain weak enforcement even when visible output shows a pass.

Local evidence is retained at `/tmp/opencode/sdlc-evaluation/`: `contract.json`, per-run transcripts and artifacts, and per-skill `verification.json` and `judge-report.md`. Credentials and runtime homes must not be published. The summaries below are sanitized findings, not the raw evidence or a claim that later corrections passed behavioral evaluation.

## Create skill

Scenario: inspect existing conventions, then author a project-local release-drafting skill without altering an existing skill or implementing executable automation.

- All 12 runs loaded `create-skill` before substantive work. Primary discovery therefore tied.
- All 12 passed automated artifact checks and preserved authorization boundaries. Blind review noted one baseline artifact's weak diff-evidence instructions.
- Sol loaded all four companions on time in baseline and revised runs (3/3 each). Opus loaded neither writing companion in either variant (0/3 each); revised Opus loaded commit and publication workflows in time (3/3), versus 0/3 baseline.
- The judge preferred revised guidance in three pairs and tied three. This supports a narrower handoff improvement, not complete workflow adherence. Several Opus test pipelines hid exit codes.

Correction: add explicit companion-loading actions at authoring and commit/publication boundaries in `create-skill`, rather than relying on its advertised description. This correction is statically checked but is **not** the revised snapshot evaluated above; its behavioral effect remains unverified. The generated release-drafting skills were inspected, not exercised on populated release history.

## Decision capture

Scenario: record an agreed EU tenant-isolation decision as the next accepted ADR, preserving an existing ADR and avoiding implementation details.

- All 12 runs loaded `decision-capture` first, passed automated artifact checks, and produced correct, scoped ADRs in blind review.
- Revised Sol loaded all companions on time (3/3), versus 0/3 baseline; baseline Sol omitted `code-crafting` and once loaded publication guidance after pushing.
- Neither Opus variant loaded writing companions (0/3 each). Revised Opus loaded commit guidance in time (3/3) and publication guidance before pushing in 2/3, versus 0/3 for both in baseline.
- The judge preferred revised guidance in all six pairs. Masked test exit codes still weakened Opus verification; primary discovery and artifact correctness did not improve because both variants already succeeded.

Correction: include maintained ADR changes in the advertised `code-crafting` pairing and require both writing companions before the first ADR write. Add explicit commit/publication handoffs without authorizing implementation. This follow-up is statically checked, not behaviorally re-evaluated.
