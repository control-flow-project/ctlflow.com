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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `deliveryPolicy` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/delivery-policy` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.self` |

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

empty object; unknown fields rejected

### Validation

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
| `status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `ownerStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `ownerConversation` | immutable Matrix room ID; maximum 255 UTF-16 units; JSON null permitted |
| `roomGrants` | array; 0–101 entries; item: object; fields below; unknown fields rejected ([`deliveryGrant`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryGrant)) |
| `roomGrants[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `roomGrants[].accessMode` | `read` or `reply` or `custom` |
| `roomGrants[].powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `roomGrants[].muted` | boolean |
| `wakeMode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senderMatrixIds` | array; 0–2000 entries; item: well-formed Matrix user ID; maximum 255 UTF-16 units |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
policy => new Set(policy.senderMatrixIds).size === policy.senderMatrixIds.length && !policy.senderMatrixIds.includes(policy.matrixUserId)
    && new Set(policy.roomGrants.map(grant => grant.roomId)).size === policy.roomGrants.length
    && policy.roomGrants.every(grant => (grant.accessMode === 'custom') === (grant.powerLevel !== null))
    && (policy.ownerConversation === null || policy.roomGrants.some(grant => grant.roomId === policy.ownerConversation && grant.accessMode === 'reply' && !grant.muted))
    && (policy.status === 'active' && policy.ownerStatus === 'active' || policy.senderMatrixIds.length === 0)
```

### Validation

```typescript
res.deliveryPolicy
```

Referenced definitions:

- [`deliveryPolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryPolicy)

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
