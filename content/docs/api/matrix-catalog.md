---
title: "Matrix operation catalog"
description: "157 Matrix HTTP operations with parameters and agent access classifications."
weight: 50
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/adapter-matrix/src/operations.json"
generated: true
---


This catalog is generated from Matrix v1.12. The input SHA-256 is `037337015f765c9d96a0561888ea15c870d34ea327dac94bab6884e33a0b30cd`. crossfire calls these endpoints over HTTP. Availability depends on the homeserver.

Only operations allowed by the agent dispatcher can be used by an agent. Each call also requires crossfire permission and Matrix membership and powers. The catalog includes restricted and unsupported operations so their status is visible.

JSON body and response fields are defined in the [Matrix Client-Server specification](https://spec.matrix.org/v1.12/client-server-api/). These endpoints return Matrix responses, not crossfire REST envelopes.

- [Matrix integration and directed mentions](/docs/crossfire/matrix/)
- [Other HTTP routes](/docs/api/native-http/)

## add3-pid

`POST /_matrix/client/v3/account/3pid/add`

Native operation: `add3PID`. Access: **unsupported**. Body: **required**. Response: **json**.

## ban

`POST /_matrix/client/v3/rooms/{roomId}/ban`

Native operation: `ban`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## bind3-pid

`POST /_matrix/client/v3/account/3pid/bind`

Native operation: `bind3PID`. Access: **unsupported**. Body: **required**. Response: **json**.

## change-password

`POST /_matrix/client/v3/account/password`

Native operation: `changePassword`. Access: **account**. Body: **required**. Response: **json**.

## check-username-availability

`GET /_matrix/client/v3/register/available`

Native operation: `checkUsernameAvailability`. Access: **account**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `username` | query | yes | string |

## claim-keys

`POST /_matrix/client/v3/keys/claim`

Native operation: `claimKeys`. Access: **unsupported**. Body: **required**. Response: **json**.

## create-content

`POST /_matrix/media/v1/create`

Native operation: `createContent`. Access: **agent**. Body: **none**. Response: **json**.

## create-room

`POST /_matrix/client/v3/createRoom`

Native operation: `createRoom`. Access: **operator**. Body: **required**. Response: **json**.

## deactivate-account

`POST /_matrix/client/v3/account/deactivate`

Native operation: `deactivateAccount`. Access: **account**. Body: **required**. Response: **json**.

## define-filter

`POST /_matrix/client/v3/user/{userId}/filter`

Native operation: `defineFilter`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## delete-device

`DELETE /_matrix/client/v3/devices/{deviceId}`

Native operation: `deleteDevice`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `deviceId` | path | yes | string |

## delete-devices

`POST /_matrix/client/v3/delete_devices`

Native operation: `deleteDevices`. Access: **operator**. Body: **required**. Response: **json**.

## delete-push-rule

`DELETE /_matrix/client/v3/pushrules/global/{kind}/{ruleId}`

Native operation: `deletePushRule`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |

## delete-room-alias

`DELETE /_matrix/client/v3/directory/room/{roomAlias}`

Native operation: `deleteRoomAlias`. Access: **operator**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomAlias` | path | yes | string |

## delete-room-key-by-session-id

`DELETE /_matrix/client/v3/room_keys/keys/{roomId}/{sessionId}`

Native operation: `deleteRoomKeyBySessionId`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |
| `roomId` | path | yes | string |
| `sessionId` | path | yes | string |

## delete-room-keys

`DELETE /_matrix/client/v3/room_keys/keys`

Native operation: `deleteRoomKeys`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |

## delete-room-keys-by-room-id

`DELETE /_matrix/client/v3/room_keys/keys/{roomId}`

Native operation: `deleteRoomKeysByRoomId`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |
| `roomId` | path | yes | string |

## delete-room-keys-version

`DELETE /_matrix/client/v3/room_keys/version/{version}`

Native operation: `deleteRoomKeysVersion`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | path | yes | string |

## delete-room-tag

`DELETE /_matrix/client/v3/user/{userId}/rooms/{roomId}/tags/{tag}`

Native operation: `deleteRoomTag`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `roomId` | path | yes | string |
| `tag` | path | yes | string |

## delete3pid-from-account

`POST /_matrix/client/v3/account/3pid/delete`

Native operation: `delete3pidFromAccount`. Access: **unsupported**. Body: **required**. Response: **json**.

## forget-room

`POST /_matrix/client/v3/rooms/{roomId}/forget`

Native operation: `forgetRoom`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## generate-login-token

`POST /_matrix/client/v1/login/get_token`

Native operation: `generateLoginToken`. Access: **account**. Body: **required**. Response: **json**.

## get-account-data

`GET /_matrix/client/v3/user/{userId}/account_data/{type}`

Native operation: `getAccountData`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `type` | path | yes | string |

## get-account-data-per-room

`GET /_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}`

Native operation: `getAccountDataPerRoom`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `roomId` | path | yes | string |
| `type` | path | yes | string |

## get-account3-pids

`GET /_matrix/client/v3/account/3pid`

Native operation: `getAccount3PIDs`. Access: **unsupported**. Body: **none**. Response: **json**.

## get-avatar-url

`GET /_matrix/client/v3/profile/{userId}/avatar_url`

Native operation: `getAvatarUrl`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## get-capabilities

`GET /_matrix/client/v3/capabilities`

Native operation: `getCapabilities`. Access: **agent**. Body: **none**. Response: **json**.

## get-config

`GET /_matrix/media/v3/config`

Native operation: `getConfig`. Access: **deprecated**. Body: **none**. Response: **json**.

## get-config-authed

`GET /_matrix/client/v1/media/config`

Native operation: `getConfigAuthed`. Access: **agent**. Body: **none**. Response: **json**.

## get-content

`GET /_matrix/media/v3/download/{serverName}/{mediaId}`

Native operation: `getContent`. Access: **deprecated**. Body: **none**. Response: **binary**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `allow_remote` | query | no | boolean |
| `timeout_ms` | query | no | integer |
| `allow_redirect` | query | no | boolean |

## get-content-authed

`GET /_matrix/client/v1/media/download/{serverName}/{mediaId}`

Native operation: `getContentAuthed`. Access: **agent**. Body: **none**. Response: **binary**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `timeout_ms` | query | no | integer |

## get-content-override-name

`GET /_matrix/media/v3/download/{serverName}/{mediaId}/{fileName}`

Native operation: `getContentOverrideName`. Access: **deprecated**. Body: **none**. Response: **binary**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `fileName` | path | yes | string |
| `allow_remote` | query | no | boolean |
| `timeout_ms` | query | no | integer |
| `allow_redirect` | query | no | boolean |

## get-content-override-name-authed

`GET /_matrix/client/v1/media/download/{serverName}/{mediaId}/{fileName}`

Native operation: `getContentOverrideNameAuthed`. Access: **agent**. Body: **none**. Response: **binary**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `fileName` | path | yes | string |
| `timeout_ms` | query | no | integer |

## get-content-thumbnail

`GET /_matrix/media/v3/thumbnail/{serverName}/{mediaId}`

Native operation: `getContentThumbnail`. Access: **deprecated**. Body: **none**. Response: **binary**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `width` | query | yes | integer |
| `height` | query | yes | integer |
| `method` | query | no | string |
| `allow_remote` | query | no | boolean |
| `timeout_ms` | query | no | integer |
| `allow_redirect` | query | no | boolean |
| `animated` | query | no | boolean |

## get-content-thumbnail-authed

`GET /_matrix/client/v1/media/thumbnail/{serverName}/{mediaId}`

Native operation: `getContentThumbnailAuthed`. Access: **agent**. Body: **none**. Response: **binary**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `width` | query | yes | integer |
| `height` | query | yes | integer |
| `method` | query | no | string |
| `timeout_ms` | query | no | integer |
| `animated` | query | no | boolean |

## get-device

`GET /_matrix/client/v3/devices/{deviceId}`

Native operation: `getDevice`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `deviceId` | path | yes | string |

## get-devices

`GET /_matrix/client/v3/devices`

Native operation: `getDevices`. Access: **agent**. Body: **none**. Response: **json**.

## get-display-name

`GET /_matrix/client/v3/profile/{userId}/displayname`

Native operation: `getDisplayName`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## get-event-by-timestamp

`GET /_matrix/client/v1/rooms/{roomId}/timestamp_to_event`

Native operation: `getEventByTimestamp`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `ts` | query | yes | integer |
| `dir` | query | yes | string |

## get-event-context

`GET /_matrix/client/v3/rooms/{roomId}/context/{eventId}`

Native operation: `getEventContext`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |
| `limit` | query | no | integer |
| `filter` | query | no | string |

## get-events

`GET /_matrix/client/v3/events`

Native operation: `getEvents`. Access: **deprecated**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `from` | query | no | string |
| `timeout` | query | no | integer |

## get-filter

`GET /_matrix/client/v3/user/{userId}/filter/{filterId}`

Native operation: `getFilter`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `filterId` | path | yes | string |

## get-joined-members-by-room

`GET /_matrix/client/v3/rooms/{roomId}/joined_members`

Native operation: `getJoinedMembersByRoom`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## get-joined-rooms

`GET /_matrix/client/v3/joined_rooms`

Native operation: `getJoinedRooms`. Access: **agent**. Body: **none**. Response: **json**.

## get-keys-changes

`GET /_matrix/client/v3/keys/changes`

Native operation: `getKeysChanges`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `from` | query | yes | string |
| `to` | query | yes | string |

## get-local-aliases

`GET /_matrix/client/v3/rooms/{roomId}/aliases`

Native operation: `getLocalAliases`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## get-login-flows

`GET /_matrix/client/v3/login`

Native operation: `getLoginFlows`. Access: **account**. Body: **none**. Response: **json**.

## get-members-by-room

`GET /_matrix/client/v3/rooms/{roomId}/members`

Native operation: `getMembersByRoom`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `at` | query | no | string |
| `membership` | query | no | string |
| `not_membership` | query | no | string |

## get-notifications

`GET /_matrix/client/v3/notifications`

Native operation: `getNotifications`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `from` | query | no | string |
| `limit` | query | no | integer |
| `only` | query | no | string |

## get-one-event

`GET /_matrix/client/v3/events/{eventId}`

Native operation: `getOneEvent`. Access: **deprecated**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `eventId` | path | yes | string |

## get-one-room-event

`GET /_matrix/client/v3/rooms/{roomId}/event/{eventId}`

Native operation: `getOneRoomEvent`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |

## get-presence

`GET /_matrix/client/v3/presence/{userId}/status`

Native operation: `getPresence`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## get-protocol-metadata

`GET /_matrix/client/v3/thirdparty/protocol/{protocol}`

Native operation: `getProtocolMetadata`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `protocol` | path | yes | string |

## get-protocols

`GET /_matrix/client/v3/thirdparty/protocols`

Native operation: `getProtocols`. Access: **unsupported**. Body: **none**. Response: **json**.

## get-public-rooms

`GET /_matrix/client/v3/publicRooms`

Native operation: `getPublicRooms`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `limit` | query | no | integer |
| `since` | query | no | string |
| `server` | query | no | string |

## get-push-rule

`GET /_matrix/client/v3/pushrules/global/{kind}/{ruleId}`

Native operation: `getPushRule`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |

## get-push-rule-actions

`GET /_matrix/client/v3/pushrules/global/{kind}/{ruleId}/actions`

Native operation: `getPushRuleActions`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |

## get-push-rules

`GET /_matrix/client/v3/pushrules/`

Native operation: `getPushRules`. Access: **agent**. Body: **none**. Response: **json**.

## get-push-rules-global

`GET /_matrix/client/v3/pushrules/global/`

Native operation: `getPushRulesGlobal`. Access: **agent**. Body: **none**. Response: **json**.

## get-pushers

`GET /_matrix/client/v3/pushers`

Native operation: `getPushers`. Access: **agent**. Body: **none**. Response: **json**.

## get-relating-events

`GET /_matrix/client/v1/rooms/{roomId}/relations/{eventId}`

Native operation: `getRelatingEvents`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |
| `from` | query | no | string |
| `to` | query | no | string |
| `limit` | query | no | integer |
| `dir` | query | no | string |
| `recurse` | query | no | boolean |

## get-relating-events-with-rel-type

`GET /_matrix/client/v1/rooms/{roomId}/relations/{eventId}/{relType}`

Native operation: `getRelatingEventsWithRelType`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |
| `relType` | path | yes | string |
| `from` | query | no | string |
| `to` | query | no | string |
| `limit` | query | no | integer |
| `dir` | query | no | string |
| `recurse` | query | no | boolean |

## get-relating-events-with-rel-type-and-event-type

`GET /_matrix/client/v1/rooms/{roomId}/relations/{eventId}/{relType}/{eventType}`

Native operation: `getRelatingEventsWithRelTypeAndEventType`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |
| `relType` | path | yes | string |
| `eventType` | path | yes | string |
| `from` | query | no | string |
| `to` | query | no | string |
| `limit` | query | no | integer |
| `dir` | query | no | string |
| `recurse` | query | no | boolean |

## get-room-events

`GET /_matrix/client/v3/rooms/{roomId}/messages`

Native operation: `getRoomEvents`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `from` | query | no | string |
| `to` | query | no | string |
| `dir` | query | yes | string |
| `limit` | query | no | integer |
| `filter` | query | no | string |

## get-room-id-by-alias

`GET /_matrix/client/v3/directory/room/{roomAlias}`

Native operation: `getRoomIdByAlias`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomAlias` | path | yes | string |

## get-room-key-by-session-id

`GET /_matrix/client/v3/room_keys/keys/{roomId}/{sessionId}`

Native operation: `getRoomKeyBySessionId`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |
| `roomId` | path | yes | string |
| `sessionId` | path | yes | string |

## get-room-keys

`GET /_matrix/client/v3/room_keys/keys`

Native operation: `getRoomKeys`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |

## get-room-keys-by-room-id

`GET /_matrix/client/v3/room_keys/keys/{roomId}`

Native operation: `getRoomKeysByRoomId`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |
| `roomId` | path | yes | string |

## get-room-keys-version

`GET /_matrix/client/v3/room_keys/version/{version}`

Native operation: `getRoomKeysVersion`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | path | yes | string |

## get-room-keys-version-current

`GET /_matrix/client/v3/room_keys/version`

Native operation: `getRoomKeysVersionCurrent`. Access: **unsupported**. Body: **none**. Response: **json**.

## get-room-state

`GET /_matrix/client/v3/rooms/{roomId}/state`

Native operation: `getRoomState`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## get-room-state-with-key

`GET /_matrix/client/v3/rooms/{roomId}/state/{eventType}/{stateKey}`

Native operation: `getRoomStateWithKey`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventType` | path | yes | string |
| `stateKey` | path | yes | string |

## get-room-tags

`GET /_matrix/client/v3/user/{userId}/rooms/{roomId}/tags`

Native operation: `getRoomTags`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `roomId` | path | yes | string |

## get-room-visibility-on-directory

`GET /_matrix/client/v3/directory/list/room/{roomId}`

Native operation: `getRoomVisibilityOnDirectory`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## get-space-hierarchy

`GET /_matrix/client/v1/rooms/{roomId}/hierarchy`

Native operation: `getSpaceHierarchy`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `suggested_only` | query | no | boolean |
| `limit` | query | no | integer |
| `max_depth` | query | no | integer |
| `from` | query | no | string |

## get-thread-roots

`GET /_matrix/client/v1/rooms/{roomId}/threads`

Native operation: `getThreadRoots`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `include` | query | no | string |
| `limit` | query | no | integer |
| `from` | query | no | string |

## get-token-owner

`GET /_matrix/client/v3/account/whoami`

Native operation: `getTokenOwner`. Access: **agent**. Body: **none**. Response: **json**.

## get-turn-server

`GET /_matrix/client/v3/voip/turnServer`

Native operation: `getTurnServer`. Access: **unsupported**. Body: **none**. Response: **json**.

## get-url-preview

`GET /_matrix/media/v3/preview_url`

Native operation: `getUrlPreview`. Access: **deprecated**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `url` | query | yes | string |
| `ts` | query | no | integer |

## get-url-preview-authed

`GET /_matrix/client/v1/media/preview_url`

Native operation: `getUrlPreviewAuthed`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `url` | query | yes | string |
| `ts` | query | no | integer |

## get-user-profile

`GET /_matrix/client/v3/profile/{userId}`

Native operation: `getUserProfile`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## get-versions

`GET /_matrix/client/versions`

Native operation: `getVersions`. Access: **agent**. Body: **none**. Response: **json**.

## get-wellknown

`GET /.well-known/matrix/client`

Native operation: `getWellknown`. Access: **agent**. Body: **none**. Response: **json**.

## get-wellknown-support

`GET /.well-known/matrix/support`

Native operation: `getWellknownSupport`. Access: **agent**. Body: **none**. Response: **json**.

## get-who-is

`GET /_matrix/client/v3/admin/whois/{userId}`

Native operation: `getWhoIs`. Access: **operator**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## initial-sync

`GET /_matrix/client/v3/initialSync`

Native operation: `initialSync`. Access: **deprecated**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `limit` | query | no | integer |
| `archived` | query | no | boolean |

## invite-by3-pid

`POST /_matrix/client/v3/rooms/{roomId}/invite`

Native operation: `inviteBy3PID`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## invite-user

`POST /_matrix/client/v3/rooms/{roomId}/invite`

Native operation: `inviteUser`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## is-push-rule-enabled

`GET /_matrix/client/v3/pushrules/global/{kind}/{ruleId}/enabled`

Native operation: `isPushRuleEnabled`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |

## join-room

`POST /_matrix/client/v3/join/{roomIdOrAlias}`

Native operation: `joinRoom`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomIdOrAlias` | path | yes | string |
| `via` | query | no | array |

## join-room-by-id

`POST /_matrix/client/v3/rooms/{roomId}/join`

Native operation: `joinRoomById`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## kick

`POST /_matrix/client/v3/rooms/{roomId}/kick`

Native operation: `kick`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## knock-room

`POST /_matrix/client/v3/knock/{roomIdOrAlias}`

Native operation: `knockRoom`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomIdOrAlias` | path | yes | string |
| `via` | query | no | array |

## leave-room

`POST /_matrix/client/v3/rooms/{roomId}/leave`

Native operation: `leaveRoom`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## login

`POST /_matrix/client/v3/login`

Native operation: `login`. Access: **account**. Body: **required**. Response: **json**.

## logout

`POST /_matrix/client/v3/logout`

Native operation: `logout`. Access: **account**. Body: **none**. Response: **json**.

## logout-all

`POST /_matrix/client/v3/logout/all`

Native operation: `logout_all`. Access: **account**. Body: **none**. Response: **json**.

## peek-events

`GET /_matrix/client/v3/events`

Native operation: `peekEvents`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `from` | query | no | string |
| `timeout` | query | no | integer |
| `room_id` | query | no | string |

## ping-appservice

`POST /_matrix/client/v1/appservice/{appserviceId}/ping`

Native operation: `pingAppservice`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `appserviceId` | path | yes | string |

## post-pusher

`POST /_matrix/client/v3/pushers/set`

Native operation: `postPusher`. Access: **operator**. Body: **required**. Response: **json**.

## post-receipt

`POST /_matrix/client/v3/rooms/{roomId}/receipt/{receiptType}/{eventId}`

Native operation: `postReceipt`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `receiptType` | path | yes | string |
| `eventId` | path | yes | string |

## post-room-keys-version

`POST /_matrix/client/v3/room_keys/version`

Native operation: `postRoomKeysVersion`. Access: **unsupported**. Body: **required**. Response: **json**.

## post3-pids

`POST /_matrix/client/v3/account/3pid`

Native operation: `post3PIDs`. Access: **deprecated**. Body: **required**. Response: **json**.

## put-room-key-by-session-id

`PUT /_matrix/client/v3/room_keys/keys/{roomId}/{sessionId}`

Native operation: `putRoomKeyBySessionId`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |
| `roomId` | path | yes | string |
| `sessionId` | path | yes | string |

## put-room-keys

`PUT /_matrix/client/v3/room_keys/keys`

Native operation: `putRoomKeys`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |

## put-room-keys-by-room-id

`PUT /_matrix/client/v3/room_keys/keys/{roomId}`

Native operation: `putRoomKeysByRoomId`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | query | yes | string |
| `roomId` | path | yes | string |

## put-room-keys-version

`PUT /_matrix/client/v3/room_keys/version/{version}`

Native operation: `putRoomKeysVersion`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `version` | path | yes | string |

## query-keys

`POST /_matrix/client/v3/keys/query`

Native operation: `queryKeys`. Access: **unsupported**. Body: **required**. Response: **json**.

## query-location-by-alias

`GET /_matrix/client/v3/thirdparty/location`

Native operation: `queryLocationByAlias`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `alias` | query | yes | string |

## query-location-by-protocol

`GET /_matrix/client/v3/thirdparty/location/{protocol}`

Native operation: `queryLocationByProtocol`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `protocol` | path | yes | string |
| `searchFields` | query | no | string |

## query-public-rooms

`POST /_matrix/client/v3/publicRooms`

Native operation: `queryPublicRooms`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `server` | query | no | string |

## query-user-by-id

`GET /_matrix/client/v3/thirdparty/user`

Native operation: `queryUserByID`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userid` | query | yes | string |

## query-user-by-protocol

`GET /_matrix/client/v3/thirdparty/user/{protocol}`

Native operation: `queryUserByProtocol`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `protocol` | path | yes | string |
| `fields` | query | no | object |

## redact-event

`PUT /_matrix/client/v3/rooms/{roomId}/redact/{eventId}/{txnId}`

Native operation: `redactEvent`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |
| `txnId` | path | yes | string |

## redirect-to-id-p

`GET /_matrix/client/v3/login/sso/redirect/{idpId}`

Native operation: `redirectToIdP`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `idpId` | path | yes | string |
| `redirectUrl` | query | yes | string |

## redirect-to-sso

`GET /_matrix/client/v3/login/sso/redirect`

Native operation: `redirectToSSO`. Access: **unsupported**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `redirectUrl` | query | yes | string |

## refresh

`POST /_matrix/client/v3/refresh`

Native operation: `refresh`. Access: **account**. Body: **required**. Response: **json**.

## register

`POST /_matrix/client/v3/register`

Native operation: `register`. Access: **account**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | query | no | string |

## registration-token-validity

`GET /_matrix/client/v1/register/m.login.registration_token/validity`

Native operation: `registrationTokenValidity`. Access: **account**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `token` | query | yes | string |

## report-content

`POST /_matrix/client/v3/rooms/{roomId}/report/{eventId}`

Native operation: `reportContent`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventId` | path | yes | string |

## request-open-id-token

`POST /_matrix/client/v3/user/{userId}/openid/request_token`

Native operation: `requestOpenIdToken`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## request-token-to-register-email

`POST /_matrix/client/v3/register/email/requestToken`

Native operation: `requestTokenToRegisterEmail`. Access: **account**. Body: **required**. Response: **json**.

## request-token-to-register-msisdn

`POST /_matrix/client/v3/register/msisdn/requestToken`

Native operation: `requestTokenToRegisterMSISDN`. Access: **account**. Body: **required**. Response: **json**.

## request-token-to-reset-password-email

`POST /_matrix/client/v3/account/password/email/requestToken`

Native operation: `requestTokenToResetPasswordEmail`. Access: **account**. Body: **required**. Response: **json**.

## request-token-to-reset-password-msisdn

`POST /_matrix/client/v3/account/password/msisdn/requestToken`

Native operation: `requestTokenToResetPasswordMSISDN`. Access: **account**. Body: **required**. Response: **json**.

## request-token-to3-pid-email

`POST /_matrix/client/v3/account/3pid/email/requestToken`

Native operation: `requestTokenTo3PIDEmail`. Access: **unsupported**. Body: **required**. Response: **json**.

## request-token-to3-pidmsisdn

`POST /_matrix/client/v3/account/3pid/msisdn/requestToken`

Native operation: `requestTokenTo3PIDMSISDN`. Access: **unsupported**. Body: **required**. Response: **json**.

## room-initial-sync

`GET /_matrix/client/v3/rooms/{roomId}/initialSync`

Native operation: `roomInitialSync`. Access: **deprecated**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## search

`POST /_matrix/client/v3/search`

Native operation: `search`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `next_batch` | query | no | string |

## search-user-directory

`POST /_matrix/client/v3/user_directory/search`

Native operation: `searchUserDirectory`. Access: **agent**. Body: **required**. Response: **json**.

## send-message

`PUT /_matrix/client/v3/rooms/{roomId}/send/{eventType}/{txnId}`

Native operation: `sendMessage`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventType` | path | yes | string |
| `txnId` | path | yes | string |

## send-to-device

`PUT /_matrix/client/v3/sendToDevice/{eventType}/{txnId}`

Native operation: `sendToDevice`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `eventType` | path | yes | string |
| `txnId` | path | yes | string |

## set-account-data

`PUT /_matrix/client/v3/user/{userId}/account_data/{type}`

Native operation: `setAccountData`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `type` | path | yes | string |

## set-account-data-per-room

`PUT /_matrix/client/v3/user/{userId}/rooms/{roomId}/account_data/{type}`

Native operation: `setAccountDataPerRoom`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `roomId` | path | yes | string |
| `type` | path | yes | string |

## set-avatar-url

`PUT /_matrix/client/v3/profile/{userId}/avatar_url`

Native operation: `setAvatarUrl`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## set-display-name

`PUT /_matrix/client/v3/profile/{userId}/displayname`

Native operation: `setDisplayName`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## set-presence

`PUT /_matrix/client/v3/presence/{userId}/status`

Native operation: `setPresence`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |

## set-push-rule

`PUT /_matrix/client/v3/pushrules/global/{kind}/{ruleId}`

Native operation: `setPushRule`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |
| `before` | query | no | string |
| `after` | query | no | string |

## set-push-rule-actions

`PUT /_matrix/client/v3/pushrules/global/{kind}/{ruleId}/actions`

Native operation: `setPushRuleActions`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |

## set-push-rule-enabled

`PUT /_matrix/client/v3/pushrules/global/{kind}/{ruleId}/enabled`

Native operation: `setPushRuleEnabled`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `kind` | path | yes | string |
| `ruleId` | path | yes | string |

## set-read-marker

`POST /_matrix/client/v3/rooms/{roomId}/read_markers`

Native operation: `setReadMarker`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## set-room-alias

`PUT /_matrix/client/v3/directory/room/{roomAlias}`

Native operation: `setRoomAlias`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomAlias` | path | yes | string |

## set-room-state-with-key

`PUT /_matrix/client/v3/rooms/{roomId}/state/{eventType}/{stateKey}`

Native operation: `setRoomStateWithKey`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |
| `eventType` | path | yes | string |
| `stateKey` | path | yes | string |

## set-room-tag

`PUT /_matrix/client/v3/user/{userId}/rooms/{roomId}/tags/{tag}`

Native operation: `setRoomTag`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `roomId` | path | yes | string |
| `tag` | path | yes | string |

## set-room-visibility-on-directory

`PUT /_matrix/client/v3/directory/list/room/{roomId}`

Native operation: `setRoomVisibilityOnDirectory`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## set-typing

`PUT /_matrix/client/v3/rooms/{roomId}/typing/{userId}`

Native operation: `setTyping`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `userId` | path | yes | string |
| `roomId` | path | yes | string |

## sync

`GET /_matrix/client/v3/sync`

Native operation: `sync`. Access: **agent**. Body: **none**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `filter` | query | no | string |
| `since` | query | no | string |
| `full_state` | query | no | boolean |
| `set_presence` | query | no | string |
| `timeout` | query | no | integer |

## unban

`POST /_matrix/client/v3/rooms/{roomId}/unban`

Native operation: `unban`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## unbind3pid-from-account

`POST /_matrix/client/v3/account/3pid/unbind`

Native operation: `unbind3pidFromAccount`. Access: **unsupported**. Body: **required**. Response: **json**.

## update-appservice-room-directory-visibility

`PUT /_matrix/client/v3/directory/list/appservice/{networkId}/{roomId}`

Native operation: `updateAppserviceRoomDirectoryVisibility`. Access: **unsupported**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `networkId` | path | yes | string |
| `roomId` | path | yes | string |

## update-device

`PUT /_matrix/client/v3/devices/{deviceId}`

Native operation: `updateDevice`. Access: **agent**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `deviceId` | path | yes | string |

## upgrade-room

`POST /_matrix/client/v3/rooms/{roomId}/upgrade`

Native operation: `upgradeRoom`. Access: **operator**. Body: **required**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `roomId` | path | yes | string |

## upload-content

`POST /_matrix/media/v3/upload`

Native operation: `uploadContent`. Access: **agent**. Body: **binary**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `filename` | query | no | string |

## upload-content-to-mxc

`PUT /_matrix/media/v3/upload/{serverName}/{mediaId}`

Native operation: `uploadContentToMXC`. Access: **agent**. Body: **binary**. Response: **json**.

| Parameter | Location | Required | Type |
| --- | --- | --- | --- |
| `serverName` | path | yes | string |
| `mediaId` | path | yes | string |
| `filename` | query | no | string |

## upload-cross-signing-keys

`POST /_matrix/client/v3/keys/device_signing/upload`

Native operation: `uploadCrossSigningKeys`. Access: **unsupported**. Body: **required**. Response: **json**.

## upload-cross-signing-signatures

`POST /_matrix/client/v3/keys/signatures/upload`

Native operation: `uploadCrossSigningSignatures`. Access: **unsupported**. Body: **required**. Response: **json**.

## upload-keys

`POST /_matrix/client/v3/keys/upload`

Native operation: `uploadKeys`. Access: **unsupported**. Body: **required**. Response: **json**.
