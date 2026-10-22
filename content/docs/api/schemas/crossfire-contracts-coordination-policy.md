---
title: "crossfire/node/packages/contracts/src/coordination-policy.ts"
linkTitle: "coordination-policy"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/coordination-policy.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/domain/src/coordination/values.ts`](/docs/api/schemas/crossfire-domain-coordination-values/)

## backendWakeSelection {#backendWakeSelection}

```typescript
backendWakeSelection = check.object({ backendUserId: check.backendUserId, includeAgents: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## coordinationPolicy {#coordinationPolicy}

```typescript
coordinationPolicy = check.refine(check.object({ wakeMode: check.wakeMode,
    senders: check.list(backendWakeSelection, 2000), permissions: check.list(check.choice('room.agent.invite'), 1) }), policy => (policy.wakeMode !== 'everyone' || policy.senders.length === 0)
    && new Set(policy.senders.map(sender => sender.backendUserId)).size === policy.senders.length, 'Select unique identities; everyone requires no individual selections') satisfies check.Parser<CoordinationPolicy>
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`backendWakeSelection`](/docs/api/schemas/crossfire-contracts-coordination-policy/#backendWakeSelection)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`CoordinationPolicy`](/docs/api/schemas/crossfire-domain-coordination-values/#CoordinationPolicy)

## defaultCoordinationPolicy {#defaultCoordinationPolicy}

```typescript
export function defaultCoordinationPolicy(ownerBackendUserId: string): CoordinationPolicy {
    return { wakeMode: 'selected', senders: [{ backendUserId: ownerBackendUserId, includeAgents: false }], permissions: [] };
}
```

Related definitions:

- [`CoordinationPolicy`](/docs/api/schemas/crossfire-domain-coordination-values/#CoordinationPolicy)
