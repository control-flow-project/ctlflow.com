---
title: "GET /api/wake-rules"
linkTitle: "wakeRules"
description: "Scheduled Wake-ups"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "wakeRules"
product: "crossfire"
generated: true
---


## Scheduled Wake-ups

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `wakeRules` |
| Method | `GET` |
| Path | `/api/wake-rules` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `wake-rule.read.owned`, `wake-rule.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

Your HTTP client supplies these values in the URL query string.

custom validation: [`fleets`](/docs/api/schemas/crossfire-contracts-schema-query/#fleets); see function below

Accepted query parameters: `ownerId`, `search`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function fleets(input: unknown) {
    const parsed = checked(input, ['ownerId', 'search']);
    if (!parsed.ok)
        return parsed;
    const params = new URLSearchParams(parsed.value), search = params.get('search') ?? '';
    params.delete('search');
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    const scope = scoped(params);
    return scope.ok ? success({ ...scope.value, search }) : scope;
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.fleets
```

Referenced definitions:

- [`fleets`](/docs/api/schemas/crossfire-contracts-schema-query/#fleets)

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

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`wakeRuleSummary`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleSummary))

| Field path | Representation and constraints |
| --- | --- |
| `[].ruleId` | lowercase opaque UUID |
| `[].owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `[].owner.principalId` | lowercase opaque UUID |
| `[].owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].owner.kind` | `human` or `agent` |
| `[].owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].owner.ownerId` | lowercase opaque UUID |
| `[].owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].configuredById` | lowercase opaque UUID |
| `[].name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Provide a Wake-up name ([`name`](/docs/api/schemas/crossfire-contracts-wake-up/#name)) |
| `[].message` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Provide a wake-up message ([`message`](/docs/api/schemas/crossfire-contracts-wake-up/#message)) |
| `[].schedule` | custom validation: [`wakeSchedule`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeSchedule); see function below |
| `[].schedule.kind (parser branch 1)` | `interval` |
| `[].schedule.seconds (parser branch 1)` | exact JSON integer; 1…31536000 |
| `[].schedule.kind (parser branch 2)` | `cron` |
| `[].schedule.expression (parser branch 2)` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].schedule.timeZone (parser branch 2)` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].enabled` | boolean |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].updatedAt` | exact JSON integer; 0…9007199254740991 |
| `[].agentCount` | exact JSON integer; 0…1000 |
| `[].nextDueAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].lastDeliveredAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `[].message`:

```typescript
value => !!value.trim()
```

Constraint on `[].schedule`:

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

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(wake.wakeRuleSummary, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`wakeRuleSummary`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeRuleSummary)

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
