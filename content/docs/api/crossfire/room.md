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
| `roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |

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
| `roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `name` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `topic` | string; 0–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `alias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `authority` | object; fields below; unknown fields rejected; constraint: Native creator authority has no finite power level ([`roomAuthority`](/docs/api/schemas/crossfire-contracts-schema-response/#roomAuthority)); JSON null permitted |
| `authority.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `authority.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `authority.creator` | boolean |
| `authority.creatorIds` | array; 0–100 entries; item: well-formed Matrix user ID; maximum 255 UTF-16 units |
| `authority.readLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.replyLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.inviteLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.kickLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.changePowerLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `authority.nativePermissions` | array; 0–1000 entries; item: object; fields below; unknown fields rejected |
| `authority.nativePermissions[].action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `authority.nativePermissions[].level` | exact JSON integer; -9007199254740991…9007199254740991 |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `authority`:

```typescript
authority => authority.creator === (authority.powerLevel === null)
```

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
