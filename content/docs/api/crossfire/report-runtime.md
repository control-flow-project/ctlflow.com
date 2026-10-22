---
title: "PUT /api/agents/{agentId}/listener-runs/{runId}/runtime"
linkTitle: "reportRuntime"
description: "Report observed native activity without a model call"
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operations.ts"
operation: "reportRuntime"
product: "crossfire"
generated: true
---


## Report observed native activity without a model call

| Property | Value |
| --- | --- |
| Service | `crossfire` |
| Operation | `reportRuntime` |
| Method | `PUT` |
| Path | `/api/agents/{agentId}/listener-runs/{runId}/runtime` |
| Authentication | `agent` |
| Success status | `200` |
| Response data | Unpaginated value |
| Request format | `json` |
| Maximum request body | 2097152 bytes (service default) |
| Permission codes | `runtime.report.self` |

Listed permission codes are alternatives, not token scopes. The service also checks access to the requested records and rejects stale revisions or controller generations.

- [Authentication, envelopes and pagination](/docs/api/http/)
- [Language-neutral client examples](/docs/api/client-examples/)

## Path parameters

Your HTTP client substitutes these values into the placeholders in the URL path.

object; fields below; unknown fields rejected

| Field path | Representation and constraints |
| --- | --- |
| `agentId` | lowercase opaque UUID |
| `runId` | lowercase opaque UUID |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
check.object({ agentId: check.identifier, runId: check.identifier })
```

Referenced definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

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

object; fields below; unknown fields rejected ([`observation`](/docs/api/schemas/crossfire-contracts-runtime/#observation))

| Field path | Representation and constraints |
| --- | --- |
| `sessionId` | string; 1–255 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `roomId` | opaque room ID; 1–255 UTF-16 units, well-formed Unicode without control characters; JSON null permitted |
| `runtime` | `codex` or `pi` ([`implementedRuntime`](/docs/api/schemas/crossfire-contracts-runtime/#implementedRuntime)) |
| `state` | `idle` or `working` or `waiting-approval` or `waiting-answer` or `failed` or `unavailable` or `sleeping` or `waking` ([`runtimeState`](/docs/api/schemas/crossfire-contracts-runtime/#runtimeState)) |
| `observedAt` | exact JSON integer; 0…9007199254740991 |
| `lastActivityAt` | exact JSON integer; 0…9007199254740991; JSON null permitted |
| `historyAvailable` | boolean; JSON null permitted |
| `historyMode` | `shared` or `per-room` |
| `maxInputBytes` | exact JSON integer; 1024…4194304 |
| `settings` | array; 0–100 entries; item: object; fields below; unknown fields rejected ([`setting`](/docs/api/schemas/crossfire-contracts-runtime/#setting)) |
| `settings[].name` | string; 1–100 UTF-16 units; well-formed Unicode; no C0/DEL controls |
| `settings[].configured` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `settings[].effective` | string; 1–1000 UTF-16 units; well-formed Unicode; no C0/DEL controls; JSON null permitted |
| `errorMessage` | plain-text string; at most 4000 UTF-8 bytes; allowed whitespace controls only; JSON null permitted |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
runtime.observation
```

Referenced definitions:

- [`observation`](/docs/api/schemas/crossfire-contracts-runtime/#observation)

## Response data

The service produces these fields inside `data` in its response. They are output for the client to read, not input for the caller to submit.

object; fields below; unknown fields rejected ([`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged))

| Field path | Representation and constraints |
| --- | --- |
| `accepted` | boolean |

### Validation

This TypeScript is the server's validation code, reproduced from its contract. It describes the accepted format; client applications do not need to run or import it.

```typescript
res.acknowledged
```

Referenced definitions:

- [`acknowledged`](/docs/api/schemas/crossfire-contracts-schema-response/#acknowledged)

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
