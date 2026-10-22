---
title: "crossfire/node/packages/domain/src/coordination/values.ts"
linkTitle: "values"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/coordination/values.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/domain/src/wake/types.ts`](/docs/api/schemas/crossfire-domain-wake-types/)

## CoordinationPolicy {#CoordinationPolicy}

```typescript
export type CoordinationPolicy = {
    wakeMode: 'humans' | 'everyone' | 'selected';
    senders: BackendWakeSelection[];
    permissions: 'room.agent.invite'[];
};
```

Related definitions:

- [`BackendWakeSelection`](/docs/api/schemas/crossfire-domain-wake-types/#BackendWakeSelection)
