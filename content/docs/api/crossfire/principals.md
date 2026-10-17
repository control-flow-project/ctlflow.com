---
title: "GET /api/principals"
linkTitle: "principals"
description: "Identity discovery"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "principals"
product: "crossfire"
generated: true
---


## Identity discovery

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `principals` |
| Method | `GET` |
| Path | `/api/principals` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `principal.read` |

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

custom validation: [`principals`](/docs/api/schemas/crossfire-contracts-schema-query/#principals); see function below

Accepted query parameters: `kind`, `search`, `excludeId`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function principals(input: unknown) {
    const parsed = checked(input, ['kind', 'search', 'excludeId']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value), kind = check.choice('all', 'human', 'agent')(parsed.value.get('kind') ?? 'all');
    if (!bounds.ok)
        return bounds;
    if (!kind.ok)
        return kind;
    const search = parsed.value.get('search') ?? '', excludeId = parsed.value.get('excludeId');
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    if (excludeId !== null) {
        const valid = check.identifier(excludeId);
        if (!valid.ok)
            return valid;
    }
    return success({ ...bounds.value, kind: kind.value, search, ...(excludeId === null ? {} : { excludeId }) });
}
```

### Validation

```typescript
query.principals
```

Referenced definitions:

- [`principals`](/docs/api/schemas/crossfire-contracts-schema-query/#principals)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal))

| Field path | Representation and constraints |
| --- | --- |
| `[].principalId` | lowercase opaque UUID |
| `[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].kind` | `human` or `agent` |
| `[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].ownerId` | lowercase opaque UUID |
| `[].ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |

### Validation

```typescript
check.list(res.principal, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)

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
