---
title: "POST /api/principal-resolutions"
linkTitle: "resolvePrincipals"
description: "Resolve verified sender kinds and agent owners"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "resolvePrincipals"
product: "crossfire"
generated: true
---


## Resolve verified sender kinds and agent owners

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `resolvePrincipals` |
| Method | `POST` |
| Path | `/api/principal-resolutions` |
| Catalog audience | `either` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 2097152 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | `principal.read` |

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

object; fields below; unknown fields rejected ([`principalResolution`](/docs/api/schemas/crossfire-contracts-schema-request/#principalResolution))

| Field path | Representation and constraints |
| --- | --- |
| `matrixUserIds` | array; 1–100 entries; item: well-formed Matrix user ID; maximum 255 UTF-16 units; constraint: Resolve unique Matrix identities |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `matrixUserIds`:

```typescript
ids => new Set(ids).size === ids.length
```

### Exact validator

```typescript
req.principalResolution
```

Referenced definitions:

- [`principalResolution`](/docs/api/schemas/crossfire-contracts-schema-request/#principalResolution)

## Response data

array; 1–100 entries; item: object; fields below; unknown fields rejected; constraint: Only registered agents have an owner ([`principalIdentity`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentity)); constraint: Resolved identities must be unique ([`principalIdentities`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentities))

| Field path | Representation and constraints |
| --- | --- |
| `[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `[].kind` | `human` or `agent` or `unknown` |
| `[].ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units; JSON null permitted |
| `[].displayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `[].ownerDisplayName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
identities => new Set(identities.map(identity => identity.matrixUserId)).size === identities.length
```

Constraint on `[]`:

```typescript
identity => (identity.kind === 'agent') === (identity.ownerMatrixId !== null)
```

### Exact validator

```typescript
res.principalIdentities
```

Referenced definitions:

- [`principalIdentities`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentities)

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
