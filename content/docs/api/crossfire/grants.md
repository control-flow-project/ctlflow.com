---
title: "GET /api/agents/{agentId}/room-grants"
linkTitle: "grants"
description: "Agent room grants"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "grants"
product: "crossfire"
generated: true
---


## Agent room grants

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `grants` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/room-grants` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.self`, `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ agentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom validation: [`roomGrants`](/docs/api/schemas/crossfire-contracts-schema-query/#roomGrants); see function below

Accepted query parameters: `roomIds`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function roomGrants(input: unknown): Result<PageQuery & {
    roomIds?: string[];
}> {
    const parsed = checked(input, ['roomIds']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const source = parsed.value.get('roomIds');
    if (source === null)
        return bounds;
    if (new TextEncoder().encode(source).length > 16384)
        return failure('invalid', 'Room filter exceeds its size bound');
    let decoded: unknown;
    try {
        decoded = JSON.parse(source);
    }
    catch {
        return failure('invalid', 'roomIds must be a JSON array');
    }
    const roomIds = check.list(check.roomId, 100)(decoded);
    if (!roomIds.ok)
        return roomIds;
    if (new Set(roomIds.value).size !== roomIds.value.length)
        return failure('invalid', 'Duplicate room filter');
    return success({ ...bounds.value, roomIds: roomIds.value });
}
```

### Validation

```typescript
query.roomGrants
```

Referenced definitions:

- [`roomGrants`](/docs/api/schemas/crossfire-contracts-schema-query/#roomGrants)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView))

| Field path | Representation and constraints |
| --- | --- |
| `[].agentId` | lowercase opaque UUID |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].grant` | object; fields below; unknown fields rejected ([`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)); JSON null permitted |
| `[].grant.agentId` | lowercase opaque UUID |
| `[].grant.roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `[].grant.generation` | lowercase opaque UUID |
| `[].grant.authorizerId` | lowercase opaque UUID |
| `[].grant.addedById` | lowercase opaque UUID |
| `[].grant.accessMode` | `none` or `read` or `reply` or `custom` |
| `[].grant.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `[].grant.muted` | boolean |
| `[].grant.revision` | exact JSON integer; 0…9007199254740991 |
| `[].grant.accessRevision` | exact JSON integer; 0…9007199254740991 |
| `[].grant.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `[].ownerConversation` | boolean |
| `[].application` | object; fields below; unknown fields rejected; constraint: Native creators have no finite power level ([`grantApplication`](/docs/api/schemas/crossfire-contracts-schema-response/#grantApplication)); JSON null permitted |
| `[].application.observedGeneration` | lowercase opaque UUID; JSON null permitted |
| `[].application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.appliedAccessRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.membership` | `join` or `invite` or `leave` or `ban`; JSON null permitted |
| `[].application.creator` | boolean |
| `[].application.powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `[].application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].permissions` | array; 0–1 entries; item: `room.agent.invite` |
| `[].allowedActions` | array; 0–3 entries; item: `set` or `remove` or `permissions.set` |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `[].application`:

```typescript
application => !application.creator || application.powerLevel === null
```

### Validation

```typescript
check.list(res.grantView, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView)

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
