---
name: principle-automate-mechanics
description: Apply across workflows when choosing between agent judgment, existing tools, and saved scripts. Proactively capture stable, repeatable mechanics as verified automation within the requested scope.
disable-model-invocation: true
---

# Automate Mechanics

Automate mechanics; reserve agents for judgment. Use agents to interpret ambiguity, make contextual decisions, and handle exceptions. Use tools and scripts for well-defined operations instead of asking an agent to reconstruct them on every run.

- Reuse existing commands, scripts, and platform capabilities before writing automation. Do not wrap a simple command without a useful added contract.
- Use ad-hoc commands to explore an unknown procedure. Once its mechanics are stable and useful to repeat, proactively save them within the requested work rather than leave them only in a transcript. Repetition, multi-step complexity, or operational risk can justify persistence before a second run.
- Apply this across skills: extraction, validation, scaffolding, transformations, and evidence collection can be automated even when the surrounding workflow requires judgment.
- Put reusable skill mechanics in that skill's `scripts/` directory and link their invocation from `SKILL.md`. Put project-specific automation in the project's established location. Do not modify a shared or installed skill outside the authorized write scope; report the reusable opportunity instead.
- Keep triggers, contextual choices, and exception handling in skill instructions. Scripts should expose unsupported or ambiguous cases for judgment rather than silently guess.
- Document invocation, inputs, outputs, dependencies, side effects, and failure behavior. Resolve bundled scripts relative to the skill directory, not the caller's working directory. Keep dependencies minimal and secrets out of saved artifacts.
- Verify observable behavior with representative inputs and relevant failure cases. Repeatable execution is not proof of correctness. Prefer safe reruns; document non-idempotent effects and preserve existing approval boundaries for destructive or external writes.
- Keep simple commands and genuinely disposable investigations lightweight. Do not create scripts solely for ceremony, speculative reuse, or a broader automation project outside the requested outcome.

**The tests:**

- "Am I reconstructing a stable procedure that a tool or saved script could perform?" Reuse it or capture the useful mechanics.
- "What still requires judgment?" Keep those decisions explicit and surface exceptions to the agent.
- "Can the next run find and execute this without the current transcript?" Save it with its owner and document its contract.
- "What proves this script is correct and safe to rerun?" Check results and failure behavior, not merely successful execution.
- "Does saving this automation serve the requested work?" If not, suggest the broader opportunity without expanding scope.
