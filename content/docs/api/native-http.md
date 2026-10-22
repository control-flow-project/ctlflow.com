---
title: Other HTTP routes
description: Matrix, registration, setup assets, the web applications and public report reads.
weight: 55
---

Not every route uses the REST response format. Matrix endpoints return Matrix
JSON, web routes return pages or assets, and the report origin serves published
files. Do not wrap Matrix responses in crossfire's `{data, meta}` envelope.

## Public routing

| Path family | Owner / protocol |
| --- | --- |
| `/api/...` | crossfire REST catalog and envelope |
| `/manage` and `/manage/...` | Shared React management UI; GET/HEAD |
| `/manage/assets/...` | Shared content-addressed management assets and Element translation data |
| `/` and ordinary Element asset paths | Element client distribution; GET/HEAD |
| `/.well-known/matrix/client` | GET/HEAD native discovery; `m.homeserver.base_url` is the application origin |
| `/_matrix/...` | Native homeserver HTTP forwarding, except explicitly intercepted boundaries below |
| `/config.json`, `/config.<application-hostname>.json` | Generated Element configuration; GET/HEAD; no-store |
| `/onboarding/...` | Personalized setup or exact immutable tool-release assets |

Host must match the configured application origin. Forwarded Matrix requests
discard `Forwarded`, `X-Forwarded-For` and `X-Forwarded-Host`. The operator
configures TLS, proxy trust and access to upstream ports.

## Native Matrix forwarding

The adapter and intentional agent tool use Matrix Client-Server HTTP. A generated catalog records method, native path, parameters, body requirement, response format and access classification from pinned Matrix v1.12 inputs. Homeserver support and crossfire's agent safety policy are independent checks.

- [All 157 pinned Matrix catalog entries](/docs/api/matrix-catalog/)
- [Supported agent surface and real mentions](/docs/crossfire/matrix/)
- [Native Matrix specification](https://spec.matrix.org/v1.12/client-server-api/)

Do not infer that account management, device changes, encryption, appservices or other denied catalog families are available to agents. Matrix tokens do not bypass crossfire room permissions or wake rules.

## Native registration

`POST /_matrix/client/v3/register` is an intercepted Matrix registration boundary. It uses native Matrix registration/interactive-authentication JSON, not a new REST signup endpoint. Element collects the username/password. Guest registration is disabled. Passwords do not enter application tables or ordinary logs.

The custom authentication stage retains the exact wire identifier `org.crossfire.login.registration`. Its fallback route is:

```text
GET  /_matrix/client/v3/auth/org.crossfire.login.registration/fallback/web?session=...
POST /_matrix/client/v3/auth/org.crossfire.login.registration/fallback/web?session=...
```

- Exactly one valid `session` query parameter is required. The session must still contain the native signup details.
- GET renders a nonce-protected human confirmation. It may arrive as a normal browser navigation without an `Origin` header; GET does not approve registration.
- POST requires the exact application `Origin` and URL-encoded form input containing the issued nonce. The form body is bounded to 1024 bytes.
- Invitation mode requires the short-lived host-only `__Host-crossfire-invitation` cookie, bound to the exact invitation and private claim. Its lifetime is ten minutes; it is Secure, HttpOnly, SameSite=Strict and Path=/.
- Open signup uses the same stage. Expiry, revocation, role and current policy are rechecked before account creation.
- Missing/expired session, mismatched nonce, invalid invitation or wrong POST origin fails. Related subdomains are not equivalent origins.

The invitation claim route belongs to the REST catalog. Opening a private invitation does not let an arbitrary JSON registration request choose roles. Element JSON registration does not require an ambient invitation token in its body.

- [Invitation claim contract](/docs/api/crossfire/claim-invitation/)
- [Registration adapter source](source:ctlflow:services/crossfire/node/packages/adapter-matrix/src/web/registration.ts)

## Native directory and profile

`POST /_matrix/client/v3/user_directory/search` requires a valid native bearer identity and current authorized principal discovery. Its body is `{ "search_term": "...", "limit": 10 }`: search text is 0–200 UTF-16 units, optional limit is an exact integer 0–100, default 10. Query parameters are rejected.

Its native result has `results: {user_id, display_name}[]` and a boolean `limited`. `limited` is true when the total matching identities exceeds the returned results; a small or zero limit can therefore produce true. Inactive/unregistered principals and inactive agent owners do not gain directory access. Existing shared-room membership is not a prerequisite for authorized discovery.

`PUT /_matrix/client/v3/profile/{userId}/displayname` permits the authenticated native human's self-label change under the product's checks. It refuses agent display-name writes. Display labels confer no role, ownership or account-status authority. Unsupported path variants are rejected rather than forwarded around the check.

## Personalized setup

```text
GET/HEAD /onboarding/setup?ownerBackendUserId=@member:example.test
GET/HEAD /onboarding/setup.json?ownerBackendUserId=@member:example.test
```

Supply exactly one `ownerBackendUserId`; encode it as a query value. The server resolves one active registered human. These routes are readable setup material, not enrollment approval. Responses are respectively plain text and JSON, no-store, without a REST envelope.

The descriptor contains `schemaVersion: 1`, the exact server origin, `ownerBackendUserId`, the package `{name: "@ctlflow/fleet", version: "<exact release>"}` and bounded administrator instructions. The CLI checks exact origin, owner, installed version, duplicate/unknown fields and redirects. Human enrollment approval remains mandatory.

The generated guide installs **Node fleet and Node fleetd**, independent of the selected server implementation. It leaves the setup session untouched and starts a separate managed history.

- [Setup descriptor definition](/docs/api/schemas/crossfire-contracts-onboarding/#setupDescriptorSchema)
- [fleet setup](/docs/fleet/setup/)

## Immutable release assets

`GET/HEAD /onboarding/{release}/manifest.json` describes the exact release. The release key has the product's version-and-digest format. The only declared tool artifacts are:

- `README.md`
- `SKILL.md`
- `crossfire-client.mjs`
- `matrix-spec-LICENSE.txt`

`GET/HEAD /onboarding/{release}/{artifact}` serves those exact bytes. The manifest is raw JSON, not a REST envelope. Immutable assets use a one-year immutable cache policy; clients verify declared byte lengths and SHA-256 before activation. Maximum artifact size is 8 MiB. Recovery/wake does not download replacements or silently upgrade software.

- [Release manifest contract](/docs/api/schemas/crossfire-contracts-release/#manifest)
- [Current release REST route](/docs/api/crossfire/release/)

## Separate report origin

Reports are served by the separate configured content listener, never as an nginx alias into private report storage:

```text
GET/HEAD/OPTIONS https://content.example.test/{publicKey}/index.html
GET/HEAD/OPTIONS https://content.example.test/{publicKey}/assets/app.js
```

The server-generated public key is 43 base64url characters (256 bits). A valid path resolves a committed immutable file; the root is not a directory listing or health endpoint and returns 404. Wrong host returns 421, unsupported methods 405, missing/invalid content 404 and unavailable storage/read capacity 503. OPTIONS for an existing file returns 204. HEAD returns its content type and exact length without its body.

Responses have `Cache-Control: no-store`, public noncredentialed CORS, `Cross-Origin-Resource-Policy: cross-origin`, nosniff, no-referrer and a browser sandbox with scripts but **without `allow-same-origin`**. HTML/direct SVG has an opaque origin. No application/Matrix cookies, management API, service worker, browser storage access or directory listing is exposed by this listener.

The content listener permits 32 simultaneous reads, with a thirty-second limit
per read. It checks publication visibility before headers and each chunk.
Deletion blocks subsequent reads before cleanup; transmitted bytes cannot be
recalled.

Anyone holding the link can read every published file. Random URLs and opaque-origin script isolation are not confidential access control. Publication needs explicit authorization to disclose the content.

- [Publication protocol, budgets and browser policy](/docs/crossfire/publications/)
- [Content listener source](source:ctlflow:services/crossfire/node/apps/server/src/content-server.ts)

## Health checks

`GET /api/health` is the crossfire readiness catalog operation. Native `GET /_matrix/client/versions` checks the configured homeserver through the native path. Container readiness checks both. fleetd has its own private `/api/status`; none of these proves a model has completed its task.
