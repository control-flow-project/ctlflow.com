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

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `publicationId` | lowercase opaque UUID |
| `fileId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ publicationId: check.identifier, fileId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

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

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `uploaded` | boolean |

### Validation

```typescript
check.object({ uploaded: check.boolean })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
