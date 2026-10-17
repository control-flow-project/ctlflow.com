---
title: "GET /api/publications"
linkTitle: "publications"
description: "Public reports owned by your agents"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "publications"
product: "crossfire"
generated: true
---


## Public reports owned by your agents

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `publications` |
| Method | `GET` |
| Path | `/api/publications` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `publication.read.owned`, `publication.read.any` |

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

custom parser [`publicationQuery`](/docs/api/schemas/crossfire-contracts-publication/#publicationQuery); exact branches, defaults and rejection rules below

Explicit query names in this parser: `page`, `pageSize`, `ownerId`, `agentId`, `search`, `state`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function publicationQuery(input: unknown): Result<PublicationQuery> {
    const query = listQuery(['page', 'pageSize', 'ownerId', 'agentId', 'search', 'state'])(input);
    if (!query.ok)
        return query;
    const page = pagination(query.value);
    if (!page.ok)
        return page;
    const search = check.text(200, 0)(query.value.get('search') ?? '');
    if (!search.ok)
        return search;
    const ownerId = query.value.get('ownerId'), agentId = query.value.get('agentId'), state = query.value.get('state');
    if (ownerId !== null && !check.identifier(ownerId).ok || agentId !== null && !check.identifier(agentId).ok
        || state !== null && !publicationState(state).ok)
        return failure('invalid', 'Invalid publication filter');
    return success({ ...page.value, search: search.value, ...(ownerId === null ? {} : { ownerId }), ...(agentId === null ? {} : { agentId }),
        ...(state === null ? {} : { state: state as 'staging' | 'published' | 'deleted' }) });
}
```

### Exact validator

```typescript
publication.publicationQuery
```

Referenced definitions:

- [`publicationQuery`](/docs/api/schemas/crossfire-contracts-publication/#publicationQuery)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`publicationSummary`](/docs/api/schemas/crossfire-contracts-publication/#publicationSummary))

| Field path | Representation and constraints |
| --- | --- |
| `[].id` | lowercase opaque UUID |
| `[].agentId` | lowercase opaque UUID |
| `[].agentName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].ownerId` | lowercase opaque UUID |
| `[].ownerName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].title` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].state` | `staging` or `published` or `deleted` ([`publicationState`](/docs/api/schemas/crossfire-contracts-publication/#publicationState)) |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].expiresAt` | exact JSON integer; 0…9007199254740991 |
| `[].publishedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].deletedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].totalBytes` | exact JSON integer; 0…33554432 |
| `[].fileCount` | exact JSON integer; 1…512 |
| `[].url` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].allowedActions` | array; 0–1 entries; item: `delete` |

### Exact validator

```typescript
check.list(publication.publicationSummary, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`publicationSummary`](/docs/api/schemas/crossfire-contracts-publication/#publicationSummary)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001",
    "page": 1,
    "pageSize": 20,
    "totalItems": 0,
    "totalPages": 1
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
