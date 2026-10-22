---
title: "crossfire/node/packages/domain/src/port/messaging.ts"
linkTitle: "messaging"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/port/messaging.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/kernel/src/json.ts`](/docs/api/schemas/crossfire-kernel-json/)

## BackendAccount {#BackendAccount}

```typescript
export type BackendAccount = {
    userId: string;
    accessToken: string;
    native: JsonObject;
};
```

Related definitions:

- [`JsonObject`](/docs/api/schemas/crossfire-kernel-json/#JsonObject)

## BackendConfiguration {#BackendConfiguration}

```typescript
export type BackendConfiguration = {
    type: string;
    parameters: JsonObject;
};
```

Related definitions:

- [`JsonObject`](/docs/api/schemas/crossfire-kernel-json/#JsonObject)

## BackendDescription {#BackendDescription}

```typescript
export type BackendDescription = {
    type: string;
    label: string;
    chatUrl: string;
    signupUrl: string;
    signupInstructions: string[];
    configuration: BackendConfiguration;
};
```

Related definitions:

- [`BackendConfiguration`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendConfiguration)

## AccessField {#AccessField}

```typescript
export type AccessField = {
    key: string;
    label: string;
    minimum: number;
    maximum: number;
    defaultValue: number;
};
```

## RoomAccessIntent {#RoomAccessIntent}

```typescript
export type RoomAccessIntent = {
    accessMode: 'none' | 'read' | 'reply' | 'custom';
    nativeAccess: JsonObject | null;
    muted: boolean;
};
```

Related definitions:

- [`JsonObject`](/docs/api/schemas/crossfire-kernel-json/#JsonObject)

## RoomFacts {#RoomFacts}

```typescript
export type RoomFacts = {
    roomId: string;
    name: string;
    topic: string;
    alias: string | null;
    backendUserId: string;
    canInvite: boolean;
    accessModes: ('read' | 'reply' | 'custom')[];
    authorityRevision: string;
    accessFields: AccessField[];
    permissions: {
        action: string;
        label: string;
        allowed: boolean;
    }[];
};
```

Related definitions:

- [`AccessField`](/docs/api/schemas/crossfire-domain-port-messaging/#AccessField)

## RoomMembership {#RoomMembership}

```typescript
export type RoomMembership = {
    backendUserId: string;
    displayName: string;
    membership: 'join' | 'invite' | 'leave' | 'ban';
    nativeAccess: JsonObject | null;
};
```

Related definitions:

- [`JsonObject`](/docs/api/schemas/crossfire-kernel-json/#JsonObject)

## RoomInvitation {#RoomInvitation}

```typescript
export type RoomInvitation = {
    roomId: string;
    eventId: string;
    senderBackendUserId: string;
    direct: boolean;
};
```

## RoomAdmission {#RoomAdmission}

```typescript
export type RoomAdmission = {
    kind: 'managed';
} | {
    kind: 'invitation';
    eventId: string;
    senderBackendUserId: string;
};
```

## BackendEvent {#BackendEvent}

```typescript
export type BackendEvent = {
    eventId: string;
    roomId: string;
    senderBackendUserId: string;
    type: string;
    messageType: string | null;
    body: string | null;
    mentions: string[];
    edited: boolean;
    control: boolean;
};
```

## MessagingAuthority {#MessagingAuthority}

```typescript
export type MessagingAuthority = {
    describe(publicOrigin: string): BackendDescription;
    authenticate(username: string, password: string): Promise<Result<string>>;
    agentAccount(userId: string, accessToken: string): BackendAccount;
    agentUserId(agentId: string): string;
    serviceUserId(): string;
    localLabel(userId: string): string;
    registrationUserId(input: {
        username: string;
        password: string;
        native: JsonObject;
    }): Result<string>;
    identify(token: string): Promise<Result<string>>;
    exists(backendUserId: string): Promise<Result<boolean>>;
    provision(backendUserId: string, password: string, native?: JsonObject): Promise<Result<BackendAccount>>;
    deactivate(backendUserId: string): Promise<Result<void>>;
    discard(backendUserId: string): Promise<Result<void>>;
    profileName(backendUserId: string): Promise<Result<string | null>>;
    setDisplayName(backendUserId: string, displayName: string): Promise<Result<void>>;
    joined(backendUserId: string): Promise<Result<string[]>>;
    ownerConversation(ownerBackendUserId: string, agentBackendUserId: string, roomId: string | null, previousName: string | null): Promise<Result<string>>;
    verifyOwnerConversation(ownerBackendUserId: string, agentBackendUserId: string, roomId: string): Promise<Result<void>>;
    markDirect(backendUserId: string, counterpartBackendUserId: string, roomId: string): Promise<Result<void>>;
    room(backendUserId: string, roomId: string, subjectUserId?: string): Promise<Result<RoomFacts>>;
    membership(backendUserId: string, targetBackendUserId: string, roomId: string): Promise<Result<RoomMembership>>;
    invitation(backendUserId: string, roomId: string): Promise<Result<RoomInvitation | null>>;
    authorizeRoomAccess(authorizerBackendUserId: string, targetBackendUserId: string, roomId: string, intent: RoomAccessIntent): Promise<Result<RoomFacts>>;
    setRoomAccess(authorizerBackendUserId: string, targetBackendUserId: string, roomId: string, intent: RoomAccessIntent, admission: RoomAdmission | null): Promise<Result<RoomMembership>>;
    leave(backendUserId: string, roomId: string): Promise<Result<void>>;
    event(backendUserId: string, roomId: string, eventId: string): Promise<Result<BackendEvent>>;
    sendNotice(backendUserId: string, roomId: string, transactionId: string, body: string, senderBackendUserId: string): Promise<Result<string>>;
    close(): void;
};
```

Related definitions:

- [`BackendDescription`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendDescription)
- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`BackendAccount`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendAccount)
- [`JsonObject`](/docs/api/schemas/crossfire-kernel-json/#JsonObject)
- [`RoomFacts`](/docs/api/schemas/crossfire-domain-port-messaging/#RoomFacts)
- [`RoomMembership`](/docs/api/schemas/crossfire-domain-port-messaging/#RoomMembership)
- [`RoomInvitation`](/docs/api/schemas/crossfire-domain-port-messaging/#RoomInvitation)
- [`RoomAccessIntent`](/docs/api/schemas/crossfire-domain-port-messaging/#RoomAccessIntent)
- [`RoomAdmission`](/docs/api/schemas/crossfire-domain-port-messaging/#RoomAdmission)
- [`BackendEvent`](/docs/api/schemas/crossfire-domain-port-messaging/#BackendEvent)
