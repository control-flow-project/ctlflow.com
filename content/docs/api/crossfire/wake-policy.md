---
title: "GET /api/agents/{agentId}/wake-policy"
linkTitle: "wakePolicy"
description: "Wake policy"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "wakePolicy"
product: "crossfire"
generated: true
---


## Wake policy

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `wakePolicy` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/wake-policy` |
| Catalog audience | `either` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.self`, `agent.read.owned`, `agent.read.any` |

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

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected; constraint: Invalid selected wake authority ([`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#wakePolicy))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `mode` | exact validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected; constraint: Only people can include their agents ([`wakeSender`](/docs/api/schemas/crossfire-contracts-schema-response/#wakeSender)) |
| `senders[].identity` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `senders[].identity.principalId` | lowercase opaque UUID |
| `senders[].identity.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `senders[].identity.kind` | `human` or `agent` |
| `senders[].identity.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `senders[].identity.ownerId` | lowercase opaque UUID |
| `senders[].identity.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `senders[].includeAgents` | boolean |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
policy => new Set(policy.senders.map(sender => sender.identity.principalId)).size === policy.senders.length
    && policy.senders.every(sender => sender.identity.principalId !== policy.agentId)
    && (policy.mode !== 'everyone' || policy.senders.length === 0)
```

Constraint on `senders[]`:

```typescript
sender => !sender.includeAgents || sender.identity.kind === 'human'
```

### Exact validator

```typescript
res.wakePolicy
```

Referenced definitions:

- [`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#wakePolicy)

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
