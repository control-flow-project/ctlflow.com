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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `room` |
| Method | `GET` |
| Path | `/api/rooms/{roomId}` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `room.manage.native` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |

### Exact validator

```typescript
check.object({ roomId: check.roomId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## Query parameters

custom parser [`roomContext`](/docs/api/schemas/crossfire-contracts-schema-query/#roomContext); exact branches, defaults and rejection rules below

Explicit query names in this parser: `agentId`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
query.roomContext
```

Referenced definitions:

- [`roomContext`](/docs/api/schemas/crossfire-contracts-schema-query/#roomContext)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `authority`:

```typescript
authority => authority.creator === (authority.powerLevel === null)
```

### Exact validator

```typescript
res.room
```

Referenced definitions:

- [`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
