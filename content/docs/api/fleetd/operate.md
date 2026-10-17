---
title: "POST /api/operations"
linkTitle: "operate"
description: "Request lifecycle operation"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "operate"
product: "fleetd"
generated: true
---


## Request lifecycle operation

> Private controller API. This route is carried over the owning user's Unix socket, locally or through SSH. The catalog's `auth: public` does not make it an Internet-public endpoint; filesystem/socket ownership supplies the transport admission boundary.

| Contract fact | Value |
| --- | --- |
| Product owner | `fleetd` |
| Operation | `operate` |
| Method | `POST` |
| Path | `/api/operations` |
| Catalog audience | `public` |
| Success status | `202` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 1048576 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

HTTP 202 records accepted intent. It does not establish native application, process completion or completion of model work.

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
none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

object; fields below; unknown fields rejected; constraint: Only an explicit software update supplies its installed release directory ([`operationInput`](/docs/api/schemas/fleetd-contracts-api/#operationInput))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `target` | object; fields below; unknown fields rejected ([`target`](/docs/api/schemas/fleetd-contracts-api/#target)) |
| `target.kind` | `fleet` or `agent` or `daemon` |
| `target.fleetId` | lowercase opaque UUID; optional property |
| `target.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; optional property |
| `action` | `enroll` or `start` or `stop` or `reset` or `update` |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `releaseDirectory` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Release directory must be an absolute normalized path ([`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)); optional property |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
value => (value.action === 'update') === (value.releaseDirectory !== undefined)
```

Constraint on `releaseDirectory`:

```typescript
value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..')
```

### Exact validator

```typescript
operationInput
```

Referenced definitions:

- [`operationInput`](/docs/api/schemas/fleetd-contracts-api/#operationInput)

## Response data

object; fields below; unknown fields rejected; constraint: Only an explicit software update supplies its installed release directory ([`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView))

| Field path | Representation and constraints |
| --- | --- |
| `operationId` | lowercase opaque UUID |
| `target` | object; fields below; unknown fields rejected ([`target`](/docs/api/schemas/fleetd-contracts-api/#target)) |
| `target.kind` | `fleet` or `agent` or `daemon` |
| `target.fleetId` | lowercase opaque UUID; optional property |
| `target.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; optional property |
| `action` | `enroll` or `start` or `stop` or `reset` or `update` |
| `expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `releaseDirectory` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Release directory must be an absolute normalized path ([`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)); optional property |
| `receiptPending` | custom parser; exact branches and rejection rules below; optional property |
| `status` | `accepted` or `running` or `awaiting-approval` or `succeeded` or `failed` |
| `createdAt` | exact JSON integer; 0…9007199254740991 |
| `completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `approval` | object; fields below; unknown fields rejected; JSON null permitted |
| `approval.url` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `approval.code` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `errors` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `errors[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `errors[].code` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `errors[].message` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `object`:

```typescript
value => (value.action === 'update') === (value.releaseDirectory !== undefined)
```

Constraint on `releaseDirectory`:

```typescript
value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..')
```

Constraint on `receiptPending`:

```typescript
input => input === true ? success(true) : failure('invalid', 'Only unacknowledged controller requests are pinned')
```

### Exact validator

```typescript
operationView
```

Referenced definitions:

- [`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView)

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
