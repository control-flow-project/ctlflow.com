---
title: "GET /api/messaging-backend"
linkTitle: "messagingBackend"
description: "Configured messaging backend and public client entry points"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "messagingBackend"
product: "crossfire"
generated: true
---


## Configured messaging backend and public client entry points

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `messagingBackend` |
| Method | `GET` |
| Path | `/api/messaging-backend` |
| Authentication | `public` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
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

object; fields below; unknown fields rejected ([`messagingBackend`](/docs/api/schemas/crossfire-contracts-schema-response/#messagingBackend))

| Field path | Representation and constraints |
| --- | --- |
| `type` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `chatUrl` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Expected an absolute HTTP(S) backend link without credentials ([`backendLink`](/docs/api/schemas/crossfire-contracts-schema-response/#backendLink)) |
| `signupUrl` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Expected an absolute HTTP(S) backend link without credentials ([`backendLink`](/docs/api/schemas/crossfire-contracts-schema-response/#backendLink)) |
| `signupInstructions` | array; 0–20 entries; item: string; 1–2000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `configuration` | custom validation: [`backendConfiguration`](/docs/api/schemas/crossfire-contracts-client/#backendConfiguration); see function below |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `signupUrl`:

```typescript
value => {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password && value === value.trim() && !/[\u0000-\u0020\u007f]/u.test(value);
    }
    catch {
        return false;
    }
}
```

Constraint on `configuration`:

```typescript
export function backendConfiguration(value: unknown): Result<BackendConfiguration> {
    const input = fields(value, ['type', 'parameters']);
    if (!input.ok)
        return input;
    const parameters = backendParameters(input.value.parameters);
    return profileName(input.value.type) && parameters.ok ? success({ type: input.value.type, parameters: parameters.value })
        : failure('invalid', 'Invalid messaging backend configuration');
}
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.messagingBackend
```

Referenced definitions:

- [`messagingBackend`](/docs/api/schemas/crossfire-contracts-schema-response/#messagingBackend)

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
