---
title: "POST /api/agents/{agentId}/runtime-decisions/{decisionId}/answer"
linkTitle: "answerRuntimeDecision"
description: "Owner explicitly submits all native answers"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "answerRuntimeDecision"
product: "crossfire"
generated: true
---


## Owner explicitly submits all native answers

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `answerRuntimeDecision` |
| Method | `POST` |
| Path | `/api/agents/{agentId}/runtime-decisions/{decisionId}/answer` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `runtime.decision.answer.owned` |

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

object; fields below; unknown fields rejected ([`decisionSubmission`](/docs/api/schemas/crossfire-contracts-runtime/#decisionSubmission))

| Field path | Representation and constraints |
| --- | --- |
| `answers` | array; 1–100 entries; item: object; fields below; unknown fields rejected ([`decisionAnswer`](/docs/api/schemas/crossfire-contracts-runtime/#decisionAnswer)) |
| `answers[].questionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `answers[].optionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `answers[].text` | plain-text string; at most 16000 UTF-8 bytes; allowed whitespace controls only; JSON null permitted |

### Validation

```typescript
runtime.decisionSubmission
```

Referenced definitions:

- [`decisionSubmission`](/docs/api/schemas/crossfire-contracts-runtime/#decisionSubmission)

## Response data

object; fields below; unknown fields rejected ([`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged))

| Field path | Representation and constraints |
| --- | --- |
| `accepted` | boolean |

### Validation

```typescript
res.acknowledged
```

Referenced definitions:

- [`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged)

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
