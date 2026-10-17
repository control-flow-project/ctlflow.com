---
title: "POST /api/enrollments/preflight"
linkTitle: "preflight"
description: "Check exact roster without mutation"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "preflight"
product: "crossfire"
generated: true
---


## Check exact roster without mutation

| Contract fact | Value |
| --- | --- |
| Product owner | `crossfire` |
| Operation | `preflight` |
| Method | `POST` |
| Path | `/api/enrollments/preflight` |
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

object; fields below; unknown fields rejected ([`preflight`](/docs/api/schemas/crossfire-contracts-schema-request/#preflight))

| Field path | Representation and constraints |
| --- | --- |
| `controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `controller.metadata` | custom parser [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); exact branches, defaults and rejection rules below; optional property |
| `controllerCredential` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |
| `ownerMatrixId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances` | array; 1–100 entries; item: object; fields below; unknown fields rejected ([`instance`](/docs/api/schemas/crossfire-contracts-schema-request/#instance)) |
| `instances[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `instances[].identity` | object; fields below; unknown fields rejected ([`accountProof`](/docs/api/schemas/crossfire-contracts-schema-request/#accountProof)); optional property |
| `instances[].identity.agentId` | lowercase opaque UUID |
| `instances[].identity.accessToken` | string; 1–8192 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `instances[].coordinationPolicy` | object; fields below; unknown fields rejected; constraint: Select unique identities; everyone requires no individual selections ([`coordinationPolicy`](/docs/api/schemas/crossfire-contracts-coordination-policy/#coordinationPolicy)) |
| `instances[].coordinationPolicy.wakeMode` | exact validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `instances[].coordinationPolicy.senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`matrixWakeSelection`](/docs/api/schemas/crossfire-contracts-coordination-policy/#matrixWakeSelection)) |
| `instances[].coordinationPolicy.senders[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `instances[].coordinationPolicy.senders[].includeAgents` | boolean |
| `instances[].coordinationPolicy.permissions` | array; 0–1 entries; item: `room.agent.invite` |

### Custom constraints

These predicates/branches are part of the wire contract, not optional documentation annotations. A field table is not a replacement for these checks.

Constraint on `controller.metadata`:

```typescript
function metadata(input: unknown): Result<Record<string, string>> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 16)
        return failure('invalid', 'Controller metadata supports at most 16 text fields');
    const output: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
        if (!/^[a-z][a-z0-9-]{0,39}$/u.test(key) || !check.text(256, 0)(value).ok || typeof value !== 'string')
            return failure('invalid', 'Invalid controller metadata');
        output[key] = value;
    }
    return success(output);
}
```

Constraint on `instances[].coordinationPolicy`:

```typescript
policy => (policy.wakeMode !== 'everyone' || policy.senders.length === 0)
    && new Set(policy.senders.map(sender => sender.matrixUserId)).size === policy.senders.length
```

### Exact validator

```typescript
req.preflight
```

Referenced definitions:

- [`preflight`](/docs/api/schemas/crossfire-contracts-schema-request/#preflight)

## Response data

object; fields below; unknown fields rejected ([`preflight`](/docs/api/schemas/crossfire-contracts-schema-response/#preflight))

| Field path | Representation and constraints |
| --- | --- |
| `available` | boolean |
| `instances` | exact JSON integer; 1…100 |

### Exact validator

```typescript
res.preflight
```

Referenced definitions:

- [`preflight`](/docs/api/schemas/crossfire-contracts-schema-response/#preflight)

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
