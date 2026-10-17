---
title: "POST /api/member-invitations"
linkTitle: "createInvitation"
description: "Create signup invitation"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "createInvitation"
product: "crossfire"
generated: true
---


## Create signup invitation

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `createInvitation` |
| Method | `POST` |
| Path | `/api/member-invitations` |
| Catalog audience | `human` |
| Success status | `201` |
| Response data | Single value; not a collection operation |
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

object; fields below; unknown fields rejected ([`memberInvitation`](/docs/api/schemas/crossfire-contracts-schema-request/#memberInvitation))

| Field path | Representation and constraints |
| --- | --- |
| `roleCode` | `member` or `administrator` |
| `expiresSeconds` | exact JSON integer; 60…604800 |

### Exact validator

```typescript
req.memberInvitation
```

Referenced definitions:

- [`memberInvitation`](/docs/api/schemas/crossfire-contracts-schema-request/#memberInvitation)

## Response data

object; fields below; unknown fields rejected ([`invitationCreated`](/docs/api/schemas/crossfire-contracts-schema-response/#invitationCreated))

| Field path | Representation and constraints |
| --- | --- |
| `invitationId` | lowercase opaque UUID |
| `claimSecret` | 43-character base64url private claim (32 bytes) |
| `expiresAt` | exact JSON integer; 0…9007199254740991 |
| `signupUrl` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Exact validator

```typescript
res.invitationCreated
```

Referenced definitions:

- [`invitationCreated`](/docs/api/schemas/crossfire-contracts-schema-response/#invitationCreated)

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
