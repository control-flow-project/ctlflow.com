---
title: HTTP requests and responses
description: Authentication, response envelopes, errors, pagination, concurrency and request limits.
weight: 10
---

## Origins and authentication

crossfire serves coordination routes at the configured application origin. The request `Host` must match that exact origin. When an `Origin` header is present it must equal the application origin; a related subdomain, report origin or `null` origin is not accepted.

| Catalog audience | crossfire admission |
| --- | --- |
| `public` | No bearer accepted; boundary-specific public checks still apply |
| `human` | Active human session cookie; mutations require same-origin CSRF |
| `agent` | Agent bearer identity; the payload cannot select another actor |
| `either` | A human session or agent bearer, with current domain authority |
| `fleet` | Fleet-scoped controller credential, or permitted human session; current generation/object checks still apply |

Never mix a `Cookie` header with `Authorization`. Human login exchanges a native Matrix token through `POST /api/sessions`, requiring same-origin `Origin`. It returns the human projection, permission codes and `csrfSecret`, and sets a host-only `__Host-crossfire` cookie. The cookie is Secure, HttpOnly, SameSite=Strict and Path=/; its lifetime is eight hours.

Human mutations include `X-Crossfire-CSRF: <csrfSecret>` and the exact `Origin`. `GET /api/sessions/current` supplies the current session projection. Opening a review link is read-only; only explicit authenticated submission records a human decision.

fleetd is different: use its private Unix socket with `Host: localhost`, no browser `Origin`, no cookie and no `Authorization`. Its catalog `public` label does not confer Internet access.

## Success and failure

```json
{
  "data": { "recorded": true },
  "meta": { "requestId": "00000000-0000-0000-0000-000000000001" }
}
```

```json
{
  "error": { "code": "stale_revision", "message": "The record changed" },
  "meta": { "requestId": "00000000-0000-0000-0000-000000000001" }
}
```

The operation's output schema applies to `data`. Application IDs and request IDs are UUIDs; Matrix IDs, cursors and native session identifiers retain their own opaque formats. Strings/keys must be well-formed Unicode. Malformed UTF-8 and unpaired UTF-16 surrogates are rejected, not replaced silently.

| Code | HTTP status |
| --- | --- |
| `invalid` | 400 |
| `unauthorized` | 401 |
| `forbidden` | 403 |
| `missing` | 404 |
| `method_not_allowed` | 405 |
| `conflict`, `stale_revision`, `name_collision`, `capacity` | 409 |
| `limit`, `body_too_large` | 413 |
| `rate_limit` | 429 |
| `native` | 502 |
| `unavailable` | 503 |

HTTP 202 means the operation was accepted for processing. Inspect its status for
completion. Message delivery confirmation means the input reached the runtime,
not that the agent finished its task. Owner answers are recorded before they
are sent to the runtime.

## Request and response bounds

| Boundary | Default / explicit bound |
| --- | --- |
| crossfire JSON request | 2 MiB unless the operation declares another bound |
| crossfire JSON response | 32 MiB |
| Native human-decision creation | 16 MiB operation request bound; separate review constraints still apply |
| Publication file upload | 8 MiB; raw `application/octet-stream` with exact canonical `Content-Length` |
| fleetd private request | 1 MiB; not the server's 2 MiB default |
| Complete inline model envelope | Instance policy; default 65536 UTF-8 bytes |

The model-inline limit includes provenance, directory and instructions. Large input becomes complete private files with a compact manifest; it is not truncated. That policy is independent of HTTP body limits, native patches, approval reviews, report uploads and terminal output.

GET operations have no client JSON body: use their declared query parameters. The request-size default does not require a body on a GET request.

## Pagination and queries

For paginated collections, `page` and `pageSize` are canonical positive ASCII decimal text, defaults 1 and 20. Page is at most 100000; page size is at most 100. Leading zeroes, signs, whitespace, fractions, exponent/hex forms and duplicate/unknown query parameters fail.

```json
{
  "data": [],
  "meta": {
    "requestId": "00000000-0000-0000-0000-000000000001",
    "page": 1, "pageSize": 20, "totalItems": 0, "totalPages": 1
  }
}
```

`totalPages` is at least one, including an empty collection. Beyond-last pages may be empty. The server checks access, filters, counts and sorts before selecting a page and
loading its related records. A list-valued output is not automatically a paginated collection: consult the operation's `collection` fact.

Directory/fleet/wake-rule/publication search uses bound SQLite LIKE patterns. ASCII case is insensitive; non-ASCII case remains exact. `%` and `_` retain SQLite wildcard behavior. Do not lowercase query text in client code; pass the intended search unchanged.

## Concurrency and retries

Use the original expected revision, applicable admission generation and idempotency key for the exact input. Conflicting key reuse fails. A lost response is not permission to create a new identity, silently overwrite state, advance a cursor or repeat a native effect under a different ID.

On revision conflict retain the user's draft and explicitly reload/reconcile; do not auto-apply it to a new record. GET requests do not approve, start, acknowledge or change state.

## Rate limits and proxy attribution

Public mutations use process-local 60-second budgets: 120 per client, 4096 aggregate and at most 4096 retained client buckets. A 429 includes `Retry-After: 60`. These are not token or chat quotas.

Socket peer is the default client identity. Only explicitly configured literal immediate-proxy addresses may supply exactly one overwritten `X-Forwarded-For` client IP. Chained, missing or malformed trusted-proxy headers fail. This does not grant authentication or room authority.

- [Instance and trusted-ingress configuration](/docs/crossfire/configuration/)
- [Exact envelope validators](/docs/api/schemas/crossfire-contracts-rest-envelope/)
- [HTTP source](source:ctlflow:services/crossfire/node/apps/server/src/http/transport.ts)
