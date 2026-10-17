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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `reportListener` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/listener-runs/{runId}` |
| Catalog audience | `agent` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `listener.report.self` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `runId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ agentId: check.identifier, runId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
req.heartbeat
```

Referenced definitions:

- [`heartbeat`](/docs/api/schemas/crossfire-contracts-schema-request/#heartbeat)

## Response data

object; fields below; unknown fields rejected ([`report`](/docs/api/schemas/crossfire-contracts-schema-response/#report))

| Field path | Representation and constraints |
| --- | --- |
| `disconnect` | boolean |
| `currentRelease` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `statisticsAccepted` | boolean |

### Exact validator

```typescript
res.report
```

Referenced definitions:

- [`report`](/docs/api/schemas/crossfire-contracts-schema-response/#report)

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
