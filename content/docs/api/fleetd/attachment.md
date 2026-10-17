---
title: "GET /api/fleets/{fleetId}/agents/{instanceKey}/attachment"
linkTitle: "attachment"
description: "Read a private live terminal pointer; sleeping and stopped sessions require explicit resume"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "attachment"
product: "fleetd"
generated: true
---


## Read a private live terminal pointer; sleeping and stopped sessions require explicit resume

> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.

Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.

- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `attachment` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents/{instanceKey}/attachment` |
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

custom validation; see function below

| Field path | Representation and constraints |
| --- | --- |
| `context (parser branch 1)` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |

Accepted query parameters: `context`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
input => { if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => key !== 'context') || input.getAll('context').length > 1)
    return failure('invalid', 'Use one exact context'); return check.object({ context: check.optional(check.text(255)) })(input.has('context') ? { context: input.get('context') } : {}); }
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
input => { if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => key !== 'context') || input.getAll('context').length > 1)
    return failure('invalid', 'Use one exact context'); return check.object({ context: check.optional(check.text(255)) })(input.has('context') ? { context: input.get('context') } : {}); }
```

Referenced definitions:

- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

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

object; fields below; unknown fields rejected ([`attachment`](/docs/api/schemas/fleetd-contracts-attachment/#attachment))

| Field path | Representation and constraints |
| --- | --- |
| `runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `workspace` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `connection` | custom validation: [`connection`](/docs/api/schemas/fleetd-contracts-attachment/#connection); see function below |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `connection`:

```typescript
function connection(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 8)
        return failure('invalid', 'Invalid runtime attachment data');
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        const field = check.text(64)(key), content = check.text(4096)(value);
        if (!field.ok)
            return field;
        if (!content.ok)
            return content;
        Object.defineProperty(fields, key, { value: content.value, enumerable: true, writable: true, configurable: true });
    }
    return success(fields);
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
attachment
```

Referenced definitions:

- [`attachment`](/docs/api/schemas/fleetd-contracts-attachment/#attachment)

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
