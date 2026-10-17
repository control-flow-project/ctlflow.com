---
title: "GET /api/agents/{agentId}/wake-deliveries"
linkTitle: "wakeMetadata"
description: "Read the next scheduled deadline"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "wakeMetadata"
product: "crossfire"
generated: true
---


## Read the next scheduled deadline

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `wakeMetadata` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/wake-deliveries` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `wake-delivery.receive.self` |

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

custom validation: [`wakeAttachmentQuery`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachmentQuery); see function below

Accepted query parameters: `runId`, `sessionId`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function wakeAttachmentQuery(input: unknown) {
    const values = listQuery(['runId', 'sessionId'])(input);
    if (!values.ok)
        return values;
    return wakeAttachment({ runId: values.value.get('runId'), sessionId: values.value.get('sessionId') });
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
wake.wakeAttachmentQuery
```

Referenced definitions:

- [`wakeAttachmentQuery`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeAttachmentQuery)

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

object; fields below; unknown fields rejected ([`wakeMetadata`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeMetadata))

| Field path | Representation and constraints |
| --- | --- |
| `now` | exact JSON integer; 0…9007199254740991 |
| `nextDueAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
wake.wakeMetadata
```

Referenced definitions:

- [`wakeMetadata`](/docs/api/schemas/crossfire-contracts-wake-up/#wakeMetadata)

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
