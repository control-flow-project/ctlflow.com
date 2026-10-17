---
title: "POST /api/agents/{agentId}/runtime-decisions"
linkTitle: "createRuntimeDecision"
description: "Bind a human decision to its original native request"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "createRuntimeDecision"
product: "crossfire"
generated: true
---


## Bind a human decision to its original native request

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `createRuntimeDecision` |
| Method | `POST` |
| Path | `/api/agents/{agentId}/runtime-decisions` |
| Catalog audience | `agent` |
| Success status | `201` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 16777216 bytes (operation-specific) |
| Declared permissions | `runtime.report.self` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ agentId: check.identifier })
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

object; fields below; unknown fields rejected ([`decisionCreation`](/docs/api/schemas/crossfire-contracts-runtime/#decisionCreation))

| Field path | Representation and constraints |
| --- | --- |
| `id` | lowercase opaque UUID |
| `runId` | lowercase opaque UUID |
| `runtime` | `codex` or `pi` ([`implementedRuntime`](/docs/api/schemas/crossfire-contracts-runtime/#implementedRuntime)) |
| `sessionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `requestId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `turnId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `itemId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `kind` | `permission` or `question` |
| `action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `review` | plain-text string; at most 8388608 UTF-8 bytes; allowed whitespace controls only; constraint: Native review exceeds the separate UTF-8 resource bound |
| `blocking` | boolean |
| `expiresAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `questions` | array; 1–100 entries; item: object; fields below; unknown fields rejected ([`decisionQuestion`](/docs/api/schemas/crossfire-contracts-runtime/#decisionQuestion)) |
| `questions[].id` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].title` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].prompt` | plain-text string; at most 16000 UTF-8 bytes; allowed whitespace controls only |
| `questions[].secret` | boolean |
| `questions[].allowText` | boolean |
| `questions[].options` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`option`](/docs/api/schemas/crossfire-contracts-runtime/#option)) |
| `questions[].options[].id` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].options[].label` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].options[].description` | plain-text string; at most 4000 UTF-8 bytes; allowed whitespace controls only |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `review`:

```typescript
value => new TextEncoder().encode(value).byteLength <= MAX_REVIEW_BYTES
```

### Exact validator

```typescript
runtime.decisionCreation
```

Referenced definitions:

- [`decisionCreation`](/docs/api/schemas/crossfire-contracts-runtime/#decisionCreation)

## Response data

object; fields below; unknown fields rejected ([`decisionView`](/docs/api/schemas/crossfire-contracts-runtime/#decisionView))

| Field path | Representation and constraints |
| --- | --- |
| `id` | lowercase opaque UUID |
| `runId` | lowercase opaque UUID |
| `runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `sessionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `requestId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `turnId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `itemId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `kind` | `permission` or `question` |
| `action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `review` | plain-text string; at most 8388608 UTF-8 bytes; allowed whitespace controls only; constraint: Native review exceeds the separate UTF-8 resource bound |
| `blocking` | boolean |
| `expiresAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `questions` | array; 1–100 entries; item: object; fields below; unknown fields rejected ([`decisionQuestion`](/docs/api/schemas/crossfire-contracts-runtime/#decisionQuestion)) |
| `questions[].id` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].title` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].prompt` | plain-text string; at most 16000 UTF-8 bytes; allowed whitespace controls only |
| `questions[].secret` | boolean |
| `questions[].allowText` | boolean |
| `questions[].options` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`option`](/docs/api/schemas/crossfire-contracts-runtime/#option)) |
| `questions[].options[].id` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].options[].label` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `questions[].options[].description` | plain-text string; at most 4000 UTF-8 bytes; allowed whitespace controls only |
| `agentId` | lowercase opaque UUID |
| `status` | `pending` or `answered` or `responded` or `cancelled` or `expired` ([`decisionStatus`](/docs/api/schemas/crossfire-contracts-runtime/#decisionStatus)) |
| `createdAt` | exact JSON integer; 0…9007199254740991 |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `review`:

```typescript
value => new TextEncoder().encode(value).byteLength <= MAX_REVIEW_BYTES
```

### Exact validator

```typescript
runtime.decisionView
```

Referenced definitions:

- [`decisionView`](/docs/api/schemas/crossfire-contracts-runtime/#decisionView)

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
