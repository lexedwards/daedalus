---
name: principle-public-work-public-tracking
description: Apply when choosing where to track requirements, features, bugs, or implementation tasks for open-source or public repositories. Prefer public tracking alongside public code while respecting established workflows and sensitive information.
disable-model-invocation: true
---

# Public Work, Public Tracking

Prefer publicly accessible work tracking when the resulting code is public, so contributors can understand and participate in the work.

- For public GitHub repositories, default to GitHub Issues for features and bugs, with milestones for related work or delivery goals.
- Check repository guidance, contribution documentation, and existing work items before choosing a tracker. Do not infer visibility or tracking practice from a GitHub remote alone.
- Respect the project's established tracker, even if private. Changing tracking systems requires explicit user direction; do not create a competing tracker or migrate existing work on your own.
- Honor explicit requests for local artifacts or response-only drafts. A draft's location does not itself change the project's tracker, and a local source document does not automatically require local task tracking.
- Keep undisclosed security vulnerabilities and other sensitive work private until safe to disclose. Do not copy sensitive details into public issues, milestones, commits, or PRs.
- This default chooses a destination, not permission to publish. Respect write authorization, and report unavailable tools or access rather than silently choosing a different tracker.

**The tests:**

- "Can public contributors see the context for this public change?" Prefer public tracking unless established practice or sensitivity requires otherwise.
- "Am I following the project's tracker or creating a competing one?" Require explicit user direction before shifting tracking systems.
- "Is this information safe and authorized to publish?" Resolve uncertainty before writing publicly.
