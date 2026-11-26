---
name: defuddle
description: Extract clean Markdown from web pages with Defuddle CLI. Use when asked to "read this article", "summarize this page", or consult online documentation at a URL that does not end in .md, instead of webfetch. Pair with code-crafting when checking claims against code and technical-writing when using the source in documentation.
---

# Defuddle

The defuddle cli extracts clean readable content from Web Pages. Prefer over `webfetch` / `WebFetch` to reduce noise and clutter.

## Workflow

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md). Use the existing CLI directly for simple extraction; save a verified script only when useful repeated orchestration or transformation adds more than a wrapper.

### Installation

If not already installed: `npm install -g defuddle`

### Parsing a url

Always use `--md` for markdown output

```sh
defuddle parse <url> --md
```

### Extracting metadata

- Title: `defuddle parse <url> -p title`
- Description: `defuddle parse <url> -p description`
- Domain: `defuddle parse <url> -p domain`

### Save to file

```sh
defuddle parse <url> --md --output <path/to/file.md>
```

## Pitfalls

- **Always use the `--md` flag** to parse a full url
