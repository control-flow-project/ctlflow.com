---
title: "crossfire/node/packages/domain/src/onboarding/values.ts"
linkTitle: "values"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/onboarding/values.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## SetupDescriptor {#SetupDescriptor}

```typescript
export type SetupDescriptor = {
    schemaVersion: 1;
    server: string;
    ownerMatrixId: string;
    package: {
        name: '@ctlflow/fleet';
        version: string;
    };
    instructions: string;
};
```
