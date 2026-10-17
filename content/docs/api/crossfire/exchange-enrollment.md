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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `exchangeEnrollment` |
| Method | `POST` |
| Path | `/api/enrollments/{enrollmentId}/exchange` |
| Catalog audience | `public` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `enrollmentId` | lowercase opaque UUID |

### Exact validator

```typescript
check.object({ enrollmentId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## Query parameters

custom parser [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none); exact branches, defaults and rejection rules below

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

### Exact validator

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

### Exact validator

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

### Exact validator

```typescript
res.enrollmentExchange
```

Referenced definitions:

- [`enrollmentExchange`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentExchange)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
