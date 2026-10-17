---
title: "POST /api/enrollments/{enrollmentId}/decision"
linkTitle: "decideEnrollment"
description: "Decide exact enrollment"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "decideEnrollment"
product: "crossfire"
generated: true
---


## Decide exact enrollment

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `decideEnrollment` |
| Method | `POST` |
| Path | `/api/enrollments/{enrollmentId}/decision` |
| Authentication | `human` |
| Success status | `202` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `enrollment.approve.owned`, `enrollment.reject.owned`, `enrollment.reject.any` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

HTTP 202 means the request was accepted for processing. Check the operation's status to find out whether it completed.

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

object; fields below; unknown fields rejected ([`enrollmentDecision`](/docs/api/schemas/crossfire-contracts-schema-request/#enrollmentDecision))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `decision` | `approve` or `reject` |
| `verificationCode` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Validation

```typescript
req.enrollmentDecision
```

Referenced definitions:

- [`enrollmentDecision`](/docs/api/schemas/crossfire-contracts-schema-request/#enrollmentDecision)

## Response data

object; fields below; unknown fields rejected ([`enrollmentDecision`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDecision))

| Field path | Representation and constraints |
| --- | --- |
| `enrollmentId` | lowercase opaque UUID |
| `status` | `approved` or `rejected` |
| `revision` | exact JSON integer; 0…9007199254740991 |

### Validation

```typescript
res.enrollmentDecision
```

Referenced definitions:

- [`enrollmentDecision`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDecision)

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
