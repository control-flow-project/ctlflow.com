---
title: "GET /api/member-invitations"
linkTitle: "invitations"
description: "Signup invitations"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "invitations"
product: "crossfire"
generated: true
---


## Signup invitations

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `invitations` |
| Method | `GET` |
| Path | `/api/member-invitations` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `member.invite` |

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

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`invitation`](/docs/api/schemas/crossfire-contracts-schema-response/#invitation))

| Field path | Representation and constraints |
| --- | --- |
| `[].invitationId` | lowercase opaque UUID |
| `[].createdByMemberId` | lowercase opaque UUID |
| `[].roleCode` | `member` or `administrator` |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].expiresAt` | exact JSON integer; 0…9007199254740991 |
| `[].consumedByMemberId` | lowercase opaque UUID; JSON null permitted |
| `[].revokedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Exact validator

```typescript
check.list(res.invitation, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`invitation`](/docs/api/schemas/crossfire-contracts-schema-response/#invitation)

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
