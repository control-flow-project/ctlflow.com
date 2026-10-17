---
title: "POST /api/fleets/{fleetId}/session-operations"
linkTitle: "requestFleetRuntime"
description: "Request stop, resume or confirmed fresh history through the controller"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "requestFleetRuntime"
product: "crossfire"
generated: true
---


## Request stop, resume or confirmed fresh history through the controller

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `requestFleetRuntime` |
| Method | `POST` |
| Path | `/api/fleets/{fleetId}/session-operations` |
| Catalog audience | `human` |
| Success status | `202` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.configure.owned`, `agent.configure.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

HTTP 202 records accepted intent. It does not establish native application, process completion or completion of model work.

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

custom parser [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Exact validator

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

object; fields below; unknown fields rejected; constraint: Fresh history requires explicit confirmation ([`runtimeRequest`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeRequest))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `agentId` | lowercase opaque UUID; JSON null permitted |
| `action` | `start` or `stop` or `reset` ([`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)) |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `confirmFreshHistory` | boolean |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
value => value.confirmFreshHistory === (value.action === 'reset')
```

### Exact validator

```typescript
fleetRuntime.runtimeRequest
```

Referenced definitions:

- [`runtimeRequest`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeRequest)

## Response data

object; fields below; unknown fields rejected; constraint: Invalid session operation outcome ([`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `fleetId` | lowercase opaque UUID |
| `agentId` | lowercase opaque UUID; JSON null permitted |
| `action` | `start` or `stop` or `reset` ([`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)) |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `status` | `pending` or `running` or `succeeded` or `failed` |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null)
```

### Exact validator

```typescript
fleetRuntime.runtimeOperation
```

Referenced definitions:

- [`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)

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
