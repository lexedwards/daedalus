# Sources and Refresh Registry

Initial verification: 2026-10-02. Official inventory sources were read on that date; additional refresh entry points are labeled below. Source-backed claims use the pinned revisions below. No six-harness runtime test was performed. These are authoring references, not a claim that every branch change is already released.

## Shared specification

- [Agent Skills specification](https://agentskills.io/specification): six standard frontmatter fields, portable naming, layout, and constraints.
- The specification does not establish a harness's enforcement. Check both its loader and its consumers.

## OpenCode V2

| Source | Coverage |
| --- | --- |
| [V2 index](https://opencode.ai/v2/llms.txt) | Find moved or newly added pages |
| [Skills](https://opencode.ai/v2/docs/skills/) | Frontmatter, IDs, source order, catalogs, permissions |
| [Agents](https://opencode.ai/v2/docs/agents/) | Native options, merging, models, inactive request overlays |
| [Configuration](https://opencode.ai/v2/docs/config/) | JSONC locations and discovery order |

Evidence: documented. Unknown-field and malformed-frontmatter handling remain unverified where not described. Use only V2 pages. The config page recommends `https://opencode.ai/config.json`, but that URL may describe V1; retain it in editor examples without deriving V2 shapes from it.

## Codex

| Source | Coverage |
| --- | --- |
| [Skills](https://developers.openai.com/codex/skills) | Discovery, invocation, companion metadata, enablement |
| [Subagents](https://developers.openai.com/codex/subagents) | Standalone agents, global controls, model inheritance |
| [Configuration reference](https://developers.openai.com/codex/config-file/config-reference) | Refresh entry point for additional session keys; not exhaustively captured here |
| [Repository](https://github.com/openai/codex) | Parser and runtime refresh entry point |

Source revision: `ca466061d64f0b44f416135c7fd06aa7af850bbc` (main, inspected 2026-10-02).

Current branch paths under that repository:

| Path | Coverage |
| --- | --- |
| `codex-rs/skills/src/parser.rs` | Actual frontmatter fields, fallback name, limits, YAML repair |
| `codex-rs/skills/src/parser_tests.rs` | Refresh target for parser cases |
| `codex-rs/skills/src/interface.rs` | Interface fields, colors, icon path validation |
| `codex-rs/ext/skills/src/loader/metadata.rs` | Companion policy, dependencies, invalid metadata fallback |
| `codex-rs/agent-roles/src/agent_role_config.rs` | Agent metadata, nickname validation, flattened session config |
| `codex-rs/agent-roles/src/discovery.rs` | Refresh target for file discovery |
| `codex-rs/config/src/config_toml.rs` | Session configuration and `[agents]` options |
| `codex-rs/core/config.schema.json` | Schema refresh target; validation alone is not runtime evidence |

Evidence: documented and source-backed. The reference links the inspected parser files by commit. Full agent discovery conflict order and loader diagnostics for unknown TOML keys need further verification.

## Claude Code

| Source | Coverage |
| --- | --- |
| [Documentation index](https://code.claude.com/docs/llms.txt) | Discover current pages |
| [Skills](https://code.claude.com/docs/en/skills.md) | Full frontmatter table, parse fallback, precedence, upload differences |
| [Subagents](https://code.claude.com/docs/en/sub-agents.md) | Full agent table, skipped files, CLI definitions, plugin exceptions |

Evidence: documented. Pages include feature-specific minimum versions; preserve these when updating. Claude Code's complete runtime parser is not used as evidence here. Do not confuse local Claude Code loading with claude.ai upload validation.

## Cursor

| Source | Coverage |
| --- | --- |
| [Skills](https://cursor.com/docs/skills) | Frontmatter, scoping, compatibility directories, badge fallback |
| [Subagents](https://cursor.com/docs/subagents) | Fields, agent precedence, model fallback |

Evidence: documented. The `.md` variants returned 404 during this check; use the HTML pages. General unknown-field, malformed YAML, skill collision, and Codex TOML compatibility behavior are unverified.

## GitHub Copilot CLI

| Source | Coverage |
| --- | --- |
| [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | Primary source: skills and custom agents tables, full discovery order, model policy |
| [CLI skills guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills) | Authoring, license, resource files, reload |
| [CLI agents guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli) | Authoring, filename identity, repository instruction opt-in |
| [CLI config directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) | Settings affecting skill discovery and subagent dispatch |
| [Shared agent reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | Common schema, aliases, ignored tool names, product-specific differences |
| [CLI repository](https://github.com/github/copilot-cli) | Release notes and versioned behavior reports; not a public complete parser source |

Evidence: documented, with contradictions. The CLI command reference says user agents win over project agents, while the config-directory page says project agents win. The shared reference retires `infer` and adds invocation controls absent from the CLI-specific agent table. Retain both statements; do not infer CLI behavior from cloud or IDE documentation. General unknown-field handling is unverified for a current binary.

## Pi

Repository: [earendil-works/pi](https://github.com/earendil-works/pi/tree/main/packages/coding-agent). Source revision: `581e7ba78141a4d8b61cc9d11b8b22ae7e59195e` (main, inspected 2026-10-02).

Current branch paths under that repository:

| Path | Coverage |
| --- | --- |
| `packages/coding-agent/docs/skills.md` | Skill authoring, discovery, command behavior, naming |
| `packages/coding-agent/docs/settings.md` | Resource lists, path bases, enablement, default tools |
| `packages/coding-agent/src/core/skills.ts` | Exact consumed fields, warnings, fallbacks, first-wins collisions |
| `packages/coding-agent/src/core/resource-loader.ts` | Loading pipeline, explicit resource paths, system prompts |
| `packages/coding-agent/src/core/package-manager.ts` | Discovery, trust gating, source ranks before collision resolution |
| `packages/coding-agent/examples/extensions/subagent/README.md` | Example extension installation, invocation, inheritance |
| `packages/coding-agent/examples/extensions/subagent/agents.ts` | Agent fields, empty tools behavior, nearest project directory |
| `packages/coding-agent/examples/extensions/subagent/index.ts` | Dispatch settings and child process arguments |

Evidence: documented and source-backed. The agent inventory covers the upstream example extension, which must be loaded separately. Third-party Pi subagent packages can define different fields. Check the installed extension rather than assuming this example's schema applies.

## Refresh completion record

Update the verification header in each affected harness file. Record new source revisions here, preserve pinned links in those files, and update compatibility claims that depend on changed fields. A documentation-only refresh should say so. For failed fetches or unresolved differences, retain the previous date and record the gap rather than replacing it with a guessed behavior.
