---
title: "POST /api/operations"
linkTitle: "operate"
description: "Request lifecycle operation"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "operate"
product: "fleetd"
generated: true
---


## Request lifecycle operation

> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.

Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.

- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `operate` |
| Method | `POST` |
| Path | `/api/operations` |
| Authentication | `controller` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 1048576 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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

object; fields below; unknown fields rejected; constraint: Only an explicit software update supplies its installed release directory ([`operationInput`](/docs/api/schemas/fleetd-contracts-api/#operationInput))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `target` | object; fields below; unknown fields rejected ([`target`](/docs/api/schemas/fleetd-contracts-api/#target)) |
| `target.kind` | `fleet` or `agent` or `daemon` |
| `target.fleetId` | lowercase opaque UUID; optional property |
| `target.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; optional property |
| `action` | `enroll` or `start` or `stop` or `reset` or `update` |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `releaseDirectory` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Release directory must be an absolute normalized path ([`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)); optional property |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
value => (value.action === 'update') === (value.releaseDirectory !== undefined)
```

Constraint on `releaseDirectory`:

```typescript
value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
operationInput
```

Referenced definitions:

- [`operationInput`](/docs/api/schemas/fleetd-contracts-api/#operationInput)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected; constraint: Only an explicit software update supplies its installed release directory ([`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `target` | object; fields below; unknown fields rejected ([`target`](/docs/api/schemas/fleetd-contracts-api/#target)) |
| `target.kind` | `fleet` or `agent` or `daemon` |
| `target.fleetId` | lowercase opaque UUID; optional property |
| `target.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; optional property |
| `action` | `enroll` or `start` or `stop` or `reset` or `update` |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `releaseDirectory` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Release directory must be an absolute normalized path ([`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)); optional property |
| `receiptPending` | custom validation; see function below; optional property |
| `status` | `accepted` or `running` or `awaiting-approval` or `succeeded` or `failed` |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `approval` | object; fields below; unknown fields rejected; JSON null permitted |
| `approval.url` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `approval.code` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `errors` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `errors[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `errors[].code` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `errors[].message` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
value => (value.action === 'update') === (value.releaseDirectory !== undefined)
```

Constraint on `releaseDirectory`:

```typescript
value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..')
```

Constraint on `receiptPending`:

```typescript
input => input === true ? success(true) : failure('invalid', 'Only unacknowledged controller requests are pinned')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
operationView
```

Referenced definitions:

- [`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView)

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
