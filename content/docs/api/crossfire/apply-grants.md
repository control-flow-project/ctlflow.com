---
title: "POST /api/room-grant-changes"
linkTitle: "applyGrants"
description: "Apply reviewed room plan"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "applyGrants"
product: "crossfire"
generated: true
---


## Apply reviewed room plan

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `applyGrants` |
| Method | `POST` |
| Path | `/api/room-grant-changes` |
| Authentication | `human` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.room-grant.manage.owned`, `agent.room-grant.manage.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

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

object; fields below; unknown fields rejected ([`planChange`](/docs/api/schemas/crossfire-contracts-schema-request/#planChange))

| Field path | Representation and constraints |
| --- | --- |
| `plan` | object; fields below; unknown fields rejected ([`plan`](/docs/api/schemas/crossfire-contracts-schema-request/#plan)) |
| `plan.fleetId` | lowercase opaque UUID |
| `plan.agents` | array; 1–100 entries; item: object; fields below; unknown fields rejected |
| `plan.agents[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `plan.agents[].grants` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)) |
| `plan.agents[].grants[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `plan.agents[].grants[].accessMode` | `read` or `reply` or `custom` |
| `plan.agents[].grants[].powerLevel` | exact JSON integer; -9007199254740991…9007199254740991; JSON null permitted |
| `plan.agents[].grants[].muted` | boolean |
| `digest` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `snapshots` | array; 1–100 entries; item: object; fields below; unknown fields rejected |
| `snapshots[].agentId` | lowercase opaque UUID |
| `snapshots[].revision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `snapshots[].grants` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `snapshots[].grants[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units |
| `snapshots[].grants[].generation` | lowercase opaque UUID |
| `snapshots[].grants[].revision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |

### Validation

```typescript
req.planChange
```

Referenced definitions:

- [`planChange`](/docs/api/schemas/crossfire-contracts-schema-request/#planChange)

## Response data

object; fields below; unknown fields rejected ([`changed`](/docs/api/schemas/crossfire-contracts-schema-plan/#changed))

| Field path | Representation and constraints |
| --- | --- |
| `accepted` | boolean |
| `agents` | array; 0–100 entries; item: lowercase opaque UUID |

### Validation

```typescript
plan.changed
```

Referenced definitions:

- [`changed`](/docs/api/schemas/crossfire-contracts-schema-plan/#changed)

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
