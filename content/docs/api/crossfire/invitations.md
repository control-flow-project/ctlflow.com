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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `invitations` |
| Method | `GET` |
| Path | `/api/member-invitations` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Paginated collection |
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

custom validation: [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Validation

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Validation

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

### Validation

```typescript
check.list(res.invitation, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`invitation`](/docs/api/schemas/crossfire-contracts-schema-response/#invitation)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

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
