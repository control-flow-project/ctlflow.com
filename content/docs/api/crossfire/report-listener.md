---
title: "PUT /api/agents/{agentId}/listener-runs/{runId}"
linkTitle: "reportListener"
description: "Report this listener"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "reportListener"
product: "crossfire"
generated: true
---


## Report this listener

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `reportListener` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/listener-runs/{runId}` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `listener.report.self` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `runId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier, runId: check.identifier })
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

object; fields below; unknown fields rejected ([`heartbeat`](/docs/api/schemas/crossfire-contracts-schema-request/#heartbeat))

| Field path | Representation and constraints |
| --- | --- |
| `release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `stopped` | boolean |
| `controller` | object; fields below; unknown fields rejected |
| `controller.fleetId` | lowercase opaque UUID |
| `controller.connectionId` | lowercase opaque UUID |
| `controller.credential` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `statistics` | object; fields below; unknown fields rejected; constraint: Invalid interval or duplicate summaries ([`statisticsBatch`](/docs/api/schemas/crossfire-contracts-statistics/#statisticsBatch)); JSON null permitted |
| `statistics.sequence` | exact JSON integer; 1…9007199254740991 |
| `statistics.startedAt` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.endedAt` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.dropped` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.flows` | array; 0–256 entries; item: object; fields below; unknown fields rejected ([`trafficFlow`](/docs/api/schemas/crossfire-contracts-statistics/#trafficFlow)) |
| `statistics.flows[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `statistics.flows[].senderMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `statistics.flows[].messageType` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `statistics.flows[].observed` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.flows[].delivered` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.flows[].contentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.flows[].deliveredBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.flows[].attachmentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.flows[].largestBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.usage` | array; 0–32 entries; item: object; fields below; unknown fields rejected ([`usageSample`](/docs/api/schemas/crossfire-contracts-statistics/#usageSample)) |
| `statistics.usage[].runtime` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `statistics.usage[].sessionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `statistics.usage[].tokens` | object; fields below; unknown fields rejected; constraint: Token subsets exceed their parent counts ([`tokenCounts`](/docs/api/schemas/crossfire-contracts-statistics/#tokenCounts)) |
| `statistics.usage[].tokens.input` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.usage[].tokens.cachedInput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.usage[].tokens.cacheWriteInput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `statistics.usage[].tokens.output` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `statistics.usage[].tokens.reasoningOutput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `statistics.usage[].tokens.total` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `statistics`:

```typescript
value => value.endedAt >= value.startedAt && new Set(value.flows.map(flow => JSON.stringify([flow.roomId, flow.senderMatrixId, flow.messageType]))).size === value.flows.length
    && new Set(value.usage.map(sample => JSON.stringify([sample.runtime, sample.sessionId]))).size === value.usage.length
```

Constraint on `statistics.usage[].tokens`:

```typescript
value => value.cachedInput <= value.input && (value.cacheWriteInput ?? 0) <= value.input
    && (value.reasoningOutput ?? 0) <= value.output
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.heartbeat
```

Referenced definitions:

- [`heartbeat`](/docs/api/schemas/crossfire-contracts-schema-request/#heartbeat)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`report`](/docs/api/schemas/crossfire-contracts-schema-response/#report))

| Field path | Representation and constraints |
| --- | --- |
| `disconnect` | boolean |
| `currentRelease` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `statisticsAccepted` | boolean |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.report
```

Referenced definitions:

- [`report`](/docs/api/schemas/crossfire-contracts-schema-response/#report)

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
