---
title: "crossfire/node/packages/contracts/src/matrix-directory.ts"
linkTitle: "matrix-directory"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/matrix-directory.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

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
