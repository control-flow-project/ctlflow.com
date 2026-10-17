---
title: "crossfire/node/packages/contracts/src/rest/envelope.ts"
linkTitle: "envelope"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/envelope.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## metadata {#metadata}

```typescript
metadata = check.object({ requestId: check.identifier, page: check.optional(check.integer(1)),
    pageSize: check.optional(check.integer(1, 100)), totalItems: check.optional(check.integer()), totalPages: check.optional(check.integer(1)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## Metadata {#Metadata}

```typescript
export type Metadata = check.Parsed<typeof metadata>;
```

Related definitions:

- [`metadata`](/docs/api/schemas/crossfire-contracts-rest-envelope/#metadata)

## Response {#Response}

```typescript
export type Response<Value> = {
    data: Value;
    meta: Metadata;
};
```

Related definitions:

- [`Metadata`](/docs/api/schemas/crossfire-contracts-rest-envelope/#Metadata)

## errorCode {#errorCode}

```typescript
errorCode = check.choice('invalid', 'unauthorized', 'forbidden', 'missing', 'conflict', 'limit', 'native', 'unavailable', 'stale_revision', 'name_collision', 'capacity', 'rate_limit', 'body_too_large', 'method_not_allowed')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## decodeResponse {#decodeResponse}

```typescript
export function decodeResponse<Value>(input: unknown, parse: check.Parser<Value>, collection: boolean): Result<Response<Value>> {
    if (!input || typeof input !== 'object' || !('data' in input) || !('meta' in input)
        || Object.keys(input).some(key => key !== 'data' && key !== 'meta'))
        return failure('native', 'Invalid API response envelope');
    const decoded = parse(input.data), parsedMeta = metadata(input.meta);
    if (!decoded.ok || !parsedMeta.ok)
        return failure('native', 'Invalid API response representation');
    const meta = parsedMeta.value;
    if (collection && (meta.page === undefined || meta.pageSize === undefined || meta.totalItems === undefined || meta.totalPages === undefined)) {
        return failure('native', 'API collection pagination is missing');
    }
    return success({ data: decoded.value, meta });
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`Response`](/docs/api/schemas/crossfire-contracts-rest-envelope/#Response)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`metadata`](/docs/api/schemas/crossfire-contracts-rest-envelope/#metadata)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## decodeFailure {#decodeFailure}

```typescript
export function decodeFailure(input: unknown): Result<never> {
    if (!input || typeof input !== 'object' || !('error' in input) || !('meta' in input) || !metadata(input.meta).ok)
        return failure('native', 'Invalid API failure response');
    const error = input.error;
    if (!error || typeof error !== 'object' || !('code' in error) || !('message' in error))
        return failure('native', 'Invalid API error');
    const code = errorCode(error.code), message = check.text(8192)(error.message);
    return code.ok && message.ok ? failure(code.value, message.value) : failure('native', 'Invalid API error');
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`metadata`](/docs/api/schemas/crossfire-contracts-rest-envelope/#metadata)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`errorCode`](/docs/api/schemas/crossfire-contracts-rest-envelope/#errorCode)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
