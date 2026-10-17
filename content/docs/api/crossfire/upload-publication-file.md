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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `uploadPublicationFile` |
| Method | `PUT` |
| Path | `/api/publications/{publicationId}/files/{fileId}` |
| Catalog audience | `agent` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `binary` |
| Request byte ceiling | 8388608 bytes (operation-specific) |
| Declared permissions | `publication.publish.self` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

The request body is raw declared file bytes, not a JSON wrapper or base64 field. The staged manifest owns the exact byte length, SHA-256 and media type; publication is a separate commit operation.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `publicationId` | lowercase opaque UUID |
| `fileId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ publicationId: check.identifier, fileId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom parser [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Exact validator

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

Send raw bytes with `Content-Type: application/octet-stream` and the exact canonical decimal `Content-Length`. The length must match the staged file, remain within the operation limit, and hash to the declared SHA-256. Do not send a JSON object or base64 wrapper.

The named `BinaryInput` validator below describes the server-internal stream adapter result, not a client JSON field schema. Clients never provide `chunks` or an `AsyncIterable` object over HTTP.

### Server-side transport validator

```typescript
binaryInput
```

- [`binaryInput`](/docs/api/schemas/crossfire-contracts-rest-binary/#binaryInput)

## Response data

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `uploaded` | boolean |

### Exact validator

```typescript
check.object({ uploaded: check.boolean })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
