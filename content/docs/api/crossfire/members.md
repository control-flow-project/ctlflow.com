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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `members` |
| Method | `GET` |
| Path | `/api/members` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `member.manage` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

Your HTTP client supplies these values in the URL query string.

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

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member))

| Field path | Representation and constraints |
| --- | --- |
| `[].memberId` | lowercase opaque UUID |
| `[].backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `[].displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].roleCode` | `member` or `administrator` |
| `[].status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `[].application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.appliedStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `[].application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(res.member, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

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
