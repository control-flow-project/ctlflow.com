---
title: "PUT /api/fleets/{fleetId}/controller-connections/{connectionId}"
linkTitle: "reportFleetConnection"
description: "Exclusive authenticated controller lease"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "reportFleetConnection"
product: "crossfire"
generated: true
---


## Exclusive authenticated controller lease

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `reportFleetConnection` |
| Method | `PUT` |
| Path | `/api/fleets/{fleetId}/controller-connections/{connectionId}` |
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
| `connectionId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ fleetId: check.identifier, connectionId: check.identifier })
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

object; fields below; unknown fields rejected ([`connectionReport`](/docs/api/schemas/crossfire-contracts-fleet-control/#connectionReport))

| Field path | Representation and constraints |
| --- | --- |
| `stopped` | boolean |

### Validation

```typescript
fleetControl.connectionReport
```

Referenced definitions:

- [`connectionReport`](/docs/api/schemas/crossfire-contracts-fleet-control/#connectionReport)

## Response data

object; fields below; unknown fields rejected ([`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `deliveryEnabled` | boolean |
| `connection` | object; fields below; unknown fields rejected |
| `connection.status` | `online` or `offline` |
| `connection.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Validation

```typescript
fleetControl.fleetControl
```

Referenced definitions:

- [`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)

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
