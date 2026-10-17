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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleetRuntimeOperations` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/session-operations` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom validation: [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Validation

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Validation

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

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `[]`:

```typescript
value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null)
```

### Validation

```typescript
check.list(fleetRuntime.runtimeOperation, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

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
