# Agentic Workflow

A collection of agents, skills, and commands, with plugins for OpenCode V2 and GitHub Copilot CLI.

## OpenCode V2

The plugin registers all 14 skills from `skills/`, including their supporting references and assets. Existing skills with the same ID take precedence over the bundle. Skills load on demand through OpenCode; the adapter honors `disable-model-invocation` and the higher-priority `metadata.opencode/autoinvoke` field.

It also registers all eight agents from `agents/`: `adversarial`, `career-reviewer`, `commit`, `minion`, `orchestrator`, `reviewer`, `visual`, and `writing-critic`. The adapter preserves their prompts, model preferences, modes, visibility, step limits, and ordered permission rules. Existing agents with the same ID take precedence. Legacy top-level `reasoningEffort`, `textVerbosity`, and `temperature` fields are mapped to V2 request settings. Agents inherit OpenCode's default permission rules before their own rules are appended. The plugin does not change the default agent.

Requires OpenCode **2.0.11 or later**. The adapter targets the `@opencode/plugin` 2.0.11 API. External tools and integrations mentioned by individual skills must be available in the host.

### Install from Git

Once the plugin commit is pushed to the `overhaul` branch, install globally:

```sh
opencode plugin add 'github:lexedwards/agentic#overhaul'
```

Alternatively, add it to your global or project `opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["github:lexedwards/agentic#overhaul"]
}
```

The branch tracks development. For a reproducible install, replace `#overhaul` with a full commit SHA or a release tag that exists. Version `0.1.0` is package metadata; it does not imply that a `v0.1.0` Git tag has been published.

### Use a checkout

Install dependencies in the checkout:

```sh
bun install --frozen-lockfile
```

Point OpenCode at the checkout's plugin directory:

```jsonc
{
  "plugins": ["/absolute/path/to/agentic/.opencode/plugins"]
}
```

OpenCode also discovers `.opencode/plugins/index.js` automatically when working in this repository. Skill IDs stay unchanged, for example `harness-configuration` and `code-crafting`. Invoke explicitly with `@harness-configuration`, or ask OpenCode to load the skill by ID.

### Verify and update

Inspect plugin status and registered skills and agents from the target project:

```sh
opencode api plugin.list --param "location[directory]=$PWD"
opencode api skill.list --param "location[directory]=$PWD"
opencode api agent.list --param "location[directory]=$PWD"
```

Look for plugin ID `agentic` and skill paths under the installed package's `skills/` directory. A same-ID skill from another source retains its existing path.

The agent listing should include the eight bundled IDs alongside OpenCode's built-ins. `commit` and `minion` retain `hidden: true`, so they are omitted from normal interactive discovery and the subagent catalog. Agent model preferences require the corresponding provider and model to be available in the host.

Update a branch-based global installation with:

```sh
opencode plugin update 'github:lexedwards/agentic#overhaul'
```

Restart OpenCode after editing bundled skills or agents in a local checkout if changes are not picked up automatically. See the [OpenCode V2 plugin guide](https://opencode.ai/v2/docs/plugins) for loading and update behavior.

## GitHub Copilot CLI

The repository root is an Agent Plugins 1.0 plugin. Root `plugin.json` declares the canonical schema, `skills/` supplies all 14 shared skills, and `com.github.copilot/agents/` contains eight relative symlinks to the canonical `agents/` definitions. All targets remain inside the plugin root. There is no build or generation step.

Install from a checkout containing these files, without a build step:

```sh
copilot plugin install /absolute/path/to/agentic
copilot plugin list
```

In a new interactive session, use `/agent` and `/skills list` to inspect the plugin. Select the orchestrator explicitly with `copilot --agent orchestrator`. After changing a local checkout, reinstall it to refresh Copilot's cached components. Once the manifest is available on the repository's default branch, install directly with `copilot plugin install lexedwards/agentic`.

Agents are OpenCode-first and shared directly with Copilot. Edit `agents/` to update both installations. User or project agent definitions with matching IDs take precedence over plugin agents, allowing host-specific overrides.

Copilot runtime installation and behavior have **not** been verified on this machine. Local checks validate the manifest, shared skill inventory, and agent symlink targets and containment. See GitHub's [plugin creation guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating) and the [Agent Plugins specification](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md).

## Development

The adapter is JavaScript and requires no compilation. Run:

```sh
bun install --frozen-lockfile
bun test test
bun run check:package
npx --yes markdownlint-cli "**/*.md" --ignore node_modules --config .markdownlint.yaml
```

The tests cover skill and agent registration, reference access, duplicate handling, YAML parsing, invocation controls, agent model variants, settings, and permissions. The package check previews Git package contents; it does not publish anything. Released inventories live in `.opencode/plugins/skills.mjs` and `.opencode/plugins/agents.mjs`.

The initial adapter was also checked in OpenCode 2.0.11 using an isolated configuration: installation from a temporary Git repository, active plugin status, all 14 registered skills, and access to cached reference files. GitHub installation requires pushing the plugin commit; model-driven skill selection was not exercised by these checks.

The agent bundle was checked through a packaged snapshot installed from a temporary Git repository in an isolated OpenCode 2.0.11 server. All eight agents and 14 bundled skills registered, with reviewer model preferences, request settings, and permission rules preserved. These checks did not invoke the agents' models.

The Copilot tests check the root manifest, shared skill inventory, and all eight agent symlinks. Keep the version in `plugin.json` aligned with `package.json`.

## Credits

- Addy Osmani's [Agent Skills](https://github.com/addyosmani/agent-skills)
- Matthew Pocock's [Skills](https://github.com/mattpocock/skills)
- Dietrich Gebert's [PonyTail](https://github.com/DietrichGebert/ponytail)
- Dex Horthy's [various talks](https://x.com/dexhorthy)
