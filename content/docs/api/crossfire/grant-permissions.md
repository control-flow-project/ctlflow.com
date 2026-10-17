---
title: "GET /api/agents/{agentId}/room-grants/{roomId}/permissions"
linkTitle: "grantPermissions"
description: "Scoped permission assignment"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "grantPermissions"
product: "crossfire"
generated: true
---


## Scoped permission assignment

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `grantPermissions` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/room-grants/{roomId}/permissions` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.owned`, `agent.read.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |

### Exact validator

```typescript
check.object({ agentId: check.identifier, roomId: check.roomId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## Query parameters

custom parser [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Exact validator

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `grant` | object; fields below; unknown fields rejected ([`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)); JSON null permitted |
| `grant.agentId` | lowercase opaque UUID |
| `grant.roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `grant.generation` | lowercase opaque UUID |
| `grant.authorizerId` | lowercase opaque UUID |
| `grant.addedById` | lowercase opaque UUID |
| `grant.accessMode` | `none` or `read` or `reply` or `custom` |
| `grant.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `grant.muted` | boolean |
| `grant.revision` | exact JSON integer; 0…9007199254740991 |
| `grant.accessRevision` | exact JSON integer; 0…9007199254740991 |
| `grant.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `ownerConversation` | boolean |
| `application` | object; fields below; unknown fields rejected; constraint: Native creators have no finite power level ([`grantApplication`](/docs/api/schemas/crossfire-contracts-schema-response/#grantApplication)); JSON null permitted |
| `application.observedGeneration` | lowercase opaque UUID; JSON null permitted |
| `application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.appliedAccessRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.membership` | `join` or `invite` or `leave` or `ban`; JSON null permitted |
| `application.creator` | boolean |
| `application.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `permissions` | array; 0–1 entries; item: `room.agent.invite` |
| `allowedActions` | array; 0–3 entries; item: `set` or `remove` or `permissions.set` |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `application`:

```typescript
application => !application.creator || application.powerLevel === null
```

### Exact validator

```typescript
res.grantView
```

Referenced definitions:

- [`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView)

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
