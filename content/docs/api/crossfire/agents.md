---
title: "GET /api/agents"
linkTitle: "agents"
description: "Agent directory"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "agents"
product: "crossfire"
generated: true
---


## Agent directory

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `agents` |
| Method | `GET` |
| Path | `/api/agents` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.owned`, `agent.read.any` |

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

custom parser [`agents`](/docs/api/schemas/crossfire-contracts-schema-query/#agents); exact branches, defaults and rejection rules below

Explicit query names in this parser: `ownerId`, `status`, `listener`, `search`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function agents(input: unknown) {
    const parsed = checked(input, ['ownerId', 'status', 'listener', 'search']);
    if (!parsed.ok)
        return parsed;
    const params = parsed.value;
    const bounds = pagination(params), ownerId = params.get('ownerId'), search = params.get('search') ?? '';
    if (!bounds.ok)
        return bounds;
    if (ownerId !== null) {
        const valid = check.identifier(ownerId);
        if (!valid.ok)
            return valid;
    }
    const statuses: ('active' | 'suspended' | 'revoked')[] = [];
    const selection = params.get('status') ?? 'active,suspended';
    for (const value of selection === '' ? [] : selection.split(',')) {
        const parsedStatus = check.status(value);
        if (!parsedStatus.ok)
            return parsedStatus;
        if (statuses.includes(parsedStatus.value))
            return failure('invalid', 'Duplicate account status');
        statuses.push(parsedStatus.value);
    }
    const listener = check.choice('all', 'online', 'offline', 'disconnecting')(params.get('listener') ?? 'all');
    if (!listener.ok)
        return listener;
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    return success({ ...bounds.value, statuses, search, listener: listener.value, ...(ownerId === null ? {} : { ownerId }) });
}
```

### Exact validator

```typescript
query.agents
```

Referenced definitions:

- [`agents`](/docs/api/schemas/crossfire-contracts-schema-query/#agents)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent))

| Field path | Representation and constraints |
| --- | --- |
| `[].agentId` | lowercase opaque UUID |
| `[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].owner` | object; fields below; unknown fields rejected ([`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)) |
| `[].owner.memberId` | lowercase opaque UUID |
| `[].owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].owner.displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].owner.status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `[].application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.appliedStatus` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `[].application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].activity` | object; fields below; unknown fields rejected ([`activity`](/docs/api/schemas/crossfire-contracts-schema-response/#activity)) |
| `[].activity.status` | `online` or `offline` or `disconnecting` |
| `[].activity.activeMs` | exact JSON integer; 0…9007199254740991 |
| `[].activity.messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `[].activity.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].activity.activeRuns` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)) |
| `[].activity.activeRuns[].runId` | lowercase opaque UUID |
| `[].activity.activeRuns[].agentId` | lowercase opaque UUID |
| `[].activity.activeRuns[].release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].activity.activeRuns[].controller` | object; fields below; unknown fields rejected; JSON null permitted |
| `[].activity.activeRuns[].controller.fleetId` | lowercase opaque UUID |
| `[].activity.activeRuns[].controller.connectionId` | lowercase opaque UUID |
| `[].activity.activeRuns[].controller.credentialId` | lowercase opaque UUID |
| `[].activity.activeRuns[].startedAt` | exact JSON integer; 0…9007199254740991 |
| `[].activity.activeRuns[].lastSeenAt` | exact JSON integer; 0…9007199254740991 |
| `[].activity.activeRuns[].activeMs` | exact JSON integer; 0…9007199254740991 |
| `[].activity.activeRuns[].messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `[].activity.activeRuns[].stoppedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].activity.activeRuns[].disconnectRequestedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].nativeRuntime` | object; fields below; unknown fields rejected ([`nativeRuntimeSummary`](/docs/api/schemas/crossfire-contracts-runtime/#nativeRuntimeSummary)); JSON null permitted |
| `[].nativeRuntime.state` | `idle` or `working` or `waiting-approval` or `waiting-answer` or `failed` or `unavailable` or `sleeping` or `waking` or `stopped` |
| `[].nativeRuntime.observedAt` | exact JSON integer; 0…9007199254740991 |
| `[].nativeRuntime.lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].nativeRuntime.historyAvailable` | boolean; JSON null permitted |
| `[].deployment` | object; fields below; unknown fields rejected |
| `[].deployment.fleetId` | lowercase opaque UUID |
| `[].deployment.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].deployment.label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].deployment.controllerName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].deployment.reportedAt` | exact JSON integer; 0…9007199254740991 |
| `[].deployment.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].canRetire` | boolean |
| `[].allowedActions` | array; 0–3 entries; item: `configure` or `room-grant.manage` or `retire` |

### Exact validator

```typescript
check.list(res.agent, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

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

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
