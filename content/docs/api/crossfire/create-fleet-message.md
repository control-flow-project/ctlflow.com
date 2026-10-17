---
title: "POST /api/fleets/{fleetId}/messages"
linkTitle: "createFleetMessage"
description: "Explicit idempotent direct fleet input"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "createFleetMessage"
product: "crossfire"
generated: true
---


## Explicit idempotent direct fleet input

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `createFleetMessage` |
| Method | `POST` |
| Path | `/api/fleets/{fleetId}/messages` |
| Catalog audience | `fleet` |
| Success status | `201` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.configure.owned`, `agent.configure.any` |

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

object; fields below; unknown fields rejected ([`messageCreation`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageCreation))

| Field path | Representation and constraints |
| --- | --- |
| `messageId` | lowercase opaque UUID |
| `body` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Expected a fleet message of 1–4096 characters ([`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)) |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

### Exact validator

```typescript
fleetControl.messageCreation
```

Referenced definitions:

- [`messageCreation`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageCreation)

## Response data

object; fields below; unknown fields rejected ([`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary))

| Field path | Representation and constraints |
| --- | --- |
| `messageId` | lowercase opaque UUID |
| `body` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Expected a fleet message of 1–4096 characters ([`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)) |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `expiresAt` | exact JSON integer; 0…9007199254740991 |
| `total` | exact JSON integer; 0…100 |
| `delivered` | exact JSON integer; 0…100 |
| `failed` | exact JSON integer; 0…100 |
| `skipped` | exact JSON integer; 0…100 |
| `pending` | exact JSON integer; 0…100 |
| `expired` | exact JSON integer; 0…100 |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

### Exact validator

```typescript
fleetControl.fleetMessageSummary
```

Referenced definitions:

- [`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary)

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
