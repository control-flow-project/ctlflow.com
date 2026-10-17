---
title: "crossfire/node/packages/contracts/src/statistics.ts"
linkTitle: "statistics"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/statistics.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## STATISTICS_INTERVAL_MS {#STATISTICS_INTERVAL_MS}

```typescript
STATISTICS_INTERVAL_MS = 5 * 60000
```

## STATISTICS_RETENTION_MS {#STATISTICS_RETENTION_MS}

```typescript
STATISTICS_RETENTION_MS = 30 * 24 * 60 * 60 * 1000
```

## STATISTICS_LIMITS {#STATISTICS_LIMITS}

```typescript
STATISTICS_LIMITS = { flows: 256, sessions: 32, recentEvents: 2048 } as const
```

## count {#count}

```typescript
count = check.integer()
```

Related definitions:

- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## tokenCounts {#tokenCounts}

```typescript
tokenCounts = check.refine(check.object({ input: count, cachedInput: count, cacheWriteInput: check.nullable(count), output: count,
    reasoningOutput: check.nullable(count), total: count }), value => value.cachedInput <= value.input && (value.cacheWriteInput ?? 0) <= value.input
    && (value.reasoningOutput ?? 0) <= value.output, 'Token subsets exceed their parent counts')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## usageSample {#usageSample}

```typescript
usageSample = check.object({ runtime: check.text(100), sessionId: check.text(255), tokens: tokenCounts })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`tokenCounts`](/docs/api/schemas/crossfire-contracts-statistics/#tokenCounts)

## trafficFlow {#trafficFlow}

```typescript
trafficFlow = check.object({ roomId: check.roomId, senderMatrixId: check.matrixUserId,
    messageType: check.text(100), observed: count, delivered: count, contentBytes: count, deliveredBytes: count, attachmentBytes: count, largestBytes: count })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)

## statisticsBatch {#statisticsBatch}

```typescript
statisticsBatch = check.refine(check.object({ sequence: check.integer(1), startedAt: count, endedAt: count, dropped: count,
    flows: check.list(trafficFlow, STATISTICS_LIMITS.flows), usage: check.list(usageSample, STATISTICS_LIMITS.sessions) }), value => value.endedAt >= value.startedAt && new Set(value.flows.map(flow => JSON.stringify([flow.roomId, flow.senderMatrixId, flow.messageType]))).size === value.flows.length
    && new Set(value.usage.map(sample => JSON.stringify([sample.runtime, sample.sessionId]))).size === value.usage.length, 'Invalid interval or duplicate summaries')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`trafficFlow`](/docs/api/schemas/crossfire-contracts-statistics/#trafficFlow)
- [`STATISTICS_LIMITS`](/docs/api/schemas/crossfire-contracts-statistics/#STATISTICS_LIMITS)
- [`usageSample`](/docs/api/schemas/crossfire-contracts-statistics/#usageSample)

## TokenCounts {#TokenCounts}

```typescript
export type TokenCounts = check.Parsed<typeof tokenCounts>;
```

Related definitions:

- [`tokenCounts`](/docs/api/schemas/crossfire-contracts-statistics/#tokenCounts)

## UsageSample {#UsageSample}

```typescript
export type UsageSample = check.Parsed<typeof usageSample>;
```

Related definitions:

- [`usageSample`](/docs/api/schemas/crossfire-contracts-statistics/#usageSample)

## TrafficFlow {#TrafficFlow}

```typescript
export type TrafficFlow = check.Parsed<typeof trafficFlow>;
```

Related definitions:

- [`trafficFlow`](/docs/api/schemas/crossfire-contracts-statistics/#trafficFlow)

## StatisticsBatch {#StatisticsBatch}

```typescript
export type StatisticsBatch = check.Parsed<typeof statisticsBatch>;
```

Related definitions:

- [`statisticsBatch`](/docs/api/schemas/crossfire-contracts-statistics/#statisticsBatch)

## statisticsQuery {#statisticsQuery}

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

Related definitions:

- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## totals {#totals}

```typescript
totals = check.object({ observed: count, delivered: count, contentBytes: count, deliveredBytes: count, attachmentBytes: count, largestBytes: count })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)

## fleetStatistics {#fleetStatistics}

```typescript
fleetStatistics = check.object({ capturedAt: count, since: count, retentionDays: count, intervals: count, dropped: count,
    firstReportAt: check.nullable(count), lastReportAt: check.nullable(count), totals,
    agents: check.list(check.object({ agentId: check.identifier, displayName: check.text(255), matrixUserId: check.matrixUserId, totals,
        tokens: check.nullable(tokenCounts) }), 100),
    flows: check.list(check.object({ agentId: check.identifier, senderMatrixId: check.matrixUserId, senderName: check.nullable(check.text(255)),
        roomId: check.roomId, messageType: check.text(100), ...{ totals } }), 100),
    meta: check.object({ page: count, pageSize: count, totalItems: count, totalPages: count }),
    tokens: check.nullable(tokenCounts), spend: check.nullable(check.text(100)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`count`](/docs/api/schemas/crossfire-contracts-statistics/#count)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`totals`](/docs/api/schemas/crossfire-contracts-statistics/#totals)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)
- [`tokenCounts`](/docs/api/schemas/crossfire-contracts-statistics/#tokenCounts)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## FleetStatistics {#FleetStatistics}

```typescript
export type FleetStatistics = check.Parsed<typeof fleetStatistics>;
```

Related definitions:

- [`fleetStatistics`](/docs/api/schemas/crossfire-contracts-statistics/#fleetStatistics)
