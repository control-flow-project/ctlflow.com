---
title: "crossfire/node/packages/contracts/src/rest/limits.ts"
linkTitle: "limits"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/limits.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## HTTP_LIMITS {#HTTP_LIMITS}

```typescript
HTTP_LIMITS = { requestBytes: 2 * 1024 * 1024, responseBytes: 32 * 1024 * 1024, requestMilliseconds: 30000,
    publicMutationsPerMinute: 120, publicMutationsGlobalPerMinute: 4096, publicMutationClients: 4096 } as const
```
