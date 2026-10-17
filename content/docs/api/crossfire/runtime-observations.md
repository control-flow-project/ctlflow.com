---
title: "GET /api/agents/{agentId}/runtime-observations"
linkTitle: "runtimeObservations"
description: "Public configured and effective native runtime settings"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "runtimeObservations"
product: "crossfire"
generated: true
---


## Public configured and effective native runtime settings

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `runtimeObservations` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/runtime-observations` |
| Catalog audience | `either` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
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

array; 0–2002 entries; item: object; fields below; unknown fields rejected ([`observationView`](/docs/api/schemas/crossfire-contracts-runtime/#observationView)) ([`observations`](/docs/api/schemas/crossfire-contracts-runtime/#observations))

| Field path | Representation and constraints |
| --- | --- |
| `[].runId` | lowercase opaque UUID |
| `[].sessionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units; JSON null permitted |
| `[].runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].state` | `idle` or `working` or `waiting-approval` or `waiting-answer` or `failed` or `unavailable` or `sleeping` or `waking` ([`runtimeState`](/docs/api/schemas/crossfire-contracts-runtime/#runtimeState)) |
| `[].observedAt` | exact JSON integer; 0…9007199254740991 |
| `[].lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].historyAvailable` | boolean; JSON null permitted |
| `[].historyMode` | `shared` or `per-room` |
| `[].maxInputBytes` | exact JSON integer; 1024…4194304 |
| `[].settings` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`setting`](/docs/api/schemas/crossfire-contracts-runtime/#setting)) |
| `[].settings[].name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].settings[].configured` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].settings[].effective` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].errorMessage` | plain-text string; at most 4000 UTF-8 bytes; allowed whitespace controls only; JSON null permitted |

### Exact validator

```typescript
runtime.observations
```

Referenced definitions:

- [`observations`](/docs/api/schemas/crossfire-contracts-runtime/#observations)

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
