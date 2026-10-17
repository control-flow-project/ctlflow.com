---
title: "DELETE /api/fleets/{fleetId}/agents/{agentId}"
linkTitle: "removeFleetAgent"
description: "Retire a managed instance, preserving identity and history"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "removeFleetAgent"
product: "crossfire"
generated: true
---


## Retire a managed instance, preserving identity and history

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `removeFleetAgent` |
| Method | `DELETE` |
| Path | `/api/fleets/{fleetId}/agents/{agentId}` |
| Authentication | `fleet` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.configure.owned`, `agent.configure.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `agentId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ fleetId: check.identifier, agentId: check.identifier })
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

object; fields below; unknown fields rejected ([`fleetAgentRemoval`](/docs/api/schemas/crossfire-contracts-schema-request/#fleetAgentRemoval))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |

### Validation

```typescript
req.fleetAgentRemoval
```

Referenced definitions:

- [`fleetAgentRemoval`](/docs/api/schemas/crossfire-contracts-schema-request/#fleetAgentRemoval)

## Response data

object; fields below; unknown fields rejected ([`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged))

| Field path | Representation and constraints |
| --- | --- |
| `accepted` | boolean |

### Validation

```typescript
res.acknowledged
```

Referenced definitions:

- [`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged)

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
