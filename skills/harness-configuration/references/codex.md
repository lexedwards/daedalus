# Codex

Verified: 2026-10-02. Evidence: [official skills][skills] and [subagents][agents] documentation plus source at `ca466061d64f0b44f416135c7fd06aa7af850bbc`. Branch evidence may be newer than an installed release.

## Skill frontmatter

Location: `SKILL.md`. Documentation requires `name` and `description`; the inspected [parser][parser] also permits a missing/blank name and falls back through its caller-provided default.

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Documented required; parser fallback when absent/blank | Skill identity; whitespace normalized; 1–64 characters after fallback |
| `description` | string | Required, non-empty | Routing summary; whitespace normalized |
| `metadata.short-description` | string inside map | Optional | Parsed short summary |
| Other frontmatter keys | Not consumed by inspected parser | Optional | Unknown keys ignored; no demonstrated enforcement of `allowed-tools`, `disable-model-invocation`, `paths`, `context`, or `agent` here |

Source-backed: the parser uses typed deserialization without unknown-field rejection. Incorrect types for consumed fields can fail parsing. Frontmatter must have opening/closing `---`; missing description, invalid YAML that cannot be repaired, or an overlong name returns a parse error. The parser attempts a narrow repair of unquoted scalar prose before failing. It does not check name/directory equality or the portable kebab-case pattern and has no description-length check in this function. Use portable constraints anyway; other validation paths may differ.

## Companion file

Location: `agents/openai.yaml` inside the skill. This is skill metadata, not a custom agent definition. Sources: [skills][skills], [metadata loader][metadata], [interface validation][interface].

| Field | Type | Default | Meaning/validation |
| --- | --- | --- | --- |
| `interface.display_name` | string | Absent | UI name; blank or >64 characters ignored with warning |
| `interface.short_description` | string | Absent | UI summary; blank or >1024 characters ignored with warning |
| `interface.icon_small` | Relative path string | Absent | Local skill icon under `assets/`; invalid path ignored |
| `interface.icon_large` | Relative path string | Absent | Same validation; plugins can resolve parent paths into shared plugin `assets/` |
| `interface.brand_color` | string | Absent | `#RRGGBB`; invalid value ignored with warning |
| `interface.default_prompt` | string | Absent | Suggested prompt; blank or >1024 characters ignored with warning |
| `policy.allow_implicit_invocation` | boolean | `true` operational default | `false` suppresses implicit selection; explicit `$skill` remains |
| `policy.products` | Array of product enum values | Empty | Source-only product targeting metadata; exact product behavior and current enum values need verification before authoring |
| `dependencies.tools` | Array of objects | Empty | Declared tool dependencies |
| `dependencies.tools[].type` | string | Required per usable dependency | Dependency type, documented example `mcp` |
| `dependencies.tools[].value` | string | Required per usable dependency | Dependency identifier |
| `dependencies.tools[].description` | string | Absent | Dependency explanation |
| `dependencies.tools[].transport` | string | Absent | Documented example `streamable_http` |
| `dependencies.tools[].url` | string | Absent | Dependency endpoint |
| `dependencies.tools[].command` | string | Absent | Source-only command metadata |
| `dependencies.tools[].oauth.callbackPort` | Unsigned 16-bit integer | Absent | Source-only OAuth callback port; `callback_port` alias accepted |

Unknown keys in the inspected companion structs are ignored. Invalid YAML or incompatible consumed-field types cause the optional companion metadata to be ignored with a warning; `SKILL.md` still loads. Individual blank/overlong dependency strings are dropped; a dependency without usable `type` or `value` is omitted. A malformed companion file can therefore discard `allow_implicit_invocation: false` and restore implicit invocation.

## Discovery and enablement

Source: [skills][skills].

- Project: `.agents/skills` at each directory from current working directory to repository root.
- User: `~/.agents/skills`; admin: `/etc/codex/skills`; system: bundled skills. Symlinked skill folders are supported.
- Same-name skills do not merge; both can appear in selectors. Do not assume name alone selects one particular path.
- `[[skills.config]]` in `~/.codex/config.toml`: `path` is a string naming `SKILL.md`; `enabled` is a boolean. Set `enabled = false` to disable a specific file. Restart after configuration changes.
- Skill edits are detected automatically; restart if an edit does not appear. Explicit invocation uses `/skills` or `$skill-name`.

## Custom agent files

Location: `.codex/agents/*.toml` or `~/.codex/agents/*.toml`. Sources: [subagents][agents] and [agent role parser][roles].

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Required for standalone files | Trimmed, non-empty role identity; filename need not match |
| `description` | string | Documented required | Role selection guidance; blank values rejected |
| `developer_instructions` | string | Required, non-blank for standalone files | Agent behavior instructions |
| `nickname_candidates` | string array | Optional; source-backed | Display nickname pool; empty list, blank/duplicate names, or characters outside ASCII letters, digits, spaces, hyphens, underscores rejected |
| `model` | string | Previously resolved spawn/default/parent model | Custom file value wins |
| `model_reasoning_effort` | Supported model effort string | Previously resolved spawn/default/parent effort | Custom file value wins; verify selected model accepts it |
| `sandbox_mode` | Session configuration enum | Inherited | Documented examples `read-only`, `workspace-write`; use current config reference for all accepted values |
| `mcp_servers` | Session-config map | Inherited | Per-agent MCP configuration; uses ordinary Codex config keys |
| `skills.config` | Array of path/enablement entries | Inherited | Per-agent skill enablement |

Agent files are session configuration layers and can contain other supported `config.toml` keys. This table captures agent metadata and documented task-relevant overrides, not every general session setting. Consult the [configuration reference][config] before adding other keys.

The role parser declares strict unknown-field deserialization and flattens `ConfigToml`. Do not assume arbitrary keys are ignored; exact behavior and user-visible diagnostics for an unknown nested session key remain unverified. Invalid TOML or incompatible consumed-field types fail deserialization. Legacy referenced role configs may use a supplied role-name hint and different required-field rules; do not transfer those exceptions to standalone files.

## Global agent controls

Location: `[agents]` in session configuration. Source: [subagents][agents].

| Field | Type | Default | Effect |
| --- | --- | --- | --- |
| `enabled` | boolean | `true` | Multi-agent tool availability |
| `max_concurrent_threads_per_session` | number | Harness-selected | Open spawned-thread cap, excluding primary |
| `max_threads` | number | Legacy alias | Older spelling for the concurrent-thread cap; conflict behavior when both are set is unverified |
| `default_subagent_model` | string | Parent model | Default before custom file overlay |
| `default_subagent_reasoning_effort` | string | Parent/default model effort | Default before custom file overlay |
| `interrupt_message` | boolean | `true` | Record model-visible interruption message |

Model resolution before applying the custom file: explicit spawn value → `[agents]` default → parent. A newly selected model without an explicit/default effort uses its own default. A custom file setting only `model` retains the already resolved effort; set both if they are incompatible. Omitted sandbox/MCP/skill settings inherit. Custom names override built-in names such as `explorer`; same-name project/user custom file precedence is unverified here.

[skills]: https://developers.openai.com/codex/skills
[agents]: https://developers.openai.com/codex/subagents
[config]: https://developers.openai.com/codex/config-file/config-reference
[parser]: https://github.com/openai/codex/blob/ca466061d64f0b44f416135c7fd06aa7af850bbc/codex-rs/skills/src/parser.rs
[metadata]: https://github.com/openai/codex/blob/ca466061d64f0b44f416135c7fd06aa7af850bbc/codex-rs/ext/skills/src/loader/metadata.rs
[interface]: https://github.com/openai/codex/blob/ca466061d64f0b44f416135c7fd06aa7af850bbc/codex-rs/skills/src/interface.rs
[roles]: https://github.com/openai/codex/blob/ca466061d64f0b44f416135c7fd06aa7af850bbc/codex-rs/agent-roles/src/agent_role_config.rs
