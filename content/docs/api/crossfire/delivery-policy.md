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

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected; constraint: Invalid resolved delivery authority ([`deliveryPolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryPolicy))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `ownerBackendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `maxMessageBytes` | exact JSON integer; 4096…4194304 |
| `fleetIdleTimeoutSeconds` | exact JSON integer; 0…604800 |
| `status` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `ownerStatus` | validator `choice('active', 'suspended', 'revoked')` ([`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)) |
| `ownerConversation` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters; JSON null permitted |
| `roomGrants` | array; 0–101 entries; item: object; fields below; unknown fields rejected ([`deliveryGrant`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryGrant)) |
| `roomGrants[].roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `roomGrants[].accessMode` | `read` or `reply` or `custom` |
| `roomGrants[].nativeAccess` | custom validation: [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters); see function below; JSON null permitted |
| `roomGrants[].muted` | boolean |
| `wakeMode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `senderBackendUserIds` | array; 0–2000 entries; item: opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
policy => new Set(policy.senderBackendUserIds).size === policy.senderBackendUserIds.length && !policy.senderBackendUserIds.includes(policy.backendUserId)
    && new Set(policy.roomGrants.map(grant => grant.roomId)).size === policy.roomGrants.length
    && policy.roomGrants.every(grant => (grant.accessMode === 'custom') === (grant.nativeAccess !== null))
    && (policy.ownerConversation === null || policy.roomGrants.some(grant => grant.roomId === policy.ownerConversation && grant.accessMode === 'reply' && !grant.muted))
    && (policy.status === 'active' && policy.ownerStatus === 'active' || policy.senderBackendUserIds.length === 0)
```

Constraint on `roomGrants[].nativeAccess`:

```typescript
input => input !== null && typeof input === 'object' && !Array.isArray(input)
    && json(input) && Object.keys(input).length <= 64 && new TextEncoder().encode(JSON.stringify(input)).length <= 8192
    ? success(input as JsonObject) : failure('invalid', 'Expected a backend parameter object up to 8192 UTF-8 bytes')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.deliveryPolicy
```

Referenced definitions:

- [`deliveryPolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryPolicy)

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
