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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `wakePolicy` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/wake-policy` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.self`, `agent.read.owned`, `agent.read.any` |

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

object; fields below; unknown fields rejected; constraint: Invalid selected wake authority ([`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#wakePolicy))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `mode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected; constraint: Only people can include their agents ([`wakeSender`](/docs/api/schemas/crossfire-contracts-schema-response/#wakeSender)) |
| `senders[].identity` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `senders[].identity.principalId` | lowercase opaque UUID |
| `senders[].identity.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `senders[].identity.kind` | `human` or `agent` |
| `senders[].identity.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `senders[].identity.ownerId` | lowercase opaque UUID |
| `senders[].identity.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `senders[].includeAgents` | boolean |

### Additional checks

The following checks apply in addition to the field limits.

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

### Validation

```typescript
res.wakePolicy
```

Referenced definitions:

- [`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#wakePolicy)

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
