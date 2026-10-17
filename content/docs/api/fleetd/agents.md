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

> Private controller API. This route is carried over the owning user's Unix socket, locally or through SSH. The catalog's `auth: public` does not make it an Internet-public endpoint; filesystem/socket ownership supplies the transport admission boundary.

| Contract fact | Value |
| --- | --- |
| Product owner | `fleetd` |
| Operation | `agents` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents` |
| Catalog audience | `public` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 1048576 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected ([`params`](/docs/api/schemas/fleetd-contracts-api/#params))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Exact validator

```typescript
params
```

Referenced definitions:

- [`params`](/docs/api/schemas/fleetd-contracts-api/#params)

## Query parameters

custom parser [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

### Exact validator

```typescript
page
```

Referenced definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## Request body

empty object; unknown fields rejected

### Exact validator

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
| `[].instance.runtimeOptions` | custom parser [`runtimeOptions`](/docs/api/schemas/fleetd-contracts-configuration/#runtimeOptions); exact branches, defaults and rejection rules below; optional property |
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

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `[].instance.runtimeOptions`:

```typescript
(input: unknown): Result<Record<string, unknown>> => input && typeof input === 'object' && !Array.isArray(input) ? success(input as Record<string, unknown>) : failure('invalid', 'Expected runtime options')
```

### Exact validator

```typescript
check.list(instanceView, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

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

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
