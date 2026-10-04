# Cursor

Verified: 2026-10-02. Evidence: official [skills][skills] and [subagents][agents] documentation. General parser behavior is not publicly established by these pages.

## Skill fields

Location: `SKILL.md` YAML frontmatter. Source: [skills][skills].

| Field | Type | Required/default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Required | Lowercase letters, numbers, hyphens; must match parent folder |
| `description` | string | Required | Routing summary |
| `paths` | Comma-separated string or list | Unscoped | Only surface for matching file globs |
| `globs` | Legacy scoping field | Fallback | Older spelling; new definitions should use `paths`; both-set conflict details unverified |
| `disable-model-invocation` | boolean | Automatic selection | `true` requires explicit `/skill-name` inclusion |
| `icon` | Icon name string | Lightning icon | Custom Mode badge; unrecognized icon falls back |
| `color` | `default`, `green`, `cyan`, `blue`, `purple`, `magenta`, `orange`, `yellow`, `red`, `brand` | Default badge | Custom Mode color; unrecognized color falls back |
| `metadata` | Map | Absent | Additional metadata |

The documented name constraint is not proof of whether an invalid or mismatched name warns, rejects, or falls back. That behavior, general unknown fields, wrong types, malformed YAML, and skill duplicate priority are unverified. The published table does not establish enforcement of `allowed-tools`, `model`, `context`, or `agent` in skills. Do not copy those controls from Claude Code and assume Cursor honors them.

## Skill discovery

Source: [skills][skills].

- Project: `.agents/skills`, `.cursor/skills`; user: `~/.agents/skills`, `~/.cursor/skills`.
- Compatibility: project and user `.claude/skills` and `.codex/skills`.
- Search is recursive. Category directories do not change identity: the folder containing `SKILL.md` identifies the skill.
- Nested project skill directories are discovered and automatically scoped to their containing project subtree. Explicit `paths` adds file scoping; exact interaction with implicit nested scope needs verification before relying on widening behavior.
- `/skill-name` attaches to one message. A Custom Mode keeps the skill in context for the session.
- General reload requirements are unverified. Inspect Customize → Skills to check discovery.

## Subagent fields

Location: YAML frontmatter in a Markdown file. Body is the agent prompt. Source: [subagents][agents].

| Field | Type | Default | Runtime meaning |
| --- | --- | --- | --- |
| `name` | string | Filename-derived | Identifier/display name; use lowercase letters and hyphens |
| `description` | string | Absent | Delegation guidance |
| `model` | string | `inherit` | Parent model or exact model ID, with optional parameter brackets |
| `readonly` | boolean | `false` | Restrict edits and state-changing shell commands |
| `is_background` | boolean | `false` | Run without blocking parent |

All five fields are optional. Unknown fields, invalid types, invalid names, malformed YAML, and agent live-reload behavior are unverified. `readonly` is not spelled `readOnly`, and `is_background` is not Claude's `background`.

Model syntax supports `model-id[option=value,option=value]`, with model-specific options such as `effort`, `context`, or `fast`. Empty brackets pin the base variant. Admin restrictions, plan limitations, and legacy Max Mode settings can select a compatible fallback model rather than the exact authored one. Inspect the task card to see the model actually used.

## Agent discovery and conflicts

Source: [subagents][agents].

- Project: `.cursor/agents`, `.claude/agents`, `.codex/agents`.
- User: `~/.cursor/agents`, `~/.claude/agents`, `~/.codex/agents`.
- Project definitions beat user definitions. Cursor directories beat Claude/Codex compatibility directories for same-name agents.
- The guide describes Markdown agents even in compatibility directories. It does not establish that current Codex standalone TOML files are parsed; `.codex/agents` discovery is not a verified TOML adapter.
- Specific relative order of `.claude` versus `.codex`, same-scope ties, and ancestor traversal are unverified.

Example migration: a Claude agent with `permissionMode: plan` and `disallowedTools: Write` needs explicit Cursor controls such as `readonly: true` after checking desired behavior. Their spelling and scope are not interchangeable.

[skills]: https://cursor.com/docs/skills
[agents]: https://cursor.com/docs/subagents
