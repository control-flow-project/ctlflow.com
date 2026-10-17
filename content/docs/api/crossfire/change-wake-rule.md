---
title: "PUT /api/wake-rules/{ruleId}"
linkTitle: "changeWakeRule"
description: "Replace the Wake-up configuration"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "changeWakeRule"
product: "crossfire"
generated: true
---


## Replace the Wake-up configuration

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `changeWakeRule` |
| Method | `PUT` |
| Path | `/api/wake-rules/{ruleId}` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `wake-rule.manage.owned`, `wake-rule.manage.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `ruleId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ ruleId: check.identifier })
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

object; fields below; unknown fields rejected ([`wakeRuleChange`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleChange))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Provide a Wake-up name ([`name`](/docs/api/schemas/crossfire-contracts-wake-up/#name)) |
| `message` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Provide a wake-up message ([`message`](/docs/api/schemas/crossfire-contracts-wake-up/#message)) |
| `schedule` | custom validation: [`wakeSchedule`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeSchedule); see function below |
| `schedule.kind (parser branch 1)` | `interval` |
| `schedule.seconds (parser branch 1)` | exact JSON integer; 1…31536000 |
| `schedule.kind (parser branch 2)` | `cron` |
| `schedule.expression (parser branch 2)` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `schedule.timeZone (parser branch 2)` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enabled` | boolean |
| `agentIds` | array; 0–1000 entries; item: lowercase opaque UUID; constraint: Duplicate attached agents ([`agentIds`](/docs/api/schemas/crossfire-contracts-wake-up/#agentIds)) |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `message`:

```typescript
value => !!value.trim()
```

Constraint on `schedule`:

```typescript
input => {
    if (!input || typeof input !== 'object' || !('kind' in input))
        return failure('invalid', 'Choose an interval or calendar schedule');
    if (input.kind === 'interval')
        return check.object({ kind: check.choice('interval'), seconds: check.integer(1, 31536000) })(input);
    if (input.kind === 'cron')
        return check.object({ kind: check.choice('cron'), expression: check.text(200), timeZone: check.text(100) })(input);
    return failure('invalid', 'Unknown schedule kind');
}
```

Constraint on `agentIds`:

```typescript
ids => new Set(ids).size === ids.length
```

### Validation

```typescript
wake.wakeRuleChange
```

Referenced definitions:

- [`wakeRuleChange`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleChange)

## Response data

object; fields below; unknown fields rejected ([`wakeRuleDetails`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleDetails))

| Field path | Representation and constraints |
| --- | --- |
| `ruleId` | lowercase opaque UUID |
| `owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `owner.principalId` | lowercase opaque UUID |
| `owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `owner.kind` | `human` or `agent` |
| `owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `owner.ownerId` | lowercase opaque UUID |
| `owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `configuredById` | lowercase opaque UUID |
| `name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Provide a Wake-up name ([`name`](/docs/api/schemas/crossfire-contracts-wake-up/#name)) |
| `message` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Provide a wake-up message ([`message`](/docs/api/schemas/crossfire-contracts-wake-up/#message)) |
| `schedule` | custom validation: [`wakeSchedule`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeSchedule); see function below |
| `schedule.kind (parser branch 1)` | `interval` |
| `schedule.seconds (parser branch 1)` | exact JSON integer; 1…31536000 |
| `schedule.kind (parser branch 2)` | `cron` |
| `schedule.expression (parser branch 2)` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `schedule.timeZone (parser branch 2)` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enabled` | boolean |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `updatedAt` | exact JSON integer; 0…9007199254740991 |
| `agentCount` | exact JSON integer; 0…1000 |
| `nextDueAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `lastDeliveredAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `agents` | array; 0–1000 entries; item: object; fields below; unknown fields rejected ([`wakeRuleAgent`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleAgent)) |
| `agents[].principalId` | lowercase opaque UUID |
| `agents[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `agents[].kind` | `agent` |
| `agents[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `agents[].ownerId` | lowercase opaque UUID |
| `agents[].ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `agents[].ruleId` | lowercase opaque UUID |
| `agents[].agentId` | lowercase opaque UUID |
| `agents[].nextDueAt` | exact JSON integer; 0…9007199254740991 |
| `agents[].lastDeliveredAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `message`:

```typescript
value => !!value.trim()
```

Constraint on `schedule`:

```typescript
input => {
    if (!input || typeof input !== 'object' || !('kind' in input))
        return failure('invalid', 'Choose an interval or calendar schedule');
    if (input.kind === 'interval')
        return check.object({ kind: check.choice('interval'), seconds: check.integer(1, 31536000) })(input);
    if (input.kind === 'cron')
        return check.object({ kind: check.choice('cron'), expression: check.text(200), timeZone: check.text(100) })(input);
    return failure('invalid', 'Unknown schedule kind');
}
```

### Validation

```typescript
wake.wakeRuleDetails
```

Referenced definitions:

- [`wakeRuleDetails`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleDetails)

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
