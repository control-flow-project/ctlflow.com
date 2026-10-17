---
title: "fleetd/node/packages/contracts/src/attachment.ts"
linkTitle: "attachment"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/attachment.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## connection {#connection}

```typescript
function connection(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 8)
        return failure('invalid', 'Invalid runtime attachment data');
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        const field = check.text(64)(key), content = check.text(4096)(value);
        if (!field.ok)
            return field;
        if (!content.ok)
            return content;
        Object.defineProperty(fields, key, { value: content.value, enumerable: true, writable: true, configurable: true });
    }
    return success(fields);
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## attachment {#attachment}

```typescript
attachment = check.object({ runtime: check.name, sessionId: check.text(200), workspace: check.text(4096), connection })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`connection`](/docs/api/schemas/fleetd-contracts-attachment/#connection)
