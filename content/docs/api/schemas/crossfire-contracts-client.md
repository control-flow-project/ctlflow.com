---
title: "crossfire/node/packages/contracts/src/client.ts"
linkTitle: "client"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/client.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/validation.ts`](/docs/api/schemas/crossfire-contracts-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/origin.ts`](/docs/api/schemas/crossfire-contracts-origin/)
- [`services/crossfire/node/packages/domain/src/port/messaging.ts`](/docs/api/schemas/crossfire-domain-port-messaging/)

## Account {#Account}

```typescript
export type Account = BackendAccount;
```

Related definitions:

- [`BackendAccount`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendAccount)

## Settings {#Settings}

```typescript
export type Settings = {
    instance: string;
    server: string;
    backend: BackendConfiguration;
    owner: string;
    maxUploadBytes: number;
};
```

Related definitions:

- [`BackendConfiguration`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendConfiguration)

## Profile {#Profile}

```typescript
export type Profile = {
    settings: Settings;
    workspace: string;
    id: string;
    account: Account;
};
```

Related definitions:

- [`settings`](/docs/api/schemas/crossfire-contracts-client/#settings)
- [`Settings`](/docs/api/schemas/crossfire-contracts-client/#Settings)
- [`account`](/docs/api/schemas/crossfire-contracts-client/#account)
- [`Account`](/docs/api/schemas/crossfire-contracts-client/#Account)

## UUID {#UUID}

```typescript
UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu
```

## MAX_UPLOAD_BYTES {#MAX_UPLOAD_BYTES}

```typescript
MAX_UPLOAD_BYTES = 16 * 1024 * 1024
```

## profileName {#profileName}

```typescript
export function profileName(value: unknown): value is string {
    return typeof value === "string" && /^[a-z][a-z0-9-]{0,39}$/u.test(value);
}
```

## backendConfiguration {#backendConfiguration}

```typescript
export function backendConfiguration(value: unknown): Result<BackendConfiguration> {
    const input = fields(value, ['type', 'parameters']);
    if (!input.ok)
        return input;
    const parameters = backendParameters(input.value.parameters);
    return profileName(input.value.type) && parameters.ok ? success({ type: input.value.type, parameters: parameters.value })
        : failure('invalid', 'Invalid messaging backend configuration');
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`BackendConfiguration`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendConfiguration)
- [`fields`](/docs/api/schemas/crossfire-contracts-validation/#fields)
- [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters)
- [`profileName`](/docs/api/schemas/crossfire-contracts-client/#profileName)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## account {#account}

```typescript
export function account(value: unknown): Result<Account> {
    const input = fields(value, ['userId', 'accessToken', 'native']);
    if (!input.ok)
        return input;
    const native = backendParameters(input.value.native);
    return userId(input.value.userId) && text(input.value.accessToken, 8192) && native.ok
        ? success({ userId: input.value.userId, accessToken: input.value.accessToken, native: native.value }) : failure('invalid', 'Invalid agent account');
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`Account`](/docs/api/schemas/crossfire-contracts-client/#Account)
- [`fields`](/docs/api/schemas/crossfire-contracts-validation/#fields)
- [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters)
- [`userId`](/docs/api/schemas/crossfire-contracts-validation/#userId)
- [`text`](/docs/api/schemas/crossfire-contracts-validation/#text)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## settings {#settings}

```typescript
export function settings(value: unknown): Result<Settings> {
    const input = fields(value, ['instance', 'server', 'backend', 'owner', 'maxUploadBytes']);
    if (!input.ok)
        return input;
    const data = input.value, backend = backendConfiguration(data.backend);
    const server = typeof data.server === 'string' ? endpoint(data.server) : failure('invalid', 'Missing server origin');
    if (!profileName(data.instance) || !server.ok || !backend.ok || !userId(data.owner)
        || !Number.isSafeInteger(data.maxUploadBytes) || Number(data.maxUploadBytes) < 1 || Number(data.maxUploadBytes) > MAX_UPLOAD_BYTES)
        return failure('invalid', 'Invalid project instance settings');
    return success({ instance: data.instance, server: server.value, backend: backend.value, owner: data.owner, maxUploadBytes: Number(data.maxUploadBytes) });
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`Settings`](/docs/api/schemas/crossfire-contracts-client/#Settings)
- [`fields`](/docs/api/schemas/crossfire-contracts-validation/#fields)
- [`backendConfiguration`](/docs/api/schemas/crossfire-contracts-client/#backendConfiguration)
- [`endpoint`](/docs/api/schemas/crossfire-contracts-origin/#endpoint)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`profileName`](/docs/api/schemas/crossfire-contracts-client/#profileName)
- [`userId`](/docs/api/schemas/crossfire-contracts-validation/#userId)
- [`MAX_UPLOAD_BYTES`](/docs/api/schemas/crossfire-contracts-client/#MAX_UPLOAD_BYTES)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## profile {#profile}

```typescript
export function profile(value: unknown): Result<Profile> {
    const input = fields(value, ["settings", "workspace", "id", "account"]);
    if (!input.ok)
        return input;
    const configuration = settings(input.value.settings);
    const identity = account(input.value.account);
    if (!configuration.ok)
        return configuration;
    if (!identity.ok)
        return identity;
    if (!text(input.value.workspace, 4096) || typeof input.value.id !== "string" || !UUID.test(input.value.id)) {
        return failure("invalid", "Invalid project agent identity");
    }
    return success({ settings: configuration.value, workspace: input.value.workspace, id: input.value.id, account: identity.value });
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`Profile`](/docs/api/schemas/crossfire-contracts-client/#Profile)
- [`fields`](/docs/api/schemas/crossfire-contracts-validation/#fields)
- [`settings`](/docs/api/schemas/crossfire-contracts-client/#settings)
- [`account`](/docs/api/schemas/crossfire-contracts-client/#account)
- [`text`](/docs/api/schemas/crossfire-contracts-validation/#text)
- [`UUID`](/docs/api/schemas/crossfire-contracts-client/#UUID)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
