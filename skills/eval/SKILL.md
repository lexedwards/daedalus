---
name: eval
description: Evaluate a cited change to an agent environment through realistic, blinded before-and-after work informed by the current project. Use only when the user explicitly invokes eval or requests this skill.
disable-model-invocation: true
---

# Eval

Evaluate a cited change in the complete working environment. The change determines what to investigate; the host project determines how; completed work determines whether it helped.

Always give both variants the same tasks and keep candidates blind to the experiment. These are built-in requirements; the user only needs to identify the change.

## Entry

Run only at the user's explicit request. If invoked without an identified change, immediately ask **“What change should be evaluated?”** Wait for the answer before discovering the environment or designing the experiment.

Resolve references such as “this change” from the supplied diff, branch, files, or conversation. A change may span skills, principles, agents, configuration, or their interactions. Evaluate its combined effect rather than testing each instruction in isolation.

## Workflow

### 1. Identify the change and baseline

- Resolve the exact before-and-after definitions. Default to the environment immediately before the cited change; ask if the baseline is ambiguous.
- State the expected behavioural effect and what would count as a regression. Treat these as hypotheses, not conclusions.
- Pin both variants and the common project starting state. Preserve unrelated and uncommitted work; do not assume the working tree or `HEAD` represents either variant correctly.

### 2. Discover the effective environment

- Inspect applicable project and user instructions, available skills and agents, discovery and precedence rules, tools, model/settings, and real verification commands.
- Distinguish installed definitions from effective definitions. Check whether overrides would mask the change in an ordinary session.
- Identify representative work, architectural constraints, and interactions that could amplify or counteract the change.
- Establish how to run fresh candidates and obtain their artifacts and transcripts in this harness. Do not invent commands or assume subagents reproduce primary-session discovery, instructions, or tools.
- If the available runner cannot faithfully load both variants or isolate candidate context, explain the concrete limitation and ask for the missing capability. Do not present an in-conversation simulation as an executed evaluation.

### 3. Design scenarios and assessment

- Default to three bounded scenarios: a typical task affected by the change, a difficult interaction or edge case, and an adjacent regression case. Adapt to the host project and the cited change; explain the selection.
- Write organic user requests. Include normal requirements and constraints, but no experiment framing, variant identities, hidden rubric, or instructions to report which principles were followed.
- Let candidates discover and combine guidance normally. Explicit skill loading belongs in a request only when it is part of the real workflow being evaluated.
- Define executable acceptance checks where possible and 3–6 concrete judgment criteria with scoring anchors. Assess task success, preserved behaviour, project fit, proportionate verification, and unnecessary work or intervention as relevant.
- Define material failures and the promotion rule before running. A higher subjective score must not compensate for a failed required outcome.
- Fix the scenarios, checks, rubric, and run budget before inspecting outputs. Do not rewrite them to favour a result; a necessary redesign starts a new experiment.

### 4. Prepare independent environments

- Create ephemeral project-shaped environments outside the source working tree. Use a project snapshot or a synthetic project that preserves the relevant structure, constraints, verification facilities, and combined guidance.
- Give each run its own writable project and independent session. Baseline and revised runs start from equivalent project state, differing only in the cited environment change.
- Reproduce relevant user-level guidance and configuration without allowing live discovery paths to leak the other variant or override the staged definitions. Record any differences from the host environment that could affect the conclusion.
- Keep experiment records, judge-only checks, rubric, transcripts, and variant mapping outside candidate-visible context. Use neutral, project-shaped paths and labels; conceal experiment-specific names rather than removing ordinary project tests or testing requirements.
- Candidates must not inherit the evaluator's conversation, know other candidates exist, or share artifacts, memory, caches of prior answers, or mutable external state. Preserve equivalent useful dependencies and tool access.
- Replace task-related external writes with independent local fixtures or sandboxes where needed. Record the fidelity tradeoff; candidate work must not alter the host project or shared live resources.

### 5. Run the paired comparison

- Default to the current model and settings, held fixed across variants, with two independent repetitions per scenario. Use equal tool access and per-run budgets; state the planned run count and limits before launch. Honour a supplied budget and label a single-repetition comparison as exploratory.
- Run candidates in fresh sessions using the host harness's supported runner. Parallelise independent runs when resources allow; vary execution order when timing or shared resource contention could bias results.
- Give each pair the same task prompt and equivalent starting context. Do not coach struggling candidates. If the normal task requires user answers, apply the same answer policy and record interventions.
- Collect final artifacts, checks, scoped transcripts, actual model/settings, and available time, token, and cost measurements. Read only transcripts belonging to these runs, never unrelated workspace histories.
- Retain failures, timeouts, and incomplete outputs. Distinguish a task failure from runner infrastructure failure; record infrastructure retries rather than silently replacing poor results.

### 6. Verify and judge

- Run the predeclared acceptance checks against final artifacts. Verify judge-only checks independently of candidate self-reports.
- Give one independent judge all completed artifacts under neutral labels and the same rubric. Withhold variant mapping, model identities, expected winner, and evaluation-design conversation. Prefer a different model family when available; record the actual judge and any limitation.
- Ask for criterion-level assessments with cited evidence, required-outcome failures, and a comparative verdict. Judge actual outcomes, not verbosity, ceremonial compliance, or claimed skill use.
- Read every output and compare it with the judge's assessment. Inspect scoped transcripts to explain routing, discovery, tool use, and interactions; opening a file alone does not prove its guidance helped.
- Investigate disagreements against concrete evidence. Judge consensus is not proof. Record unresolved ambiguity and do not force a winner.
- Compare paired results and repetitions. Report tradeoffs and variability; do not claim statistical confidence from a small pilot or generalise beyond the represented environments and models.

### 7. Report and recommend

Return:

- **Change and baseline:** exact definitions or revisions compared and the hypothesis.
- **Environment and fidelity:** effective guidance, runner/model/settings, representative scenarios, and consequential differences from the host.
- **Assessment:** acceptance checks, rubric, promotion rule, repetitions, and budgets.
- **Results:** per-scenario outcomes for both variants, verification evidence, failures, interventions, available resource measurements, and judge verdict.
- **Synthesis:** behavioural explanations from artifacts and transcripts, regressions, disagreements, and evidence limitations.
- **Recommendation:** promote, retain the baseline, or gather more evidence, with reasons tied to the predeclared criteria.
- **Evidence:** artifact and transcript locations, reproduction details, and ephemeral-environment cleanup status.

Keep evidence outside candidate environments and preserve it before cleaning up disposable working directories. Do not automatically edit or promote the evaluated change. A recommendation is the deliverable.

## Example

```text
/eval this change to code-crafting
```

Resolve the cited change, discover this project's complete environment, and design tasks that exercise the expected effect and adjacent regressions.
