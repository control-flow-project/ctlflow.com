---
title: "crossfire/node/packages/contracts/src/matrix-directory.ts"
linkTitle: "matrix-directory"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/matrix-directory.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)

## matrixDirectorySearch {#matrixDirectorySearch}

```typescript
matrixDirectorySearch = object({ search_term: text(200, 0), limit: optional(integer(0, 100)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## MatrixDirectoryResult {#MatrixDirectoryResult}

```typescript
export type MatrixDirectoryResult = {
    results: {
        user_id: string;
        display_name: string;
    }[];
    limited: boolean;
};
```
