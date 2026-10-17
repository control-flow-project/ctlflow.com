---
title: "crossfire/node/packages/contracts/src/fleet-control.ts"
linkTitle: "fleet-control"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/fleet-control.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/schema/request.ts`](/docs/api/schemas/crossfire-contracts-schema-request/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/fleet-runtime.ts`](/docs/api/schemas/crossfire-contracts-fleet-runtime/)

## fleetControl {#fleetControl}

```typescript
fleetControl = check.object({ fleetId: check.identifier, revision: check.integer(), deliveryEnabled: check.boolean,
    connection: check.object({ status: check.choice('online', 'offline'), lastSeenAt: check.nullable(check.integer()) }) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## messageBody {#messageBody}

```typescript
messageBody = check.refine(check.plainText(16384), body => !!body.trim() && body.length <= 4096, 'Expected a fleet message of 1–4096 characters')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)

## fleetMessageCommand {#fleetMessageCommand}

```typescript
fleetMessageCommand = check.object({ messageId: check.identifier, fleetId: check.identifier, body: messageBody,
    createdAt: check.integer(), expiresAt: check.integer(), sender: check.refine(check.object({ kind: check.choice('human', 'controller'),
        matrixUserId: check.nullable(check.matrixUserId) }), sender => (sender.kind === 'human') === (sender.matrixUserId !== null), 'Invalid fleet message sender'),
    agentIds: check.list(check.identifier, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)

## fleetControlSnapshot {#fleetControlSnapshot}

```typescript
fleetControlSnapshot = check.refine(check.object({ fleetId: check.identifier, revision: check.integer(), deliveryEnabled: check.boolean,
    connection: check.object({ status: check.choice('online', 'offline'), lastSeenAt: check.nullable(check.integer()) }),
    agentIds: check.list(check.identifier, 100), messages: check.list(fleetMessageCommand, 1), runtimeOperations: check.list(runtimeOperation, 1) }), snapshot => new Set(snapshot.agentIds).size === snapshot.agentIds.length && snapshot.messages.every(message => message.fleetId === snapshot.fleetId
    && message.expiresAt > message.createdAt && new Set(message.agentIds).size === message.agentIds.length)
    && snapshot.runtimeOperations.every(operation => operation.fleetId === snapshot.fleetId && (operation.status === 'pending' || operation.status === 'running')), 'Invalid fleet control snapshot')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleetMessageCommand`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageCommand)
- [`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)

## fleetMessageSummary {#fleetMessageSummary}

```typescript
fleetMessageSummary = check.object({ messageId: check.identifier, body: messageBody, createdAt: check.integer(), expiresAt: check.integer(),
    total: check.integer(0, 100), delivered: check.integer(0, 100), failed: check.integer(0, 100), skipped: check.integer(0, 100), pending: check.integer(0, 100), expired: check.integer(0, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## deliveryChange {#deliveryChange}

```typescript
deliveryChange = check.object({ expectedRevision: check.integer(), enabled: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## messageCreation {#messageCreation}

```typescript
messageCreation = check.object({ messageId: check.identifier, body: messageBody })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)

## connectionReport {#connectionReport}

```typescript
connectionReport = check.object({ stopped: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## receiptReport {#receiptReport}

```typescript
receiptReport = check.object({ status: check.choice('delivered', 'failed', 'skipped'), errorMessage: check.nullable(check.text(1000)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## controlQuery {#controlQuery}

```typescript
export function controlQuery(input: unknown) {
    const values = listQuery(['connectionId', 'revision', 'waitMs'])(input);
    if (!values.ok)
        return values;
    const connectionId = check.identifier(values.value.get('connectionId'));
    const revision = queryInteger(values.value.get('revision'), 0, Number.MAX_SAFE_INTEGER);
    const waitMs = queryInteger(values.value.get('waitMs'), 0, 10000);
    if (!connectionId.ok)
        return connectionId;
    if (!values.value.has('revision') || !revision.ok || !values.value.has('waitMs') || !waitMs.ok)
        return failure('invalid', 'A revision and bounded waitMs are required');
    return success({ connectionId: connectionId.value, revision: revision.value, waitMs: waitMs.value });
}
```

Related definitions:

- [`listQuery`](/docs/api/schemas/crossfire-contracts-schema-request/#listQuery)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`queryInteger`](/docs/api/schemas/crossfire-contracts-fleet-control/#queryInteger)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## messagePage {#messagePage}

```typescript
export function messagePage(input: unknown) {
    const values = listQuery(['page', 'pageSize'])(input);
    if (!values.ok)
        return values;
    const page = queryInteger(values.value.get('page') ?? '1', 1, 100000);
    const pageSize = queryInteger(values.value.get('pageSize') ?? '10', 1, 10);
    if (!page.ok)
        return page;
    if (!pageSize.ok)
        return pageSize;
    return success({ page: page.value, pageSize: pageSize.value });
}
```

Related definitions:

- [`listQuery`](/docs/api/schemas/crossfire-contracts-schema-request/#listQuery)
- [`queryInteger`](/docs/api/schemas/crossfire-contracts-fleet-control/#queryInteger)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## queryInteger {#queryInteger}

```typescript
function queryInteger(value: string | null, minimum: number, maximum: number) {
    return value !== null && /^(0|[1-9][0-9]*)$/u.test(value) ? check.integer(minimum, maximum)(Number(value)) : failure('invalid', 'Use a canonical integer query value');
}
```

Related definitions:

- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## FleetControl {#FleetControl}

```typescript
export type FleetControl = Parsed<typeof fleetControl>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)

## FleetControlSnapshot {#FleetControlSnapshot}

```typescript
export type FleetControlSnapshot = Parsed<typeof fleetControlSnapshot>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`fleetControlSnapshot`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControlSnapshot)

## FleetMessageCommand {#FleetMessageCommand}

```typescript
export type FleetMessageCommand = Parsed<typeof fleetMessageCommand>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`fleetMessageCommand`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageCommand)
