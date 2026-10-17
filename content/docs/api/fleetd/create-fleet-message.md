---
title: "POST /api/fleets/{fleetId}/messages"
linkTitle: "createFleetMessage"
description: "Message the enrolled roster through its controller"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "createFleetMessage"
product: "fleetd"
generated: true
---


## Message the enrolled roster through its controller

> Private controller API. Call this route through the user's Unix socket, locally or over SSH. It is not exposed on the server's public origin.

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `createFleetMessage` |
| Method | `POST` |
| Path | `/api/fleets/{fleetId}/messages` |
| Authentication | `public` |
| Success status | `201` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 1048576 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected ([`params`](/docs/api/schemas/fleetd-contracts-api/#params))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

```typescript
params
```

Referenced definitions:

- [`params`](/docs/api/schemas/fleetd-contracts-api/#params)

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
none
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
messageCreation
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
fleetMessageSummary
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
