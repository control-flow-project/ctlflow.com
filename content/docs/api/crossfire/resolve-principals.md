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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `resolvePrincipals` |
| Method | `POST` |
| Path | `/api/principal-resolutions` |
| Authentication | `either` |
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

object; fields below; unknown fields rejected ([`principalResolution`](/docs/api/schemas/crossfire-contracts-schema-request/#principalResolution))

| Field path | Representation and constraints |
| --- | --- |
| `matrixUserIds` | array; 1–100 entries; item: well-formed Matrix user ID; maximum 255 UTF-16 units; constraint: Resolve unique Matrix identities |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `matrixUserIds`:

```typescript
ids => new Set(ids).size === ids.length
```

### Validation

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

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `object`:

```typescript
identities => new Set(identities.map(identity => identity.matrixUserId)).size === identities.length
```

Constraint on `[]`:

```typescript
identity => (identity.kind === 'agent') === (identity.ownerMatrixId !== null)
```

### Validation

```typescript
res.principalIdentities
```

Referenced definitions:

- [`principalIdentities`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentities)

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
