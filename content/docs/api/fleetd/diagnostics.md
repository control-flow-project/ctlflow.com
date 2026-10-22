---
title: "GET /api/diagnostics"
linkTitle: "diagnostics"
description: "Read bounded diagnostics without starting sessions, refreshing credentials or repairing state"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "diagnostics"
product: "fleetd"
generated: true
---


## Read bounded diagnostics without starting sessions, refreshing credentials or repairing state

> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.

Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.

- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `diagnostics` |
| Method | `GET` |
| Path | `/api/diagnostics` |
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

custom validation: [`diagnosticQuery`](/docs/api/schemas/fleetd-contracts-diagnostics/#diagnosticQuery); see function below

Accepted query parameters: `fleetId`, `instanceKey`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function diagnosticQuery(input: unknown) {
    if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => !['fleetId', 'instanceKey'].includes(key))
        || input.getAll('fleetId').length > 1 || input.getAll('instanceKey').length > 1)
        return failure('invalid', 'Use one exact diagnostic scope');
    const parsed = scope({ fleetId: input.get('fleetId'), instanceKey: input.get('instanceKey') });
    return parsed.ok && parsed.value.instanceKey !== null && parsed.value.fleetId === null ? failure('invalid', 'An instance requires a fleet') : parsed;
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
diagnosticQuery
```

Referenced definitions:

- [`diagnosticQuery`](/docs/api/schemas/fleetd-contracts-diagnostics/#diagnosticQuery)

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

object; fields below; unknown fields rejected ([`diagnosticReport`](/docs/api/schemas/fleetd-contracts-diagnostics/#diagnosticReport))

| Field path | Representation and constraints |
| --- | --- |
| `checkedAt` | exact JSON integer; 0…9007199254740991 |
| `scope` | object; fields below; unknown fields rejected ([`scope`](/docs/api/schemas/fleetd-contracts-diagnostics/#scope)) |
| `scope.fleetId` | lowercase opaque UUID; JSON null permitted |
| `scope.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `checks` | array; 0–1000 entries; item: object; fields below; unknown fields rejected |
| `checks[].id` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `checks[].scope` | object; fields below; unknown fields rejected ([`scope`](/docs/api/schemas/fleetd-contracts-diagnostics/#scope)) |
| `checks[].scope.fleetId` | lowercase opaque UUID; JSON null permitted |
| `checks[].scope.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `checks[].status` | `pass` or `fail` or `unknown` or `not-applicable` |
| `checks[].observedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `checks[].message` | string; 1–1024 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `checks[].remediation` | string; 1–1024 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
diagnosticReport
```

Referenced definitions:

- [`diagnosticReport`](/docs/api/schemas/fleetd-contracts-diagnostics/#diagnosticReport)

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
