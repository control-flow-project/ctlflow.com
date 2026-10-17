---
title: "GET /api/fleets/{fleetId}/agents/{instanceKey}/attachment"
linkTitle: "attachment"
description: "Read a private live terminal pointer; sleeping and stopped sessions require explicit resume"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "attachment"
product: "fleetd"
generated: true
---


## Read a private live terminal pointer; sleeping and stopped sessions require explicit resume

> Private controller API. This route is carried over the owning user's Unix socket, locally or through SSH. The catalog's `auth: public` does not make it an Internet-public endpoint; filesystem/socket ownership supplies the transport admission boundary.

| Contract fact | Value |
| --- | --- |
| Product owner | `fleetd` |
| Operation | `attachment` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents/{instanceKey}/attachment` |
| Catalog audience | `public` |
| Success status | `200` |
| Response data | Single value; not a collection operation |
| Request format | `json` |
| Request byte ceiling | 1048576 bytes (product HTTP default; not the model-inline limit) |
| Declared permissions | No permission codes declared; domain/credential/transport checks still apply |

Permission lists describe operation-level admission alternatives, not a bearer-token scope string, automatic access to every object, or permission to act as another principal. Current owner, instance, room, revision and generation checks remain authoritative.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

object; fields below; unknown fields rejected ([`agentParams`](/docs/api/schemas/fleetd-contracts-api/#agentParams))

| Field path | Representation and constraints |
| --- | --- |
| `fleetId` | lowercase opaque UUID |
| `instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |

### Exact validator

```typescript
agentParams
```

Referenced definitions:

- [`agentParams`](/docs/api/schemas/fleetd-contracts-api/#agentParams)

## Query parameters

custom parser; exact branches and rejection rules below

| Field path | Representation and constraints |
| --- | --- |
| `context (parser branch 1)` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |

Explicit query names in this parser: `context`.

Query values arrive as URL text, not JSON values. The exact parser below owns decoding, defaults, duplicate rejection, filters and any cross-field rules. The shared pagination contract applies only when the parser invokes it.

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `value`:

```typescript
input => { if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => key !== 'context') || input.getAll('context').length > 1)
    return failure('invalid', 'Use one exact context'); return check.object({ context: check.optional(check.text(255)) })(input.has('context') ? { context: input.get('context') } : {}); }
```

### Exact validator

```typescript
input => { if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => key !== 'context') || input.getAll('context').length > 1)
    return failure('invalid', 'Use one exact context'); return check.object({ context: check.optional(check.text(255)) })(input.has('context') ? { context: input.get('context') } : {}); }
```

Referenced definitions:

- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## Request body

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

object; fields below; unknown fields rejected ([`attachment`](/docs/api/schemas/fleetd-contracts-attachment/#attachment))

| Field path | Representation and constraints |
| --- | --- |
| `runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `workspace` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `connection` | custom parser [`connection`](/docs/api/schemas/fleetd-contracts-attachment/#connection); exact branches, defaults and rejection rules below |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `connection`:

```typescript
function connection(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 8)
        return failure('invalid', 'Invalid runtime attachment data');
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        const field = check.text(64)(key), content = check.text(4096)(value);
        if (!field.ok)
            return field;
        if (!content.ok)
            return content;
        Object.defineProperty(fields, key, { value: content.value, enumerable: true, writable: true, configurable: true });
    }
    return success(fields);
}
```

### Exact validator

```typescript
attachment
```

Referenced definitions:

- [`attachment`](/docs/api/schemas/fleetd-contracts-attachment/#attachment)

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
