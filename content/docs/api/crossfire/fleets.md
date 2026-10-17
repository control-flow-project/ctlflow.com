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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `fleets` |
| Method | `GET` |
| Path | `/api/fleets` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

Your HTTP client supplies these values in the URL query string.

custom validation: [`fleets`](/docs/api/schemas/crossfire-contracts-schema-query/#fleets); see function below

Accepted query parameters: `ownerId`, `search`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.fleets
```

Referenced definitions:

- [`fleets`](/docs/api/schemas/crossfire-contracts-schema-query/#fleets)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

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
| `[].controller.metadata` | custom validation: [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); see function below; optional property |
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

### Additional checks

The following checks apply in addition to the field limits.

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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(res.fleet, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

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
