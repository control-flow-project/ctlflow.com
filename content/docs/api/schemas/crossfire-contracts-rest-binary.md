---
title: "crossfire/node/packages/contracts/src/rest/binary.ts"
linkTitle: "binary"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/binary.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

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
