---
title: "crossfire/node/packages/kernel/src/result.ts"
linkTitle: "result"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/kernel/src/result.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

This module has no local contract dependencies.

## FailureCode {#FailureCode}

```typescript
export type FailureCode = 'invalid' | 'unauthorized' | 'forbidden' | 'missing' | 'conflict' | 'limit' | 'native' | 'unavailable' | 'stale_revision' | 'name_collision' | 'capacity' | 'rate_limit' | 'body_too_large' | 'method_not_allowed';
```

## Failure {#Failure}

```typescript
export type Failure = {
    code: FailureCode;
    message: string;
    fieldErrors?: Record<string, string>;
};
```

Related definitions:

- [`FailureCode`](/docs/api/schemas/crossfire-kernel-result/#FailureCode)

## Result {#Result}

```typescript
export type Result<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: Failure;
};
```

Related definitions:

- [`Failure`](/docs/api/schemas/crossfire-kernel-result/#Failure)

## success {#success}

```typescript
export function success<T>(value: T): Result<T> { return { ok: true, value }; }
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)

## failure {#failure}

```typescript
export function failure<T = never>(code: FailureCode, message: string): Result<T> { return { ok: false, error: { code, message } }; }
```

Related definitions:

- [`FailureCode`](/docs/api/schemas/crossfire-kernel-result/#FailureCode)
- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)

## failureError {#failureError}

```typescript
export function failureError(error: Failure): Error & Failure { return Object.assign(new Error(error.message), error); }
```

Related definitions:

- [`Failure`](/docs/api/schemas/crossfire-kernel-result/#Failure)
