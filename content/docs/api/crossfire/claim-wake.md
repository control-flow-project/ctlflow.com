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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `claimWake` |
| Method | `POST` |
| Path | `/api/agents/{agentId}/wake-deliveries` |
| Catalog audience | `agent` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `wake-delivery.receive.self` |

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

object; fields below; unknown fields rejected ([`wakeAttachment`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachment))

| Field path | Representation and constraints |
| --- | --- |
| `runId` | lowercase opaque UUID |
| `sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Exact validator

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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `message`:

```typescript
value => !!value.trim()
```

### Exact validator

```typescript
check.nullable(wake.scheduledWake)
```

Referenced definitions:

- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`scheduledWake`](/docs/api/schemas/crossfire-contracts-wake-up/#scheduledWake)

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
