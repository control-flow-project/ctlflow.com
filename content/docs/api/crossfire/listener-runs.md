---
title: "GET /api/agents/{agentId}/listener-runs"
linkTitle: "listenerRuns"
description: "Listener history"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "listenerRuns"
product: "crossfire"
generated: true
---


## Listener history

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `listenerRuns` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/listener-runs` |
| Catalog audience | `either` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.self`, `agent.read.owned`, `agent.read.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ agentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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
query.page
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

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun))

| Field path | Representation and constraints |
| --- | --- |
| `[].runId` | lowercase opaque UUID |
| `[].agentId` | lowercase opaque UUID |
| `[].release` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].controller` | object; fields below; unknown fields rejected; JSON null permitted |
| `[].controller.fleetId` | lowercase opaque UUID |
| `[].controller.connectionId` | lowercase opaque UUID |
| `[].controller.credentialId` | lowercase opaque UUID |
| `[].startedAt` | exact JSON integer; 0…9007199254740991 |
| `[].lastSeenAt` | exact JSON integer; 0…9007199254740991 |
| `[].activeMs` | exact JSON integer; 0…9007199254740991 |
| `[].messagesDelivered` | exact JSON integer; 0…9007199254740991 |
| `[].stoppedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].disconnectRequestedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |

### Exact validator

```typescript
check.list(res.listenerRun, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)

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
