---
title: "PATCH /api/agents/{agentId}"
linkTitle: "changeAgent"
description: "Change agent lifecycle or name"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "changeAgent"
product: "crossfire"
generated: true
---


## Change agent lifecycle or name

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `changeAgent` |
| Method | `PATCH` |
| Path | `/api/agents/{agentId}` |
| Authentication | `human` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.configure.owned`, `agent.configure.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

Your HTTP client supplies these values in the URL query string.

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

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

object; fields below; unknown fields rejected ([`agentChange`](/docs/api/schemas/crossfire-contracts-schema-request/#agentChange))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); optional property |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.agentChange
```

Referenced definitions:

- [`agentChange`](/docs/api/schemas/crossfire-contracts-schema-request/#agentChange)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `owner` | object; fields below; unknown fields rejected ([`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)) |
| `owner.memberId` | lowercase opaque UUID |
| `owner.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `owner.displayName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `owner.status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `application` | object; fields below; unknown fields rejected ([`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)) |
| `application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.appliedStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)); JSON null permitted |
| `application.nativeDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `activity` | object; fields below; unknown fields rejected ([`activity`](/docs/api/schemas/crossfire-contracts-schema-response/#activity)) |
| `activity.status` | `online` or `offline` or `disconnecting` |
| `activity.activeMs` | exact JSON integer; 0…9007199254740991 |
| `activity.messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `activity.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `activity.activeRuns` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)) |
| `activity.activeRuns[].runId` | lowercase opaque UUID |
| `activity.activeRuns[].agentId` | lowercase opaque UUID |
| `activity.activeRuns[].release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `activity.activeRuns[].controller` | object; fields below; unknown fields rejected |
| `activity.activeRuns[].controller.fleetId` | lowercase opaque UUID |
| `activity.activeRuns[].controller.connectionId` | lowercase opaque UUID |
| `activity.activeRuns[].controller.credentialId` | lowercase opaque UUID |
| `activity.activeRuns[].startedAt` | exact JSON integer; 0…9007199254740991 |
| `activity.activeRuns[].lastSeenAt` | exact JSON integer; 0…9007199254740991 |
| `activity.activeRuns[].activeMs` | exact JSON integer; 0…9007199254740991 |
| `activity.activeRuns[].messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `activity.activeRuns[].stoppedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `activity.activeRuns[].disconnectRequestedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `nativeRuntime` | object; fields below; unknown fields rejected ([`nativeRuntimeSummary`](/docs/api/schemas/crossfire-contracts-runtime/#nativeRuntimeSummary)); JSON null permitted |
| `nativeRuntime.state` | `idle` or `working` or `waiting-approval` or `waiting-answer` or `failed` or `unavailable` or `sleeping` or `waking` or `stopped` |
| `nativeRuntime.observedAt` | exact JSON integer; 0…9007199254740991 |
| `nativeRuntime.lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `nativeRuntime.historyAvailable` | boolean; JSON null permitted |
| `deployment` | object; fields below; unknown fields rejected |
| `deployment.fleetId` | lowercase opaque UUID |
| `deployment.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `deployment.label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `deployment.controllerName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `deployment.reportedAt` | exact JSON integer; 0…9007199254740991 |
| `deployment.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `canRetire` | boolean |
| `allowedActions` | array; 0–3 entries; item: `configure` or `room-grant.manage` or `retire` |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.agent
```

Referenced definitions:

- [`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
