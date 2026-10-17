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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `receiptRuntimeDecision` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/runtime-decisions/{decisionId}/receipt` |
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

object; fields below; unknown fields rejected ([`decisionReceipt`](/docs/api/schemas/crossfire-contracts-runtime/#decisionReceipt))

| Field path | Representation and constraints |
| --- | --- |
| `status` | `responded` or `cancelled` |

### Validation

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

### Validation

```typescript
res.recorded
```

Referenced definitions:

- [`recorded`](/docs/api/schemas/crossfire-contracts-schema-response/#recorded)

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
