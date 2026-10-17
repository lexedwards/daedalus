# Daedalus

[![GitHub release](https://img.shields.io/github/v/release/lexedwards/daedalus)](https://github.com/lexedwards/daedalus/releases/latest)

Skills, agents, and practices for deliberate AI-assisted engineering. Works with OpenCode and GitHub Copilot CLI, with more ecosystems to come.

## Why

AI can produce plenty of output. Daedalus helps make that output worth using.

- **Reduce AI slop.** Set concrete quality standards instead of accepting plausible-looking results.
- **[Use the right tool](skills/principle-automate-mechanics/SKILL.md).** Scripts for repeatable work, templates for structure, AI for judgment. Across workflows, reuse existing tools and proactively save useful procedures as verified scripts, including scripts bundled with skills.
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

[Public work, public tracking](skills/principle-public-work-public-tracking/SKILL.md) guides requirements and task placement: prefer GitHub Issues and milestones for public GitHub repositories, respect established trackers unless explicitly directed to change, and keep sensitive work private until safe to disclose.

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

### Releases

[CI](.github/workflows/ci.yml) runs the checks above for ordinary PRs and pushes to `main`. After checks pass on `main`, [Release Please](https://github.com/googleapis/release-please) maintains one accumulating release PR. Merge that PR when ready to publish: the next successful run creates the `vX.Y.Z` tag and GitHub release at its merge commit. Nothing is published to npm.

Use Conventional Commit messages in squash-merged PR titles or commits that land on `main`:

- `feat:` bumps the minor version, including before 1.0.0.
- `fix:` and alterations such as `docs:`, `refactor:`, `perf:`, `chore:`, `build:`, `ci:`, `test:`, `style:`, and `revert:` bump the patch version.
- Breaking changes (`!` or a `BREAKING CHANGE:` footer) bump the major version, including before 1.0.0.
- When changes accumulate, the largest required bump wins.

The release PR updates `package.json`, `plugin.json`, `.release-please-manifest.json`, and `CHANGELOG.md`. The README badge shows the latest published release, not unreleased changes on `main`. Automation starts from the existing `v0.2.0` release; do not manually bump versions for each feature PR.

#### One-time setup

1. Under repository **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. Organization policy must also permit this setting. The workflow creates PRs but does not approve or merge them.
2. Ensure Actions and the pinned third-party actions in the workflow are permitted by repository or organization policy. No personal access token or custom secret is required: only the release job grants the built-in `GITHUB_TOKEN` Contents, Issues, and Pull requests write permissions. Ordinary PR checks retain read-only permissions.

PRs created or updated by `GITHUB_TOKEN` do not automatically trigger PR workflows. We accept this for generated release PRs based on changes already checked on `main`. Review the version, changelog, and complete generated diff before merging; do not manually commit or merge changes into the release branch. Automation updates are not a guarantee that the branch cannot contain manual changes.

If branch protection requires **Checks**, a bot-created release PR may be blocked because its check never ran. Add an explicit validation mechanism for the release PR's current revision before enabling that requirement; do not bypass branch protection. The workflow does not change protection settings.

Keep the bot's `autorelease: pending` and `autorelease: tagged` labels intact: Release Please uses them to identify release PRs. If checks or release creation fail, inspect the run before retrying. Run **CI** manually on `main` from the Actions tab to retry release automation; dispatching on another branch runs checks only. Do not move an existing published tag to another commit.

## Credits

- Addy Osmani's [Agent Skills](https://github.com/addyosmani/agent-skills)
- Matthew Pocock's [Skills](https://github.com/mattpocock/skills)
- Dietrich Gebert's [PonyTail](https://github.com/DietrichGebert/ponytail)
- Lauren Tan ([@poteto](https://github.com/poteto))'s [pstack plugin](https://github.com/cursor/plugins/tree/main/pstack)
- Dex Horthy's [various talks](https://x.com/dexhorthy)
