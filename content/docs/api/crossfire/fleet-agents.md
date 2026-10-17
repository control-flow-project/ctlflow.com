---
title: "GET /api/fleets/{fleetId}/agents"
linkTitle: "fleetAgents"
description: "Fleet members"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleetAgents"
product: "crossfire"
generated: true
---


## Fleet members

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `fleetAgents` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents` |
| Catalog audience | `fleet` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
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
| `fleetId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom parser [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Exact validator

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`fleetAgent`](/docs/api/schemas/crossfire-contracts-schema-response/#fleetAgent))

| Field path | Representation and constraints |
| --- | --- |
| `[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].agent` | object; fields below; unknown fields rejected ([`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent)) |
| `[].agent.agentId` | lowercase opaque UUID |
| `[].agent.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].agent.name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].agent.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.owner` | object; fields below; unknown fields rejected ([`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)) |
| `[].agent.owner.memberId` | lowercase opaque UUID |
| `[].agent.owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].agent.owner.displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.owner.status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].agent.status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].agent.revision` | exact JSON integer; 0…9007199254740991 |
| `[].agent.createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].agent.application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `[].agent.application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.application.appliedStatus` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `[].agent.application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].agent.application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].agent.application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].agent.activity` | object; fields below; unknown fields rejected ([`activity`](/docs/api/schemas/crossfire-contracts-schema-response/#activity)) |
| `[].agent.activity.status` | `online` or `offline` or `disconnecting` |
| `[].agent.activity.activeMs` | exact JSON integer; 0…9007199254740991 |
| `[].agent.activity.messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `[].agent.activity.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.activity.activeRuns` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)) |
| `[].agent.activity.activeRuns[].runId` | lowercase opaque UUID |
| `[].agent.activity.activeRuns[].agentId` | lowercase opaque UUID |
| `[].agent.activity.activeRuns[].release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].agent.activity.activeRuns[].controller` | object; fields below; unknown fields rejected; JSON null permitted |
| `[].agent.activity.activeRuns[].controller.fleetId` | lowercase opaque UUID |
| `[].agent.activity.activeRuns[].controller.connectionId` | lowercase opaque UUID |
| `[].agent.activity.activeRuns[].controller.credentialId` | lowercase opaque UUID |
| `[].agent.activity.activeRuns[].startedAt` | exact JSON integer; 0…9007199254740991 |
| `[].agent.activity.activeRuns[].lastSeenAt` | exact JSON integer; 0…9007199254740991 |
| `[].agent.activity.activeRuns[].activeMs` | exact JSON integer; 0…9007199254740991 |
| `[].agent.activity.activeRuns[].messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `[].agent.activity.activeRuns[].stoppedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.activity.activeRuns[].disconnectRequestedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.nativeRuntime` | object; fields below; unknown fields rejected ([`nativeRuntimeSummary`](/docs/api/schemas/crossfire-contracts-runtime/#nativeRuntimeSummary)); JSON null permitted |
| `[].agent.nativeRuntime.state` | `idle` or `working` or `waiting-approval` or `waiting-answer` or `failed` or `unavailable` or `sleeping` or `waking` or `stopped` |
| `[].agent.nativeRuntime.observedAt` | exact JSON integer; 0…9007199254740991 |
| `[].agent.nativeRuntime.lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.nativeRuntime.historyAvailable` | boolean; JSON null permitted |
| `[].agent.deployment` | object; fields below; unknown fields rejected |
| `[].agent.deployment.fleetId` | lowercase opaque UUID |
| `[].agent.deployment.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].agent.deployment.label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.deployment.controllerName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.deployment.reportedAt` | exact JSON integer; 0…9007199254740991 |
| `[].agent.deployment.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].agent.canRetire` | boolean |
| `[].agent.allowedActions` | array; 0–3 entries; item: `configure` or `room-grant.manage` or `retire` |

### Exact validator

```typescript
check.list(res.fleetAgent, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleetAgent`](/docs/api/schemas/crossfire-contracts-schema-response/#fleetAgent)

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
