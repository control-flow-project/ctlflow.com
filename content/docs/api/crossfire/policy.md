---
title: "GET /api/instance-policy"
linkTitle: "policy"
description: "Instance policy"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "policy"
product: "crossfire"
generated: true
---


## Instance policy

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `policy` |
| Method | `GET` |
| Path | `/api/instance-policy` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `principal.read` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Validation

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

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

object; fields below; unknown fields rejected ([`policy`](/docs/api/schemas/crossfire-contracts-schema-response/#policy))

| Field path | Representation and constraints |
| --- | --- |
| `revision` | exact JSON integer; 0…9007199254740991 |
| `maxOwnerAgents` | exact JSON integer; 1…100 |
| `maxAgents` | exact JSON integer; 1…1000 |
| `maxMessageBytes` | exact JSON integer; 4096…4194304 |
| `fleetIdleTimeoutSeconds` | exact JSON integer; 0…604800 |
| `maxPending` | exact JSON integer; 1…1000 |
| `enrollmentSeconds` | exact JSON integer; 60…3600 |
| `reconcileSeconds` | exact JSON integer; 30…3600 |
| `agentInstructions` | well-formed plain text; maximum 8192 UTF-8 bytes |
| `signupMode` | `invitation` or `open` |
| `invitationIssuers` | `administrators` or `members` |

### Validation

```typescript
res.policy
```

Referenced definitions:

- [`policy`](/docs/api/schemas/crossfire-contracts-schema-response/#policy)

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
