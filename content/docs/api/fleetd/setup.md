---
title: "POST /api/setup"
linkTitle: "setup"
description: "Set up an ordinary fleet without configuration questions; preserve prior stop intent"
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/api.ts"
operation: "setup"
product: "fleetd"
generated: true
---


## Set up an ordinary fleet without configuration questions; preserve prior stop intent

> Private controller API. Call this route through the user's Unix socket, locally or over SSH, with its OS-user controller credential. It is not exposed on the server's public origin.

Send exactly one `Authorization: Bearer <authenticationKey>` header. fleet reads the key from private OS-native `ctlflow/fleetd.json`; it does not create or replace it. Missing or incorrect credentials return 401, including for status. Browser Origin and Cookie headers are rejected, even when empty.

- [Controller authentication, paths and recovery](/docs/fleetd/authentication/)

| Property | Value |
| --- | --- |
| Service | `fleetd` |
| Operation | `setup` |
| Method | `POST` |
| Path | `/api/setup` |
| Authentication | `controller` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 1048576 bytes (service default) |
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
none
```

Referenced definitions:

- [`none`](/docs/api/schemas/crossfire-contracts-schema-query/#none)

## Request body

Your HTTP client supplies these fields as the JSON request body when the operation takes input. A no-input operation does not require JSON. This is protocol input, not text to send in a Matrix room.

object; fields below; unknown fields rejected ([`setupInput`](/docs/api/schemas/fleetd-contracts-setup/#setupInput))

| Field path | Representation and constraints |
| --- | --- |
| `descriptor` | object; fields below; unknown fields rejected ([`setupDescriptorSchema`](/docs/api/schemas/crossfire-contracts-onboarding/#setupDescriptorSchema)) |
| `descriptor.schemaVersion` | custom validation: [`schemaVersion`](/docs/api/schemas/crossfire-contracts-onboarding/#schemaVersion); see function below |
| `descriptor.server` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Use an exact HTTPS or loopback HTTP origin ([`setupOrigin`](/docs/api/schemas/crossfire-contracts-onboarding/#setupOrigin)) |
| `descriptor.ownerBackendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `descriptor.package` | object; fields below; unknown fields rejected |
| `descriptor.package.name` | `@ctlflow/fleet` |
| `descriptor.package.version` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Use one exact npm version ([`setupVersion`](/docs/api/schemas/crossfire-contracts-onboarding/#setupVersion)) |
| `descriptor.instructions` | plain-text string; at most 131072 UTF-8 bytes; allowed whitespace controls only |
| `workspace` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `configuration` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `descriptor.schemaVersion`:

```typescript
value => value === 1 ? success(1) : failure('invalid', 'Unsupported setup descriptor')
```

Constraint on `descriptor.server`:

```typescript
value => { const parsed = endpoint(value); return parsed.ok && parsed.value === value; }
```

Constraint on `descriptor.package.version`:

```typescript
value => /^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)*)?$/u.test(value)
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
setupInput
```

Referenced definitions:

- [`setupInput`](/docs/api/schemas/fleetd-contracts-setup/#setupInput)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`setupResult`](/docs/api/schemas/fleetd-contracts-api/#setupResult))

| Field path | Representation and constraints |
| --- | --- |
| `fleet` | object; fields below; unknown fields rejected ([`fleetView`](/docs/api/schemas/fleetd-contracts-api/#fleetView)) |
| `fleet.fleetId` | lowercase opaque UUID |
| `fleet.fleetKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `fleet.label` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.directory` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.revision` | exact JSON integer; 0…9007199254740991 |
| `fleet.controller` | object; fields below; unknown fields rejected ([`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)) |
| `fleet.controller.name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.controller.metadata` | custom validation: [`metadata`](/docs/api/schemas/crossfire-contracts-schema-controller/#metadata); see function below; optional property |
| `fleet.resumeInstanceKeys` | array; 0–100 entries; item: lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `fleet.phase` | `stopped` or `starting` or `awaiting-approval` or `running` or `sleeping` or `waking` or `stopping` or `failed` ([`phase`](/docs/api/schemas/fleetd-contracts-api/#phase)) |
| `fleet.instances` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`instanceView`](/docs/api/schemas/fleetd-contracts-api/#instanceView)) |
| `fleet.instances[].instance` | object; fields below; unknown fields rejected ([`instance`](/docs/api/schemas/fleetd-contracts-api/#instance)) |
| `fleet.instances[].instance.key` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `fleet.instances[].instance.name` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `fleet.instances[].instance.definition` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `fleet.instances[].instance.workarea` | string; 1–1024 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `fleet.instances[].instance.workspace` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; optional property |
| `fleet.instances[].instance.runtimeOptions` | custom validation: [`runtimeOptions`](/docs/api/schemas/fleetd-contracts-configuration/#runtimeOptions); see function below; optional property |
| `fleet.instances[].instance.listenerOptions` | object; fields below; unknown fields rejected; optional property |
| `fleet.instances[].instance.listenerOptions.historyMode` | `shared` or `per-room`; optional property |
| `fleet.instances[].instance.listenerOptions.mirrorOutput` | boolean; optional property |
| `fleet.instances[].phase` | `stopped` or `starting` or `awaiting-approval` or `running` or `sleeping` or `waking` or `stopping` or `failed` ([`phase`](/docs/api/schemas/fleetd-contracts-api/#phase)) |
| `fleet.instances[].listenerActive` | boolean |
| `fleet.instances[].desiredActive` | boolean |
| `fleet.instances[].lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `fleet.instances[].historyAvailable` | boolean; JSON null permitted |
| `fleet.instances[].sessionId` | string; 1–200 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `fleet.instances[].error` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `fleet.instances[].startedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `fleet.error` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `fleet.connection` | object; fields below; unknown fields rejected |
| `fleet.connection.connected` | boolean |
| `fleet.connection.deliveryEnabled` | boolean |
| `fleet.connection.revision` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `fleet.connection.error` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `operation` | object; fields below; unknown fields rejected; constraint: Only an explicit software update supplies its installed release directory ([`operationView`](/docs/api/schemas/fleetd-contracts-api/#operationView)); JSON null permitted |
| `operation.operationId` | lowercase opaque UUID |
| `operation.target` | object; fields below; unknown fields rejected ([`target`](/docs/api/schemas/fleetd-contracts-api/#target)) |
| `operation.target.kind` | `fleet` or `agent` or `daemon` |
| `operation.target.fleetId` | lowercase opaque UUID; optional property |
| `operation.target.instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; optional property |
| `operation.action` | `enroll` or `start` or `stop` or `reset` or `update` |
| `operation.expectedRevision` | exact JSON integer; 0…9007199254740991 |
| `operation.releaseDirectory` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls; constraint: Release directory must be an absolute normalized path ([`releaseDirectory`](/docs/api/schemas/fleetd-contracts-api/#releaseDirectory)); optional property |
| `operation.receiptPending` | custom validation; see function below; optional property |
| `operation.status` | `accepted` or `running` or `awaiting-approval` or `succeeded` or `failed` |
| `operation.createdAt` | exact JSON integer; 0…9007199254740991 |
| `operation.completedAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `operation.approval` | object; fields below; unknown fields rejected; JSON null permitted |
| `operation.approval.url` | string; 1–2048 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `operation.approval.code` | string; 12–12 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `operation.errors` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `operation.errors[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}`; JSON null permitted |
| `operation.errors[].code` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `operation.errors[].message` | string; 1–4096 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `status` | `starting` or `ready` or `stopped` |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `fleet.controller.metadata`:

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

Constraint on `fleet.instances[].instance.runtimeOptions`:

```typescript
(input: unknown): Result<Record<string, unknown>> => input && typeof input === 'object' && !Array.isArray(input) ? success(input as Record<string, unknown>) : failure('invalid', 'Expected runtime options')
```

Constraint on `operation`:

```typescript
value => (value.action === 'update') === (value.releaseDirectory !== undefined)
```

Constraint on `operation.releaseDirectory`:

```typescript
value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..')
```

Constraint on `operation.receiptPending`:

```typescript
input => input === true ? success(true) : failure('invalid', 'Only unacknowledged controller requests are pinned')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
setupResult
```

Referenced definitions:

- [`setupResult`](/docs/api/schemas/fleetd-contracts-api/#setupResult)

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
