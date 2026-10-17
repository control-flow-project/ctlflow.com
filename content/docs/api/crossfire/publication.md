---
title: "GET /api/publications/{publicationId}"
linkTitle: "publication"
description: "Report manifest and publication state"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "publication"
product: "crossfire"
generated: true
---


## Report manifest and publication state

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `publication` |
| Method | `GET` |
| Path | `/api/publications/{publicationId}` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `publication.publish.self`, `publication.read.owned`, `publication.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `publicationId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ publicationId: check.identifier })
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

object; fields below; unknown fields rejected ([`publicationDetails`](/docs/api/schemas/crossfire-contracts-publication/#publicationDetails))

| Field path | Representation and constraints |
| --- | --- |
| `id` | lowercase opaque UUID |
| `agentId` | lowercase opaque UUID |
| `agentName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `ownerId` | lowercase opaque UUID |
| `ownerName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `title` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `state` | `staging` or `published` or `deleted` ([`publicationState`](/docs/api/schemas/crossfire-contracts-publication/#publicationState)) |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `expiresAt` | exact JSON integer; 0…9007199254740991 |
| `publishedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `deletedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `totalBytes` | exact JSON integer; 0…33554432 |
| `fileCount` | exact JSON integer; 1…512 |
| `url` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `allowedActions` | array; 0–1 entries; item: `delete` |
| `files` | array; 1–512 entries; item: object; fields below; unknown fields rejected |
| `files[].path` | string; 1–240 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files[].mediaType` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files[].bytes` | exact JSON integer; 0…8388608 |
| `files[].sha256` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Expected SHA-256 hex |
| `files[].id` | lowercase opaque UUID |
| `files[].uploaded` | boolean |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `files[].sha256`:

```typescript
value => /^[a-f0-9]{64}$/u.test(value)
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
publication.publicationDetails
```

Referenced definitions:

- [`publicationDetails`](/docs/api/schemas/crossfire-contracts-publication/#publicationDetails)

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
