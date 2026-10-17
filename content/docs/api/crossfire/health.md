---
title: "GET /api/health"
linkTitle: "health"
description: "Service readiness"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "health"
product: "crossfire"
generated: true
---


## Service readiness

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `health` |
| Method | `GET` |
| Path | `/api/health` |
| Catalog audience | `public` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `instance` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `version` | string; 1–40 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `startedAt` | exact JSON integer; 0…9007199254740991 |
| `loggingRetentionDays` | exact JSON integer; 1…9007199254740991 |
| `loggingError` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Exact validator

```typescript
check.object({ instance: check.name, release: check.text(200), version: check.text(40), startedAt: check.integer(),
    loggingRetentionDays: check.integer(1), loggingError: check.nullable(check.text(4096)) })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

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
