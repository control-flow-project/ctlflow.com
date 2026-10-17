---
title: "GET /api/audit-events"
linkTitle: "audit"
description: "Scoped audit events"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "audit"
product: "crossfire"
generated: true
---


## Scoped audit events

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `audit` |
| Method | `GET` |
| Path | `/api/audit-events` |
| Catalog audience | `human` |
| Success status | `200` |
| Response data | Collection; paginated response metadata is required |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `audit.read.owned`, `audit.read.any` |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

custom parser [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped); exact branches, defaults and rejection rules below

Explicit query names in this parser: `ownerId`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
export function scoped(input: unknown) {
    const parsed = checked(input, ['ownerId']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const ownerId = parsed.value.get('ownerId');
    if (ownerId === null)
        return success(bounds.value);
    const valid = check.identifier(ownerId);
    return valid.ok ? success({ ...bounds.value, ownerId }) : valid;
}
```

### Exact validator

```typescript
query.scoped
```

Referenced definitions:

- [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–100 entries; item: object; fields below; unknown fields rejected ([`audit`](/docs/api/schemas/crossfire-contracts-schema-response/#audit))

| Field path | Representation and constraints |
| --- | --- |
| `[].auditId` | lowercase opaque UUID |
| `[].requestId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].actorCredentialId` | lowercase opaque UUID; JSON null permitted |
| `[].actorKind` | `human` or `agent` or `controller` or `system` or `anonymous` |
| `[].actor` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)); JSON null permitted |
| `[].actor.principalId` | lowercase opaque UUID |
| `[].actor.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].actor.kind` | `human` or `agent` |
| `[].actor.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].actor.ownerId` | lowercase opaque UUID |
| `[].actor.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].target` | object; fields below; unknown fields rejected ([`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)); JSON null permitted |
| `[].target.principalId` | lowercase opaque UUID |
| `[].target.matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].target.kind` | `human` or `agent` |
| `[].target.displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].target.ownerId` | lowercase opaque UUID |
| `[].target.ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].actorPrincipalId` | lowercase opaque UUID; JSON null permitted |
| `[].ownerId` | lowercase opaque UUID; JSON null permitted |
| `[].targetKind` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].targetId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].roomId` | immutable Matrix room ID; maximum 255 UTF-16 units; JSON null permitted |
| `[].membershipGeneration` | lowercase opaque UUID; JSON null permitted |
| `[].authorizerId` | lowercase opaque UUID; JSON null permitted |
| `[].addedById` | lowercase opaque UUID; JSON null permitted |
| `[].permissionCode` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].action` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].outcome` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].message` | string; 0–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].createdAt` | exact JSON integer; 0…9007199254740991 |

### Exact validator

```typescript
check.list(res.audit, 100)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`audit`](/docs/api/schemas/crossfire-contracts-schema-response/#audit)

## Response envelope

The response-data validator above applies to `data`, not to the entire HTTP response. All successful JSON operations use the shared envelope; failures use `error` instead of `data`.

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

The placeholder is illustrative notation, not a valid response-data value. See the exact fields and validators above.
