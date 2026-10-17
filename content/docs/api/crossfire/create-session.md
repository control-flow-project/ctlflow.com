---
title: "POST /api/sessions"
linkTitle: "createSession"
description: "Human login"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "createSession"
product: "crossfire"
generated: true
---


## Human login

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `createSession` |
| Method | `POST` |
| Path | `/api/sessions` |
| Catalog audience | `public` |
| Success status | `201` |
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

object; fields below; unknown fields rejected ([`session`](/docs/api/schemas/crossfire-contracts-schema-request/#session))

| Field path | Representation and constraints |
| --- | --- |
| `nativeAccessToken` | string; 1–8192 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Exact validator

```typescript
req.session
```

Referenced definitions:

- [`session`](/docs/api/schemas/crossfire-contracts-schema-request/#session)

## Response data

object; fields below; unknown fields rejected ([`session`](/docs/api/schemas/crossfire-contracts-schema-response/#session))

| Field path | Representation and constraints |
| --- | --- |
| `member` | object; fields below; unknown fields rejected ([`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member)) |
| `member.memberId` | lowercase opaque UUID |
| `member.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `member.displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `member.roleCode` | `member` or `administrator` |
| `member.status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `member.revision` | exact JSON integer; 0…9007199254740991 |
| `member.createdAt` | exact JSON integer; 0…9007199254740991 |
| `member.application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `member.application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `member.application.appliedStatus` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `member.application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `member.application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `member.application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `member.application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `member.application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `csrfSecret` | 43-character base64url private claim (32 bytes) |
| `permissions` | array; 0–100 entries; item: string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Exact validator

```typescript
res.session
```

Referenced definitions:

- [`session`](/docs/api/schemas/crossfire-contracts-schema-response/#session)

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
