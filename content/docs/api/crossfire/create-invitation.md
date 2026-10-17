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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `createInvitation` |
| Method | `POST` |
| Path | `/api/member-invitations` |
| Authentication | `human` |
| Success status | `201` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `member.invite` |

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

object; fields below; unknown fields rejected ([`memberInvitation`](/docs/api/schemas/crossfire-contracts-schema-request/#memberInvitation))

| Field path | Representation and constraints |
| --- | --- |
| `roleCode` | `member` or `administrator` |
| `expiresSeconds` | exact JSON integer; 60…604800 |

### Validation

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

### Validation

```typescript
res.invitationCreated
```

Referenced definitions:

- [`invitationCreated`](/docs/api/schemas/crossfire-contracts-schema-response/#invitationCreated)

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
