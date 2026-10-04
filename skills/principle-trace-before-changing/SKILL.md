---
name: principle-trace-before-changing
description: Apply before changing code, diagnosing a defect, or assessing a design. Ground decisions in the actual behavior, callers, and boundaries.
disable-model-invocation: true
---

# Trace Before Changing

Understand the real path before changing or judging it.

- Read the relevant behavior end to end, including callers, shared helpers, and system boundaries.
- Establish the intended behavior and the constraints already encoded in the project.
- Inspect sibling callers and shared functions before choosing where a fix belongs.
- Check existing conventions, interfaces, and dependencies before introducing a new pattern.
- Resolve observable questions through inspection or execution. Ask the user when missing intent materially changes the outcome.
- For a reported defect, reproduce the relevant path when feasible. Otherwise inspect or instrument enough of it to distinguish the suspected causes.
- Keep the investigation bounded to the decision at hand. Do not substitute assumptions for evidence.

**The tests:**

- "Can I trace this input to the observable result and name the boundaries it crosses?" If not, inspect the missing path before choosing a change.
- "Which other callers use the code I am about to change?" Find them and establish whether they depend on the same behavior.
- "Did I observe this behavior, or infer it from a name, comment, or worker report?" Check the source or run the path before treating the inference as fact.
- "Would more exploration change this decision?" If not, stop exploring and act on the evidence already gathered.
