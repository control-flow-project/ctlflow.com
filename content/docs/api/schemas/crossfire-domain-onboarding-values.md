---
title: "crossfire/node/packages/domain/src/onboarding/values.ts"
linkTitle: "values"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/onboarding/values.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

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
