---
name: defuddle
description: Extract clean markdown content from web pages using Defuddle CLI - removing clutter and navigation. Use instead of `webfetch` or `WebFetch` if the url **does not** end in `.md` **and** the user wants to read online web pages, articles, documentation.
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
