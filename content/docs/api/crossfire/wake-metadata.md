---
title: "GET /api/agents/{agentId}/wake-deliveries"
linkTitle: "wakeMetadata"
description: "Read the next scheduled deadline"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "wakeMetadata"
product: "crossfire"
generated: true
---


## Read the next scheduled deadline

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `wakeMetadata` |
| Method | `GET` |
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

custom parser [`wakeAttachmentQuery`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachmentQuery); exact branches, defaults and rejection rules below

Explicit query names in this parser: `runId`, `sessionId`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function wakeAttachmentQuery(input: unknown) {
    const values = listQuery(['runId', 'sessionId'])(input);
    if (!values.ok)
        return values;
    return wakeAttachment({ runId: values.value.get('runId'), sessionId: values.value.get('sessionId') });
}
```

### Exact validator

```typescript
wake.wakeAttachmentQuery
```

Referenced definitions:

- [`wakeAttachmentQuery`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachmentQuery)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`wakeMetadata`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeMetadata))

| Field path | Representation and constraints |
| --- | --- |
| `now` | exact JSON integer; 0…9007199254740991 |
| `nextDueAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Exact validator

```typescript
wake.wakeMetadata
```

Referenced definitions:

- [`wakeMetadata`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeMetadata)

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
