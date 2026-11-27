---
name: technical-writing
description: Use before writing or editing any technical prose, however small, including updates to a README or other docs, ADRs, PR and issue descriptions, and bug reports. Holds the user's writing standards and taste, which the model cannot infer, for voice, structure, and Markdown conventions. Use humanizer for non-technical prose.
---

# Technical Writing

Capture the context and rationale readers cannot recover from the implementation alone.

## When to use

- Altering public-facing interfaces or APIs
- Changes to user-facing behavior
- Onboarding new members or agents
- README and documentation updates
- Bug reports, PR descriptions, and issue descriptions

When documenting changed behavior or a decision, read and apply [preserve-decision-context](../principle-preserve-decision-context/SKILL.md). Before selecting an artifact or destination, read and apply [match-delivery-to-task](../principle-match-delivery-to-task/SKILL.md).

## Start here

Load this skill before the first technical-prose write, including routine edits and tracker descriptions. Use it alongside the domain or tracker skill. For maintained documentation changes, also load [code-crafting](../code-crafting/SKILL.md); writing guidance does not replace its verification workflow. For skill or principle guidance, also load [create-skill](../create-skill/SKILL.md); for agent definitions, load [create-agent](../create-agent/SKILL.md).

Read [automate-mechanics](../principle-automate-mechanics/SKILL.md) for repeatable link, structure, or example validation; explanation and editorial decisions remain with the agent.

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

Re-read the rendered document when available, or inspect its Markdown structure. Check that readers can find prerequisites, actions, alternatives, and outcomes without reconstructing their relationships ([make-structure-visible](../principle-make-structure-visible/SKILL.md)).
