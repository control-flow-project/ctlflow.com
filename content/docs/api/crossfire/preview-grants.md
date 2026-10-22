---
title: "POST /api/room-grant-previews"
linkTitle: "previewGrants"
description: "Review complete room plan"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "previewGrants"
product: "crossfire"
generated: true
---


## Review complete room plan

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `previewGrants` |
| Method | `POST` |
| Path | `/api/room-grant-previews` |
| Authentication | `human` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `agent.room-grant.manage.owned`, `agent.room-grant.manage.any` |

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

object; fields below; unknown fields rejected ([`planPreview`](/docs/api/schemas/crossfire-contracts-schema-request/#planPreview))

| Field path | Representation and constraints |
| --- | --- |
| `plan` | object; fields below; unknown fields rejected ([`plan`](/docs/api/schemas/crossfire-contracts-schema-request/#plan)) |
| `plan.fleetId` | lowercase opaque UUID |
| `plan.agents` | array; 1–100 entries; item: object; fields below; unknown fields rejected |
| `plan.agents[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `plan.agents[].grants` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)) |
| `plan.agents[].grants[].roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `plan.agents[].grants[].accessMode` | `read` or `reply` or `custom` |
| `plan.agents[].grants[].nativeAccess` | custom validation: [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters); see function below; JSON null permitted |
| `plan.agents[].grants[].muted` | boolean |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `plan.agents[].grants[].nativeAccess`:

```typescript
input => input !== null && typeof input === 'object' && !Array.isArray(input)
    && json(input) && Object.keys(input).length <= 64 && new TextEncoder().encode(JSON.stringify(input)).length <= 8192
    ? success(input as JsonObject) : failure('invalid', 'Expected a backend parameter object up to 8192 UTF-8 bytes')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
req.planPreview
```

Referenced definitions:

- [`planPreview`](/docs/api/schemas/crossfire-contracts-schema-request/#planPreview)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`preview`](/docs/api/schemas/crossfire-contracts-schema-plan/#preview))

| Field path | Representation and constraints |
| --- | --- |
| `digest` | string; 64–64 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `snapshots` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `snapshots[].agentId` | lowercase opaque UUID |
| `snapshots[].revision` | exact JSON integer; 0…9007199254740991 |
| `snapshots[].grants` | array; 0–100 entries; item: object; fields below; unknown fields rejected |
| `snapshots[].grants[].roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `snapshots[].grants[].generation` | lowercase opaque UUID |
| `snapshots[].grants[].revision` | exact JSON integer; 0…9007199254740991 |
| `changes` | array; 0–10000 entries; item: object; fields below; unknown fields rejected |
| `changes[].agentId` | lowercase opaque UUID |
| `changes[].roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `changes[].before` | object; fields below; unknown fields rejected ([`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)); JSON null permitted |
| `changes[].before.agentId` | lowercase opaque UUID |
| `changes[].before.roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `changes[].before.generation` | lowercase opaque UUID |
| `changes[].before.authorizerId` | lowercase opaque UUID |
| `changes[].before.addedById` | lowercase opaque UUID |
| `changes[].before.accessMode` | `none` or `read` or `reply` or `custom` |
| `changes[].before.nativeAccess` | custom validation: [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters); see function below; JSON null permitted |
| `changes[].before.muted` | boolean |
| `changes[].before.revision` | exact JSON integer; 0…9007199254740991 |
| `changes[].before.accessRevision` | exact JSON integer; 0…9007199254740991 |
| `changes[].before.updatedAt` | exact JSON integer; 0…9007199254740991 |
| `changes[].agentName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].instanceKey` | lowercase name; pattern `[a-z][a-z0-9-]{0,39}` |
| `changes[].roomName` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].roomAlias` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `changes[].after` | object; fields below; unknown fields rejected ([`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)); JSON null permitted |
| `changes[].after.roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `changes[].after.accessMode` | `read` or `reply` or `custom` |
| `changes[].after.nativeAccess` | custom validation: [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters); see function below; JSON null permitted |
| `changes[].after.muted` | boolean |
| `changes[].changed` | boolean |
| `changes[].authorizerId` | lowercase opaque UUID |
| `changes[].authority` | object; fields below; unknown fields rejected ([`roomAuthority`](/docs/api/schemas/crossfire-contracts-schema-response/#roomAuthority)); JSON null permitted |
| `changes[].authority.backendUserId` | opaque backend user ID; 1–255 UTF-16 units, well-formed Unicode without control characters |
| `changes[].authority.canInvite` | boolean |
| `changes[].authority.authorityRevision` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].authority.accessModes` | array; 0–3 entries; item: `read` or `reply` or `custom` |
| `changes[].authority.accessFields` | array; 0–64 entries; item: object; fields below; unknown fields rejected |
| `changes[].authority.accessFields[].key` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].authority.accessFields[].label` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].authority.accessFields[].minimum` | exact JSON integer; -9007199254740991…9007199254740991 |
| `changes[].authority.accessFields[].maximum` | exact JSON integer; -9007199254740991…9007199254740991 |
| `changes[].authority.accessFields[].defaultValue` | exact JSON integer; -9007199254740991…9007199254740991 |
| `changes[].authority.permissions` | array; 0–1000 entries; item: object; fields below; unknown fields rejected |
| `changes[].authority.permissions[].action` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].authority.permissions[].label` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `changes[].authority.permissions[].allowed` | boolean |

### Additional checks

The following checks apply in addition to the field limits.

Constraint on `changes[].after.nativeAccess`:

```typescript
input => input !== null && typeof input === 'object' && !Array.isArray(input)
    && json(input) && Object.keys(input).length <= 64 && new TextEncoder().encode(JSON.stringify(input)).length <= 8192
    ? success(input as JsonObject) : failure('invalid', 'Expected a backend parameter object up to 8192 UTF-8 bytes')
```

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
plan.preview
```

Referenced definitions:

- [`preview`](/docs/api/schemas/crossfire-contracts-schema-plan/#preview)

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
