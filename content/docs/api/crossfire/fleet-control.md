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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `fleetControl` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/control` |
| Catalog audience | `fleet` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom parser [`controlQuery`](/docs/api/schemas/crossfire-contracts-fleet-control/#controlQuery); exact branches, defaults and rejection rules below

Explicit query names in this parser: `connectionId`, `revision`, `waitMs`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
fleetControl.controlQuery
```

Referenced definitions:

- [`controlQuery`](/docs/api/schemas/crossfire-contracts-fleet-control/#controlQuery)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

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
| `messages[].sender.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units; JSON null permitted |
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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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
sender => (sender.kind === 'human') === (sender.matrixUserId !== null)
```

Constraint on `runtimeOperations[]`:

```typescript
value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null)
```

### Exact validator

```typescript
fleetControl.fleetControlSnapshot
```

Referenced definitions:

- [`fleetControlSnapshot`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControlSnapshot)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
