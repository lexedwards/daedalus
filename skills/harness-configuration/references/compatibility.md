# Cross-Harness Compatibility

Verified: 2026-10-02. Sources and uncertainty are inherited from the linked harness references. This guide compares runtime meaning, not just whether the same Markdown file can be discovered.

## Portable skill baseline

The [Agent Skills specification][spec] defines these fields:

| Field | Portable shape | Constraint/purpose |
| --- | --- | --- |
| `name` | string | Required; 1–64 lowercase letters/numbers/hyphens; no edge or consecutive hyphens; match directory |
| `description` | string | Required; 1–1024 characters; include when to use |
| `license` | string | Optional license or bundled license reference |
| `compatibility` | string | Optional environment requirements; 1–500 characters if present |
| `metadata` | String-to-string map | Optional annotations; not automatically operational |
| `allowed-tools` | Space-separated string | Optional experimental pre-approval; implementation support varies |

Use directory `my-skill/SKILL.md` with matching `name`, a short description, and ordinary Markdown instructions. Keep harness-specific execution controls out of the baseline unless each target's behavior is checked. The specification's `allowed-tools` does not guarantee enforcement; [Pi](pi.md) ignores it in its core loader.

`disable-model-invocation` is a harness extension, not one of the six fields in the inspected specification. Several harnesses support it, but Codex uses a companion policy instead.

## Skill behavior matrix

Each cell summarizes the corresponding reference: [OpenCode](opencode-v2.md), [Codex](codex.md), [Claude](claude-code.md), [Cursor](cursor.md), [Copilot CLI](github-copilot-cli.md), [Pi](pi.md).

| Concern | OpenCode V2 | Codex | Claude Code | Cursor | Copilot CLI | Pi core |
| --- | --- | --- | --- | --- | --- | --- |
| Identity | Path-derived ID | Parsed name, fallback supported | Frontmatter name/directory routes | Documented matching folder/name | Frontmatter name | Name or parent-directory fallback |
| Name/directory mismatch | Accepted; name is label | Parser does not check | Allowed name override | Match required by docs; failure behavior unverified | Typically match; failure behavior unverified | Accepted without warning |
| Missing description | Registered, not advertised | Parse failure | First body line fallback | Required; failure behavior unverified | Required; failure behavior unverified | Not loaded |
| Automatic suppression | Metadata override or `disable-model-invocation` | `policy.allow_implicit_invocation: false` in companion | `disable-model-invocation` | `disable-model-invocation` | `disable-model-invocation` | Exact boolean `disable-model-invocation` |
| `allowed-tools` | Enforcement unverified | Ignored by inspected frontmatter parser | Turn-scoped pre-approval | Enforcement unverified | Active-skill pre-approval | Ignored by core loader |
| Unknown fields | General handling unverified | Ignored by frontmatter parser | Silently ignored | General handling unverified | Current binary unverified | Ignored by core loader |
| Malformed YAML | Unverified | Parse error after repair attempt | Skill loads without fields | Unverified | Unverified | Skill skipped |
| Same-name definitions | Later ID source wins | Both may appear; no merge | Scope-dependent; personal beats project | Exact skill priority unverified | First name source wins | First after resource ranking wins |

Unknown-field behavior is format-specific. A harness can ignore skill frontmatter while rejecting agent configuration, or fail open on a companion file. Do not apply one row as a blanket validation rule.

## Agent formats and identities

| Harness | Format | Identity | Conflict concern |
| --- | --- | --- | --- |
| [OpenCode V2](opencode-v2.md) | Markdown or `agents` JSONC | Path/config key | Agent definitions merge; permission rules append |
| [Codex](codex.md) | Standalone TOML | `name` | Custom agent is a session config layer, not `agents/openai.yaml` |
| [Claude Code](claude-code.md) | Markdown or `--agents` JSON | `name` / JSON key | Agent project scope wins; skill personal scope wins |
| [Cursor](cursor.md) | Markdown | `name` or filename | Cursor/project priority; compatibility paths do not prove TOML parsing |
| [Copilot CLI](github-copilot-cli.md) | Markdown | Relative path, separators become `--` | Same display name can coexist; official precedence docs contradict |
| [Pi example extension](pi.md) | Markdown | `name` | Project override only with `agentScope: both`; extension must be loaded |

`AGENTS.md`, `CLAUDE.md`, and repository instruction files are instruction sources, not custom-agent manifests. Their loading can differ for a main agent and a spawned subagent.

## Fields that look interchangeable

| Intent | Harness-specific controls | Conflict |
| --- | --- | --- |
| Read-only agent | OpenCode ordered `permissions`; Codex `sandbox_mode`; Claude `tools`/`disallowedTools` and permission mode; Cursor `readonly`; Copilot `tools`; Pi example `tools` | Different scope and enforcement; allowing shell execution can retain writes even without edit tools |
| Background agent | Claude `background`; Cursor `is_background`; Pi extension dispatch mode; OpenCode subagent call mode | A copied spelling can lose the intended behavior |
| Tool selection | Claude/Copilot/Pi agent `tools`; OpenCode `permissions`; Codex session settings | Names and empty-list meaning differ |
| Model choice | OpenCode `provider/model#variant`; Codex model plus `model_reasoning_effort`; Claude ID/alias plus `effort`; Cursor bracket options; Copilot `models`/`modelPolicy`/`reasoningEffort`; Pi child CLI model | Similar `model` fields have different syntax, override order, and fallback |
| MCP dependencies | Codex skill `dependencies.tools`; Claude agent `mcpServers`; Copilot agent `mcp-servers`; OpenCode root `mcp.servers` | Different object shapes and lifecycle; declaring a dependency is not the same as restricting tools |
| File-scoped skills | Cursor/Claude `paths` | No verified equivalent enforcement in the other four harnesses |
| Explicit-only skills | OpenCode metadata/extension flag; Codex companion policy; Claude/Cursor/Copilot/Pi extension flag | A single shared field cannot be assumed to suppress all six |

Important empty-value cases:

- Copilot agent `tools: []` disables all tools; omitting it enables all.
- Pi example agent `tools: []` restores default child tool selection because no `--tools` argument is passed.
- Claude agent tools that resolve to nothing usually prevent launch.
- Pi settings `defaultTools: []` removes built-in tools, but not extension/SDK tools. This is not the Pi example agent's `tools` field.

## Discovery overlap

OpenCode, Cursor, and Copilot CLI discover some Claude directories; several harnesses share `.agents/skills`. Cursor also discovers Codex compatibility directories. A file placed for one harness can therefore become visible in another without explicit installation.

Check:

1. Every native and compatibility source that can load the definition.
2. Whether identity comes from a path, declared name, directory, or namespace.
3. Which duplicate wins, merges, or coexists, and whether symlinks deduplicate the same physical file.
4. Whether native controls are honored after a compatibility load.
5. Whether added directories, trust, plugins, or user configuration alter source priority.

This repository stores skill assets in `skills/`; that is an authoring location, not a universal automatic discovery path. Configure a supported additional source or install/link into the selected harness's discovery directory when asked to activate one.

## Migration examples

### Explicit-only skill

For Claude, Cursor, Copilot CLI, and Pi, supported skill frontmatter includes:

```yaml
disable-model-invocation: true
```

OpenCode also accepts it, but `metadata.opencode/autoinvoke` wins when both are present. Codex needs `agents/openai.yaml`:

```yaml
policy:
  allow_implicit_invocation: false
```

Validate the companion file: invalid metadata can discard the policy. Neither suppression mechanism itself revokes tools or prevents explicit invocation.

### Claude agent loaded by another harness

```yaml
name: reviewer
description: Review changes without editing files.
permissionMode: plan
disallowedTools: Write, Edit
```

Claude interprets these agent fields, subject to parent permission mode. Cursor needs its documented `readonly` control; Copilot CLI needs its tool-selection format; Pi's example extension consumes neither restriction field. Compatibility directory discovery does not preserve the authored operational constraints.

### Display name differs from identity

For `release/SKILL.md` with `name: Publish Release`, OpenCode invokes ID `release` and displays the label. Pi uses `Publish Release` as the name and warns about invalid portable characters. Cursor requires a matching portable name according to its documentation. Preserve matching kebab-case identifiers and separate UI labels only where supported.

## Refresh this guide

Follow `SKILL.md` and [the source registry](sources.md). Recheck both sides of every changed compatibility claim. Label unresolved details unverified instead of extrapolating from another harness, historical issue, schema, or shared specification.

[spec]: https://agentskills.io/specification
