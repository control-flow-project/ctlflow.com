---
title: "GET /api/fleets"
linkTitle: "fleets"
description: "Fleet directory"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleets"
product: "crossfire"
generated: true
---


## Fleet directory

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `fleets` |
| Method | `GET` |
| Path | `/api/fleets` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `agent.read.owned`, `agent.read.any` |

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

custom parser [`fleets`](/docs/api/schemas/crossfire-contracts-schema-query/#fleets); exact branches, defaults and rejection rules below

Explicit query names in this parser: `ownerId`, `search`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function fleets(input: unknown) {
    const parsed = checked(input, ['ownerId', 'search']);
    if (!parsed.ok)
        return parsed;
    const params = new URLSearchParams(parsed.value), search = params.get('search') ?? '';
    params.delete('search');
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    const scope = scoped(params);
    return scope.ok ? success({ ...scope.value, search }) : scope;
}
```

### Exact validator

```typescript
query.fleets
```

Referenced definitions:

- [`fleets`](/docs/api/schemas/crossfire-contracts-schema-query/#fleets)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet))

| Field path | Representation and constraints |
| --- | --- |
| `[].fleetId` | lowercase opaque UUID |
| `[].owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `[].owner.principalId` | lowercase opaque UUID |
| `[].owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].owner.kind` | `human` or `agent` |
| `[].owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].owner.ownerId` | lowercase opaque UUID |
| `[].owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `[].controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].controller.metadata` | custom parser [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); exact branches, defaults and rejection rules below; optional property |
| `[].revision` | exact JSON integer; 0…9007199254740991 |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |
| `[].updatedAt` | exact JSON integer; 0…9007199254740991 |
| `[].delivery` | object; fields below; unknown fields rejected ([`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)) |
| `[].delivery.fleetId` | lowercase opaque UUID |
| `[].delivery.revision` | exact JSON integer; 0…9007199254740991 |
| `[].delivery.deliveryEnabled` | boolean |
| `[].delivery.connection` | object; fields below; unknown fields rejected |
| `[].delivery.connection.status` | `online` or `offline` |
| `[].delivery.connection.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `[].canArchive` | boolean |
| `[].allowedActions` | array; 0–2 entries; item: `configure` or `archive` |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `[].controller.metadata`:

```typescript
function metadata(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 16)
        return failure('invalid', 'Controller metadata supports at most 16 text fields');
    const output: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        if (!/^[a-z][a-z0-9-]{0,39}$/u.test(key) || !check.text(256, 0)(value).ok || typeof value !== 'string')
            return failure('invalid', 'Invalid controller metadata');
        output[key] = value;
    }
    return success(output);
}
```

### Exact validator

```typescript
check.list(res.fleet, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)

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
