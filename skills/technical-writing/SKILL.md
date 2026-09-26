---
name: technical-writing
description: Write technical documentation that is approachable and concise. Use when recording context that future engineers and agents will need to understand and operate.
---

# Technical Writing

The most valuable documentation captures the **why**. Code shows what was build with limited insight. Documentation provides the context essential for future people and agents working in the codebase.

## When to use

- Altering public-facing interfaces or APIs
- Changes to user-facing behavior
- Onboarding new members or agents

**Do not** document obvious code, comments that restate, or docs for prototypes.

## Writing style

Use Simplified Technical English, or ASD-STE100 and follow Zinsser's four principles of quality writing:

1. Simplicity
2. Brevity
3. Clarity
4. Humanity.

Keep the writing warm and human - a person wrote it, not a manual.

## Writing syntax

- Documentation should be written in Markdown
- When working within a git repository, use Github Flavored Markdown.
- Use reference-style links where possible
- Fence code blocks with matching delimiters and a language tag (for example, `bash`, `json`, or `mermaid`). Leave a blank line before and after each block. Use a longer outer fence when showing fenced Markdown inside a code block.
- Prefer Mermaid diagrams over ASCII art or plain-text diagrams for their rendering. Use a fenced `mermaid` block and check that its syntax renders correctly.
- When Mermaid is unsuitable, capture graphics from the real system or an authoritative source. Never generate media files such as PNG images or MOV videos for documentation.

## Project README structure

Every project should have a README that acts as an introduction and contains high-level information that covers:

```markdown
# Project Name

Short single paragraph of what this project does.

## Quick Start

Ordered list of concise instructions

<example>
1. Clone the repo
2. Install Dependencies
    - OS level dependency
    - Package manager dependency
3. Set up environment
4. How to safely test/run locally
5. How to deploy
</example>

## Architecture

Overview of project structure and key design elements.
Prefer links to ADRs rather than duplication or lengthy documents.
Prefer Mermaid diagrams to ASCII art or plain-text diagrams.

```
