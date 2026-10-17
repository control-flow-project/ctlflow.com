---
title: "GET /api/releases/current"
linkTitle: "release"
description: "Current client release"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "release"
product: "crossfire"
generated: true
---


## Current client release

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `release` |
| Method | `GET` |
| Path | `/api/releases/current` |
| Authentication | `public` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

custom validation: [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Validation

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

custom validation: [`manifest`](/docs/api/schemas/crossfire-contracts-release/#manifest); see function below

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function manifest(value: unknown): Result<Manifest> {
    const input = fields(value, ["release", "version", "artifacts"]);
    if (!input.ok)
        return input;
    if (!releaseName(input.value.release) || !text(input.value.version, 40) || !/^\d+\.\d+\.\d+$/u.test(input.value.version)
        || !input.value.release.startsWith(input.value.version + "-"))
        return failure("invalid", "Invalid release identity");
    const artifacts = fields(input.value.artifacts, ARTIFACTS);
    if (!artifacts.ok)
        return artifacts;
    for (const name of ARTIFACTS) {
        const file = fields(artifacts.value[name], ["bytes", "sha256"]);
        if (!file.ok)
            return file;
        if (!Number.isSafeInteger(file.value.bytes) || Number(file.value.bytes) < 1 || Number(file.value.bytes) > MAX_ARTIFACT_BYTES
            || typeof file.value.sha256 !== "string" || !/^[a-f0-9]{64}$/u.test(file.value.sha256))
            return failure("invalid", "Invalid bounded artifact metadata");
    }
    return success(input.value as Manifest);
}
```

### Validation

```typescript
manifest
```

Referenced definitions:

- [`manifest`](/docs/api/schemas/crossfire-contracts-release/#manifest)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
