---
title: "crossfire/node/packages/domain/src/publication/values.ts"
linkTitle: "values"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/publication/values.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## PUBLICATION_LIMITS {#PUBLICATION_LIMITS}

```typescript
PUBLICATION_LIMITS = { files: 512, fileBytes: 8 * 1024 * 1024, bundleBytes: 32 * 1024 * 1024,
    stagingMilliseconds: 3600000, instanceBytes: 1024 * 1024 * 1024, agentBytes: 128 * 1024 * 1024,
    instanceCount: 4096, agentCount: 128, uploads: 8 } as const
```

## PUBLICATION_MEDIA {#PUBLICATION_MEDIA}

```typescript
PUBLICATION_MEDIA = {
    html: 'text/html', css: 'text/css', js: 'text/javascript', mjs: 'text/javascript', json: 'application/json',
    txt: 'text/plain', csv: 'text/csv', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', webp: 'image/webp', avif: 'image/avif', svg: 'image/svg+xml', ico: 'image/x-icon',
    woff: 'font/woff', woff2: 'font/woff2', pdf: 'application/pdf',
} as const
```

## PublicationState {#PublicationState}

```typescript
export type PublicationState = 'staging' | 'published' | 'deleted';
```

## PublicationFileInput {#PublicationFileInput}

```typescript
export type PublicationFileInput = {
    path: string;
    mediaType: string;
    bytes: number;
    sha256: string;
};
```

## PublicationCreation {#PublicationCreation}

```typescript
export type PublicationCreation = {
    title: string;
    files: PublicationFileInput[];
};
```

Related definitions:

- [`PublicationFileInput`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationFileInput)

## Publication {#Publication}

```typescript
export type Publication = {
    id: string;
    agentId: string;
    publicKey: string;
    title: string;
    state: PublicationState;
    revision: number;
    createdAt: number;
    expiresAt: number;
    publishedAt: number | null;
    deletedAt: number | null;
    cleanedAt: number | null;
    totalBytes: number;
    fileCount: number;
};
```

Related definitions:

- [`PublicationState`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationState)

## PublicationFile {#PublicationFile}

```typescript
export type PublicationFile = PublicationFileInput & {
    id: string;
    publicationId: string;
    uploaded: boolean;
};
```

Related definitions:

- [`PublicationFileInput`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationFileInput)

## PublicationSummary {#PublicationSummary}

```typescript
export type PublicationSummary = Omit<Publication, 'publicKey' | 'cleanedAt'> & {
    agentName: string;
    ownerId: string;
    ownerName: string;
    url: string | null;
    allowedActions: string[];
};
```

Related definitions:

- [`Publication`](/docs/api/schemas/crossfire-domain-publication-values/#Publication)

## PublicationDetails {#PublicationDetails}

```typescript
export type PublicationDetails = PublicationSummary & {
    files: Omit<PublicationFile, 'publicationId'>[];
};
```

Related definitions:

- [`PublicationSummary`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationSummary)
- [`PublicationFile`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationFile)

## PublicationQuery {#PublicationQuery}

```typescript
export type PublicationQuery = {
    page: number;
    pageSize: number;
    search: string;
    state?: PublicationState;
    agentId?: string;
    ownerId?: string;
};
```

Related definitions:

- [`PublicationState`](/docs/api/schemas/crossfire-domain-publication-values/#PublicationState)

## PublicationBudget {#PublicationBudget}

```typescript
export type PublicationBudget = {
    instanceBytes: number;
    agentBytes: number;
    instanceCount: number;
    agentCount: number;
    uploads: number;
};
```
