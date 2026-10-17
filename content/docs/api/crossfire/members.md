---
title: "GET /api/members"
linkTitle: "members"
description: "Members"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "members"
product: "crossfire"
generated: true
---


## Members

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `members` |
| Method | `GET` |
| Path | `/api/members` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `member.manage` |

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

custom parser [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Exact validator

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member))

| Field path | Representation and constraints |
| --- | --- |
| `[].memberId` | lowercase opaque UUID |
| `[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].roleCode` | `member` or `administrator` |
| `[].status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `[].application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.appliedStatus` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `[].application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Exact validator

```typescript
check.list(res.member, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member)

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
