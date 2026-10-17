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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `health` |
| Method | `GET` |
| Path | `/api/health` |
| Authentication | `public` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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
| `instance` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `version` | string; 1–40 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `startedAt` | exact JSON integer; 0…9007199254740991 |
| `loggingRetentionDays` | exact JSON integer; 1…9007199254740991 |
| `loggingError` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Validation

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

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
