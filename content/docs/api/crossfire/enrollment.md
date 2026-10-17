---
title: "GET /api/enrollments/{enrollmentId}"
linkTitle: "enrollment"
description: "Enrollment roster"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "enrollment"
product: "crossfire"
generated: true
---


## Enrollment roster

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `enrollment` |
| Method | `GET` |
| Path | `/api/enrollments/{enrollmentId}` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `enrollment.read.owned`, `enrollment.read.any` |

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

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`enrollmentDetails`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDetails))

| Field path | Representation and constraints |
| --- | --- |
| `enrollment` | object; fields below; unknown fields rejected ([`enrollment`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollment)) |
| `enrollment.owner` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)) |
| `enrollment.owner.principalId` | lowercase opaque UUID |
| `enrollment.owner.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `enrollment.owner.kind` | `human` or `agent` |
| `enrollment.owner.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enrollment.owner.ownerId` | lowercase opaque UUID |
| `enrollment.owner.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `enrollment.controllerName` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enrollment.enrollmentId` | lowercase opaque UUID |
| `enrollment.ownerId` | lowercase opaque UUID |
| `enrollment.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `enrollment.verificationCode` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `enrollment.status` | `pending` or `approved` or `rejected` or `expired` |
| `enrollment.revision` | exact JSON integer; 0…9007199254740991 |
| `enrollment.createdAt` | exact JSON integer; 0…9007199254740991 |
| `enrollment.expiresAt` | exact JSON integer; 0…9007199254740991 |
| `enrollment.decidedByMemberId` | lowercase opaque UUID; JSON null permitted |
| `enrollment.decidedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `instances` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`enrollmentItem`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentItem)) |
| `instances[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].requestedName` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].currentName` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `instances[].outcome` | `claimed` or `existing` |
| `instances[].agentId` | lowercase opaque UUID; JSON null permitted |
| `instances[].coordinationPolicy` | object; fields below; unknown fields rejected; constraint: Select unique identities; everyone requires no individual selections ([`coordinationPolicy`](/docs/api/schemas/crossfire-contracts-coordination-policy/#coordinationPolicy)) |
| `instances[].coordinationPolicy.wakeMode` | exact validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `instances[].coordinationPolicy.senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`matrixWakeSelection`](/docs/api/schemas/crossfire-contracts-coordination-policy/#matrixWakeSelection)) |
| `instances[].coordinationPolicy.senders[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `instances[].coordinationPolicy.senders[].includeAgents` | boolean |
| `instances[].coordinationPolicy.permissions` | array; 0–1 entries; item: `room.agent.invite` |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `instances[].coordinationPolicy`:

```typescript
policy => (policy.wakeMode !== 'everyone' || policy.senders.length === 0)
    && new Set(policy.senders.map(sender => sender.matrixUserId)).size === policy.senders.length
```

### Exact validator

```typescript
res.enrollmentDetails
```

Referenced definitions:

- [`enrollmentDetails`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDetails)

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
