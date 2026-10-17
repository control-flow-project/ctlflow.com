---
title: Validation definitions
description: Types, constants and validation functions used by the HTTP operations.
weight: 60
---

Operation pages link to these definitions for types, limits and custom checks.
The TypeScript is reproduced from the recorded source revision.

`check.object` rejects unknown fields. `check.optional` permits an omitted property; `check.nullable` permits explicit JSON null. They are different contracts. Imported constants retain their actual bounds. Function branches and predicates are required validation, not examples.

These snippets document server validation. Clients do not need to import them;
JavaScript, TypeScript, C# and Rust programs can call the HTTP API directly.
