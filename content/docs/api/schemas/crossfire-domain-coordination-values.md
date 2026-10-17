---
title: "crossfire/node/packages/domain/src/coordination/values.ts"
linkTitle: "values"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/coordination/values.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/domain/src/wake/types.ts`](/docs/api/schemas/crossfire-domain-wake-types/)

## CoordinationPolicy {#CoordinationPolicy}

```typescript
export type CoordinationPolicy = {
    wakeMode: 'humans' | 'everyone' | 'selected';
    senders: MatrixWakeSelection[];
    permissions: 'room.agent.invite'[];
};
```

Related definitions:

- [`MatrixWakeSelection`](/docs/api/schemas/crossfire-domain-wake-types/#MatrixWakeSelection)
