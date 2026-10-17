---
title: "DELETE /api/member-invitations/{invitationId}"
linkTitle: "revokeInvitation"
description: "Revoke signup invitation"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "revokeInvitation"
product: "crossfire"
generated: true
---


## Revoke signup invitation

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `revokeInvitation` |
| Method | `DELETE` |
| Path | `/api/member-invitations/{invitationId}` |
| Authentication | `human` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `member.invite` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `invitationId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ invitationId: check.identifier })
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

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged))

| Field path | Representation and constraints |
| --- | --- |
| `accepted` | boolean |

### Validation

```typescript
res.acknowledged
```

Referenced definitions:

- [`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged)

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
