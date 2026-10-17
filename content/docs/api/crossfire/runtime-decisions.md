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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `runtimeDecisions` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/runtime-decisions` |
| Authentication | `either` |
| Success status | `200` |
| Response data | Paginated collection |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.read.self`, `agent.read.owned`, `agent.read.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

Your HTTP client supplies these values in the URL query string.

custom validation: [`runtimeDecisions`](/docs/api/schemas/crossfire-contracts-schema-query/#runtimeDecisions); see function below

Accepted query parameters: `status`.

Query parameters are URL text. The validation function below specifies their format, defaults and combinations. Pagination applies only to operations that use it.

### Additional checks

The following checks apply in addition to the field limits.

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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.runtimeDecisions
```

Referenced definitions:

- [`runtimeDecisions`](/docs/api/schemas/crossfire-contracts-schema-query/#runtimeDecisions)

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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.list(runtime.decisionSummary, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`decisionSummary`](/docs/api/schemas/crossfire-contracts-runtime/#decisionSummary)

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
