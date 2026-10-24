---
name: principle-match-delivery-to-task
description: Apply when planning deliverables, writing documentation, or deciding task completion. Match delivery to investigation, implementation, or explicitly requested standalone research outcomes.
disable-model-invocation: true
---

# Match Delivery to the Task

Choose the deliverable that establishes the agreed task outcome, rather than forcing every task through implementation delivery.

This governs deliverable type. Evidence quality belongs to [Evidence Before Verdicts](../principle-evidence-before-verdicts/SKILL.md); integration of maintained changes belongs to [Integrate Through Review](../principle-integrate-through-review/SKILL.md).

- For investigation-only work, agree the question, evidence and handoff destination, and acceptance gate. Findings can complete the task without an implementation or documentation PR.
- Carry findings, constraints, decisions, and verification gaps into the relevant implementation tasks. Distinguish observed behavior from proposed changes or operating procedures.
- Maintained operating documentation describes implemented behavior and accompanies the implementation it explains; do not promote experimental findings into as-built guidance.
- Support explicitly requested standalone research deliverables at their agreed destination and review gate, including a PR when that is the requested artifact.
- Changing an artifact's destination or maintenance status does not authorize deleting existing work. Obtain any required removal permission separately.

**The tests:**

- "Is this task meant to answer a question or deliver maintained behavior?" Choose the evidence handoff or implementation gate accordingly.
- "Would this document tell operators to rely on behavior that does not exist?" Keep it as findings or a proposal, not maintained operating guidance.
- "Can the next implementation task find the constraints and remaining checks?" Carry the handoff forward before calling the investigation complete.
