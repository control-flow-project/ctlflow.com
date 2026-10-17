---
title: "GET /api/fleets/{fleetId}/agents/{instanceKey}/contexts"
linkTitle: "contexts"
description: "Read retained native history identities without starting a session"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "contexts"
product: "fleetd"
generated: true
---


## Read retained native history identities without starting a session

> Private controller API. This route is carried over the owning user's Unix socket, locally or through SSH. The catalog's `auth: public` does not make it an Internet-public endpoint; filesystem/socket ownership supplies the transport admission boundary.

| Contract fact | Value |
| --- | --- |
| Product owner | `fleetd` |
| Operation | `contexts` |
| Method | `GET` |
| Path | `/api/fleets/{fleetId}/agents/{instanceKey}/contexts` |
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

empty object; unknown fields rejected

### Exact validator

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Response data

array; 0–2002 entries; item: object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `[].context` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `[].runtime` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `[].sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls |

### Exact validator

```typescript
check.list(check.object({ context: check.text(255), runtime: check.name, sessionId: check.text(200) }), 2002)
```

Referenced definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)

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
