# GitHub Copilot CLI

Verified: 2026-10-02. Evidence: current official documentation, not a local binary reproduction. Prefer the [CLI command reference][cli] for CLI authoring; the [shared agent reference][shared] also covers cloud and IDE products and differs in places.

## Skill fields

Location: `SKILL.md` YAML frontmatter. Sources: [CLI skills reference][cli], [skills guide][skills].

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Required, max 64 characters | Invocation identity; CLI permits letters/numbers then letters, numbers, hyphens, underscores, dots, colons, spaces |
| `description` | string | Required, max 1024 characters | Skill selection guidance |
| `argument-hint` | string | Absent | Skill picker argument hint |
| `allowed-tools` | Comma-separated string or string list | No authored automatic grants | Automatically allowed while active; `*` allows all tools |
| `user-invocable` | boolean | `true` | User slash invocation |
| `disable-model-invocation` | boolean | `false` | Prevent automatic invocation |
| `license` | string | Optional | Documented by skills guide, absent from CLI reference table; metadata rather than an operational control |

The skills guide recommends lowercase names matching directories, while the CLI reference documents a broader accepted name alphabet. Use matching kebab-case names for portability. A directory mismatch is not documented as a rejection; exact enforcement is unverified.

Unknown skill fields, malformed YAML, wrong types, and exact diagnostics are unverified for a current binary. Historical CLI issue reports describe warnings or discovery bugs, but do not establish today's behavior. `allowed-tools` grants pre-approval, not exclusive access; tools outside it can still be used through permission checks.

## Skill priority and settings

Source: [CLI command reference][cli]. First found wins for duplicate names:

1. Project `.github/skills`.
2. Project `.agents/skills`.
3. Project `.claude/skills`.
4. Parent `.github/skills`.
5. User `~/.copilot/skills`.
6. User `~/.agents/skills`.
7. Plugin directories.
8. Custom `COPILOT_SKILLS_DIRS` (comma-separated directories).
9. `.github/skills` under added roots.
10. Bundled skills; remote organization/enterprise skills also follow name-based local priority as described in the reference.

The published table does not fully rank remote versus built-in sources. Keep that detail unverified. Same-name plugin skills coexist through plugin-qualified invocation names; the bare name routes to the higher-priority plugin. Skill definitions outrank same-name `.claude/commands` files.

Source: [configuration directory reference][settings]. These fields affect skills and subagents; they are not skill frontmatter.

| Field | Type | Default | Location/effect |
| --- | --- | --- | --- |
| `skillDirectories` | string array | `[]` | User settings: extra sources |
| `ignoredSkillsLocations` | string array | `[]` | User settings: excludes directories and descendants; supports `~` |
| `disabledSkills` | string array | `[]` | User settings and repository subset: discovered names disabled; repository values union with user values |
| `dynamicRetrieval.skills` | boolean | Unset | User settings: embeddings-based skill retrieval control |
| `customAgents.defaultLocalOnly` | boolean | `false` | User settings: exclude remote org/enterprise agents |
| `subagents.agents.<name>.model` | string | Inherited/default resolution | User settings: per-agent model; `inherit` uses parent |
| `subagents.agents.<name>.modelPolicy` | `preferred`, `required` | Authored/runtime resolution | User settings: model lock unless definition already requires its models |
| `subagents.agents.<name>.effortLevel` | string | Inherited/default resolution | User settings: effort; `inherit` uses parent |
| `subagents.agents.<name>.contextTier` | `default`, `long_context`, `inherit` | Inherited/default resolution | User settings: context tier |
| `subagents.disabledSubagents` | string array | `[]` | User settings: dispatch blocklist; rubber-duck cannot be disabled here |
| `subagents.maxConcurrency` | number | Plan-based | User settings: usage-based billing only; capped at 32 |
| `subagents.maxDepth` | number | `6` | User settings: usage-based billing only; capped at 256 |

User settings live in `~/.copilot/settings.json`, or under `COPILOT_HOME`. Repository settings live in `.github/copilot/settings.json`; local overrides in `.github/copilot/settings.local.json`. Only a published subset is accepted in repository/local files; other keys, even valid user keys, are silently ignored. In this table, only `disabledSkills` is in that repository subset. Do not put `skillDirectories` or `subagents` there and expect an effect.

Use `/skills reload` after edits and `/skills info NAME` to inspect the result. CLI `copilot skill list --json` reports discovered names, paths, sources, and enablement. Registering a directory adds a source rather than copying it.

## Agent fields

Location: `.agent.md` or `.md` YAML frontmatter; body contains instructions. Source: [CLI custom agents reference][cli].

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `description` | string | Required | Delegation and picker summary |
| `name` | string | File-path-derived agent ID | Display/selection alias, not deduplication identity |
| `tools` | string array | `["*"]` | Exclusive available tool set; any `*` entry grants all tools |
| `model` | string | Outer session model | Authored preference; Auto session model causes resolved session inheritance |
| `models` | string array | Absent | Priority-ordered authored models; overrides `model` when both set |
| `modelPolicy` | `preferred`, `required` | `preferred` | `required` prevents substituting an unauthored model and blocks model override |
| `reasoningEffort` | string | Outer effort | Agent effort preference; current model support applies |
| `infer` | boolean | `true` | Automatic delegation |
| `mcp-servers` | Map | Absent | Agent server config using `mcp-config.json` schema |
| `include-custom-instructions` | boolean | `false` | Repository instruction opt-in when spawned as subagent |

The [shared schema][shared] additionally documents these fields, not all present in the CLI-specific agent table:

| Field | Type/default | Scope or uncertainty |
| --- | --- | --- |
| `target` | `vscode`, `github-copilot`; unset both | Product target from shared reference; exact CLI filtering unverified |
| `disable-model-invocation` | boolean, `false` | Shared reference describes cloud auto-selection; says it wins over `infer`; CLI behavior unverified |
| `user-invocable` | boolean, `true` | Shared manual selection control; CLI behavior unverified |
| `metadata` | String-to-string map | Shared annotation metadata; not used in IDE agents; CLI operational effect unverified |

The shared schema accepts comma-separated `tools` strings as well as arrays, and says unrecognized tool names are ignored. Use arrays for CLI authoring. Unknown frontmatter keys, malformed YAML, invalid field types, and unknown model-ID diagnostics remain unverified; do not generalize tool-name ignoring to every field. Shared-schema `infer` is retired in favor of invocation controls; CLI still documents `infer`, so retain this product-specific difference.

## Agent identity, priority, and conflicts

Source: [CLI command reference][cli], with contradiction from [config directory][settings].

- File identity is path relative to `agents`, minus `.md`/`.agent.md`, with separators replaced by `--`: `team/reviewer.agent.md` → `team--reviewer`.
- First loaded agent with an ID wins. Different IDs with the same `name` both load; ambiguous selection uses first match.
- CLI-specific priority: user `~/.copilot/agents` → project `.github/agents` → project `.claude/agents` → added-root `.github/agents` → plugin agents → remote agents.
- Project rows scan current directory upward to Git root; every `.github` agent source outranks every `.claude` source.
- **Contradiction:** the config-directory page says project agents beat personal ones. The CLI command reference says user agents win; use that for authoring and verify the selected file before relying on a collision.
- Per-call model/effort → user subagent override → definition → parent. `modelPolicy: required` changes override/fallback behavior. An unavailable authored preference normally falls back to the session; required policy refuses dispatch.
- `--no-custom-instructions` overrides `include-custom-instructions: true`. A selected main agent receives repository instructions normally, unlike a custom agent spawned as a subagent.
- The creation guide requests restart after new agents. Inspect `/agent` rather than assuming live reload.

[cli]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
[skills]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills
[settings]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
[shared]: https://docs.github.com/en/copilot/reference/custom-agents-configuration
