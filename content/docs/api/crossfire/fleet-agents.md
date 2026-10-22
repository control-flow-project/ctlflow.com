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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleetAgents` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents` |
| Authentication | `fleet` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

Your HTTP client supplies these values in the URL query string.

custom validation: [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

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

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`fleetAgent`](/docs/api/schemas/crossfire-contracts-schema-response/#fleetAgent))

| Field path | Representation and constraints |
| --- | --- |
| `[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].agent` | object; fields below; unknown fields rejected ([`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent)) |
| `[].agent.agentId` | lowercase opaque UUID |
| `[].agent.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `[].agent.name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].agent.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.owner` | object; fields below; unknown fields rejected ([`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)) |
| `[].agent.owner.memberId` | lowercase opaque UUID |
| `[].agent.owner.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `[].agent.owner.displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.owner.status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].agent.status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `[].agent.revision` | exact JSON integer; 0…9007199254740991 |
| `[].agent.createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].agent.application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `[].agent.application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agent.application.appliedStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
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
| `[].agent.activity.activeRuns[].release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].agent.activity.activeRuns[].controller` | object; fields below; unknown fields rejected |
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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(res.fleetAgent, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleetAgent`](/docs/api/schemas/crossfire-contracts-schema-response/#fleetAgent)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

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
