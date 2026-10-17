---
title: "GET /api/enrollments"
linkTitle: "enrollments"
description: "Enrollment requests"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "enrollments"
product: "crossfire"
generated: true
---


## Enrollment requests

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `enrollments` |
| Method | `GET` |
| Path | `/api/enrollments` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `enrollment.read.owned`, `enrollment.read.any` |

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

custom parser [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped); exact branches, defaults and rejection rules below

Explicit query names in this parser: `ownerId`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function scoped(input: unknown) {
    const parsed = checked(input, ['ownerId']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const ownerId = parsed.value.get('ownerId');
    if (ownerId === null)
        return success(bounds.value);
    const valid = check.identifier(ownerId);
    return valid.ok ? success({ ...bounds.value, ownerId }) : valid;
}
```

### Exact validator

```typescript
query.scoped
```

Referenced definitions:

- [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`enrollment`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollment))

| Field path | Representation and constraints |
| --- | --- |
| `[].owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `[].owner.principalId` | lowercase opaque UUID |
| `[].owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].owner.kind` | `human` or `agent` |
| `[].owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].owner.ownerId` | lowercase opaque UUID |
| `[].owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].controllerName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].enrollmentId` | lowercase opaque UUID |
| `[].ownerId` | lowercase opaque UUID |
| `[].fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].verificationCode` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].status` | `pending` or `approved` or `rejected` or `expired` |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].expiresAt` | exact JSON integer; 0…9007199254740991 |
| `[].decidedByMemberId` | lowercase opaque UUID; JSON null permitted |
| `[].decidedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Exact validator

```typescript
check.list(res.enrollment, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`enrollment`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollment)

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
