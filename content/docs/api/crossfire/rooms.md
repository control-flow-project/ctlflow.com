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

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

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

```typescript
query.rooms
```

Referenced definitions:

- [`rooms`](/docs/api/schemas/crossfire-contracts-schema-query/#rooms)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room))

| Field path | Representation and constraints |
| --- | --- |
| `[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `[].name` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].topic` | string; 0–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].alias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].authority` | object; fields below; unknown fields rejected; constraint: Native creator authority has no finite power level ([`roomAuthority`](/docs/api/schemas/crossfire-contracts-schema-response/#roomAuthority)); JSON null permitted |
| `[].authority.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].authority.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `[].authority.creator` | boolean |
| `[].authority.creatorIds` | array; 0–100 entries; item: well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].authority.readLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.replyLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.inviteLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.kickLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.changePowerLevel` | exact JSON integer; -9007199254740991…9007199254740991 |
| `[].authority.nativePermissions` | array; 0–1000 entries; item: object; fields below; unknown fields rejected |
| `[].authority.nativePermissions[].action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].authority.nativePermissions[].level` | exact JSON integer; -9007199254740991…9007199254740991 |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `[].authority`:

```typescript
authority => authority.creator === (authority.powerLevel === null)
```

### Validation

```typescript
check.list(res.room, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room)

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
