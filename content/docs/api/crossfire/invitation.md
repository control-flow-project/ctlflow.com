---
title: "GET /api/member-invitations/{invitationId}"
linkTitle: "invitation"
description: "Signup invitation"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "invitation"
product: "crossfire"
generated: true
---


## Signup invitation

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `invitation` |
| Method | `GET` |
| Path | `/api/member-invitations/{invitationId}` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `member.invite` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `invitationId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ invitationId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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

object; fields below; unknown fields rejected ([`invitation`](/docs/api/schemas/crossfire-contracts-schema-response/#invitation))

| Field path | Representation and constraints |
| --- | --- |
| `invitationId` | lowercase opaque UUID |
| `createdByMemberId` | lowercase opaque UUID |
| `roleCode` | `member` or `administrator` |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `expiresAt` | exact JSON integer; 0…9007199254740991 |
| `consumedByMemberId` | lowercase opaque UUID; JSON null permitted |
| `revokedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Exact validator

```typescript
res.invitation
```

Referenced definitions:

- [`invitation`](/docs/api/schemas/crossfire-contracts-schema-response/#invitation)

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
