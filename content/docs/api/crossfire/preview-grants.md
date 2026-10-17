---
title: "POST /api/room-grant-previews"
linkTitle: "previewGrants"
description: "Review complete room plan"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "previewGrants"
product: "crossfire"
generated: true
---


## Review complete room plan

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `previewGrants` |
| Method | `POST` |
| Path | `/api/room-grant-previews` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.room-grant.manage.owned`, `agent.room-grant.manage.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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

object; fields below; unknown fields rejected ([`planPreview`](/docs/api/schemas/crossfire-contracts-schema-request/#planPreview))

| Field path | Representation and constraints |
| --- | --- |
| `plan` | object; fields below; unknown fields rejected ([`plan`](/docs/api/schemas/crossfire-contracts-schema-request/#plan)) |
| `plan.fleetId` | lowercase opaque UUID |
| `plan.agents` | array; 1–100 entries; item: object; fields below; unknown fields rejected |
| `plan.agents[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `plan.agents[].grants` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)) |
| `plan.agents[].grants[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `plan.agents[].grants[].accessMode` | `read` or `reply` or `custom` |
| `plan.agents[].grants[].powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `plan.agents[].grants[].muted` | boolean |

### Exact validator

```typescript
req.planPreview
```

Referenced definitions:

- [`planPreview`](/docs/api/schemas/crossfire-contracts-schema-request/#planPreview)

## Response data

object; fields below; unknown fields rejected ([`preview`](/docs/api/schemas/crossfire-contracts-schema-plan/#preview))

| Field path | Representation and constraints |
| --- | --- |
| `digest` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `snapshots` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `snapshots[].agentId` | lowercase opaque UUID |
| `snapshots[].revision` | exact JSON integer; 0…9007199254740991 |
| `snapshots[].grants` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `snapshots[].grants[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `snapshots[].grants[].generation` | lowercase opaque UUID |
| `snapshots[].grants[].revision` | exact JSON integer; 0…9007199254740991 |
| `changes` | array; 0–10000 entries; item: object; fields below; unknown fields rejected |
| `changes[].agentId` | lowercase opaque UUID |
| `changes[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `changes[].before` | object; fields below; unknown fields rejected ([`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)); JSON null permitted |
| `changes[].before.agentId` | lowercase opaque UUID |
| `changes[].before.roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `changes[].before.generation` | lowercase opaque UUID |
| `changes[].before.authorizerId` | lowercase opaque UUID |
| `changes[].before.addedById` | lowercase opaque UUID |
| `changes[].before.accessMode` | `none` or `read` or `reply` or `custom` |
| `changes[].before.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `changes[].before.muted` | boolean |
| `changes[].before.revision` | exact JSON integer; 0…9007199254740991 |
| `changes[].before.accessRevision` | exact JSON integer; 0…9007199254740991 |
| `changes[].before.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `changes[].agentName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `changes[].roomName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].roomAlias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `changes[].after` | object; fields below; unknown fields rejected ([`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)); JSON null permitted |
| `changes[].after.roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `changes[].after.accessMode` | `read` or `reply` or `custom` |
| `changes[].after.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `changes[].after.muted` | boolean |
| `changes[].changed` | boolean |
| `changes[].authorizerId` | lowercase opaque UUID |
| `changes[].nativePowerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `changes[].nativeCreator` | boolean |

### Exact validator

```typescript
plan.preview
```

Referenced definitions:

- [`preview`](/docs/api/schemas/crossfire-contracts-schema-plan/#preview)

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
