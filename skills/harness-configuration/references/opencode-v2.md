# OpenCode V2

Verified: 2026-10-02. Evidence: documented in the [V2 skills guide][skills], [agents guide][agents], and [config guide][config]. No local parser reproduction.

## Skill fields

Location: YAML frontmatter in `SKILL.md` or a source-root Markdown skill. All fields are optional at runtime. Source: [skills][skills].

| Field | Type | Default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Path-derived ID | Display label, not invocation identity |
| `description` | string | Absent | Model-facing summary; absent descriptions are not advertised |
| `metadata.opencode/autoinvoke` | boolean | Automatic advertising unless disabled | `false` hides from the model list; explicit loading remains possible |
| `disable-model-invocation` | boolean | Automatic advertising unless disabled | `true` has the same effect, but `metadata.opencode/autoinvoke` wins when both exist |
| `license`, `compatibility` | Portability fields; typically strings | Absent | Accepted but not interpreted |

Use `metadata: { opencode/autoinvoke: false }`, not a top-level `opencode/autoinvoke`. Other arbitrary fields, incorrect types, and malformed YAML: exact handling unverified. In particular, the V2 guide does not establish enforcement of `allowed-tools`, `paths`, `context`, or `agent` skill frontmatter; do not use them as operational controls.

The path supplies the case-sensitive ID: `release/SKILL.md` → `release`; `teams/release/SKILL.md` → `release`; root `review.md` → `review`. The loader does not enforce the portable name pattern, 64-character name limit, name/directory equality, or maximum description length. A root-level `SKILL.md` in an HTTP catalog currently has ID `SKILL`.

## Skill discovery and configuration

Source: [skills][skills]. Later registered sources override earlier definitions with the same ID; bodies do not merge.

1. Built-in skills.
2. Global then project `.claude/skills`, farthest ancestor toward current directory.
3. Global then project `.agents/skills`, in the same order.
4. `~/.config/opencode/skills`.
5. Project `.opencode/skills`, project root toward current directory.
6. Explicit `skills` config entries, in config priority and array order.

Project skill discovery stops at the project root. Root `*.md` and recursive exact `SKILL.md` files are supported.

| Configuration field | Type/location | Effect |
| --- | --- | --- |
| `skills` | string array in `opencode.json(c)` | Additional local sources or HTTP catalogs; arrays combine across layers |
| Catalog `skills[].name` | string in `index.json` | Catalog entry directory/name |
| Catalog `skills[].version` | Version value; guide example is a string | Change to refresh downloaded files |
| Catalog `skills[].files` | string array | Safe relative same-origin files; include `SKILL.md` or `<name>.md` |
| `permissions` / `agents.<id>.permissions` | Rule array | `action: skill`, resource = exact ID or pattern; `allow`, `ask`, `deny` |

Relative `skills` paths resolve from the active working directory, not the config file. `~/`, absolute paths, and HTTP(S) catalogs are supported. `deny` hides and blocks loading; invocation suppression alone does not block loading. Explicit invocation: mention `@skill-id` or load the exact ID with the skill tool.

## Agent fields

Location: `agents.<id>` in JSONC or the same fields in Markdown frontmatter. Markdown body becomes `system`. Source: [agents][agents].

| Field | Type | Default/omission | Runtime meaning |
| --- | --- | --- | --- |
| `description` | string | Absent | Purpose shown when choosing a subagent |
| `mode` | `primary`, `subagent`, `all` | `primary` for a new custom agent | Eligible session roles |
| `model` | `provider/model#variant` string or object | Subagent inherits parent model | Model preference; selecting a primary agent by ID does not replace the session's stored model |
| `model.providerID` | string, object form | Required to identify provider | Provider ID |
| `model.model` | string, object form | Required to identify model | Model ID |
| `model.variant` | string, object form | Omitted variant | Model variant |
| `system` | string | Provider base prompt | Non-empty value replaces base prompt; other instruction sources still apply |
| `permissions` | Ordered rule array | Global rules precede agent rules | Last matching rule wins |
| `permissions[].action` | string/pattern | Explicit rule component | Tool/action, e.g. `read`, `edit`, `shell`, `skill`, `subagent` |
| `permissions[].resource` | string/pattern | Explicit rule component | File path, command, skill ID, or agent ID |
| `permissions[].effect` | `allow`, `ask`, `deny` | Explicit rule component | Permission decision |
| `steps` | Positive integer | No configured cap | Final step removes tools and requests a summary; new user input resets allowance |
| `hidden` | boolean | Visible unless hidden | Removes from listings and catalog, not a security restriction |
| `color` | Six-digit hex string | Harness display default | UI color |
| `disabled` | boolean | Enabled unless disabled | Removes definition at this point in config loading |
| `request.headers` | Map | Absent | Preserved but not yet sent by the V2 runner |
| `request.body` | JSON body map | Absent | Preserved but not yet sent; use provider/model/variant request settings for active effects |
| `default_agent` | string in root config | `build`, then first visible primary-capable fallback | Used only when a session has not selected an agent |

For Markdown agents, put the prompt in the body rather than `system` frontmatter. Do not author legacy top-level `temperature`, `top_p`, `prompt`, `permission`, `tools`, `disable`, or `maxSteps` as native V2 options. Their exact compatibility conversion behavior is outside this inventory; unrecognized fields and invalid types are unverified, not assumed ignored.

## Agent discovery and conflicts

Sources: [agents][agents], [config][config].

- User: `~/.config/opencode/agents/<name>.md`; project: `.opencode/agents/<name>.md`, current directory up to project root.
- Nested agent paths remain part of identity: `team/reviewer.md` → `team/reviewer`. There is no documented `name` agent field to replace that identity.
- Definitions merge in config order: later scalars replace, request maps merge by key, permission rules append. A built-in ID can be overridden.
- Global permissions apply before agent rules. The parent controls which subagents may launch; the child uses its own rules.
- JSONC config discovery differs from skill/agent directory discovery: direct configs are merged from filesystem root toward current directory, then all `.opencode` configs in that order. Every discovered `.opencode` config outranks every direct config.

[skills]: https://opencode.ai/v2/docs/skills/
[agents]: https://opencode.ai/v2/docs/agents/
[config]: https://opencode.ai/v2/docs/config/
