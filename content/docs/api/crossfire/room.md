---
title: "GET /api/rooms/{roomId}"
linkTitle: "room"
description: "Native room details"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "room"
product: "crossfire"
generated: true
---


## Native room details

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `room` |
| Method | `GET` |
| Path | `/api/rooms/{roomId}` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `room.manage.native` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ roomId: check.roomId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## Query parameters

Your HTTP client supplies these values in the URL query string.

custom validation: [`roomContext`](/docs/api/schemas/crossfire-contracts-schema-query/#roomContext); see function below

Accepted query parameters: `agentId`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function roomContext(input: unknown): Result<{
    agentId?: string;
}> {
    const parsed = listQuery(['agentId'])(input);
    if (!parsed.ok)
        return parsed;
    const agentId = parsed.value.get('agentId');
    if (agentId === null)
        return success({});
    const valid = check.identifier(agentId);
    return valid.ok ? success({ agentId }) : valid;
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.roomContext
```

Referenced definitions:

- [`roomContext`](/docs/api/schemas/crossfire-contracts-schema-query/#roomContext)

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

object; fields below; unknown fields rejected ([`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room))

| Field path | Representation and constraints |
| --- | --- |
| `roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `name` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `topic` | string; 0–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `alias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `authority` | object; fields below; unknown fields rejected ([`roomAuthority`](/docs/api/schemas/crossfire-contracts-schema-response/#roomAuthority)); JSON null permitted |
| `authority.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `authority.canInvite` | boolean |
| `authority.authorityRevision` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `authority.accessModes` | array; 0–3 entries; item: `read` or `reply` or `custom` |
| `authority.accessFields` | array; 0–64 entries; item: object; fields below; unknown fields rejected |
| `authority.accessFields[].key` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `authority.accessFields[].label` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `authority.accessFields[].minimum` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.accessFields[].maximum` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.accessFields[].defaultValue` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.permissions` | array; 0–1000 entries; item: object; fields below; unknown fields rejected |
| `authority.permissions[].action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `authority.permissions[].label` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `authority.permissions[].allowed` | boolean |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.room
```

Referenced definitions:

- [`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
