---
title: "GET /api/audit-events"
linkTitle: "audit"
description: "Scoped audit events"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "audit"
product: "crossfire"
generated: true
---


## Scoped audit events

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `audit` |
| Method | `GET` |
| Path | `/api/audit-events` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `audit.read.owned`, `audit.read.any` |

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

custom validation: [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped); see function below

Accepted query parameters: `ownerId`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function scoped(input: unknown) {
    const parsed = checked(input, ['ownerId']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const ownerId = parsed.value.get('ownerId');
    if (ownerId === null)
        return success(bounds.value);
    const valid = check.identifier(ownerId);
    return valid.ok ? success({ ...bounds.value, ownerId }) : valid;
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.scoped
```

Referenced definitions:

- [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped)

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

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`audit`](/docs/api/schemas/crossfire-contracts-schema-response/#audit))

| Field path | Representation and constraints |
| --- | --- |
| `[].auditId` | lowercase opaque UUID |
| `[].requestId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].actorCredentialId` | lowercase opaque UUID; JSON null permitted |
| `[].actorKind` | `human` or `agent` or `controller` or `system` or `anonymous` |
| `[].actor` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)); JSON null permitted |
| `[].actor.principalId` | lowercase opaque UUID |
| `[].actor.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].actor.kind` | `human` or `agent` |
| `[].actor.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].actor.ownerId` | lowercase opaque UUID |
| `[].actor.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].target` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)); JSON null permitted |
| `[].target.principalId` | lowercase opaque UUID |
| `[].target.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].target.kind` | `human` or `agent` |
| `[].target.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].target.ownerId` | lowercase opaque UUID |
| `[].target.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].actorPrincipalId` | lowercase opaque UUID; JSON null permitted |
| `[].ownerId` | lowercase opaque UUID; JSON null permitted |
| `[].targetKind` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].targetId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units; JSON null permitted |
| `[].membershipGeneration` | lowercase opaque UUID; JSON null permitted |
| `[].authorizerId` | lowercase opaque UUID; JSON null permitted |
| `[].addedById` | lowercase opaque UUID; JSON null permitted |
| `[].permissionCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].action` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].outcome` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].message` | string; 0–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(res.audit, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`audit`](/docs/api/schemas/crossfire-contracts-schema-response/#audit)

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
