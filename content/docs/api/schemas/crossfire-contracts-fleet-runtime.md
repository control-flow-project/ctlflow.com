---
title: "crossfire/node/packages/contracts/src/fleet-runtime.ts"
linkTitle: "fleet-runtime"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/fleet-runtime.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)

## runtimeAction {#runtimeAction}

```typescript
runtimeAction = check.choice('start', 'stop', 'reset')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## runtimeOperation {#runtimeOperation}

```typescript
runtimeOperation = check.refine(check.object({ operationId: check.identifier, fleetId: check.identifier,
    agentId: check.nullable(check.identifier), action: runtimeAction, expectedRevision: check.integer(),
    status: check.choice('pending', 'running', 'succeeded', 'failed'), createdAt: check.integer(), completedAt: check.nullable(check.integer()),
    errorMessage: check.nullable(check.text(4096)) }), value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null), 'Invalid session operation outcome')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## runtimeRequest {#runtimeRequest}

```typescript
runtimeRequest = check.refine(check.object({ operationId: check.identifier, agentId: check.nullable(check.identifier),
    action: runtimeAction, expectedRevision: check.integer(), confirmFreshHistory: check.boolean }), value => value.confirmFreshHistory === (value.action === 'reset'), 'Fresh history requires explicit confirmation')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## runtimeClaim {#runtimeClaim}

```typescript
runtimeClaim = check.object({ connectionId: check.identifier })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## runtimeReceipt {#runtimeReceipt}

```typescript
runtimeReceipt = check.refine(check.object({ connectionId: check.identifier, status: check.choice('succeeded', 'failed'),
    errorMessage: check.nullable(check.text(4096)) }), value => (value.status === 'failed') === (value.errorMessage !== null), 'Invalid session receipt')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## FleetRuntimeOperation {#FleetRuntimeOperation}

```typescript
export type FleetRuntimeOperation = check.Parsed<typeof runtimeOperation>;
```

Related definitions:

- [`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)
