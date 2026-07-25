---
model: GPT-5.6 Sol
effort: high
domain: skill
name: code-crafting
scores:
  trigger-quality: 3
  outcome-uplift: 3
  reliability: 4
  efficiency: 3
  procedural-compliance: 4
  safety: 5
  context-efficiency: 3
  source-alignment: 4
  maintainability: 4
  durability: 5
---

# Feedback: Skill - code-crafting-preview

## Assessment

The skill presents a coherent, durable engineering workflow and cleanly separates implementation, bug-fix, code-review, and design-review modes. Its strongest qualities are scope discipline, risk-aware verification, explicit review behavior, and progressive disclosure through focused references.

The main weakness is that its effectiveness is asserted rather than demonstrated. No prompt set, baseline, repeated trials, or ablation evidence was supplied, so outcome uplift, trigger precision, reliability, and execution cost cannot be confirmed. The scores for those measures assess the theory only.

## Findings

### Medium: The trigger surface is too broad to predict precision

**Location:** `skills/code-crafting-preview/SKILL.md`, frontmatter description and `When To Use`

**Evidence:** The description covers implementation, bug fixing, refactoring, code review, design review, module placement, testing, and verification. These categories encompass most software-engineering tasks. The negative boundary for documentation appears in the body, but not in the trigger-facing description.

**Impact:** A harness that selects skills primarily from frontmatter may load this skill for routine tasks where its context and procedural overhead provide little uplift. Recall is likely high, but precision is unknown.

**Recommendation:** Narrow the frontmatter description around situations where the skill adds distinctive value, and include the most important negative trigger. Validate it with positive and negative prompt sets.

**Confidence:** High

### Medium: The main file duplicates substantial reference guidance

**Location:** `skills/code-crafting-preview/SKILL.md`; `references/review-workflows.md`, `references/module-design.md`, `references/testing-and-tdd.md`, and `references/verification.md`

**Evidence:** Mode flows, review reporting, seam selection, test precedence, test-double guidance, and verification escalation are summarized in `SKILL.md` and then restated in references. Progressive disclosure exists structurally, but an agent already receives much of the referenced content before deciding whether to read it.

**Impact:** The entry-point context is larger than necessary, and duplicated rules can drift during maintenance. Reading a reference may add tokens without adding enough new instruction.

**Recommendation:** Keep the decision rules and reference-loading triggers in `SKILL.md`; move detailed checklists, examples, output schemas, and repeated explanations exclusively into references.

**Confidence:** High

### Medium: Compliance rules are not operationally testable enough

**Location:** `skills/code-crafting-preview/SKILL.md`, `Prove the Behavior`, `Verify`, and `Done and Output`

**Evidence:** The skill uses flexible terms such as "when practical," "legitimate reason," "genuinely trivial," "relevant checks," and "broaden verification." The references add useful guidance but do not define an observable compliance rubric for those judgment calls.

**Impact:** Different runs may choose materially different test depth, classify the same change differently, or omit a pre-change failure while still appearing compliant. This may increase outcome variance.

**Recommendation:** Add a compact evaluator-facing decision table or checklist that maps task conditions to required observable actions and explicitly records justified exceptions.

**Confidence:** Medium

### Low: Verification instructions may cause unnecessary repeated checks

**Location:** `skills/code-crafting-preview/SKILL.md`, `Implement and Refactor`

**Evidence:** The instruction to run the relevant check after each refactor step is categorical, while the rest of the skill advocates the cheapest sufficient verification and stopping once the outcome is satisfied.

**Impact:** Agents making several safe, local cleanup edits may incur avoidable latency and tool calls without increasing confidence proportionally.

**Recommendation:** Require checks after each behaviorally meaningful or risk-changing refactor increment rather than every mechanical step.

**Confidence:** Medium

## Strengths

- Review requests have a dedicated non-editing workflow and evidence-based finding format.
- Safety-critical concerns are explicitly protected from minimalism.
- The module-design guidance reconciles small changes with cohesive, deeper modules.
- Testing guidance favors public behavior, independent expectations, and real implementations.
- The content encodes durable engineering preferences rather than temporary model workarounds.
- The directory and frontmatter conform to the required skill structure.

## Recommendation

Retain the workflow and safety model, but tighten the frontmatter trigger and remove repeated detail from `SKILL.md`. Before promotion from preview, create an ablation suite covering implementation, bug-fix, refactor, code-review, design-review, documentation, and trivial-task prompts. Compare repeated skilled and unskilled runs on outcome score, compliance, variance, tokens, latency, and tool calls.

## Residual Risk

Without isolated repeated trials, there is no evidence that the skill improves pass rate enough to justify its broad activation surface or that its additional procedure reduces rather than increases task cost.
