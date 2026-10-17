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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `reportFleetConnection` |
| Method | `PUT` |
| Path | `/api/fleets/{fleetId}/controller-connections/{connectionId}` |
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
| `connectionId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ fleetId: check.identifier, connectionId: check.identifier })
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

object; fields below; unknown fields rejected ([`connectionReport`](/docs/api/schemas/crossfire-contracts-fleet-control/#connectionReport))

| Field path | Representation and constraints |
| --- | --- |
| `stopped` | boolean |

### Exact validator

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

### Exact validator

```typescript
fleetControl.fleetControl
```

Referenced definitions:

- [`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)

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
