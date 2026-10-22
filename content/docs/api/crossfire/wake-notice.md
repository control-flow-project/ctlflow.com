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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `wakeNotice` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/wake-notices/{eventId}` |
| Authentication | `agent` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `wake-notice.publish.self` |

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
| `eventId` | opaque event ID; 1–255 UTF-16 units, well-formed Unicode without control characters |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier, eventId: check.eventId })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`eventId`](/docs/api/schemas/crossfire-contracts-schema-validation/#eventId)

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

object; fields below; unknown fields rejected ([`wakeNotice`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeNotice))

| Field path | Representation and constraints |
| --- | --- |
| `roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.wakeNotice
```

Referenced definitions:

- [`wakeNotice`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeNotice)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`notice`](/docs/api/schemas/crossfire-contracts-schema-response/#notice))

| Field path | Representation and constraints |
| --- | --- |
| `outcome` | `pending` or `sent` or `denied` or `not-applicable` or `not-permitted` or `rate-limited` |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.notice
```

Referenced definitions:

- [`notice`](/docs/api/schemas/crossfire-contracts-schema-response/#notice)

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
