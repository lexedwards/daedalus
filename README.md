# Daedalus

Skills, agents, and practices for deliberate AI-assisted engineering. Works with OpenCode and GitHub Copilot CLI, with more ecosystems to come.

## Why

AI can produce plenty of output. Daedalus helps make that output worth using.

- **Reduce AI slop.** Set concrete quality standards instead of accepting plausible-looking results.
- **Use the right tool.** Scripts for repeatable work, templates for structure, AI for judgment.
- **Apply proven practices.** Use specific skills and principles for coding, planning, writing, and review.
- **Course-correct.** Tailor guidance to your project, challenge assumptions, and adjust as evidence emerges.

## Install

Install from `lexedwards/daedalus` on the `main` branch.

### OpenCode

Requires **OpenCode 2.0.11 or later**. Install globally:

```sh
opencode plugin add 'github:lexedwards/daedalus#main'
```

Start a new session. The plugin registers the bundled skills and agents; existing definitions with matching IDs take precedence.

To use a local checkout globally, run `bun install --frozen-lockfile` there and add its root directory to your global `~/.config/opencode/opencode.jsonc`:

```jsonc
{
  "plugins": ["/absolute/path/to/daedalus"]
}
```

The implementation lives in `plugins/` so OpenCode does not auto-load a second copy when you work in this checkout. If your configuration points to the old `.opencode/plugins/` directory, replace that path with the checkout root.

### GitHub Copilot CLI

Install from a checkout:

```sh
git clone --branch main https://github.com/lexedwards/daedalus.git daedalus
copilot plugin install ./daedalus
copilot plugin list
```

In a new interactive session, use `/skills list` and `/agent` to inspect what's available. Reinstall after changing the checkout to refresh Copilot's cached components.

The Copilot manifest and agent links are tested locally; runtime installation has not yet been verified.

## Getting started

1. Open your project in OpenCode or Copilot CLI.
2. Describe a concrete task and name the relevant skill. Any external tools or integrations it needs must be available in your environment.
3. Supply your project's constraints and conventions. Refine the approach as the work develops.

Try these prompts:

```text
Use code-crafting to investigate and fix this bug: [reproduction steps].

Use requirements-capture to define this feature before implementation: [idea].

Use harness-configuration to adapt these agents to my setup: [environment].
```

For coordinated work, select the `orchestrator` agent in OpenCode, or start Copilot with `copilot --agent orchestrator`. Some specialist agents specify models that must be available in your host.

### Delivery method

[Code Crafting](skills/code-crafting/SKILL.md) combines [isolated mutable state](skills/principle-isolate-mutable-state/SKILL.md), [verifiable slices](skills/principle-sequence-verifiable-slices/SKILL.md), and [integration through review](skills/principle-integrate-through-review/SKILL.md). [PR Delivery](skills/pr-delivery/SKILL.md) handles publication and requested follow-up; it does not provision workspaces.

Code Crafting owns implementation and defaults to isolated work, [incremental commits](skills/incremental-commits/SKILL.md), and PR delivery. Each PR must deliver a complete useful outcome, not merely a small diff. A PR can contain several passing checkpoints; dependent outcomes form small stacks instead of one growing branch. Local verification, publication, readiness, and integration are reported separately.

These defaults do not need to be repeated in task prompts. Existing permissions and repository instructions govern commits and publication; unclear authority is resolved before the write. Merging requires separate explicit authorization. Local-only instructions override publication, and unavailable tools or access are reported as blockers. These are skill-guided practices, not runtime enforcement. Repository rules provide required CI and approval gates.

Ask for implementation to enter Code Crafting, or publication of existing work to enter PR Delivery. PR Delivery returns implementation findings to the owning workflow rather than invoking Code Crafting recursively.

```text
Implement [change].

Open a PR for these verified changes.

Fix [bug], local-only.
```

## What's included

- **[Skills](skills/)** — task-specific workflows for implementation, requirements, planning, technical writing, configuration, and more.
- **[Agents](agents/)** — an orchestrator and specialists for code review, adversarial checks, visual analysis, execution, and commits.
- **[Integrations](plugins/)** — an OpenCode V2 plugin and a [Copilot plugin manifest](plugin.json), sharing the same source definitions.

## Development

Requires Bun and Node.js for the local Markdown lint CLI. No compilation step is needed.

```sh
bun install --frozen-lockfile
bun test test
bun run check:package
bun run lint
```

## Credits

- Addy Osmani's [Agent Skills](https://github.com/addyosmani/agent-skills)
- Matthew Pocock's [Skills](https://github.com/mattpocock/skills)
- Dietrich Gebert's [PonyTail](https://github.com/DietrichGebert/ponytail)
- Lauren Tan ([@poteto](https://github.com/poteto))'s [pstack plugin](https://github.com/cursor/plugins/tree/main/pstack)
- Dex Horthy's [various talks](https://x.com/dexhorthy)
