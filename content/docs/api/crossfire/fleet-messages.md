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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `fleetMessages` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/messages` |
| Catalog audience | `fleet` |
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

custom parser [`messagePage`](/docs/api/schemas/crossfire-contracts-fleet-control/#messagePage); exact branches, defaults and rejection rules below

Explicit query names in this parser: `page`, `pageSize`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
fleetControl.messagePage
```

Referenced definitions:

- [`messagePage`](/docs/api/schemas/crossfire-contracts-fleet-control/#messagePage)

## Request body

empty object; unknown fields rejected

### Exact validator

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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `[].body`:

```typescript
body => !!body.trim() && body.length <= 4096
```

### Exact validator

```typescript
check.list(fleetControl.fleetMessageSummary, 10)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleetMessageSummary`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetMessageSummary)

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
