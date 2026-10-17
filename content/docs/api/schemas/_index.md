---
title: Exact contract definitions
description: The parser modules and transitive definitions that own fields, unions, refinements, constants and custom validation.
weight: 60
---

Operation pages expand structured fields and link here for exact definitions. Custom functions are retained rather than silently converted into incomplete JSON Schema.

`check.object` rejects unknown fields. `check.optional` permits an omitted property; `check.nullable` permits explicit JSON null. They are different contracts. Imported constants retain their actual bounds. Function branches and predicates are required validation, not examples.

These reference snippets are not a public language SDK. JavaScript/TypeScript, C# and Rust callers use the same HTTP wire contract.
