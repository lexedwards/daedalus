---
name: llm-wiki
description: Initialize, maintain, or reference a LLM Wiki vault: personal knowledge base and AI second brain in a specific Karpathy-style structure. Complete with AGENTS.md, scaffolded directory structure and indexing. 
---

# LLM Wiki

Create and maintain a persistent, compounding knowledge base of linked markdown files. Based on [Andrej Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

## Workflows

### Initializing a New Wiki

1. **Gather requirements** - if unable to infer from context, ask the user:
    - Where should the LLM Wiki be created? Default to `~/wiki`
    - What domain should the wiki cover? - Be specific and do not accept "everything"

2. **Build the wiki structure**
    - If the path doesn't exist, create it.
    - If `<wiki>/AGENTS.md` already exists, stop. Ask the user for explicit confirmation to overwrite the current contents.
    - Use `.gitkeep` files to persist empty folders until files are created.
    - Create the directory structure as below

3. **Populate with templates**
    - Write `AGENTS.md`, customised to use specifics (see below)
    - Write initial `index.md` with sectioned headers
    - Write initial `log.md` with a creation entry

4. **Report back to the user**
    - Confirm the wiki is ready and if the user wants to ingest something.

### Working with the Wiki

A LLM Wiki will be at the `$LLM_WIKI_PATH` environment variable, defaulting to `~/wiki` otherwise.

When the user has an existing wiki, **always orient yourself before doing anything**:

1. Read `AGENTS.md` to understand the domain and conventions.
2. Read `index.md` to learn what pages exist.
3. Scan `log.md`'s last 10 entries to understand recent activity.

Only after orientation should you ingest, query, or lint. This prevents:

- Creating duplicate pages for entities that already exist
- Missing cross-references to existing content
- Contradicting the schema's conventions
- Repeating work already logged

For large wikis (100+ pages), also search files for the topic at hand before creating anything new.

### Ingest

When the user provides a source (URL, file, paste), integrate it into the wiki:

1. Capture the raw source:
    - Save the contents in the appropriate `raw/` subdirectory
    - Name the file descriptively

2. Discuss takeaways
    - Skip if instructed to do so or if in automated/cron context
    - Highlight top 3-5 takeaways with the user and what's interesting

3. Check what already exists
    - Search `index.md` and find existing pages for mentioned entities/concepts

4. Write / Update wiki pages
    - **New entities/concepts:** Create pages only if they meet the update policy
    - **Existing pages:** Add new information, facts, aligned with the update policy
    - Cross-reference and link with existing pages
    - Follow instructions on Tag Taxonomy.

5. Update navigation
    - Add new pages to `index.md` following instructions
    - Append to `log.md` following instructions

6. Commit and push via `git`
    - Use the `log.md` one line action subject

7. Report changes
    - Inform the user of what's been updated

### Query

When the user asks a question about the wiki's domain:

1. Read `index.md` to identify relevant pages
2. Read the relevant pages
3. From the compiled knowledge, cite the wiki pages you drew from.
4. If the answer is a substantial comparison:
    1. create a page in `queries/` or `comparisons/`. Don't file trivial lookups.
    2. Update `log.md`
    3. Commit and push via `git`

### Lint

When the user asks to lint, check-health, or audit the wiki:

1. Ensure every wiki page in the filesystem is present in `index.md`
2. Ensure any page over 200 lines is split according to sub-category
3. Scan for:
    - Contradictions
    - Stale claims superseded by newer sources
    - Missing cross-references or pages
    - Data gaps; concepts that lack depth
4. Report findings to the user, grouped by severity (broken links or references > contradictions > stale content > data gaps)

## Features

### LLM Wiki Structure

```text
<wiki>/
├─ .gitignore
├─ AGENTS.md            # Conventions, structure rules, domain configuration
├─ entities/            # For people, orgs, products, models...
├─ concepts/            # Concepts, topics...
├─ comparisons/         # Side-by-side analyses
├─ index.md             # Sectioned content catalogue with one-line summaries
├─ log.md               # Chronological action log (append-only)
└─ raw/                 # Immutable source material
    ├─ articles/        # Web Articles, clippings
    ├─ assets/          # Images, documents referenced by sources
    └─ transcripts/     # Meeting notes, interviews
    ```

### AGENTS.md Template

Adapt to the context of the domain and any specifics from the user.

```markdown
# AGENTS.md

## Purpose

<What the LLM Wiki is and what domain it covers>

## Conventions

- File names: lowercase, hypens, no spaces (e.g. `software-development-lifecycle.md`)
- Every wiki page has YAML Frontmatter (see below)
- When updating, always update metadata, especially the `updated` field.
- Use `[[wikilinks]]` to link between pages, minimum of 3 per page.
- Every new wiki page must be added to the `index.md` in the correct section.
- Every action taken should be appended to `log.md`
- Batch actions should only be a single entry

## Frontmatter

```yaml
  ---
  title: Page Title
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  type: entity | concept | comparison | query | summary
  tags:
    - [from taxonomy below]
  sources:
    - raw/articles/source-name.md
  ---
```

## Tags Taxonomy

<Define 5-20 tags for the domain. Add to this list BEFORE using them>

Rule: every tag on a page must appear in this taxonomy. If a new tag is needed,
add it here first, then use it. This prevents tag sprawl.

## Pages

- **Create a page** when an entity/concept appears in 2+ sources OR is central to one source
- **Add to existing page** when a source mentions something already covered
- **DON'T create a page** for passing mentions, minor details, or things outside the domain
- **Split a page** when it exceeds ~200 lines — break into sub-topics with cross-links
- **Archive a page** when its content is fully superseded — move to `_archive/`, remove from index

### Entities

One page per notable entity. Include:

- Overview / what it is
- Key facts and dates
- Relationships to other entities ([[wikilinks]])
- Source references

### Concepts

One page per concept or topic. Include:

- Definition / explanation
- Current state of knowledge
- Open questions or debates
- Related concepts ([[wikilinks]])

### Comparisons

Side-by-side analyses. Include:

- What is being compared and why
- Dimensions of comparison (table format preferred)
- Verdict or synthesis
- Sources

## Update Policy

When new information conflicts with existing content:

1. Check the dates — newer sources generally supersede older ones
2. If genuinely contradictory, note both positions with dates and sources
3. Mark the contradiction in frontmatter: `contradictions: [page-name]`
4. Flag for user review in the lint report

```

### index.md Template

```markdown
# Wiki Index

> Content catalog. Every wiki page listed under its type with a one-line summary.
> Read this first to find relevant pages for any query.

## Entities
<!-- Alphabetical within section -->

## Concepts

## Comparisons

## Queries

```

**Scaling rule:** When any section exceeds 50 entries, split it into sub-sections
by first letter or sub-domain. When the index exceeds 200 entries total, create
a `_meta/topic-map.md` that groups pages by theme for faster navigation.

### log.md Template

```markdown
# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY-MM-DD.md, start fresh.

## [YYYY-MM-DD] create | Wiki initialized
- Domain: [domain]
- Structure created with AGENTS.md, index.md, log.md
```

## Pitfalls

- **Never modify files in `raw/`** — sources are immutable. Corrections go in wiki pages.
- **Always orient first** — read SCHEMA + index + recent log before any operation in a new session.
  Skipping this causes duplicates and missed cross-references.
- **Always update index.md and log.md** — skipping this makes the wiki degrade. These are the
  navigational backbone.
- **Don't create pages for passing mentions** — follow the Page Thresholds in SCHEMA.md. A name
  appearing once in a footnote doesn't warrant an entity page.
- **Don't create pages without cross-references** — isolated pages are invisible. Every page must
  link to at least 2 other pages.
- **Frontmatter is required** — it enables search, filtering, and staleness detection.
- **Tags must come from the taxonomy** — freeform tags decay into noise. Add new tags to SCHEMA.md
  first, then use them.
- **Keep pages scannable** — a wiki page should be readable in 30 seconds. Split pages over
  200 lines. Move detailed analysis to dedicated deep-dive pages.
- **Ask before mass-updating** — if an ingest would touch 10+ existing pages, confirm
  the scope with the user first.
- **Rotate the log** — when log.md exceeds 500 entries, rename it `log-YYYY.md` and start fresh.
  The agent should check log size during lint.
- **Handle contradictions explicitly** — don't silently overwrite. Note both claims with dates,
  mark in frontmatter, flag for user review.
- **Resolve git rebase to resolve conflicts** - and lint afterwards.
