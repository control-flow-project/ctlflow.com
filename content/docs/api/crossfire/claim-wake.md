---
title: "POST /api/agents/{agentId}/wake-deliveries"
linkTitle: "claimWake"
description: "Claim one due scheduled input for this native session"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "claimWake"
product: "crossfire"
generated: true
---


## Claim one due scheduled input for this native session

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `claimWake` |
| Method | `POST` |
| Path | `/api/agents/{agentId}/wake-deliveries` |
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

### Validation

```typescript
check.object({ agentId: check.identifier })
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

object; fields below; unknown fields rejected ([`wakeAttachment`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachment))

| Field path | Representation and constraints |
| --- | --- |
| `runId` | lowercase opaque UUID |
| `sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Validation

```typescript
wake.wakeAttachment
```

Referenced definitions:

- [`wakeAttachment`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachment)

## Response data

object; fields below; unknown fields rejected ([`scheduledWake`](/docs/api/schemas/crossfire-contracts-wake-up/#scheduledWake)); JSON null permitted

| Field path | Representation and constraints |
| --- | --- |
| `deliveryId` | lowercase opaque UUID |
| `ruleId` | lowercase opaque UUID |
| `ruleRevision` | exact JSON integer; 0…9007199254740991 |
| `name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Provide a Wake-up name ([`name`](/docs/api/schemas/crossfire-contracts-wake-up/#name)) |
| `message` | plain-text string; at most 16384 UTF-8 bytes; allowed whitespace controls only; constraint: Provide a wake-up message ([`message`](/docs/api/schemas/crossfire-contracts-wake-up/#message)) |
| `scheduledAt` | exact JSON integer; 0…9007199254740991 |
| `sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `authorizerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `message`:

```typescript
value => !!value.trim()
```

### Validation

```typescript
check.nullable(wake.scheduledWake)
```

Referenced definitions:

- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`scheduledWake`](/docs/api/schemas/crossfire-contracts-wake-up/#scheduledWake)

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
