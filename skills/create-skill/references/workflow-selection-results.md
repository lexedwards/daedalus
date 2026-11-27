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

## Humanizer

Scenario: edit an AI-sounding technical retry note to match a plain voice sample, preserving facts, uncertainty, YAML, code, a command and link targets.

- Eleven runs reached the task; all loaded `humanizer` first, passed automated artifact checks and preserved the protected content in blind review.
- One revised Sol slot stopped before task execution because the candidate refused the separate description-transcription probe as private configuration. The runner reported a description mismatch, but the output was a refusal, not evidence of a real mismatch. It is retained as incomplete and was not replaced.
- Revised Sol loaded every companion in both completed runs (2/2); baseline Sol omitted `code-crafting` in all three. The missing third revised run prevents a complete three-repetition result.
- Revised Opus loaded no companions (0/3). Baseline Opus loaded commit guidance before committing in 2/3, but publication guidance was late in all three. Neither loaded writing companions.
- The judge preferred revised guidance in two Sol pairs, could not compare the incomplete Sol pair, and gave mixed Opus verdicts: a small revised advantage, a tie and a baseline advantage. All completed final notes were correct; there is no consistent cross-model workflow improvement.

Correction: make the technical-writing and maintained-documentation handoffs actionable in the workflow body, with later commit/publication boundaries. Keep them conditional so this SDLC correction does not impose an engineering lifecycle on fiction or standalone text. Behavioral validation of the correction remains outstanding; this batch does not meet the full promotion rule.

## Ideation

Scenario: challenge automatic archiving based on inactivity, then write an approved discussion brief preserving owner confirmation, seven-day restoration, legal-hold exclusion and no permanent deletion.

- All 12 runs loaded `ideation` first, passed automated artifact checks and produced correct final briefs without implementation or unauthorized edits.
- Sol loaded all companions on time in 3/3 revised runs and 2/3 baseline runs. Revised Opus loaded commit/publication guidance in 3/3 and both writing companions in 1/3; baseline Opus loaded no companions.
- The judge preferred revised guidance in four pairs and tied two. One baseline Opus run initially dismissed the legal-hold risk, then corrected it in the approved brief.
- Masked test exit codes weakened verification in all three revised Opus runs. The comparison supports narrower composition gains, not full workflow reliability or improved primary discovery.

Correction: add an explicit approved-artifact step with writing and later commit/publication handoffs. Replace the unconditional documentation-update pitfall with an authorization boundary. This preserves read-only discussion and the requested artifact type; the correction has static checks but no fresh behavioral evaluation.
