---
title: "PUT /api/agents/{agentId}/wake-policy"
linkTitle: "changeWakePolicy"
description: "Replace wake policy"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "changeWakePolicy"
product: "crossfire"
generated: true
---


## Replace wake policy

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `changeWakePolicy` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/wake-policy` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.configure.owned`, `agent.configure.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

Your HTTP client supplies these values in the URL query string.

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

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

object; fields below; unknown fields rejected; constraint: Select unique identities; everyone requires no individual selections ([`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-request/#wakePolicy))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `mode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`wakeSelection`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeSelection)) |
| `senders[].principalId` | lowercase opaque UUID |
| `senders[].includeAgents` | boolean |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
policy => new Set(policy.senders.map(sender => sender.principalId)).size === policy.senders.length
    && (policy.mode !== 'everyone' || policy.senders.length === 0)
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.wakePolicy
```

Referenced definitions:

- [`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-request/#wakePolicy)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected; constraint: Invalid selected wake authority ([`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#wakePolicy))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `mode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected; constraint: Only people can include their agents ([`wakeSender`](/docs/api/schemas/crossfire-contracts-schema-response/#wakeSender)) |
| `senders[].identity` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `senders[].identity.principalId` | lowercase opaque UUID |
| `senders[].identity.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `senders[].identity.kind` | `human` or `agent` |
| `senders[].identity.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `senders[].identity.ownerId` | lowercase opaque UUID |
| `senders[].identity.ownerBackendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
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

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.wakePolicy
```

Referenced definitions:

- [`wakePolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#wakePolicy)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
