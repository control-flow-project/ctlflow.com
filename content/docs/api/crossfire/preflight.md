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

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `preflight` |
| Method | `POST` |
| Path | `/api/enrollments/preflight` |
| Authentication | `public` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | None declared |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

empty object; unknown fields rejected

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.empty
```

Referenced definitions:

- [`empty`](/docs/api/schemas/crossfire-contracts-schema-validation/#empty)

## Query parameters

Your HTTP client supplies these values in the URL query string.

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

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
query.none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

object; fields below; unknown fields rejected ([`preflight`](/docs/api/schemas/crossfire-contracts-schema-request/#preflight))

| Field path | Representation and constraints |
| --- | --- |
| `controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `controller.metadata` | custom validation: [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); see function below; optional property |
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
| `instances[].coordinationPolicy.wakeMode` | validator `choice('selected', 'humans', 'everyone')` ([`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)) |
| `instances[].coordinationPolicy.senders` | array; 0–2000 entries; item: object; fields below; unknown fields rejected ([`matrixWakeSelection`](/docs/api/schemas/crossfire-contracts-coordination-policy/#matrixWakeSelection)) |
| `instances[].coordinationPolicy.senders[].matrixUserId` | well-formed Matrix user ID; maximum 255 UTF-16 units |
| `instances[].coordinationPolicy.senders[].includeAgents` | boolean |
| `instances[].coordinationPolicy.permissions` | array; 0–1 entries; item: `room.agent.invite` |

### Additional checks

The following checks apply in addition to the field limits.

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

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.preflight
```

Referenced definitions:

- [`preflight`](/docs/api/schemas/crossfire-contracts-schema-request/#preflight)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`preflight`](/docs/api/schemas/crossfire-contracts-schema-response/#preflight))

| Field path | Representation and constraints |
| --- | --- |
| `available` | boolean |
| `instances` | exact JSON integer; 1…100 |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.preflight
```

Referenced definitions:

- [`preflight`](/docs/api/schemas/crossfire-contracts-schema-response/#preflight)

## Response envelope

This JSON illustrates a response returned by the service, not a request to send. The service fills `data` with the operation result and `meta` with request metadata. The string below marks where the actual response data appears; it is not an example record. Errors contain `error` instead of `data`.

```json
{
  "data": "<value matching the response-data validator>",
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001"
  }
}
```
