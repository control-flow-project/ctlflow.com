---
title: "GET /api/wake-rules/{ruleId}"
linkTitle: "wakeRule"
description: "Wake-up details and attached agents"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "wakeRule"
product: "crossfire"
generated: true
---


## Wake-up details and attached agents

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `wakeRule` |
| Method | `GET` |
| Path | `/api/wake-rules/{ruleId}` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `wake-rule.read.owned`, `wake-rule.read.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `ruleId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ ruleId: check.identifier })
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

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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
| `schedule` | custom parser [`wakeSchedule`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeSchedule); exact branches, defaults and rejection rules below |
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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
wake.wakeRuleDetails
```

Referenced definitions:

- [`wakeRuleDetails`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleDetails)

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
