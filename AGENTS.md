# AGENTS.md

## Purpose

This repository is a Markdown-first content repo for agent workflows.
Today it contains documentation in `README.md`, `commands/`, and `skills/`.
There is no application runtime, package manifest, compiled output, or automated test suite in the repo today.

Use this file as the default guide for coding agents working here.
Prefer the smallest correct change.
Do not invent build steps, test steps, or coding conventions that are not actually present.

## Repository Facts

- Main content is Markdown.
- Skills live under `skills/<skill-name>/`.
- A skill's primary file is `SKILL.md` in uppercase.
- Commands live under `commands/` and are currently Markdown documents only.
- `.markdownlint.yaml` is the only checked-in machine-readable style config.
- There is no `package.json`, `go.mod`, `Cargo.toml`, `pyproject.toml`, or `Makefile`.
- There are no Cursor rules in `.cursor/rules/` or `.cursorrules`.
- There is no Copilot instruction file at `.github/copilot-instructions.md`.

If Cursor or Copilot rule files are added later, treat them as repo-level instructions and update this guide.

## Build, Lint, and Test

### Build

There is no confirmed build command in this repository.
Do not claim a build exists unless a real build tool or manifest is added.

### Lint

Use Markdown linting with the checked-in config:

```bash
npx --yes markdownlint-cli "**/*.md" --config .markdownlint.yaml
```

Lint one file:

```bash
npx --yes markdownlint-cli "skills/write-a-skill/SKILL.md" --config .markdownlint.yaml
```

Lint this guide:

```bash
npx --yes markdownlint-cli "AGENTS.md" --config .markdownlint.yaml
```

### Test

There is no automated test suite in the repository today.
Do not report that tests passed unless you added a real test harness and ran it.

Single-test execution is not applicable right now.
If a user asks you to "run tests", the practical equivalent is:

1. Lint the changed Markdown files.
2. Re-read the edited files for structure, paths, and examples.
3. Verify that any commands mentioned in docs are real for this repo.

## Validation Workflow

For a normal Markdown edit:

```bash
npx --yes markdownlint-cli "**/*.md" --config .markdownlint.yaml
```

For a single-skill edit:

```bash
npx --yes markdownlint-cli "skills/<skill-name>/SKILL.md" --config .markdownlint.yaml
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

### Command Structure

- Command docs live in `commands/`.
- Keep them Markdown-only unless the user explicitly asks for scripts.

## Style Guidelines

These conventions are inferred from `.markdownlint.yaml` and `skills/write-a-skill/SKILL.md`.

### Markdown and Formatting

- Use Markdown as the primary authoring format.
- Keep headings short and descriptive.
- Prefer short sections over dense prose.
- Use fenced code blocks with a language tag when possible.
- `.markdownlint.yaml` allows long lines up to `1000` characters.
- Long single-line descriptions are acceptable when needed for metadata or grep-friendly discovery.

### Naming

- Skill directories: kebab-case, for example `write-a-skill`.
- Main skill file: `SKILL.md` exactly.
- Reference files: descriptive lowercase names.
- Avoid vague durable filenames like `misc.md`, `temp.md`, or `notes.md`.

### Imports, Types, and Dependencies

There is no application source tree here, so normal import-order and type-system rules are not yet established.
Translate those concerns into content structure:

- Imports: not applicable unless you add executable scripts.
- Types: express structure through clear frontmatter and predictable section names.
- Interfaces: prefer explicit headings and stable file layout.
- Dependencies: do not introduce a runtime or package manager unless the user asks for one.

If you add a script in the future:

- Prefer standard library or shell-native behavior first.
- Keep dependencies minimal.
- Document how to run the script in the same change.
- Place the script next to the skill or command it supports.

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
