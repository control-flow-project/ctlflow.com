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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `answerRuntimeDecision` |
| Method | `POST` |
| Path | `/api/agents/{agentId}/runtime-decisions/{decisionId}/answer` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `runtime.decision.answer.owned` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `decisionId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ agentId: check.identifier, decisionId: check.identifier })
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

object; fields below; unknown fields rejected ([`decisionSubmission`](/docs/api/schemas/crossfire-contracts-runtime/#decisionSubmission))

| Field path | Representation and constraints |
| --- | --- |
| `answers` | array; 1–100 entries; item: object; fields below; unknown fields rejected ([`decisionAnswer`](/docs/api/schemas/crossfire-contracts-runtime/#decisionAnswer)) |
| `answers[].questionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `answers[].optionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `answers[].text` | plain-text string; at most 16000 UTF-8 bytes; allowed whitespace controls only; JSON null permitted |

### Exact validator

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

### Exact validator

```typescript
res.acknowledged
```

Referenced definitions:

- [`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged)

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
