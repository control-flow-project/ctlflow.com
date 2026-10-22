---
title: "GET /api/fleets/{fleetId}/agents/{instanceKey}/contexts"
linkTitle: "contexts"
description: "Read retained native history identities without starting a session"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "contexts"
product: "fleetd"
generated: true
---


## Read retained native history identities without starting a session

> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.

Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.

- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `contexts` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents/{instanceKey}/contexts` |
| Authentication | `controller` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 1048576 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected ([`agentParams`](/docs/api/schemas/fleetd-contracts-api/#agentParams))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
agentParams
```

Referenced definitions:

- [`agentParams`](/docs/api/schemas/fleetd-contracts-api/#agentParams)

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
none
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

array; 0–2002 entries; item: object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `[].context` | string; 1–260 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(check.object({ context: check.text(MAX_HISTORY_CONTEXT), runtime: check.name, sessionId: check.text(200) }), 2002)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`MAX_HISTORY_CONTEXT`](/docs/api/schemas/crossfire-kernel-history-context/#MAX_HISTORY_CONTEXT)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)

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
