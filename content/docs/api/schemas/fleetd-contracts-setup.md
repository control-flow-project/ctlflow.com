---
title: "fleetd/node/packages/contracts/src/setup.ts"
linkTitle: "setup"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/setup.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/onboarding.ts`](/docs/api/schemas/crossfire-contracts-onboarding/)
- [`services/crossfire/node/packages/contracts/src/origin.ts`](/docs/api/schemas/crossfire-contracts-origin/)

## setupInput {#setupInput}

```typescript
setupInput = check.object({ descriptor: setupDescriptorSchema, workspace: check.text(4096), configuration: check.optional(check.text(4096)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`setupDescriptorSchema`](/docs/api/schemas/crossfire-contracts-onboarding/#setupDescriptorSchema)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)

## SetupInput {#SetupInput}

```typescript
export type SetupInput = check.Parsed<typeof setupInput>;
```

Related definitions:

- [`setupInput`](/docs/api/schemas/fleetd-contracts-setup/#setupInput)

## descriptorUrl {#descriptorUrl}

```typescript
export function descriptorUrl(value: string): Result<URL> {
    try {
        const url = new URL(value), trusted = endpoint(url.origin), owner = check.backendUserId(url.searchParams.get('ownerBackendUserId'));
        if (!trusted.ok)
            return trusted;
        if (!owner.ok)
            return owner;
        if (url.pathname !== '/onboarding/setup.json' || url.username || url.password || url.hash || [...url.searchParams.keys()].length !== 1
            || url.searchParams.getAll('ownerBackendUserId').length !== 1)
            return failure('invalid', 'Use the personalized Crossfire setup descriptor URL');
        return success(url);
    }
    catch {
        return failure('invalid', 'Invalid Crossfire setup descriptor URL');
    }
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`endpoint`](/docs/api/schemas/crossfire-contracts-origin/#endpoint)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
