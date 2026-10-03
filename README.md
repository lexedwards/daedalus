# Agentic Workflow

A collection of agents, skills, and commands, with a Git-installable OpenCode V2 plugin.

## OpenCode V2

The plugin registers 14 current skills from `skills/`, including their supporting references and assets. `code-crafting-v1` remains an archived asset and is not registered. Existing skills with the same ID take precedence over the bundle. Skills load on demand through OpenCode; the adapter honors `disable-model-invocation` and the higher-priority `metadata.opencode/autoinvoke` field.

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

## Credits

- Addy Osmani's [Agent Skills](https://github.com/addyosmani/agent-skills)
- Matthew Pocock's [Skills](https://github.com/mattpocock/skills)
- Dietrich Gebert's [PonyTail](https://github.com/DietrichGebert/ponytail)
- Dex Horthy's [various talks](https://x.com/dexhorthy)
