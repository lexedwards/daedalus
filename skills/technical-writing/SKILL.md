---
name: technical-writing
description: Write technical documentation that is approachable and concise. Use when recording context that future engineers and agents will need to understand and operate.
---

# Technical Writing

Capture the context and rationale readers cannot recover from the implementation alone.

## When to use

- Altering public-facing interfaces or APIs
- Changes to user-facing behavior
- Onboarding new members or agents

Do not restate obvious code. Before selecting an artifact or destination, read and apply [match-delivery-to-task](../principle-match-delivery-to-task/SKILL.md). Label findings and proposals distinctly from as-built operating guidance; use the agreed handoff destination for investigations.

## Start here

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) for repeatable link, structure, or example validation. Reuse or save useful checks; keep explanation and editorial decisions with the agent.

Before drafting or restructuring documentation, read [make-structure-visible](../principle-make-structure-visible/SKILL.md). Organize the material around what the reader needs to find or do, making logical grouping, sequence, and alternatives visible.

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

Keep setup instructions separate from command reference material. For command-line projects, place the command reference after the initial runnable example in Quick Start, following [Command reference](#command-reference).

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

## Command reference

Document command invocation in a manpage-like, reference-first form rather than a catalogue of examples:

- Start with one minimal runnable invocation, then show the usage synopsis when optional arguments or subcommands need clarification.
- Follow with a scannable list of positional arguments and flags. Give each name, value type, description, and default where applicable; identify required values, valid choices, constraints, and repeatable options.
- Explain output destinations, exit status, and relevant operational behavior separately from the option list.
- Use additional examples only to clarify combinations or workflows the reference cannot explain clearly. Do not make readers infer available options from examples.
- Verify names, types, defaults, and behavior against the command's actual interface and help output.

## Verify

Re-read the rendered document when available, or inspect its Markdown structure. Check that readers can find prerequisites, actions, alternatives, and outcomes without reconstructing their relationships ([make-structure-visible](../principle-make-structure-visible/SKILL.md)). Lint and formatting checks do not establish comprehension.
