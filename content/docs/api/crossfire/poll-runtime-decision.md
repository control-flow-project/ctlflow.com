---
title: "GET /api/agents/{agentId}/runtime-decisions/{decisionId}/answer"
linkTitle: "pollRuntimeDecision"
description: "Original listener retrieves the private answer"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "pollRuntimeDecision"
product: "crossfire"
generated: true
---


## Original listener retrieves the private answer

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `pollRuntimeDecision` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/runtime-decisions/{decisionId}/answer` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `runtime.report.self` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `decisionId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ agentId: check.identifier, decisionId: check.identifier })
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

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`decisionPoll`](/docs/api/schemas/crossfire-contracts-runtime/#decisionPoll))

| Field path | Representation and constraints |
| --- | --- |
| `status` | `pending` or `answered` or `responded` or `cancelled` or `expired` ([`decisionStatus`](/docs/api/schemas/crossfire-contracts-runtime/#decisionStatus)) |
| `answers` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`decisionAnswer`](/docs/api/schemas/crossfire-contracts-runtime/#decisionAnswer)) |
| `answers[].questionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `answers[].optionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `answers[].text` | plain-text string; at most 16000 UTF-8 bytes; allowed whitespace controls only; JSON null permitted |

### Validation

```typescript
runtime.decisionPoll
```

Referenced definitions:

- [`decisionPoll`](/docs/api/schemas/crossfire-contracts-runtime/#decisionPoll)

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
