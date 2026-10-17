---
title: "crossfire/node/packages/contracts/src/origin.ts"
linkTitle: "origin"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/origin.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

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
