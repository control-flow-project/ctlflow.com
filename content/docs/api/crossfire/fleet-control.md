---
title: "GET /api/fleets/{fleetId}/control"
linkTitle: "fleetControl"
description: "Live controller delivery and message long poll"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleetControl"
product: "crossfire"
generated: true
---


## Live controller delivery and message long poll

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleetControl` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/control` |
| Authentication | `fleet` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

Your HTTP client supplies these values in the URL query string.

custom validation: [`controlQuery`](/docs/api/schemas/crossfire-contracts-fleet-control/#controlQuery); see function below

Accepted query parameters: `connectionId`, `revision`, `waitMs`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
fleetControl.controlQuery
```

Referenced definitions:

- [`controlQuery`](/docs/api/schemas/crossfire-contracts-fleet-control/#controlQuery)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected; constraint: Invalid fleet control snapshot ([`fleetControlSnapshot`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControlSnapshot))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `deliveryEnabled` | boolean |
| `connection` | object; fields below; unknown fields rejected |
| `connection.status` | `online` or `offline` |
| `connection.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `agentIds` | array; 0–100 entries; item: lowercase opaque UUID |
| `messages` | array; 0–1 entries; item: object; fields below; unknown fields rejected ([`fleetMessageCommand`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageCommand)) |
| `messages[].messageId` | lowercase opaque UUID |
| `messages[].fleetId` | lowercase opaque UUID |
| `messages[].body` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Expected a fleet message of 1–4096 characters ([`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)) |
| `messages[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `messages[].expiresAt` | exact JSON integer; 0…9007199254740991 |
| `messages[].sender` | object; fields below; unknown fields rejected; constraint: Invalid fleet message sender |
| `messages[].sender.kind` | `human` or `controller` |
| `messages[].sender.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters; JSON null permitted |
| `messages[].agentIds` | array; 0–100 entries; item: lowercase opaque UUID |
| `runtimeOperations` | array; 0–1 entries; item: object; fields below; unknown fields rejected; constraint: Invalid session operation outcome ([`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)) |
| `runtimeOperations[].operationId` | lowercase opaque UUID |
| `runtimeOperations[].fleetId` | lowercase opaque UUID |
| `runtimeOperations[].agentId` | lowercase opaque UUID; JSON null permitted |
| `runtimeOperations[].action` | `start` or `stop` or `reset` ([`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)) |
| `runtimeOperations[].expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `runtimeOperations[].status` | `pending` or `running` or `succeeded` or `failed` |
| `runtimeOperations[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `runtimeOperations[].completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `runtimeOperations[].errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
snapshot => new Set(snapshot.agentIds).size === snapshot.agentIds.length && snapshot.messages.every(message => message.fleetId === snapshot.fleetId
    && message.expiresAt > message.createdAt && new Set(message.agentIds).size === message.agentIds.length)
    && snapshot.runtimeOperations.every(operation => operation.fleetId === snapshot.fleetId && (operation.status === 'pending' || operation.status === 'running'))
```

Constraint on `messages[].body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

Constraint on `messages[].sender`:

```typescript
sender => (sender.kind === 'human') === (sender.backendUserId !== null)
```

Constraint on `runtimeOperations[]`:

```typescript
value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null)
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
fleetControl.fleetControlSnapshot
```

Referenced definitions:

- [`fleetControlSnapshot`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControlSnapshot)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
