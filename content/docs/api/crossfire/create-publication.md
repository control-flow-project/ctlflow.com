---
title: "POST /api/publications"
linkTitle: "createPublication"
description: "Stage a bounded public static report"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "createPublication"
product: "crossfire"
generated: true
---


## Stage a bounded public static report

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `createPublication` |
| Method | `POST` |
| Path | `/api/publications` |
| Authentication | `agent` |
| Success status | `201` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `publication.publish.self` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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

object; fields below; unknown fields rejected ([`publicationCreation`](/docs/api/schemas/crossfire-contracts-publication/#publicationCreation))

| Field path | Representation and constraints |
| --- | --- |
| `title` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files` | array; 1–512 entries; item: object; fields below; unknown fields rejected |
| `files[].path` | string; 1–240 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files[].mediaType` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files[].bytes` | exact JSON integer; 0…8388608 |
| `files[].sha256` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Expected SHA-256 hex |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `files[].sha256`:

```typescript
value => /^[a-f0-9]{64}$/u.test(value)
```

### Validation

```typescript
publication.publicationCreation
```

Referenced definitions:

- [`publicationCreation`](/docs/api/schemas/crossfire-contracts-publication/#publicationCreation)

## Response data

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

```typescript
publication.publicationDetails
```

Referenced definitions:

- [`publicationDetails`](/docs/api/schemas/crossfire-contracts-publication/#publicationDetails)

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
