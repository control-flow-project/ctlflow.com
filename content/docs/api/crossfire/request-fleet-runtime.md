---
title: "POST /api/fleets/{fleetId}/session-operations"
linkTitle: "requestFleetRuntime"
description: "Request stop, resume or confirmed fresh history through the controller"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "requestFleetRuntime"
product: "crossfire"
generated: true
---


## Request stop, resume or confirmed fresh history through the controller

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `requestFleetRuntime` |
| Method | `POST` |
| Path | `/api/fleets/{fleetId}/session-operations` |
| Authentication | `human` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.configure.owned`, `agent.configure.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

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

object; fields below; unknown fields rejected; constraint: Fresh history requires explicit confirmation ([`runtimeRequest`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeRequest))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `agentId` | lowercase opaque UUID; JSON null permitted |
| `action` | `start` or `stop` or `reset` ([`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)) |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `confirmFreshHistory` | boolean |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
value => value.confirmFreshHistory === (value.action === 'reset')
```

### Validation

```typescript
fleetRuntime.runtimeRequest
```

Referenced definitions:

- [`runtimeRequest`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeRequest)

## Response data

object; fields below; unknown fields rejected; constraint: Invalid session operation outcome ([`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `fleetId` | lowercase opaque UUID |
| `agentId` | lowercase opaque UUID; JSON null permitted |
| `action` | `start` or `stop` or `reset` ([`runtimeAction`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeAction)) |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `status` | `pending` or `running` or `succeeded` or `failed` |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `errorMessage` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
value => (value.status === 'succeeded' || value.status === 'failed') === (value.completedAt !== null)
    && (value.status === 'failed') === (value.errorMessage !== null)
```

### Validation

```typescript
fleetRuntime.runtimeOperation
```

Referenced definitions:

- [`runtimeOperation`](/docs/api/schemas/crossfire-contracts-fleet-runtime/#runtimeOperation)

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
