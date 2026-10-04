# Pi

Verified: 2026-10-02. Target: [earendil-works/pi coding agent][repo]. Source-backed claims use commit `581e7ba78141a4d8b61cc9d11b8b22ae7e59195e`. Skill loading is core functionality; the agent schema below belongs to the separately loaded upstream example extension.

## Core skill fields

Location: `SKILL.md` YAML frontmatter, or supported standalone Markdown files. Sources: [skills documentation][skills-doc], [skill loader][loader].

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Optional; absent/non-string/empty falls back to parent directory name | Identity; name/directory mismatch accepted without warning |
| `description` | string | Required and non-blank to load | Routing summary; missing/non-string/blank skips skill |
| `disable-model-invocation` | boolean | `false` | Only actual boolean `true` hides from prompt; explicit `/skill:name` remains possible |
| `license` | Standard string | Optional | Not consumed by core skill loader |
| `compatibility` | Standard string | Optional | Not consumed by core skill loader |
| `metadata` | Standard map | Optional | Not consumed by core skill loader |
| `allowed-tools` | Standard experimental string | Optional | Not consumed or enforced by core skill loader; no tool pre-approval/restriction from this field |
| Other fields | Unknown | Optional | Not consumed or warned by inspected loader |

The documentation lists standard portability fields, but the loader reads only name, description, and invocation suppression. Listing `allowed-tools` does not make it an enforced permission boundary.

Source-backed validation:

- Invalid name characters, >64 characters, leading/trailing hyphens, and consecutive hyphens warn but still load when description is usable.
- Description >1024 characters warns but still loads. Missing/non-string/empty description prevents loading.
- Malformed YAML prevents loading. Declared `SKILL.md` receives a parse warning; unsuitable flat Markdown files can be skipped silently.
- Quoted `"true"` for `disable-model-invocation` is a string, not boolean true, so automatic advertising remains enabled.
- Unknown frontmatter fields are ignored by the loader. The agent may read the full file later; model exposure to text is not runtime enforcement.

## Discovery and resource configuration

Sources: [skills documentation][skills-doc], [settings][settings], [resource loader][resources], [package manager][packages].

- User: `~/.pi/agent/skills`; project: `.pi/skills`; shared: `~/.agents/skills` and ancestor project `.agents/skills` through Git root (filesystem root outside a repository).
- Core project sources are trust-gated in the package manager. A missing project skill may be a trust/discovery issue rather than invalid frontmatter.
- Recursive `SKILL.md` discovery is supported. Once a directory contains its own `SKILL.md`, the skill loader does not recurse beneath it. Some source-root standalone `.md` skills also load.
- `.gitignore`, `.ignore`, and `.fdignore` participate in discovery. Dot directories and `node_modules` are skipped by the inspected loader.
- Same canonical file through symlinks is deduplicated silently. Different files with the same name keep the first discovered and produce a collision diagnostic.
- The normal resource pipeline sorts sources before first-wins resolution: project settings entries → project auto-discovery → user settings entries → user auto-discovery → package resources. CLI resources precede resolved resources in the resource loader. Do not infer user-over-project priority from the low-level loader's optional default-directory mode.

Relevant fields in user `~/.pi/agent/settings.json` and project `.pi/settings.json`:

| Field | Type | Default | Effect |
| --- | --- | --- | --- |
| `skills` | string array | `[]` | Additional files/directories; resource lists combine across scopes |
| `enableSkillCommands` | boolean | `true` | Command discovery registration; manually entered `/skill:name` still works |
| `extensions` | string array | `[]` additional entries | Load extension resources, including custom subagent mechanisms |
| `packages` | Array of package sources/configurations | `[]` | Resource distribution; schema is package-specific |
| `defaultTools` | string array | `read`, `bash`, `edit`, `write` | Startup tool selection; plain names replace, `+name`/`-name` modify selection |
| `defaultProvider` | string | Automatic | Startup provider |
| `defaultModel` | string | Automatic | Startup model |
| `defaultThinkingLevel` | `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max` | `medium` | Startup thinking |

Resource paths resolve from the user agent directory or project `.pi` directory, not necessarily the working directory. Absolute and `~` paths work. Resource arrays support `!pattern`, `+path`, and `-path`. An empty `defaultTools` disables built-in tools but not extension/SDK tools. These are settings, not skill frontmatter.

Use `/reload` after resource edits and inspect diagnostics and `/skill:name`. Exact incorrect-type/unknown-key handling across all settings is unverified.

## Example subagent extension

This is the schema in `packages/coding-agent/examples/extensions/subagent`, not an automatically active native agent manifest. Load the extension before expecting these definitions to run. Sources: [example guide][example], [agent loader][agent-loader], [dispatch implementation][dispatch].

Location: direct `.md` files in `~/.pi/agent/agents` or the nearest ancestor `.pi/agents`. Body becomes the child system prompt.

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Required | Identity; filename need not match |
| `description` | string | Required | Delegation guidance |
| `tools` | Comma-separated string or list | Omitted/default child selection | Parsed string tool names passed as CLI `--tools` |
| `model` | string | Parent active model | Passed as child `--model`; parent thinking inherited only when model is not authored |
| Other fields | Unknown | Optional | Not consumed by this extension; no `readonly`, `permissionMode`, or `allowed-tools` behavior |

Source-backed details:

- Non-string name or description skips the file; the loader checks types but does not reject blank strings here.
- Non-string `model` is treated as absent. Non-string tool-list entries are filtered and remaining names trimmed.
- Empty/invalid `tools` resolves to `undefined`. Dispatch omits `--tools` in that case, so `tools: []` does **not** disable tools; it restores default child selection.
- Unknown field names are ignored. Malformed YAML can propagate from `parseFrontmatter`: this agent loader does not catch the parse call, unlike the core skill loader.
- Only direct Markdown children are loaded; agent directory search stops at the nearest ancestor directory, even if a farther one contains another agent. This search is not restricted to Git root by the inspected function.
- With `agentScope: both`, project definitions replace user definitions with the same name. Same-directory duplicate order depends on directory enumeration.

Extension tool arguments, separate from agent frontmatter:

| Argument | Type/default | Effect |
| --- | --- | --- |
| `agent` + `task` | Strings | Single-agent mode |
| `tasks` | List of agent/task items | Parallel mode |
| `chain` | List of agent/task items | Sequential mode, supports `{previous}` |
| `agentScope` | `user`, `project`, `both`; default `user` | Choose discovery scope |
| `confirmProjectAgents` | boolean; default `true` | Interactive confirmation for requested untrusted project agents |
| `cwd` | string | Child working directory for single mode |

Exactly one mode is required. Agent definitions are discovered fresh for each call. Third-party Pi extensions may differ; identify the installed package and refresh its own loader before applying this schema.

[repo]: https://github.com/earendil-works/pi/tree/main/packages/coding-agent
[skills-doc]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/docs/skills.md
[settings]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/docs/settings.md
[loader]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/src/core/skills.ts
[resources]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/src/core/resource-loader.ts
[packages]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/src/core/package-manager.ts
[example]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/examples/extensions/subagent/README.md
[agent-loader]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/examples/extensions/subagent/agents.ts
[dispatch]: https://github.com/earendil-works/pi/blob/581e7ba78141a4d8b61cc9d11b8b22ae7e59195e/packages/coding-agent/examples/extensions/subagent/index.ts
