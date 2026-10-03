# AGENTS.md

## Purpose

This repository is a Markdown-first content repo for agent workflows.
It contains documentation in `README.md` and `skills/`, agent definitions in `agents/`, an OpenCode V2 plugin in `plugins/`, and a root Agent Plugins 1.0 manifest for GitHub Copilot CLI.
The plugin has a root `package.json`, a Bun lockfile, and behavior tests in `test/`. There is no compiled output.

Use this file as the default guide for coding agents working here.
Prefer the smallest correct change.
Do not invent build steps, test steps, or coding conventions that are not actually present.

## Repository Facts

- Main content is Markdown.
- Skills live under `skills/<skill-name>/`.
- A skill's primary file is `SKILL.md` in uppercase.
- Agent definitions live under `agents/` as Markdown files with YAML frontmatter.
- `.markdownlint.yaml` defines Markdown style.
- `.markdownlint-cli2.yaml` selects Markdown files and excludes dependencies for `bun run lint`.
- `package.json` exports the OpenCode V2 plugin and defines its dependencies and checks.
- `plugins/skills.mjs` lists the skills registered by the plugin.
- `plugins/agents.mjs` lists and loads the agents registered by the plugin.
- The plugin lives outside `.opencode/plugins/` to avoid automatic project loading alongside a globally configured copy.
- Root `plugin.json` shares `skills/` with Copilot CLI. `com.github.copilot/agents/` contains relative symlinks to the OpenCode-first definitions in `agents/`; no generator is required.
- There is no `go.mod`, `Cargo.toml`, `pyproject.toml`, or `Makefile`.
- There are no Cursor rules in `.cursor/rules/` or `.cursorrules`.
- There is no Copilot instruction file at `.github/copilot-instructions.md`.

If Cursor or Copilot rule files are added later, treat them as repo-level instructions and update this guide.

## Build, Lint, and Test

### Build

The JavaScript adapter runs directly; no compilation is required. Install dependencies and preview package contents with:

```bash
bun install --frozen-lockfile
bun run check:package
```

### Lint

Lint all Markdown with the locally installed CLI and checked-in configuration:

```bash
bun run lint
```

### Test

Run the OpenCode adapter behavior tests:

```bash
bun test test
```

Run one test file with `bun test test/opencode-plugin.test.mjs` or `bun test test/copilot-plugin.test.mjs`. For Markdown-only changes, lint the changed files, re-read them, and verify referenced paths and commands. Unit tests do not establish that a Git installation loads in OpenCode or Copilot; check each runtime boundary separately when available, and report unverified runtime behavior accurately.

## Validation Workflow

For Markdown edits, including single-skill edits:

```bash
bun run lint
```

For a broader content change:

1. Check file placement.
2. Check naming.
3. Lint all Markdown.
4. Re-read the changed files once after lint passes.

## Content Model

This repo is organized around reusable agent assets rather than application code.
When you are asked about style, types, imports, or testing, anchor your answer in that reality instead of assuming a conventional software project.

### Skill Structure

- A skill lives in `skills/<skill-name>/`.
- The main file is `SKILL.md`.
- Put YAML frontmatter at the top.
- The `name` field must match the directory name exactly.
- Use kebab-case for skill names. Valid characters pass `^[a-z0-9]+(-[a-z0-9]+)*$`.
- Keep `SKILL.md` under 500 lines; move large references into `references/`.
- Keep the description to a single line.
- Keep `SKILL.md` concise and move rarely needed detail into nearby reference files.

## Style Guidelines

These conventions are inferred from `.markdownlint.yaml` and existing repository content.

### Markdown and Formatting

- Use Markdown as the primary authoring format.
- Keep headings short and descriptive.
- Prefer short sections over dense prose.
- Use fenced code blocks with a language tag when possible.
- `.markdownlint.yaml` allows long lines up to `1000` characters.
- Long single-line descriptions are acceptable when needed for metadata or grep-friendly discovery.

### Naming

- Skill directories: kebab-case.
- Main skill file: `SKILL.md` exactly.
- Reference files: descriptive lowercase names.
- Avoid vague durable filenames like `misc.md`, `temp.md`, or `notes.md`.

### Imports, Types, and Dependencies

For content, express structure through frontmatter and predictable sections. For the OpenCode adapter, use ES modules, Node standard-library APIs, and the pinned V2 plugin API:

- Imports: use `node:` prefixes for standard-library modules.
- Types: validate skill frontmatter at the package boundary.
- Interfaces: prefer explicit headings and stable file layout.
- Dependencies: keep runtime dependencies minimal and update `bun.lock` when changing them.

If you add a script in the future:

- Prefer standard library or shell-native behavior first.
- Keep dependencies minimal.
- Document how to run the script in the same change.
- Place the script next to the skill or agent it supports.

### Error Handling and Safety

- Do not fabricate missing commands, tests, CI, or release workflows.
- If something is absent, say so plainly.
- Preserve existing placement and naming unless the user asks for restructuring.
- Avoid repo-wide rewrites for small content changes.
- Ensure examples use real paths and plausible commands.

## Editing Guidance

- Read the relevant Markdown file before editing it.
- Match the tone and structure already used nearby.
- Prefer updating an existing document over creating a parallel variant.
- Keep changes tightly scoped to the task.
- Avoid imaginary workflows, unnecessary tooling, and unrelated restructuring.

## Minimum Review Checklist

Before finishing work in this repo, verify:

- The file is in the correct directory.
- Skill naming is consistent.
- Frontmatter is present when required.
- Markdown lint passes.
- Examples and paths are real.
- The guidance matches the repository as it exists today.
