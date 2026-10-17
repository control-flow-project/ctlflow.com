---
title: "GET /api/fleets/{fleetId}/messages"
linkTitle: "fleetMessages"
description: "Paginated fleet message receipt history"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleetMessages"
product: "crossfire"
generated: true
---


## Paginated fleet message receipt history

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleetMessages` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/messages` |
| Authentication | `fleet` |
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

custom validation: [`messagePage`](/docs/api/schemas/crossfire-contracts-fleet-control/#messagePage); see function below

Accepted query parameters: `page`, `pageSize`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function messagePage(input: unknown) {
    const values = listQuery(['page', 'pageSize'])(input);
    if (!values.ok)
        return values;
    const page = queryInteger(values.value.get('page') ?? '1', 1, 100000);
    const pageSize = queryInteger(values.value.get('pageSize') ?? '10', 1, 10);
    if (!page.ok)
        return page;
    if (!pageSize.ok)
        return pageSize;
    return success({ page: page.value, pageSize: pageSize.value });
}
```

### Validation

```typescript
fleetControl.messagePage
```

Referenced definitions:

- [`messagePage`](/docs/api/schemas/crossfire-contracts-fleet-control/#messagePage)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–10 entries; item: object; fields below; unknown fields rejected ([`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary))

| Field path | Representation and constraints |
| --- | --- |
| `[].messageId` | lowercase opaque UUID |
| `[].body` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Expected a fleet message of 1–4096 characters ([`messageBody`](/docs/api/schemas/crossfire-contracts-fleet-control/#messageBody)) |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].expiresAt` | exact JSON integer; 0…9007199254740991 |
| `[].total` | exact JSON integer; 0…100 |
| `[].delivered` | exact JSON integer; 0…100 |
| `[].failed` | exact JSON integer; 0…100 |
| `[].skipped` | exact JSON integer; 0…100 |
| `[].pending` | exact JSON integer; 0…100 |
| `[].expired` | exact JSON integer; 0…100 |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `[].body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

### Validation

```typescript
check.list(fleetControl.fleetMessageSummary, 10)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary)

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
