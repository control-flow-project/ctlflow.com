---
title: "crossfire/node/packages/contracts/src/origin.ts"
linkTitle: "origin"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/origin.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## endpoint {#endpoint}

```typescript
export function endpoint(value: string): Result<string> {
    try {
        const parsed = new URL(value);
        if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/"
            || (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && ["127.0.0.1", "[::1]", "localhost"].includes(parsed.hostname)))) {
            return failure("invalid", "Use HTTPS or a loopback HTTP origin without credentials");
        }
        return success(parsed.origin);
    }
    catch {
        return failure("invalid", "Invalid server origin");
    }
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
