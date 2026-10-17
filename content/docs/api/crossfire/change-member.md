---
title: "PATCH /api/members/{memberId}"
linkTitle: "changeMember"
description: "Change member"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "changeMember"
product: "crossfire"
generated: true
---


## Change member

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `changeMember` |
| Method | `PATCH` |
| Path | `/api/members/{memberId}` |
| Authentication | `human` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `member.manage` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `memberId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ memberId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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

object; fields below; unknown fields rejected ([`memberChange`](/docs/api/schemas/crossfire-contracts-schema-request/#memberChange))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); optional property |
| `displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |

### Validation

```typescript
req.memberChange
```

Referenced definitions:

- [`memberChange`](/docs/api/schemas/crossfire-contracts-schema-request/#memberChange)

## Response data

object; fields below; unknown fields rejected ([`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member))

| Field path | Representation and constraints |
| --- | --- |
| `memberId` | lowercase opaque UUID |
| `matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `roleCode` | `member` or `administrator` |
| `status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.appliedStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Validation

```typescript
res.member
```

Referenced definitions:

- [`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member)

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
