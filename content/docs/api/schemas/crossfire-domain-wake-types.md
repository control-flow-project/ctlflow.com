---
title: "crossfire/node/packages/domain/src/wake/types.ts"
linkTitle: "types"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/wake/types.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## WakeSelection {#WakeSelection}

```typescript
export type WakeSelection = {
    principalId: string;
    includeAgents: boolean;
};
```

## MatrixWakeSelection {#MatrixWakeSelection}

```typescript
export type MatrixWakeSelection = {
    matrixUserId: string;
    includeAgents: boolean;
};
```
