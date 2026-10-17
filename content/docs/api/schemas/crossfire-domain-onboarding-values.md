---
title: "crossfire/node/packages/domain/src/onboarding/values.ts"
linkTitle: "values"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/onboarding/values.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

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
