---
title: "GET /api/agents/{agentId}/wake-deliveries/{deliveryId}"
linkTitle: "validateWake"
description: "Recheck scheduled input before publication"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "validateWake"
product: "crossfire"
generated: true
---


## Recheck scheduled input before publication

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `validateWake` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/wake-deliveries/{deliveryId}` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `wake-delivery.receive.self` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `deliveryId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ agentId: check.identifier, deliveryId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom validation: [`wakeAttachmentQuery`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachmentQuery); see function below

Accepted query parameters: `runId`, `sessionId`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function wakeAttachmentQuery(input: unknown) {
    const values = listQuery(['runId', 'sessionId'])(input);
    if (!values.ok)
        return values;
    return wakeAttachment({ runId: values.value.get('runId'), sessionId: values.value.get('sessionId') });
}
```

### Validation

```typescript
wake.wakeAttachmentQuery
```

Referenced definitions:

- [`wakeAttachmentQuery`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachmentQuery)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `eligible` | boolean |

### Validation

```typescript
check.object({ eligible: check.boolean })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

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
