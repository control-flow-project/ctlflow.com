---
title: "GET /api/agents/{agentId}/room-grants/{roomId}"
linkTitle: "grant"
description: "One agent room grant"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "grant"
product: "crossfire"
generated: true
---


## One agent room grant

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `grant` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/room-grants/{roomId}` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.self`, `agent.read.owned`, `agent.read.any`, `room.agent.invite` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |

### Validation

```typescript
check.object({ agentId: check.identifier, roomId: check.roomId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## Query parameters

custom validation: [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Validation

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

empty object; unknown fields rejected

### Validation

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

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `application`:

```typescript
application => !application.creator || application.powerLevel === null
```

### Validation

```typescript
res.grantView
```

Referenced definitions:

- [`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
