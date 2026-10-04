# Claude Code

Verified: 2026-10-02. Evidence: official [skills][skills] and [subagent][agents] documentation. No runtime reproduction; respect the installed release's minimum versions.

## Skill fields

Location: `SKILL.md` YAML frontmatter. All fields optional; `description` recommended. Source: [skills][skills].

| Field | Type | Default/omission | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Directory name | Menu/invocation name; directory name remains an invocation route |
| `description` | string | First non-empty body line | Routing summary; combined with `when_to_use`, capped at 1536 characters in listing |
| `when_to_use` | string | Absent | Additional routing context; underscore spelling is intentional |
| `argument-hint` | string | Absent | Autocomplete hint |
| `arguments` | Space-separated string or list | Absent | Named positional `$name` substitutions |
| `disable-model-invocation` | boolean | `false` | Prevent automatic invocation and subagent preload; affects scheduled skill tasks since v2.1.196 |
| `user-invocable` | boolean | `true` | `false` hides from menu and prevents typed `/name` execution |
| `allowed-tools` | Space/comma-separated string or list | No extra grant | Pre-approval for invoking turn, not an exclusive tool allowlist |
| `disallowed-tools` | Same forms | No extra denial | Removes tools for invoking turn; cannot remove `EndConversation` while any other tool remains |
| `model` | Model ID/alias or `inherit` | Session model | Override for current turn or fork; policy/model support can preserve session model instead |
| `effort` | `low`, `medium`, `high`, `xhigh`, `max` | Session effort | Current skill effort; model-dependent availability |
| `context` | `fork` | Inline | Run skill in a forked subagent context |
| `agent` | string | Harness fork default | Subagent type; applies with `context: fork` |
| `background` | boolean | `true` for forked skill | `false` waits for fork result; v2.1.218+ |
| `hooks` | Hook configuration map | Absent | Registered when invoked, continuing for rest of session |
| `paths` | Comma-separated string or glob list | Unscoped | File-dependent automatic activation |
| `shell` | `bash` or `powershell` | `bash` | Inline command execution shell, subject to PowerShell tool availability |
| `metadata` | YAML map | Absent | Accepted but contents not acted on; non-map value dropped |
| `license` | string | Absent | Accepted, not acted on |
| `compatibility` | string, up to 500 characters | Absent | Accepted, not acted on |

Unknown field names are silently ignored. Opening `---` must be the first line; otherwise the entire file is body content. Invalid YAML still loads the skill with no fields set. Boolean fields accept true/false plus yes/no, on/off, 1/0 in any case on v2.1.218+; use unquoted YAML booleans for portability.

Malformed YAML can therefore lose tool restrictions or explicit-only controls while leaving an invocable skill. These are local Claude Code rules: claude.ai upload/Skills API packaging accepts only the six standard fields and rejects extra keys. The command-file compatibility format accepts skill fields except `name` and `paths`.

## Skill discovery and conflicts

Source: [skills][skills].

- User: `~/.claude/skills`; project: `.claude/skills`; enterprise: `.claude/skills` under managed settings directory; plugins: plugin `skills` directories.
- Startup searches from current directory to repository root. Nested definitions load when their files are accessed and remain available. Added directories load their `.claude/skills`, `.claude/commands`, and `.claude/agents`.
- For same-name enterprise/personal/project skills: enterprise → personal → project. This differs from agent precedence below.
- A skill wins over a same-name `.claude/commands` file. A root and nested skill can coexist under directory-qualified invocation names.
- Plugin skills use `/plugin-name:skill-name`; synced account skills use `/anthropic-skills:name` when their short name conflicts. `synced` and the `anthropic-skills` namespace are reserved.
- Existing watched skill directories update live. Use `/reload-skills` for a top-level skills directory created after session start.
- Settings can override visibility via `skillOverrides`; consult the same source's current settings section before using it. Frontmatter alone may not describe final visibility.

## Subagent fields

Location: YAML frontmatter in a Markdown agent; body is system prompt. Source: [subagents][agents].

| Field | Type/values | Default/omission | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Required | Identity, independent of filename; cannot start with `-` or contain `:` |
| `description` | string | Required | Delegation routing |
| `tools` | Comma-separated string or list | Inherit available subagent tools | Exclusive tool selection; zero resolved tools usually prevents launch |
| `disallowedTools` | Same forms | Empty denial | Remove tools before resolving allowlist; specifier such as `Bash(git push *)` removes the whole tool |
| `model` | Alias, full ID, `inherit` | Model resolution order | Requested model subject to policy/fallback |
| `permissionMode` | `default`, `manual`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan` | Parent mode | Parent mode can override/restrict it; `manual` alias v2.1.200+ |
| `maxTurns` | Integer turn limit | No authored cap | Partial result at limit, resumable |
| `skills` | Skill-name list | No authored preload | Full content preload, not just metadata; explicit-only skills cannot be preloaded |
| `mcpServers` | List of names or inline server maps | Available parent configuration | Scoped server configuration/references |
| `hooks` | Hook configuration map | Absent | Lifecycle hooks |
| `memory` | `user`, `project`, `local` | No persistent memory scope | Cross-session memory |
| `background` | boolean | Runtime dispatch behavior | `true` keeps agent in background |
| `omitClaudeMd` | boolean | Normal context loading | Skip user/project/local CLAUDE.md; ignored as main agent; v2.1.271+ |
| `effort` | `low`, `medium`, `high`, `xhigh`, `max` | Session effort | Model-dependent effort override |
| `isolation` | `worktree` | Shared checkout | Temporary worktree; documented default base is default branch, not parent's HEAD |
| `color` | `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` | Default UI | Display color |
| `initialPrompt` | string | Absent | First user turn when main agent; prepended to user's prompt |
| `experimental.cacheTtl` | `5m`, `1h` inside map | Normal cache precedence | Other values ignored; 1h ignored on subscription usage credits; file definitions only; v2.1.248+ |

CamelCase agent fields must match exactly. Unknown fields are silently ignored. Missing name, missing description, malformed YAML, or frontmatter not on first line skips a local/managed agent file; some reasons appear only in debug logs. Plugin agents can fall back to filenames even with missing/invalid frontmatter. Exact incorrect-type handling for every agent field is unverified.

## Agent precedence and exceptions

Source: [subagents][agents].

1. Managed definitions.
2. `--agents` session JSON.
3. Project `.claude/agents`, closest ancestor definition wins.
4. User `~/.claude/agents`.
5. Plugin `agents` directories.

Directories are recursive. Same-name definitions within one scope tree use filesystem read order; avoid depending on it. Existing watched user/project directories update within seconds; new top-level agent directories and added-directory agents require restart.

- Plugin agents ignore `hooks`, `mcpServers`, `permissionMode`, and `initialPrompt`; place applicable integration settings in plugin components instead.
- `--agents` JSON uses object keys as identities and `prompt` for the body. It supports the operational fields above but ignores `color` and `experimental`.
- Model order: per-invocation model → definition model → `CLAUDE_CODE_SUBAGENT_MODEL` → parent. Force environment setting can override this; order changed in v2.1.251.
- Parent `bypassPermissions`, `acceptEdits`, or `auto` mode overrides the authored agent mode. Other parent modes permit the authored mode except `bypassPermissions` (v2.1.267+).
- Tools available to foreground/background agents differ. A named tool can be removed by the runtime even if the definition grants it.

[skills]: https://code.claude.com/docs/en/skills.md
[agents]: https://code.claude.com/docs/en/sub-agents.md
