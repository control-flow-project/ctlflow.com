---
title: "crossfire/node/packages/kernel/src/bytes.ts"
linkTitle: "bytes"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/kernel/src/bytes.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

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
