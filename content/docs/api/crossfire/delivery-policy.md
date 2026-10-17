---
title: "GET /api/agents/{agentId}/delivery-policy"
linkTitle: "deliveryPolicy"
description: "Resolved listener delivery policy"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "deliveryPolicy"
product: "crossfire"
generated: true
---


## Resolved listener delivery policy

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `deliveryPolicy` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/delivery-policy` |
| Catalog audience | `agent` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.self` |

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

object; fields below; unknown fields rejected; constraint: Invalid resolved delivery authority ([`deliveryPolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryPolicy))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `maxMessageBytes` | exact JSON integer; 4096…4194304 |
| `fleetIdleTimeoutSeconds` | exact JSON integer; 0…604800 |
| `status` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `ownerStatus` | exact validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `ownerConversation` | immutable Matrix room ID; maximum 255 UTF-16 units; JSON null permitted |
| `roomGrants` | array; 0–101 entries; item: object; fields below; unknown fields rejected ([`deliveryGrant`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryGrant)) |
| `roomGrants[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `roomGrants[].accessMode` | `read` or `reply` or `custom` |
| `roomGrants[].powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `roomGrants[].muted` | boolean |
| `wakeMode` | exact validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senderMatrixIds` | array; 0–2000 entries; item: well-formed Matrix user ID; maximum 255 UTF-16 units |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
policy => new Set(policy.senderMatrixIds).size === policy.senderMatrixIds.length && !policy.senderMatrixIds.includes(policy.matrixUserId)
    && new Set(policy.roomGrants.map(grant => grant.roomId)).size === policy.roomGrants.length
    && policy.roomGrants.every(grant => (grant.accessMode === 'custom') === (grant.powerLevel !== null))
    && (policy.ownerConversation === null || policy.roomGrants.some(grant => grant.roomId === policy.ownerConversation && grant.accessMode === 'reply' && !grant.muted))
    && (policy.status === 'active' && policy.ownerStatus === 'active' || policy.senderMatrixIds.length === 0)
```

### Exact validator

```typescript
res.deliveryPolicy
```

Referenced definitions:

- [`deliveryPolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryPolicy)

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
