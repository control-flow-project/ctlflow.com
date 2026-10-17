---
title: "GET /api/fleets/{fleetId}"
linkTitle: "fleet"
description: "Fleet details"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "fleet"
product: "crossfire"
generated: true
---


## Fleet details

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleet` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}` |
| Authentication | `fleet` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ fleetId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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

object; fields below; unknown fields rejected ([`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `owner.principalId` | lowercase opaque UUID |
| `owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `owner.kind` | `human` or `agent` |
| `owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `owner.ownerId` | lowercase opaque UUID |
| `owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `controller.metadata` | custom validation: [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); see function below; optional property |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `updatedAt` | exact JSON integer; 0…9007199254740991 |
| `delivery` | object; fields below; unknown fields rejected ([`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)) |
| `delivery.fleetId` | lowercase opaque UUID |
| `delivery.revision` | exact JSON integer; 0…9007199254740991 |
| `delivery.deliveryEnabled` | boolean |
| `delivery.connection` | object; fields below; unknown fields rejected |
| `delivery.connection.status` | `online` or `offline` |
| `delivery.connection.lastSeenAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `canArchive` | boolean |
| `allowedActions` | array; 0–2 entries; item: `configure` or `archive` |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `controller.metadata`:

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

### Validation

```typescript
res.fleet
```

Referenced definitions:

- [`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)

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
