---
title: "PUT /api/agents/{agentId}/runtime-decisions/{decisionId}/receipt"
linkTitle: "receiptRuntimeDecision"
description: "Record native response publication or cancellation, not inferred execution"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "receiptRuntimeDecision"
product: "crossfire"
generated: true
---


## Record native response publication or cancellation, not inferred execution

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `receiptRuntimeDecision` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/runtime-decisions/{decisionId}/receipt` |
| Catalog audience | `agent` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `runtime.report.self` |

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

object; fields below; unknown fields rejected ([`decisionReceipt`](/docs/api/schemas/crossfire-contracts-runtime/#decisionReceipt))

| Field path | Representation and constraints |
| --- | --- |
| `status` | `responded` or `cancelled` |

### Exact validator

```typescript
runtime.decisionReceipt
```

Referenced definitions:

- [`decisionReceipt`](/docs/api/schemas/crossfire-contracts-runtime/#decisionReceipt)

## Response data

object; fields below; unknown fields rejected ([`recorded`](/docs/api/schemas/crossfire-contracts-schema-response/#recorded))

| Field path | Representation and constraints |
| --- | --- |
| `recorded` | boolean |

### Exact validator

```typescript
res.recorded
```

Referenced definitions:

- [`recorded`](/docs/api/schemas/crossfire-contracts-schema-response/#recorded)

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
