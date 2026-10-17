---
title: "GET /api/status"
linkTitle: "status"
description: "Controller status"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "status"
product: "fleetd"
generated: true
---


## Controller status

> Private controller API. Call this route through the user's Unix socket, locally or over SSH. It is not exposed on the server's public origin.

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `status` |
| Method | `GET` |
| Path | `/api/status` |
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
| `controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `controller.metadata` | custom validation: [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); see function below; optional property |
| `startedAt` | exact JSON integer; 0…9007199254740991 |
| `stopping` | boolean |
| `loggingRetentionDays` | exact JSON integer; 1…9007199254740991 |
| `loggingError` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `controller.metadata`:

```typescript
function metadata(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 16)
        return failure('invalid', 'Controller metadata supports at most 16 text fields');
    const output: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        if (!/^[a-z][a-z0-9-]{0,39}$/u.test(key) || !check.text(256, 0)(value).ok || typeof value !== 'string')
            return failure('invalid', 'Invalid controller metadata');
        output[key] = value;
    }
    return success(output);
}
```

### Validation

```typescript
check.object({ controller, startedAt: check.integer(), stopping: check.boolean,
    loggingRetentionDays: check.integer(1), loggingError: check.nullable(check.text(4096)) })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

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
