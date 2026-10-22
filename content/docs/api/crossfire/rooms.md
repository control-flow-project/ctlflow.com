---
title: "GET /api/rooms"
linkTitle: "rooms"
description: "Native rooms"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "rooms"
product: "crossfire"
generated: true
---


## Native rooms

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `rooms` |
| Method | `GET` |
| Path | `/api/rooms` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `room.manage.native` |

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

custom validation: [`rooms`](/docs/api/schemas/crossfire-contracts-schema-query/#rooms); see function below

Accepted query parameters: `agentId`, `search`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function rooms(input: unknown) {
    const parsed = checked(input, ['agentId', 'search']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const agentId = parsed.value.get('agentId'), search = parsed.value.get('search') ?? '';
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    if (agentId !== null) {
        const valid = check.identifier(agentId);
        if (!valid.ok)
            return valid;
    }
    return success({ ...bounds.value, search, ...(agentId === null ? {} : { agentId }) });
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.rooms
```

Referenced definitions:

- [`rooms`](/docs/api/schemas/crossfire-contracts-schema-query/#rooms)

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

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room))

| Field path | Representation and constraints |
| --- | --- |
| `[].roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `[].name` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].topic` | string; 0–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].alias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].authority` | object; fields below; unknown fields rejected ([`roomAuthority`](/docs/api/schemas/crossfire-contracts-schema-response/#roomAuthority)); JSON null permitted |
| `[].authority.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `[].authority.canInvite` | boolean |
| `[].authority.authorityRevision` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].authority.accessModes` | array; 0–3 entries; item: `read` or `reply` or `custom` |
| `[].authority.accessFields` | array; 0–64 entries; item: object; fields below; unknown fields rejected |
| `[].authority.accessFields[].key` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].authority.accessFields[].label` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].authority.accessFields[].minimum` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.accessFields[].maximum` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.accessFields[].defaultValue` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.permissions` | array; 0–1000 entries; item: object; fields below; unknown fields rejected |
| `[].authority.permissions[].action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].authority.permissions[].label` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].authority.permissions[].allowed` | boolean |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(res.room, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room)

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
