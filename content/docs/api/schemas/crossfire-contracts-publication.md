---
title: "crossfire/node/packages/contracts/src/publication.ts"
linkTitle: "publication"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/publication.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/domain/src/publication/values.ts`](/docs/api/schemas/crossfire-domain-publication-values/)
- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/schema/request.ts`](/docs/api/schemas/crossfire-contracts-schema-request/)

## publicationState {#publicationState}

```typescript
publicationState = check.choice('staging', 'published', 'deleted')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## file {#file}

```typescript
file = { path: check.text(240), mediaType: check.text(100), bytes: check.integer(0, PUBLICATION_LIMITS.fileBytes),
    sha256: check.refine(check.text(64, 64), value => /^[a-f0-9]{64}$/u.test(value), 'Expected SHA-256 hex') }
```

Related definitions:

- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`PUBLICATION_LIMITS`](/docs/api/schemas/crossfire-domain-publication-values/#PUBLICATION_LIMITS)
- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)

## publicationCreation {#publicationCreation}

```typescript
publicationCreation = check.object({ title: check.text(200), files: check.list(check.object(file), PUBLICATION_LIMITS.files, 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`file`](/docs/api/schemas/crossfire-contracts-publication/#file)
- [`PUBLICATION_LIMITS`](/docs/api/schemas/crossfire-domain-publication-values/#PUBLICATION_LIMITS)

## summary {#summary}

```typescript
summary = { id: check.identifier, agentId: check.identifier, agentName: check.text(255), ownerId: check.identifier,
    ownerName: check.text(255), title: check.text(200), state: publicationState, revision: check.integer(), createdAt: check.integer(),
    expiresAt: check.integer(), publishedAt: check.nullable(check.integer()), deletedAt: check.nullable(check.integer()),
    totalBytes: check.integer(0, PUBLICATION_LIMITS.bundleBytes), fileCount: check.integer(1, PUBLICATION_LIMITS.files),
    url: check.nullable(check.text(2048)), allowedActions: check.list(check.choice('delete'), 1) }
```

Related definitions:

- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`publicationState`](/docs/api/schemas/crossfire-contracts-publication/#publicationState)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`PUBLICATION_LIMITS`](/docs/api/schemas/crossfire-domain-publication-values/#PUBLICATION_LIMITS)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## publicationSummary {#publicationSummary}

```typescript
publicationSummary = check.object(summary)
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`summary`](/docs/api/schemas/crossfire-contracts-publication/#summary)

## publicationDetails {#publicationDetails}

```typescript
publicationDetails = check.object({ ...summary, files: check.list(check.object({ ...file, id: check.identifier, uploaded: check.boolean }), PUBLICATION_LIMITS.files, 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`summary`](/docs/api/schemas/crossfire-contracts-publication/#summary)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`file`](/docs/api/schemas/crossfire-contracts-publication/#file)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`PUBLICATION_LIMITS`](/docs/api/schemas/crossfire-domain-publication-values/#PUBLICATION_LIMITS)

## publicationMutation {#publicationMutation}

```typescript
publicationMutation = check.object({ expectedRevision: check.integer() })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## publicationQuery {#publicationQuery}

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

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`PublicationQuery`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationQuery)
- [`listQuery`](/docs/api/schemas/crossfire-contracts-schema-request/#listQuery)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`publicationState`](/docs/api/schemas/crossfire-contracts-publication/#publicationState)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
