---
title: "GET /api/enrollments/{enrollmentId}"
linkTitle: "enrollment"
description: "Enrollment roster"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "enrollment"
product: "crossfire"
generated: true
---


## Enrollment roster

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `enrollment` |
| Method | `GET` |
| Path | `/api/enrollments/{enrollmentId}` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `enrollment.read.owned`, `enrollment.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `enrollmentId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ enrollmentId: check.identifier })
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

object; fields below; unknown fields rejected ([`enrollmentDetails`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDetails))

| Field path | Representation and constraints |
| --- | --- |
| `enrollment` | object; fields below; unknown fields rejected ([`enrollment`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollment)) |
| `enrollment.owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `enrollment.owner.principalId` | lowercase opaque UUID |
| `enrollment.owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `enrollment.owner.kind` | `human` or `agent` |
| `enrollment.owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enrollment.owner.ownerId` | lowercase opaque UUID |
| `enrollment.owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `enrollment.controllerName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enrollment.enrollmentId` | lowercase opaque UUID |
| `enrollment.ownerId` | lowercase opaque UUID |
| `enrollment.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `enrollment.verificationCode` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enrollment.status` | `pending` or `approved` or `rejected` or `expired` |
| `enrollment.revision` | exact JSON integer; 0…9007199254740991 |
| `enrollment.createdAt` | exact JSON integer; 0…9007199254740991 |
| `enrollment.expiresAt` | exact JSON integer; 0…9007199254740991 |
| `enrollment.decidedByMemberId` | lowercase opaque UUID; JSON null permitted |
| `enrollment.decidedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `instances` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`enrollmentItem`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentItem)) |
| `instances[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].requestedName` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].currentName` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `instances[].outcome` | `claimed` or `existing` |
| `instances[].agentId` | lowercase opaque UUID; JSON null permitted |
| `instances[].coordinationPolicy` | object; fields below; unknown fields rejected; constraint: Select unique identities; everyone requires no individual selections ([`coordinationPolicy`](/docs/api/schemas/crossfire-contracts-coordination-policy/#coordinationPolicy)) |
| `instances[].coordinationPolicy.wakeMode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `instances[].coordinationPolicy.senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`matrixWakeSelection`](/docs/api/schemas/crossfire-contracts-coordination-policy/#matrixWakeSelection)) |
| `instances[].coordinationPolicy.senders[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `instances[].coordinationPolicy.senders[].includeAgents` | boolean |
| `instances[].coordinationPolicy.permissions` | array; 0–1 entries; item: `room.agent.invite` |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `instances[].coordinationPolicy`:

```typescript
policy => (policy.wakeMode !== 'everyone' || policy.senders.length === 0)
    && new Set(policy.senders.map(sender => sender.matrixUserId)).size === policy.senders.length
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.enrollmentDetails
```

Referenced definitions:

- [`enrollmentDetails`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDetails)

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
