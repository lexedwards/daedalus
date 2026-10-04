# Module Design

Read this reference when deciding whether logic needs a new module, interface, seam, or adapter.

## Vocabulary

- **Module:** anything with an interface and implementation.
- **Interface:** everything callers must know, including types, invariants, ordering, errors, configuration, and meaningful performance expectations.
- **Seam:** a point where behavior can vary without editing the caller.
- **Adapter:** a concrete implementation at a seam.
- **Depth:** useful behavior hidden behind a small interface.

## Design the Seam

Introduce a module only when its cohesive behavior reduces caller knowledge or its seam represents real variation ([principle-hide-useful-complexity](../../principle-hide-useful-complexity/SKILL.md)).

Keep the design no larger than the current requirement needs ([principle-smallest-complete-change](../../principle-smallest-complete-change/SKILL.md)).

Separate domain decisions from framework, transport, and storage adapters ([principle-boundary-discipline](../../principle-boundary-discipline/SKILL.md)).

## Interface Checklist

Before finalizing a seam, document or verify the caller-visible contract:

- Inputs and outputs.
- Invariants and ordering constraints.
- Error modes and trust boundaries.
- Configuration and defaults.
- Performance or resource expectations when material.
- Ownership of validation and business rules.
