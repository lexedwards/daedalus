---
name: create-agent
description: Use before creating, editing, reviewing, or improving an agent definition: its description, prompt, permissions, or model settings. Owns delegation descriptions, brief and output contracts, and permission audits. Use create-skill for skills and harness-configuration for host fields.
---

# Creating and Maintaining Agents

An agent is a delegated worker: it receives a brief, works in its own context with its own tools and permissions, and returns a result to whoever delegated. A skill instructs the agent that is already working. Apply this workflow to new agents, updates, reviews, and improvements alike.

Before assessing or changing a maintained agent definition, load [code-crafting](../code-crafting/SKILL.md); before the first prose write, also load [technical-writing](../technical-writing/SKILL.md). For host-specific fields, file formats, discovery, precedence, or registration, load [harness-configuration](../harness-configuration/SKILL.md). If the user later requests a commit or publication, load [incremental-commits](../incremental-commits/SKILL.md) before committing and [pr-delivery](../pr-delivery/SKILL.md) before pushing or preparing a PR.

## Choose an agent or a skill

Create an agent only when the work needs at least one of these:

- **Separate context:** bulk reading or exploration that would crowd the delegating agent.
- **Different capabilities:** narrower or wider tools, permissions, model, or effort.
- **Independence:** a judgment that must not share the author's context, such as review.
- **Parallel work:** several workers on separate state.

Otherwise, write a skill with [create-skill](../create-skill/SKILL.md).

## Gather requirements upfront

Establish the following from the request and existing assets; ask only for missing information that changes the definition:

1. **Job and boundary:** the one job the agent does, and what it must never do.
2. **Delegator:** the user, a coordinating agent, or proactive use after a workflow stage.
3. **Brief:** what each delegation must supply, and the defaults when it does not.
4. **Output:** the result the delegator receives, in a shape it can act on.
5. **Capabilities:** the tools, permissions, model, effort, and step budget the job needs.
6. **Hosts:** which harnesses must load the definition.

## Write the description

The delegating agent decides from the description alone whether to hand work over. State:

- **The job and its boundary** first, such as "read-only" or "one supplied claim at a time".
- **When to delegate:** the situation or workflow stage, such as "after verification, for substantial or high-risk changes". Quote only words people actually type.
- **What it returns**, when that is not obvious from the job.
- **Near misses** that belong to another agent or to the delegator itself.

Keep it to delegation. Put skills the agent should use, process steps, and instructions in the prompt. Apply [create-skill's description rules](../create-skill/SKILL.md#write-descriptions-for-selection) for length and wording.

## Write the prompt

Structure the prompt as contracts the delegator and the agent can both check:

- **Role:** one sentence naming the job and its boundary.
- **Required brief:** the inputs each delegation must supply, with defaults.
- **Boundaries:** actions the agent never takes, scope limits, and when to stop.
- **Process:** the steps, with budgets such as effort levels or finding caps where the job needs them.
- **Output:** the exact sections or format the delegator reads, including what to return when there is nothing to report.

Keep agent-specific guidance, such as budgets, boundaries, and the output contract, in the agent. Point to shared rules instead of restating them:

- When the agent can load skills, name the skill at the decision point that needs it.
- When the agent can only read files, link the skill or principle with a path resolvable from the agent file, and instruct the agent to read it.
- When the agent can do neither, keep the minimal rule inline and record its owner in the delegating workflow.

Do not claim the agent pairs with a skill it cannot load or read.

## Audit permissions

Grant the least capability the job needs, then make the description, permissions, and output agree.

- Start from denial and allow only the tools the process uses.
- Gate mutating, external, or destructive actions behind approval, or deny them.
- Allow delegation to other agents only when coordination is the job.
- Check each claim in the description against the permissions: an agent described as read-only cannot hold write access, and a message writer is not a verification or commit workflow.
- Check that every file the prompt tells the agent to read is permitted and resolves.

Permission syntax, rule order, and inheritance differ by host; see [harness-configuration](../harness-configuration/SKILL.md).

## Choose the owner

Apply [create-skill's ownership rules](../create-skill/SKILL.md#choose-the-owner) and its [semantic duplication check](../create-skill/SKILL.md#check-for-semantic-duplication) to agent prompts. Compare the prompt with related skills, principles, and other agents. Shared rules live in principles or skills; an agent restating them in its own words is duplication even when the wording differs.

## Improve an existing agent

Classify the failure before changing the definition:

- **Not delegated, or delegated wrongly:** fix the description.
- **Exceeded its boundary:** fix the permissions first, then the prompt.
- **Unusable output:** fix the output contract and the brief.
- **Inconsistent with shared guidance:** fix ownership with the duplication check.

## Validate the agent

- Frontmatter parses, and the name matches the file and host conventions
- The description, permissions, and output contract agree
- Every linked skill, principle, or file resolves and is readable under the agent's permissions
- No prompt rule duplicates the meaning of guidance owned elsewhere
- Walk through one delegation that should reach the agent, one near miss that should not, and one brief that asks it to cross its boundary
- Register the agent where the host requires; see [harness-configuration](../harness-configuration/SKILL.md)
