---
name: principle-hide-useful-complexity
description: Apply when designing modules, interfaces, or abstractions. Hide cohesive complexity behind a small interface that reduces caller knowledge.
disable-model-invocation: true
---

# Hide Useful Complexity

Hide one cohesive concern behind an interface that reduces what callers must know.

- Keep related rules together. Expose only the inputs, outputs, and constraints callers need.
- Prefer existing interfaces, plain functions, explicit data flow, and composition.
- Add a seam for real variation or a module that meaningfully simplifies its callers.
- Keep ownership of validation, state, and errors explicit.
- Collapse pass-through layers and reject speculative adapters, broad managers, and utility dumping grounds.
- Preserve useful encapsulation when removing it would scatter the same rules across callers.

**The tests:**

- "What can the caller stop knowing because this module exists?" If nothing, collapse the layer.
- "Must the caller understand internal ordering, flags, or representation to use this interface correctly?" Move those decisions behind the interface.
- "Would deleting this module duplicate cohesive rules across its callers?" If yes, preserve the encapsulation and simplify its surface.
- "Do these responsibilities change for the same reason?" If not, separate the unrelated concerns.
