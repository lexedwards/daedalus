# Module Design

Read this reference when deciding whether logic needs a new module, interface, seam, or adapter.

## Vocabulary

- **Module:** anything with an interface and implementation.
- **Interface:** everything callers must know, including types, invariants, ordering, errors, configuration, and meaningful performance expectations.
- **Seam:** a point where behavior can vary without editing the caller.
- **Adapter:** a concrete implementation at a seam.
- **Depth:** useful behavior hidden behind a small interface.

## Reconcile the Defaults

Start with the least code that satisfies the requirement. Add a deeper module only when one cohesive concern hides enough complexity to reduce caller knowledge. Minimalism removes unnecessary structure; it does not require spreading complex rules across callers.

## Before Adding a Seam

Ask:

- Does this behavior vary for a real, present reason?
- Are the rules behind the seam directly related?
- Does the seam make callers simpler or merely move complexity?
- Would deleting the module spread the same cohesive logic across callers?
- Is an existing interface or helper sufficient?
- Is there one implementation with no credible variation? If so, prefer a local function unless the seam is already real.

## Prefer

- Plain functions before classes when stateful identity is not needed.
- Existing interfaces before new interfaces.
- Explicit data flow before hidden orchestration.
- Composition of small modules before one broad module.
- One cohesive deep module before duplicated business rules.

## Avoid

- God modules.
- Manager objects that coordinate unrelated work.
- Utility dumping grounds.
- Pass-through layers.
- Speculative adapters and generic abstractions.
- Excessive exports that enlarge the public surface.

## Interface Checklist

Before finalizing a seam, document or verify the caller-visible contract:

- Inputs and outputs.
- Invariants and ordering constraints.
- Error modes and trust boundaries.
- Configuration and defaults.
- Performance or resource expectations when material.
- Ownership of validation and business rules.
