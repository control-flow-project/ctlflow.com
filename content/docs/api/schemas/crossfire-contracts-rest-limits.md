---
title: "crossfire/node/packages/contracts/src/rest/limits.ts"
linkTitle: "limits"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/limits.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

This module has no local contract dependencies.

## HTTP_LIMITS {#HTTP_LIMITS}

```typescript
HTTP_LIMITS = { requestBytes: 2 * 1024 * 1024, responseBytes: 32 * 1024 * 1024, requestMilliseconds: 30000,
    publicMutationsPerMinute: 120, publicMutationsGlobalPerMinute: 4096, publicMutationClients: 4096 } as const
```
