---
title: "POST /api/principal-resolutions"
linkTitle: "resolvePrincipals"
description: "Resolve verified sender kinds and agent owners"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "resolvePrincipals"
product: "crossfire"
generated: true
---


## Resolve verified sender kinds and agent owners

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `resolvePrincipals` |
| Method | `POST` |
| Path | `/api/principal-resolutions` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `principal.read` |

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

object; fields below; unknown fields rejected ([`principalResolution`](/docs/api/schemas/crossfire-contracts-schema-request/#principalResolution))

| Field path | Representation and constraints |
| --- | --- |
| `backendUserIds` | array; 1–100 entries; item: opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters; constraint: Resolve unique backend identities |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `backendUserIds`:

```typescript
ids => new Set(ids).size === ids.length
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.principalResolution
```

Referenced definitions:

- [`principalResolution`](/docs/api/schemas/crossfire-contracts-schema-request/#principalResolution)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

array; 1–100 entries; item: object; fields below; unknown fields rejected; constraint: Only registered agents have an owner ([`principalIdentity`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentity)); constraint: Resolved identities must be unique ([`principalIdentities`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentities))

| Field path | Representation and constraints |
| --- | --- |
| `[].backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `[].kind` | `human` or `agent` or `unknown` |
| `[].ownerBackendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters; JSON null permitted |
| `[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].ownerDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
identities => new Set(identities.map(identity => identity.backendUserId)).size === identities.length
```

Constraint on `[]`:

```typescript
identity => (identity.kind === 'agent') === (identity.ownerBackendUserId !== null)
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.principalIdentities
```

Referenced definitions:

- [`principalIdentities`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentities)

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
