---
title: "fleetd/node/packages/contracts/src/api.ts"
linkTitle: "api"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/schema/controller.ts`](/docs/api/schemas/crossfire-contracts-schema-controller/)
- [`services/crossfire/node/packages/contracts/src/rest/operation.ts`](/docs/api/schemas/crossfire-contracts-rest-operation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/schema/query.ts`](/docs/api/schemas/crossfire-contracts-schema-query/)
- [`services/fleetd/node/packages/contracts/src/attachment.ts`](/docs/api/schemas/fleetd-contracts-attachment/)
- [`services/crossfire/node/packages/contracts/src/fleet-control.ts`](/docs/api/schemas/crossfire-contracts-fleet-control/)
- [`services/fleetd/node/packages/contracts/src/setup.ts`](/docs/api/schemas/fleetd-contracts-setup/)
- [`services/fleetd/node/packages/contracts/src/configuration.ts`](/docs/api/schemas/fleetd-contracts-configuration/)

## releaseDirectory {#releaseDirectory}

```typescript
releaseDirectory = check.refine(check.text(4096), value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..'), 'Release directory must be an absolute normalized path')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## instance {#instance}

```typescript
instance = check.object({ key: check.name, name: check.name, definition: check.name, workarea: check.text(1024),
    workspace: check.optional(check.text(4096)),
    runtimeOptions: check.optional(runtimeOptions),
    listenerOptions: check.optional(check.object({ historyMode: check.optional(check.choice('shared', 'per-room')) })) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`runtimeOptions`](/docs/api/schemas/fleetd-contracts-configuration/#runtimeOptions)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## phase {#phase}

```typescript
phase = check.choice('stopped', 'starting', 'awaiting-approval', 'running', 'sleeping', 'waking', 'stopping', 'failed')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## instanceView {#instanceView}

```typescript
instanceView = check.object({ instance, phase, listenerActive: check.boolean, desiredActive: check.boolean,
    lastActivityAt: check.nullable(check.integer()), historyAvailable: check.nullable(check.boolean),
    sessionId: check.nullable(check.text(200)), error: check.nullable(check.text(4096)), startedAt: check.nullable(check.integer()) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`instance`](/docs/api/schemas/fleetd-contracts-api/#instance)
- [`phase`](/docs/api/schemas/fleetd-contracts-api/#phase)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## fleetView {#fleetView}

```typescript
fleetView = check.object({ fleetId: check.identifier, fleetKey: check.name, label: check.text(100), directory: check.text(4096), revision: check.integer(), controller,
    resumeInstanceKeys: check.nullable(check.list(check.name, 100)),
    phase, instances: check.list(instanceView, 100), error: check.nullable(check.text(4096)),
    connection: check.object({ connected: check.boolean, deliveryEnabled: check.boolean, revision: check.nullable(check.integer()), error: check.nullable(check.text(4096)) }) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`phase`](/docs/api/schemas/fleetd-contracts-api/#phase)
- [`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## target {#target}

```typescript
target = check.object({ kind: check.choice('fleet', 'agent', 'daemon'), fleetId: check.optional(check.identifier), instanceKey: check.optional(check.name) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)

## operationFields {#operationFields}

```typescript
operationFields = { operationId: check.identifier, target, action: check.choice('enroll', 'start', 'stop', 'reset', 'update'), expectedRevision: check.integer(),
    releaseDirectory: check.optional(releaseDirectory) }
```

Related definitions:

- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`target`](/docs/api/schemas/fleetd-contracts-api/#target)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)

## operationInput {#operationInput}

```typescript
operationInput = check.refine(check.object(operationFields), value => (value.action === 'update') === (value.releaseDirectory !== undefined), 'Only an explicit software update supplies its installed release directory')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`operationFields`](/docs/api/schemas/fleetd-contracts-api/#operationFields)
- [`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)

## operationView {#operationView}

```typescript
operationView = check.refine(check.object({ ...{
        ...operationFields,
    }, receiptPending: check.optional<true>(input => input === true ? success(true) : failure('invalid', 'Only unacknowledged controller requests are pinned')),
    status: check.choice('accepted', 'running', 'awaiting-approval', 'succeeded', 'failed'), createdAt: check.integer(), completedAt: check.nullable(check.integer()),
    approval: check.nullable(check.object({ url: check.text(2048), code: check.text(12, 12) })), errors: check.list(check.object({ instanceKey: check.nullable(check.name), code: check.text(100), message: check.text(4096) }), 100) }), value => (value.action === 'update') === (value.releaseDirectory !== undefined), 'Only an explicit software update supplies its installed release directory')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`operationFields`](/docs/api/schemas/fleetd-contracts-api/#operationFields)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)

## FleetView {#FleetView}

```typescript
export type FleetView = check.Parsed<typeof fleetView>;
```

Related definitions:

- [`fleetView`](/docs/api/schemas/fleetd-contracts-api/#fleetView)

## InstanceView {#InstanceView}

```typescript
export type InstanceView = check.Parsed<typeof instanceView>;
```

Related definitions:

- [`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView)

## OperationInput {#OperationInput}

```typescript
export type OperationInput = check.Parsed<typeof operationInput>;
```

Related definitions:

- [`operationInput`](/docs/api/schemas/fleetd-contracts-api/#operationInput)

## OperationView {#OperationView}

```typescript
export type OperationView = check.Parsed<typeof operationView>;
```

Related definitions:

- [`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView)

## common {#common}

```typescript
common = { auth: 'public' as const, permissions: [], status: 200 as const, collection: false }
```

## params {#params}

```typescript
params = check.object({ fleetId: check.identifier })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## agentParams {#agentParams}

```typescript
agentParams = check.object({ fleetId: check.identifier, instanceKey: check.name })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)

## setupResult {#setupResult}

```typescript
setupResult = check.object({ fleet: fleetView, operation: check.nullable(operationView), status: check.choice('starting', 'ready', 'stopped') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`fleetView`](/docs/api/schemas/fleetd-contracts-api/#fleetView)
- [`operation`](/docs/api/schemas/crossfire-contracts-rest-operation/#operation)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## operations {#operations}

```typescript
operations = {
    setup: operation({ ...common, method: 'POST', path: '/api/setup', params: check.empty, query: none, input: setupInput,
        output: setupResult, description: 'Set up an ordinary fleet without configuration questions; preserve prior stop intent' }),
    status: operation({ ...common, method: 'GET', path: '/api/status', params: check.empty, query: none, input: check.empty,
        output: check.object({ controller, startedAt: check.integer(), stopping: check.boolean,
            loggingRetentionDays: check.integer(1), loggingError: check.nullable(check.text(4096)) }), description: 'Controller status' }),
    fleets: operation({ ...common, method: 'GET', path: '/api/fleets', params: check.empty, query: page, input: check.empty, output: check.list(fleetView, 100), collection: true, description: 'Registered fleets' }),
    addFleet: operation({ ...common, method: 'POST', path: '/api/fleets', params: check.empty, query: none, input: check.object({ directory: check.text(4096) }), output: fleetView, status: 201, description: 'Register directory' }),
    fleet: operation({ ...common, method: 'GET', path: '/api/fleets/{fleetId}', params, query: none, input: check.empty, output: fleetView, description: 'Fleet details' }),
    readiness: operation({ ...common, method: 'GET', path: '/api/fleets/{fleetId}/readiness', params, query: none, input: check.empty,
        output: check.object({ accepted: check.boolean }), description: 'Verify desired listeners through their live model-free native diagnostic without starting sessions' }),
    changeFleet: operation({ ...common, method: 'PATCH', path: '/api/fleets/{fleetId}', params, query: none, input: check.object({ expectedRevision: check.integer(), label: check.text(100) }), output: fleetView, description: 'Fleet label' }),
    removeFleet: operation({ ...common, method: 'DELETE', path: '/api/fleets/{fleetId}', params, query: none, input: check.object({ expectedRevision: check.integer() }), output: check.object({ accepted: check.boolean }), description: 'Unregister stopped fleet' }),
    changeFleetDelivery: operation({ ...common, method: 'PUT', path: '/api/fleets/{fleetId}/delivery', params, query: none, input: deliveryChange, output: fleetControl, description: 'Change Crossfire delivery intent' }),
    createFleetMessage: operation({ ...common, method: 'POST', path: '/api/fleets/{fleetId}/messages', params, query: none, input: messageCreation, output: fleetMessageSummary, status: 201, description: 'Message the enrolled roster through its controller' }),
    agents: operation({ ...common, method: 'GET', path: '/api/fleets/{fleetId}/agents', params, query: page, input: check.empty, output: check.list(instanceView, 100), collection: true, description: 'Fleet instances' }),
    addAgent: operation({ ...common, method: 'POST', path: '/api/fleets/{fleetId}/agents', params, query: none, input: check.object({ expectedRevision: check.integer(), instance }), output: fleetView, status: 201, description: 'Add defined instance' }),
    agent: operation({ ...common, method: 'GET', path: '/api/fleets/{fleetId}/agents/{instanceKey}', params: agentParams, query: none, input: check.empty, output: instanceView, description: 'Instance details' }),
    contexts: operation({ ...common, method: 'GET', path: '/api/fleets/{fleetId}/agents/{instanceKey}/contexts', params: agentParams, query: none, input: check.empty,
        output: check.list(check.object({ context: check.text(255), runtime: check.name, sessionId: check.text(200) }), 2002), description: 'Read retained native history identities without starting a session' }),
    attachment: operation({ ...common, method: 'GET', path: '/api/fleets/{fleetId}/agents/{instanceKey}/attachment', params: agentParams,
        query: input => { if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => key !== 'context') || input.getAll('context').length > 1)
            return failure('invalid', 'Use one exact context'); return check.object({ context: check.optional(check.text(255)) })(input.has('context') ? { context: input.get('context') } : {}); },
        input: check.empty, output: attachment, description: 'Read a private live terminal pointer; sleeping and stopped sessions require explicit resume' }),
    changeAgent: operation({ ...common, method: 'PATCH', path: '/api/fleets/{fleetId}/agents/{instanceKey}', params: agentParams, query: none, input: check.object({ expectedRevision: check.integer(), definition: check.name }), output: fleetView, description: 'Change a stopped instance definition' }),
    removeAgent: operation({ ...common, method: 'DELETE', path: '/api/fleets/{fleetId}/agents/{instanceKey}', params: agentParams, query: none, input: check.object({ expectedRevision: check.integer() }), output: fleetView, description: 'Retire a stopped instance registration while preserving private history' }),
    operate: operation({ ...common, method: 'POST', path: '/api/operations', params: check.empty, query: none, input: operationInput, output: operationView, status: 202, description: 'Request lifecycle operation' }),
    operation: operation({ ...common, method: 'GET', path: '/api/operations/{operationId}', params: check.object({ operationId: check.identifier }), query: none, input: check.empty, output: operationView, description: 'Observe operation' }),
}
```

Related definitions:

- [`operation`](/docs/api/schemas/crossfire-contracts-rest-operation/#operation)
- [`common`](/docs/api/schemas/fleetd-contracts-api/#common)
- [`params`](/docs/api/schemas/fleetd-contracts-api/#params)
- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)
- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)
- [`setupInput`](/docs/api/schemas/fleetd-contracts-setup/#setupInput)
- [`setupResult`](/docs/api/schemas/fleetd-contracts-api/#setupResult)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleetView`](/docs/api/schemas/fleetd-contracts-api/#fleetView)
- [`deliveryChange`](/docs/api/schemas/crossfire-contracts-fleet-control/#deliveryChange)
- [`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)
- [`messageCreation`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageCreation)
- [`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary)
- [`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView)
- [`instance`](/docs/api/schemas/fleetd-contracts-api/#instance)
- [`agentParams`](/docs/api/schemas/fleetd-contracts-api/#agentParams)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`attachment`](/docs/api/schemas/fleetd-contracts-attachment/#attachment)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`operationInput`](/docs/api/schemas/fleetd-contracts-api/#operationInput)
- [`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
