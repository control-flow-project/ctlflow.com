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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `createFleetMessage` |
| Method | `POST` |
| Path | `/api/fleets/{fleetId}/messages` |
| Authentication | `fleet` |
| Success status | `201` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.configure.owned`, `agent.configure.any` |

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

object; fields below; unknown fields rejected ([`messageCreation`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageCreation))

| Field path | Representation and constraints |
| --- | --- |
| `messageId` | lowercase opaque UUID |
| `body` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Expected a fleet message of 1–4096 characters ([`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)) |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

### Validation

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

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

### Validation

```typescript
fleetControl.fleetMessageSummary
```

Referenced definitions:

- [`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary)

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
