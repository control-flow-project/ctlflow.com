---
title: "GET /api/agents/{agentId}/runtime-decisions"
linkTitle: "runtimeDecisions"
description: "Native human decisions"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "runtimeDecisions"
product: "crossfire"
generated: true
---


## Native human decisions

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `runtimeDecisions` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/runtime-decisions` |
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

custom parser [`runtimeDecisions`](/docs/api/schemas/crossfire-contracts-schema-query/#runtimeDecisions); exact branches, defaults and rejection rules below

Explicit query names in this parser: `status`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function runtimeDecisions(input: unknown): Result<PageQuery & {
    status: 'pending' | null;
}> {
    const parsed = checked(input, ['status']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const status = parsed.value.get('status');
    if (status === null)
        return success({ ...bounds.value, status: null });
    return status === 'pending' ? success({ ...bounds.value, status: 'pending' as const }) : failure('invalid', 'Invalid native decision status filter');
}
```

### Exact validator

```typescript
query.runtimeDecisions
```

Referenced definitions:

- [`runtimeDecisions`](/docs/api/schemas/crossfire-contracts-schema-query/#runtimeDecisions)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`decisionSummary`](/docs/api/schemas/crossfire-contracts-runtime/#decisionSummary))

| Field path | Representation and constraints |
| --- | --- |
| `[].id` | lowercase opaque UUID |
| `[].runId` | lowercase opaque UUID |
| `[].runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].sessionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].requestId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].turnId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].itemId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].kind` | `permission` or `question` |
| `[].action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].blocking` | boolean |
| `[].expiresAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].agentId` | lowercase opaque UUID |
| `[].status` | `pending` or `answered` or `responded` or `cancelled` or `expired` ([`decisionStatus`](/docs/api/schemas/crossfire-contracts-runtime/#decisionStatus)) |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |

### Exact validator

```typescript
check.list(runtime.decisionSummary, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`decisionSummary`](/docs/api/schemas/crossfire-contracts-runtime/#decisionSummary)

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
