---
title: "crossfire/node/packages/contracts/src/rest/binary.ts"
linkTitle: "binary"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/binary.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/kernel/src/bytes.ts`](/docs/api/schemas/crossfire-kernel-bytes/)

## binaryInput {#binaryInput}

```typescript
export function binaryInput(value: unknown): Result<BinaryInput> {
    if (!value || typeof value !== 'object' || !('byteLength' in value) || !('chunks' in value)
        || typeof value.byteLength !== 'number' || !Number.isSafeInteger(value.byteLength) || value.byteLength < 0
        || !value.chunks || typeof value.chunks !== 'object' || !(Symbol.asyncIterator in value.chunks)
        || typeof value.chunks[Symbol.asyncIterator] !== 'function')
        return failure('invalid', 'A sized binary stream is required');
    return success({ byteLength: value.byteLength, chunks: value.chunks as AsyncIterable<Uint8Array> });
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`BinaryInput`](/docs/api/schemas/crossfire-kernel-bytes/#BinaryInput)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
