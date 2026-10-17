---
title: "GET /api/fleets/{fleetId}/map"
linkTitle: "fleetMap"
description: "Fleet connection map"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleetMap"
product: "crossfire"
generated: true
---


## Fleet connection map

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleetMap` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/map` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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

object; fields below; unknown fields rejected; constraint: Fleet map contains duplicate or disconnected identities ([`fleetMap`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#fleetMap))

| Field path | Representation and constraints |
| --- | --- |
| `fleet` | object; fields below; unknown fields rejected ([`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)) |
| `fleet.fleetId` | lowercase opaque UUID |
| `fleet.owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `fleet.owner.principalId` | lowercase opaque UUID |
| `fleet.owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `fleet.owner.kind` | `human` or `agent` |
| `fleet.owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.owner.ownerId` | lowercase opaque UUID |
| `fleet.owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `fleet.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `fleet.label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `fleet.controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.controller.metadata` | custom validation: [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); see function below; optional property |
| `fleet.revision` | exact JSON integer; 0…9007199254740991 |
| `fleet.createdAt` | exact JSON integer; 0…9007199254740991 |
| `fleet.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `fleet.delivery` | object; fields below; unknown fields rejected ([`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)) |
| `fleet.delivery.fleetId` | lowercase opaque UUID |
| `fleet.delivery.revision` | exact JSON integer; 0…9007199254740991 |
| `fleet.delivery.deliveryEnabled` | boolean |
| `fleet.delivery.connection` | object; fields below; unknown fields rejected |
| `fleet.delivery.connection.status` | `online` or `offline` |
| `fleet.delivery.connection.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `fleet.canArchive` | boolean |
| `fleet.allowedActions` | array; 0–2 entries; item: `configure` or `archive` |
| `capturedAt` | exact JSON integer; 0…9007199254740991 |
| `agents` | array; 0–1000 entries; item: object; fields below; unknown fields rejected ([`mapAgent`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapAgent)) |
| `agents[].agentId` | lowercase opaque UUID |
| `agents[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `agents[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `agents[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `agents[].status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `agents[].owner` | object; fields below; unknown fields rejected ([`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)) |
| `agents[].owner.memberId` | lowercase opaque UUID |
| `agents[].owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `agents[].owner.displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `agents[].owner.status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `agents[].sourceId` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `agents[].listener` | `online` or `offline` or `disconnecting` |
| `agents[].lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `rooms` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`mapRoom`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapRoom)) |
| `rooms[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `rooms[].name` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `rooms[].alias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `connections` | array; 0–10000 entries; item: object; fields below; unknown fields rejected ([`mapConnection`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapConnection)) |
| `connections[].agentId` | lowercase opaque UUID |
| `connections[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `connections[].grant` | object; fields below; unknown fields rejected ([`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)); JSON null permitted |
| `connections[].grant.agentId` | lowercase opaque UUID |
| `connections[].grant.roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `connections[].grant.generation` | lowercase opaque UUID |
| `connections[].grant.authorizerId` | lowercase opaque UUID |
| `connections[].grant.addedById` | lowercase opaque UUID |
| `connections[].grant.accessMode` | `none` or `read` or `reply` or `custom` |
| `connections[].grant.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `connections[].grant.muted` | boolean |
| `connections[].grant.revision` | exact JSON integer; 0…9007199254740991 |
| `connections[].grant.accessRevision` | exact JSON integer; 0…9007199254740991 |
| `connections[].grant.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `connections[].application` | object; fields below; unknown fields rejected; constraint: Native creators have no finite power level ([`grantApplication`](/docs/api/schemas/crossfire-contracts-schema-response/#grantApplication)); JSON null permitted |
| `connections[].application.observedGeneration` | lowercase opaque UUID; JSON null permitted |
| `connections[].application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `connections[].application.appliedAccessRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `connections[].application.membership` | `join` or `invite` or `leave` or `ban`; JSON null permitted |
| `connections[].application.creator` | boolean |
| `connections[].application.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `connections[].application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `connections[].application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `connections[].application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `connections[].application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `sources` | array; 0–1000 entries; item: object; fields below; unknown fields rejected ([`mapSource`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapSource)) |
| `sources[].sourceId` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `sources[].mode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `sources[].senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`wakeSelection`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeSelection)) |
| `sources[].senders[].principalId` | lowercase opaque UUID |
| `sources[].senders[].includeAgents` | boolean |
| `sources[].eligiblePrincipalIds` | array; 0–2000 entries; item: lowercase opaque UUID |
| `principals` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `principals[].principalId` | lowercase opaque UUID |
| `principals[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `principals[].kind` | `human` or `agent` |
| `principals[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `principals[].ownerId` | lowercase opaque UUID |
| `principals[].ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
value => {
    const agents = new Set(value.agents.map(agent => agent.agentId)), rooms = new Set(value.rooms.map(room => room.roomId));
    const sources = new Set(value.sources.map(source => source.sourceId)), principals = new Set(value.principals.map(identity => identity.principalId));
    return agents.size === value.agents.length && rooms.size === value.rooms.length && sources.size === value.sources.length && principals.size === value.principals.length
        && value.agents.every(agent => sources.has(agent.sourceId) && agent.owner.memberId === value.fleet.owner.principalId)
        && value.sources.every(source => [...source.senders.map(sender => sender.principalId), ...source.eligiblePrincipalIds].every(id => principals.has(id))
            && new Set(source.senders.map(sender => sender.principalId)).size === source.senders.length && new Set(source.eligiblePrincipalIds).size === source.eligiblePrincipalIds.length
            && source.senders.every(sender => !sender.includeAgents || value.principals.some(identity => identity.principalId === sender.principalId && identity.kind === 'human'))
            && (source.mode !== 'everyone' || source.senders.length === 0)
            && value.agents.some(agent => agent.sourceId === source.sourceId))
        && new Set(value.connections.map(connection => connection.agentId + '\0' + connection.roomId)).size === value.connections.length
        && value.connections.every(connection => agents.has(connection.agentId) && rooms.has(connection.roomId)
            && (connection.grant !== null || connection.application !== null)
            && (connection.grant === null || connection.grant.agentId === connection.agentId && connection.grant.roomId === connection.roomId))
        && value.rooms.every(room => value.connections.some(connection => connection.roomId === room.roomId));
}
```

Constraint on `fleet.controller.metadata`:

```typescript
function metadata(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 16)
        return failure('invalid', 'Controller metadata supports at most 16 text fields');
    const output: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        if (!/^[a-z][a-z0-9-]{0,39}$/u.test(key) || !check.text(256, 0)(value).ok || typeof value !== 'string')
            return failure('invalid', 'Invalid controller metadata');
        output[key] = value;
    }
    return success(output);
}
```

Constraint on `connections[].application`:

```typescript
application => !application.creator || application.powerLevel === null
```

### Validation

```typescript
fleetMap
```

Referenced definitions:

- [`fleetMap`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#fleetMap)

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
