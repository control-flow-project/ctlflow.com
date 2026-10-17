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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `principals` |
| Method | `GET` |
| Path | `/api/principals` |
| Catalog audience | `either` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `principal.read` |

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

custom parser [`principals`](/docs/api/schemas/crossfire-contracts-schema-query/#principals); exact branches, defaults and rejection rules below

Explicit query names in this parser: `kind`, `search`, `excludeId`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
query.principals
```

Referenced definitions:

- [`principals`](/docs/api/schemas/crossfire-contracts-schema-query/#principals)

## Request body

empty object; unknown fields rejected

### Exact validator

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

### Exact validator

```typescript
check.list(res.principal, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)

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
