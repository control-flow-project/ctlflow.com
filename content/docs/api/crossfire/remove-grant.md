---
title: "DELETE /api/agents/{agentId}/room-grants/{roomId}"
linkTitle: "removeGrant"
description: "Remove agent room grant"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "removeGrant"
product: "crossfire"
generated: true
---


## Remove agent room grant

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `removeGrant` |
| Method | `DELETE` |
| Path | `/api/agents/{agentId}/room-grants/{roomId}` |
| Authentication | `either` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.room-grant.manage.owned`, `agent.room-grant.manage.any`, `room.agent.invite` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier, roomId: check.roomId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

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

object; fields below; unknown fields rejected ([`removeGrant`](/docs/api/schemas/crossfire-contracts-schema-request/#removeGrant))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `expectedGeneration` | lowercase opaque UUID; JSON null permitted |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.removeGrant
```

Referenced definitions:

- [`removeGrant`](/docs/api/schemas/crossfire-contracts-schema-request/#removeGrant)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView))

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `grant` | object; fields below; unknown fields rejected ([`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)); JSON null permitted |
| `grant.agentId` | lowercase opaque UUID |
| `grant.roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `grant.generation` | lowercase opaque UUID |
| `grant.authorizerId` | lowercase opaque UUID |
| `grant.addedById` | lowercase opaque UUID |
| `grant.accessMode` | `none` or `read` or `reply` or `custom` |
| `grant.nativeAccess` | custom validation: [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters); see function below; JSON null permitted |
| `grant.muted` | boolean |
| `grant.revision` | exact JSON integer; 0…9007199254740991 |
| `grant.accessRevision` | exact JSON integer; 0…9007199254740991 |
| `grant.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `ownerConversation` | boolean |
| `application` | object; fields below; unknown fields rejected ([`grantApplication`](/docs/api/schemas/crossfire-contracts-schema-response/#grantApplication)); JSON null permitted |
| `application.observedGeneration` | lowercase opaque UUID; JSON null permitted |
| `application.appliedRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.appliedAccessRevision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.membership` | `join` or `invite` or `leave` or `ban`; JSON null permitted |
| `application.nativeAccess` | custom validation: [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters); see function below; JSON null permitted |
| `application.lastAttemptAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.lastSuccessAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `application.errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `application.errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `permissions` | array; 0–1 entries; item: `room.agent.invite` |
| `allowedActions` | array; 0–3 entries; item: `set` or `remove` or `permissions.set` |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `application.nativeAccess`:

```typescript
input => input !== null && typeof input === 'object' && !Array.isArray(input)
    && json(input) && Object.keys(input).length <= 64 && new TextEncoder().encode(JSON.stringify(input)).length <= 8192
    ? success(input as JsonObject) : failure('invalid', 'Expected a backend parameter object up to 8192 UTF-8 bytes')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.grantView
```

Referenced definitions:

- [`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView)

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
