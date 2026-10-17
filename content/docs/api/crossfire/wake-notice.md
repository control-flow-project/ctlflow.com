---
title: "PUT /api/agents/{agentId}/wake-notices/{eventId}"
linkTitle: "wakeNotice"
description: "Idempotent blocked mention response"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "wakeNotice"
product: "crossfire"
generated: true
---


## Idempotent blocked mention response

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `wakeNotice` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/wake-notices/{eventId}` |
| Catalog audience | `agent` |
| Success status | `202` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `wake-notice.publish.self` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

HTTP 202 records accepted intent. It does not establish native application, process completion or completion of model work.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `eventId` | opaque Matrix event ID; maximum 255 UTF-16 units |

### Exact validator

```typescript
check.object({ agentId: check.identifier, eventId: check.eventId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`eventId`](/docs/api/schemas/crossfire-contracts-schema-validation/#eventId)

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

object; fields below; unknown fields rejected ([`wakeNotice`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeNotice))

| Field path | Representation and constraints |
| --- | --- |
| `roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |

### Exact validator

```typescript
req.wakeNotice
```

Referenced definitions:

- [`wakeNotice`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeNotice)

## Response data

object; fields below; unknown fields rejected ([`notice`](/docs/api/schemas/crossfire-contracts-schema-response/#notice))

| Field path | Representation and constraints |
| --- | --- |
| `outcome` | `pending` or `sent` or `denied` or `not-applicable` or `not-permitted` or `rate-limited` |

### Exact validator

```typescript
res.notice
```

Referenced definitions:

- [`notice`](/docs/api/schemas/crossfire-contracts-schema-response/#notice)

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
