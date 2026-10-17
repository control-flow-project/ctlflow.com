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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `listenerRuns` |
| Method | `GET` |
| Path | `/api/agents/{agentId}/listener-runs` |
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

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ agentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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
query.page
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

### Validation

```typescript
check.list(res.listenerRun, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)

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
