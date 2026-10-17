---
title: "GET /api/fleets/{fleetId}/agents"
linkTitle: "agents"
description: "Fleet instances"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "agents"
product: "fleetd"
generated: true
---


## Fleet instances

> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.

Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.

- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `agents` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents` |
| Authentication | `controller` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 1048576 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected ([`params`](/docs/api/schemas/fleetd-contracts-api/#params))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

```typescript
params
```

Referenced definitions:

- [`params`](/docs/api/schemas/fleetd-contracts-api/#params)

## Query parameters

custom validation: [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); see function below

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Validation

```typescript
page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView))

| Field path | Representation and constraints |
| --- | --- |
| `[].instance` | object; fields below; unknown fields rejected ([`instance`](/docs/api/schemas/fleetd-contracts-api/#instance)) |
| `[].instance.key` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].instance.name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].instance.definition` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].instance.workarea` | string; 1–1024 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].instance.workspace` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |
| `[].instance.runtimeOptions` | custom validation: [`runtimeOptions`](/docs/api/schemas/fleetd-contracts-configuration/#runtimeOptions); see function below; optional property |
| `[].instance.listenerOptions` | object; fields below; unknown fields rejected; optional property |
| `[].instance.listenerOptions.historyMode` | `shared` or `per-room`; optional property |
| `[].phase` | `stopped` or `starting` or `awaiting-approval` or `running` or `sleeping` or `waking` or `stopping` or `failed` ([`phase`](/docs/api/schemas/fleetd-contracts-api/#phase)) |
| `[].listenerActive` | boolean |
| `[].desiredActive` | boolean |
| `[].lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].historyAvailable` | boolean; JSON null permitted |
| `[].sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].error` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].startedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `[].instance.runtimeOptions`:

```typescript
(input: unknown): Result<Record<string, unknown>> => input && typeof input === 'object' && !Array.isArray(input) ? success(input as Record<string, unknown>) : failure('invalid', 'Expected runtime options')
```

### Validation

```typescript
check.list(instanceView, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView)

## Response envelope

A successful JSON response contains `data` and `meta`. Replace the `data` placeholder below with the response fields described above. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001",
    "page": 1,
    "pageSize": 20,
    "totalItems": 0,
    "totalPages": 1
  }
}
```
