---
title: "crossfire/node/packages/kernel/src/identifier.ts"
linkTitle: "identifier"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/kernel/src/identifier.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## opaqueIdentifier {#opaqueIdentifier}

```typescript
export function opaqueIdentifier(value: unknown): value is string {
    return typeof value === 'string' && value.length >= 1 && value.length <= 255 && value.isWellFormed() && !/[\u0000-\u001f\u007f]/u.test(value);
}
```
