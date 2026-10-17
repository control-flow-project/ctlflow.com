---
title: "PUT /api/fleets/{fleetId}/session-operations/{operationId}/receipt"
linkTitle: "receiptFleetRuntime"
description: "Record the actual native session outcome"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "receiptFleetRuntime"
product: "crossfire"
generated: true
---


## Record the actual native session outcome

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `receiptFleetRuntime` |
| Method | `PUT` |
| Path | `/api/fleets/{fleetId}/session-operations/{operationId}/receipt` |
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

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `operationId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ fleetId: check.identifier, operationId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom validation: [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Validation

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

object; fields below; unknown fields rejected; constraint: Invalid session receipt ([`runtimeReceipt`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeReceipt))

| Field path | Representation and constraints |
| --- | --- |
| `connectionId` | lowercase opaque UUID |
| `status` | `succeeded` or `failed` |
| `errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
value => (value.status === 'failed') === (value.errorMessage !== null)
```

### Validation

```typescript
fleetRuntime.runtimeReceipt
```

Referenced definitions:

- [`runtimeReceipt`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeReceipt)

## Response data

object; fields below; unknown fields rejected ([`recorded`](/docs/api/schemas/crossfire-contracts-schema-response/#recorded))

| Field path | Representation and constraints |
| --- | --- |
| `recorded` | boolean |

### Validation

```typescript
res.recorded
```

Referenced definitions:

- [`recorded`](/docs/api/schemas/crossfire-contracts-schema-response/#recorded)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
