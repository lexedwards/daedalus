---
name: principle-boundary-discipline
description: Apply when placing validation, error handling, domain logic, or framework adapters. Validate at trust boundaries, use domain values internally, and keep the I/O shell thin.
disable-model-invocation: true
---

# Boundary Discipline

Establish trust at the boundary that owns it. Pass validated domain values inward and keep external representations and I/O out of domain decisions.

- **Validate at entry.** Parse CLI arguments, configuration, network payloads, and external storage results into the domain model. Reject invalid input with a meaningful error at the boundary that owns it.
- **Trust established invariants.** Internal functions consume validated values. Remove repeated shape checks and defensive fallbacks for states the boundary already excludes. A type annotation or unchecked cast does not establish validity.
- **Respect each trust transition.** Validate new external data where it enters. Enforce authorization where the operation crosses a permission boundary; valid input does not imply permission.
- **Keep domain logic pure.** Pass explicit inputs to functions that return decisions or results. Keep transport, persistence, clocks, and framework lifecycle out of those functions.
- **Keep the shell mechanical.** Let adapters acquire input, invoke domain logic, perform I/O, and translate results into the external protocol. Keep business policy out of handlers and framework callbacks.
- **Expose domain concepts.** Translate wire, storage, and framework representations at the edge. Do not leak their private shapes through the domain interface.
- **Handle errors at their owner.** Propagate failures to the layer that can recover or translate them meaningfully. Do not turn broken invariants into silent defaults or catch the same failure at every layer.

**The tests:**

- "Is this check guarding new untrusted data or repeating an invariant already established?" Keep the boundary check; remove the redundant internal guard.
- "Can an invalid value reach this function without passing through the parser?" Close that entry path or strengthen construction of the domain value.
- "Can this decision run with plain inputs and no server, database, or framework?" If not, separate the decision from its I/O dependencies.
- "Does a transport or storage change force the business rules to change?" Move representation conversion into the adapter.
- "Can this layer actually recover from the error?" If not, propagate it to the owner instead of hiding it.
