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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `createSession` |
| Method | `POST` |
| Path | `/api/sessions` |
| Authentication | `public` |
| Success status | `201` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
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
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

object; fields below; unknown fields rejected ([`session`](/docs/api/schemas/crossfire-contracts-schema-request/#session))

| Field path | Representation and constraints |
| --- | --- |
| `nativeAccessToken` | string; 1–8192 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Validation

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
| `member.status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `member.revision` | exact JSON integer; 0…9007199254740991 |
| `member.createdAt` | exact JSON integer; 0…9007199254740991 |
| `member.application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `member.application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `member.application.appliedStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `member.application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `member.application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `member.application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `member.application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `member.application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `csrfSecret` | 43-character base64url private claim (32 bytes) |
| `permissions` | array; 0–100 entries; item: string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Validation

```typescript
res.session
```

Referenced definitions:

- [`session`](/docs/api/schemas/crossfire-contracts-schema-response/#session)

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
