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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `release` |
| Method | `GET` |
| Path | `/api/releases/current` |
| Catalog audience | `public` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

custom parser [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Exact validator

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

custom parser [`manifest`](/docs/api/schemas/crossfire-contracts-release/#manifest); exact branches, defaults and rejection rules below

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

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

### Exact validator

```typescript
manifest
```

Referenced definitions:

- [`manifest`](/docs/api/schemas/crossfire-contracts-release/#manifest)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
