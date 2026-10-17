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

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `decideEnrollment` |
| Method | `POST` |
| Path | `/api/enrollments/{enrollmentId}/decision` |
| Catalog audience | `human` |
| Success status | `202` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `enrollment.approve.owned`, `enrollment.reject.owned`, `enrollment.reject.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

HTTP 202 records accepted intent. It does not establish native application, process completion or completion of model work.

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

object; fields below; unknown fields rejected ([`enrollmentDecision`](/docs/api/schemas/crossfire-contracts-schema-request/#enrollmentDecision))

| Field path | Representation and constraints |
| --- | --- |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 ([`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)) |
| `decision` | `approve` or `reject` |
| `verificationCode` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Exact validator

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

### Exact validator

```typescript
res.enrollmentDecision
```

Referenced definitions:

- [`enrollmentDecision`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDecision)

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
