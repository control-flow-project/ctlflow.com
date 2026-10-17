---
title: "GET /api/fleets/{fleetId}/session-operations"
linkTitle: "fleetRuntimeOperations"
description: "Native session operation outcomes"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleetRuntimeOperations"
product: "crossfire"
generated: true
---


## Native session operation outcomes

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `fleetRuntimeOperations` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/session-operations` |
| Catalog audience | `either` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.owned`, `agent.read.any` |

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

custom parser [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Exact validator

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected; constraint: Invalid session operation outcome ([`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation))

| Field path | Representation and constraints |
| --- | --- |
| `[].operationId` | lowercase opaque UUID |
| `[].fleetId` | lowercase opaque UUID |
| `[].agentId` | lowercase opaque UUID; JSON null permitted |
| `[].action` | `start` or `stop` or `reset` ([`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)) |
| `[].expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `[].status` | `pending` or `running` or `succeeded` or `failed` |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `[]`:

```typescript
value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null)
```

### Exact validator

```typescript
check.list(fleetRuntime.runtimeOperation, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001",
    "page": 1,
    "pageSize": 20,
    "totalItems": 0,
    "totalPages": 1
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
