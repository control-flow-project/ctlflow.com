---
title: "PUT /api/publications/{publicationId}/files/{fileId}"
linkTitle: "uploadPublicationFile"
description: "Stream exactly one declared static file"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "uploadPublicationFile"
product: "crossfire"
generated: true
---


## Stream exactly one declared static file

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `uploadPublicationFile` |
| Method | `PUT` |
| Path | `/api/publications/{publicationId}/files/{fileId}` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `binary` |
| Maximum request body | 8388608 bytes (operation-specific) |
| Permission codes | `publication.publish.self` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

Send raw declared file bytes. The length, SHA-256 and media type must match the staged manifest. Commit the publication after uploading its files.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `publicationId` | lowercase opaque UUID |
| `fileId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ publicationId: check.identifier, fileId: check.identifier })
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

Use `Content-Type: application/octet-stream` and a canonical decimal `Content-Length` matching the staged file. The body must remain within the operation limit and match the declared SHA-256. Do not wrap it in JSON or base64.

`BinaryInput` below describes the server's representation of the upload stream. `chunks` is not an HTTP request field.

### Server-side stream validation

```typescript
binaryInput
```

- [`binaryInput`](/docs/api/schemas/crossfire-contracts-rest-binary/#binaryInput)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `uploaded` | boolean |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ uploaded: check.boolean })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

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
