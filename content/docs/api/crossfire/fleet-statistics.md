---
title: "GET /api/fleets/{fleetId}/statistics"
linkTitle: "fleetStatistics"
description: "Periodic fleet traffic and native usage summaries"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleetStatistics"
product: "crossfire"
generated: true
---


## Periodic fleet traffic and native usage summaries

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleetStatistics` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/statistics` |
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

custom validation: [`statisticsQuery`](/docs/api/schemas/crossfire-contracts-statistics/#statisticsQuery); see function below

Accepted query parameters: `hours`, `page`, `pageSize`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function statisticsQuery(input: unknown) {
    if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => !['hours', 'page', 'pageSize'].includes(key) || input.getAll(key).length !== 1))
        return failure('invalid', 'Unknown or duplicated statistics query');
    if (['hours', 'page', 'pageSize'].some(key => input.has(key) && !/^[1-9][0-9]*$/u.test(input.get(key)!)))
        return failure('invalid', 'Statistics query values must be canonical positive integers');
    const hours = Number(input.get('hours') ?? 24), page = Number(input.get('page') ?? 1), pageSize = Number(input.get('pageSize') ?? 20);
    return [1, 24, 168, 720].includes(hours) && Number.isSafeInteger(page) && page >= 1 && page <= 100000 && Number.isSafeInteger(pageSize) && pageSize >= 1 && pageSize <= 100
        ? success({ hours, page, pageSize }) : failure('invalid', 'Select 1, 24, 168 or 720 hours and valid pagination');
}
```

### Validation

```typescript
statisticsQuery
```

Referenced definitions:

- [`statisticsQuery`](/docs/api/schemas/crossfire-contracts-statistics/#statisticsQuery)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`fleetStatistics`](/docs/api/schemas/crossfire-contracts-statistics/#fleetStatistics))

| Field path | Representation and constraints |
| --- | --- |
| `capturedAt` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `since` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `retentionDays` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `intervals` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `dropped` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `firstReportAt` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `lastReportAt` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `totals` | object; fields below; unknown fields rejected ([`totals`](/docs/api/schemas/crossfire-contracts-statistics/#totals)) |
| `totals.observed` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `totals.delivered` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `totals.contentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `totals.deliveredBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `totals.attachmentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `totals.largestBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `agents[].agentId` | lowercase opaque UUID |
| `agents[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `agents[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `agents[].totals` | object; fields below; unknown fields rejected ([`totals`](/docs/api/schemas/crossfire-contracts-statistics/#totals)) |
| `agents[].totals.observed` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].totals.delivered` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].totals.contentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].totals.deliveredBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].totals.attachmentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].totals.largestBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].tokens` | object; fields below; unknown fields rejected; constraint: Token subsets exceed their parent counts ([`tokenCounts`](/docs/api/schemas/crossfire-contracts-statistics/#tokenCounts)); JSON null permitted |
| `agents[].tokens.input` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].tokens.cachedInput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].tokens.cacheWriteInput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `agents[].tokens.output` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `agents[].tokens.reasoningOutput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `agents[].tokens.total` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `flows` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `flows[].agentId` | lowercase opaque UUID |
| `flows[].senderMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `flows[].senderName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `flows[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `flows[].messageType` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `flows[].totals` | object; fields below; unknown fields rejected ([`totals`](/docs/api/schemas/crossfire-contracts-statistics/#totals)) |
| `flows[].totals.observed` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `flows[].totals.delivered` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `flows[].totals.contentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `flows[].totals.deliveredBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `flows[].totals.attachmentBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `flows[].totals.largestBytes` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `meta` | object; fields below; unknown fields rejected |
| `meta.page` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `meta.pageSize` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `meta.totalItems` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `meta.totalPages` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `tokens` | object; fields below; unknown fields rejected; constraint: Token subsets exceed their parent counts ([`tokenCounts`](/docs/api/schemas/crossfire-contracts-statistics/#tokenCounts)); JSON null permitted |
| `tokens.input` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `tokens.cachedInput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `tokens.cacheWriteInput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `tokens.output` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `tokens.reasoningOutput` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)); JSON null permitted |
| `tokens.total` | exact JSON integer; 0…9007199254740991 ([`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)) |
| `spend` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `tokens`:

```typescript
value => value.cachedInput <= value.input && (value.cacheWriteInput ?? 0) <= value.input
    && (value.reasoningOutput ?? 0) <= value.output
```

### Validation

```typescript
fleetStatistics
```

Referenced definitions:

- [`fleetStatistics`](/docs/api/schemas/crossfire-contracts-statistics/#fleetStatistics)

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
