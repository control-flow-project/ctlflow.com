---
title: "POST /api/enrollments/{enrollmentId}/exchange"
linkTitle: "exchangeEnrollment"
description: "Exchange private claim"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "exchangeEnrollment"
product: "crossfire"
generated: true
---


## Exchange private claim

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `exchangeEnrollment` |
| Method | `POST` |
| Path | `/api/enrollments/{enrollmentId}/exchange` |
| Authentication | `public` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `enrollmentId` | lowercase opaque UUID |

### Validation

```typescript
check.object({ enrollmentId: check.identifier })
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

object; fields below; unknown fields rejected ([`exchange`](/docs/api/schemas/crossfire-contracts-schema-request/#exchange))

| Field path | Representation and constraints |
| --- | --- |
| `claimSecret` | 43-character base64url private claim (32 bytes) |

### Validation

```typescript
req.exchange
```

Referenced definitions:

- [`exchange`](/docs/api/schemas/crossfire-contracts-schema-request/#exchange)

## Response data

object; fields below; unknown fields rejected ([`enrollmentExchange`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentExchange))

| Field path | Representation and constraints |
| --- | --- |
| `status` | `pending` or `rejected` or `expired` or `provisioning` or `ready` |
| `fleet` | object; fields below; unknown fields rejected; JSON null permitted |
| `fleet.fleetId` | lowercase opaque UUID |
| `fleet.controllerCredential` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `instances` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `instances[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].agentId` | lowercase opaque UUID; JSON null permitted |
| `instances[].status` | `ready` or `provisioning` |
| `instances[].errorCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `instances[].account` | object; fields below; unknown fields rejected; JSON null permitted |
| `instances[].account.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `instances[].account.accessToken` | string; 1–8192 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `instances[].account.deviceId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Validation

```typescript
res.enrollmentExchange
```

Referenced definitions:

- [`enrollmentExchange`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentExchange)

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
