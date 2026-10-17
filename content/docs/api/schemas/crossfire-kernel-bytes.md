---
title: "crossfire/node/packages/kernel/src/bytes.ts"
linkTitle: "bytes"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/kernel/src/bytes.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

This module has no local contract dependencies.

## BinaryInput {#BinaryInput}

```typescript
export type BinaryInput = {
    byteLength: number;
    chunks: AsyncIterable<Uint8Array>;
};
```

## utf8 {#utf8}

```typescript
utf8 = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true })
```

## decodeUtf8 {#decodeUtf8}

```typescript
export function decodeUtf8(bytes: Uint8Array): string {
    return utf8.decode(bytes);
}
```

Related definitions:

- [`utf8`](/docs/api/schemas/crossfire-kernel-bytes/#utf8)

## binaryBytes {#binaryBytes}

```typescript
export function binaryBytes(bytes: Uint8Array): BinaryInput {
    return { byteLength: bytes.byteLength, chunks: { async *[Symbol.asyncIterator]() { yield bytes; } } };
}
```

Related definitions:

- [`BinaryInput`](/docs/api/schemas/crossfire-kernel-bytes/#BinaryInput)
