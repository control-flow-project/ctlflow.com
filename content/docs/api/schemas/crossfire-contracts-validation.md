---
title: "crossfire/node/packages/contracts/src/validation.ts"
linkTitle: "validation"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/validation.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)

## object {#object}

```typescript
export function object(value: unknown): Result<Record<string, unknown>> {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
        ? success(value as Record<string, unknown>) : failure('invalid', 'Expected an object');
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## fields {#fields}

```typescript
export function fields(value: unknown, required: readonly string[], optional: readonly string[] = []): Result<Record<string, unknown>> {
    const parsed = object(value);
    if (!parsed.ok)
        return parsed;
    if (required.some(key => !Object.hasOwn(parsed.value, key)) || Object.keys(parsed.value).some(key => !required.includes(key) && !optional.includes(key))) {
        return failure('invalid', 'Missing or unknown fields');
    }
    return parsed;
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`object`](/docs/api/schemas/crossfire-contracts-validation/#object)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## text {#text}

```typescript
export function text(value: unknown, maximum = 200): value is string { return check.text(maximum)(value).ok; }
```

## userId {#userId}

```typescript
export function userId(value: unknown): value is string { return check.matrixUserId(value).ok; }
```

Related definitions:

- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)

## roomId {#roomId}

```typescript
export function roomId(value: unknown): value is string { return check.roomId(value).ok; }
```

## selectRoom {#selectRoom}

```typescript
export function selectRoom(selector: string): string {
    if (!roomId(selector))
        throw new Error('Use an exact native room ID from matrix get-joined-rooms');
    return selector;
}
```

Related definitions:

- [`roomId`](/docs/api/schemas/crossfire-contracts-validation/#roomId)
