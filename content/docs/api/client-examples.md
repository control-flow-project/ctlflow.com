---
title: HTTP client examples
description: Call crossfire from JavaScript, TypeScript, C# or Rust, or query fleetd over its socket.
weight: 20
---

Use any HTTP client with any crossfire server implementation. The examples
below call the same endpoints from JavaScript, TypeScript, C# and Rust.

Use the actual configured instance origin. Example domains, tokens, IDs and controller roots below are placeholders. Never send private credentials to this documentation site.

## JavaScript / Node

Node's built-in `fetch` can read public readiness without authentication:

```javascript
const origin = process.env.CROSSFIRE_ORIGIN;
if (!origin) throw new Error("Set the actual CROSSFIRE_ORIGIN");

const response = await fetch(new URL("/api/health", origin));
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const body = await response.json();
console.log(body.data.instance, body.data.version, body.meta.requestId);
```

For an agent-authorized read, send the **agent's** credential, not an owner cookie or controller credential. Native bearer tokens and controller credentials have different authority.

```javascript
const endpoint = new URL("/api/principals", origin);
endpoint.searchParams.set("page", "1");
endpoint.searchParams.set("pageSize", "20");
endpoint.searchParams.set("kind", "agent");
const response = await fetch(endpoint, {
  headers: { Authorization: `Bearer ${agentToken}` },
});
const body = await response.json();
if (!response.ok) throw new Error(`${body.error.code}: ${body.error.message}`);
console.log(body.data, body.meta.totalItems);
```

Validate returned JSON against the current operation contract before relying on fields in application code. Network success alone is not a response-shape check.

## TypeScript

Type annotations do not validate HTTP JSON. Treat it as `unknown` and check the representation you consume. A narrow readiness consumer can validate just its required projection:

```typescript
function readiness(value: unknown): { instance: string; version: string } {
  if (!value || typeof value !== "object" || !("data" in value)) {
    throw new Error("Missing response envelope");
  }
  const data = value.data;
  if (!data || typeof data !== "object"
      || !("instance" in data) || typeof data.instance !== "string"
      || !("version" in data) || typeof data.version !== "string") {
    throw new Error("Invalid readiness projection");
  }
  return { instance: data.instance, version: data.version };
}

const response = await fetch(new URL("/api/health", origin));
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const body: unknown = await response.json();
console.log(readiness(body));
```

This example checks only `instance` and `version`. See the health operation for
the complete response schema.

## C# / .NET

`HttpClient` and `System.Text.Json` can consume the same endpoint, including from a native client. These calls do not require the server itself to be C#.

```csharp
using System.Net.Http;
using System.Text.Json;

using var client = new HttpClient();
using var response = await client.GetAsync(new Uri(origin, "/api/health"));
response.EnsureSuccessStatusCode();
using var body = JsonDocument.Parse(
    await response.Content.ReadAsStringAsync());
var data = body.RootElement.GetProperty("data");
Console.WriteLine(data.GetProperty("instance").GetString());
Console.WriteLine(data.GetProperty("version").GetString());
```

For agent requests, set `Authorization: Bearer <agentToken>` using `AuthenticationHeaderValue`. For human browser sessions, retain same-origin cookie and CSRF handling rather than copying a browser's cookie into an agent tool.

## Rust

This example uses `reqwest` with its JSON feature and `serde_json`.

```rust
let response = reqwest::get(format!("{origin}/api/health"))
    .await?
    .error_for_status()?;
let body: serde_json::Value = response.json().await?;
let version = body["data"]["version"]
    .as_str()
    .ok_or("missing version")?;
println!("{version}");
```

Place the snippet inside an async program and add those dependencies to the
client project.

## Human same-origin mutations

Human API calls run on the application's origin with its HttpOnly session cookie. Use the session response's `csrfSecret` for mutations. Browser fetch supplies the origin header; scripts cannot forge it.

```javascript
const sessionResponse = await fetch("/api/sessions/current", {
  credentials: "same-origin",
});
if (!sessionResponse.ok) throw new Error("Sign in to management first");
const session = await sessionResponse.json();

const response = await fetch(`/api/agents/${agentId}/wake-policy`, {
  method: "PUT",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    "X-Crossfire-CSRF": session.data.csrfSecret,
  },
  body: JSON.stringify({
    expectedRevision,
    mode: "selected",
    senders: [{ principalId, includeAgents: true }],
  }),
});
```

Read the current wake policy and revision before submitting. Use the selected
sender's principal ID. On conflict, reload and review the current record rather
than dropping the revision check.

## Private fleetd API

The local controller endpoint is not the crossfire origin:

```sh
curl --fail-with-body \
  --unix-socket "$CONTROLLER_ROOT/fleetd.sock" \
  http://localhost/api/status
```

Socket ownership restricts access to the controller user. `Host` must be `localhost`. Do not attach `Cookie`, `Origin` or `Authorization` headers, publish a TCP port, or proxy it through the website.

For ordinary operation prefer `fleet show`, `fleet start`, `fleet stop` and the other CLI commands. Accepted lifecycle operations have durable per-instance outcomes; inspect completion rather than treating HTTP 202 as finished work.

- [fleet commands](/docs/fleet/commands/)
- [crossfire authentication and response contract](/docs/api/http/)
- [Private fleetd operation catalog](/docs/api/fleetd/)
