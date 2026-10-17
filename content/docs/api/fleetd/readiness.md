---
title: "GET /api/fleets/{fleetId}/readiness"
linkTitle: "readiness"
description: "Verify desired listeners through their live model-free native diagnostic without starting sessions"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "readiness"
product: "fleetd"
generated: true
---


## Verify desired listeners through their live model-free native diagnostic without starting sessions

> Private controller API. Call this route through the user's Unix socket, locally or over SSH. It is not exposed on the server's public origin.

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `readiness` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/readiness` |
| Authentication | `public` |
| Success status | `200` |
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

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `accepted` | boolean |

### Validation

```typescript
check.object({ accepted: check.boolean })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

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
