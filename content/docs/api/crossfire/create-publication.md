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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `createPublication` |
| Method | `POST` |
| Path | `/api/publications` |
| Catalog audience | `agent` |
| Success status | `201` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `publication.publish.self` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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

object; fields below; unknown fields rejected ([`publicationCreation`](/docs/api/schemas/crossfire-contracts-publication/#publicationCreation))

| Field path | Representation and constraints |
| --- | --- |
| `title` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files` | array; 1–512 entries; item: object; fields below; unknown fields rejected |
| `files[].path` | string; 1–240 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files[].mediaType` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `files[].bytes` | exact JSON integer; 0…8388608 |
| `files[].sha256` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Expected SHA-256 hex |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `files[].sha256`:

```typescript
value => /^[a-f0-9]{64}$/u.test(value)
```

### Exact validator

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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `files[].sha256`:

```typescript
value => /^[a-f0-9]{64}$/u.test(value)
```

### Exact validator

```typescript
publication.publicationDetails
```

Referenced definitions:

- [`publicationDetails`](/docs/api/schemas/crossfire-contracts-publication/#publicationDetails)

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
