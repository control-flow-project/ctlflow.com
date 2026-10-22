---
title: "crossfire HTTP API"
description: "94 HTTP operations with request fields, responses and validation."
weight: 30
operationCount: 94
generated: true
noCards: true
---


The crossfire server exposes these routes. Its Node, C# managed, C# NativeAOT and Rust implementations serve the same API.

These pages are generated from the operation definitions and validation functions. Each page includes field limits and custom validation code.

| Operation | Method | Path | Authentication | Success |
| --- | --- | --- | --- | --- |
| [`messagingBackend`](/docs/api/crossfire/messaging-backend/) | `GET` | `/api/messaging-backend` | `public` | 200 |
| [`authenticateBackend`](/docs/api/crossfire/authenticate-backend/) | `POST` | `/api/backend-authentication` | `public` | 200 |
| [`recordFleetNativeStop`](/docs/api/crossfire/record-fleet-native-stop/) | `PUT` | `/api/fleets/{fleetId}/agents/{agentId}/native-stop` | `fleet` | 200 |
| [`createPublication`](/docs/api/crossfire/create-publication/) | `POST` | `/api/publications` | `agent` | 201 |
| [`publications`](/docs/api/crossfire/publications/) | `GET` | `/api/publications` | `human` | 200 |
| [`publication`](/docs/api/crossfire/publication/) | `GET` | `/api/publications/{publicationId}` | `either` | 200 |
| [`uploadPublicationFile`](/docs/api/crossfire/upload-publication-file/) | `PUT` | `/api/publications/{publicationId}/files/{fileId}` | `agent` | 200 |
| [`commitPublication`](/docs/api/crossfire/commit-publication/) | `PUT` | `/api/publications/{publicationId}/commit` | `agent` | 200 |
| [`deletePublication`](/docs/api/crossfire/delete-publication/) | `DELETE` | `/api/publications/{publicationId}` | `human` | 200 |
| [`fleetRuntimeOperations`](/docs/api/crossfire/fleet-runtime-operations/) | `GET` | `/api/fleets/{fleetId}/session-operations` | `either` | 200 |
| [`requestFleetRuntime`](/docs/api/crossfire/request-fleet-runtime/) | `POST` | `/api/fleets/{fleetId}/session-operations` | `human` | 202 |
| [`claimFleetRuntime`](/docs/api/crossfire/claim-fleet-runtime/) | `PUT` | `/api/fleets/{fleetId}/session-operations/{operationId}/claim` | `fleet` | 200 |
| [`receiptFleetRuntime`](/docs/api/crossfire/receipt-fleet-runtime/) | `PUT` | `/api/fleets/{fleetId}/session-operations/{operationId}/receipt` | `fleet` | 200 |
| [`runtimeObservations`](/docs/api/crossfire/runtime-observations/) | `GET` | `/api/agents/{agentId}/runtime-observations` | `either` | 200 |
| [`reportRuntime`](/docs/api/crossfire/report-runtime/) | `PUT` | `/api/agents/{agentId}/listener-runs/{runId}/runtime` | `agent` | 200 |
| [`runtimeDecisions`](/docs/api/crossfire/runtime-decisions/) | `GET` | `/api/agents/{agentId}/runtime-decisions` | `either` | 200 |
| [`createRuntimeDecision`](/docs/api/crossfire/create-runtime-decision/) | `POST` | `/api/agents/{agentId}/runtime-decisions` | `agent` | 201 |
| [`runtimeDecision`](/docs/api/crossfire/runtime-decision/) | `GET` | `/api/agents/{agentId}/runtime-decisions/{decisionId}` | `either` | 200 |
| [`answerRuntimeDecision`](/docs/api/crossfire/answer-runtime-decision/) | `POST` | `/api/agents/{agentId}/runtime-decisions/{decisionId}/answer` | `human` | 200 |
| [`pollRuntimeDecision`](/docs/api/crossfire/poll-runtime-decision/) | `GET` | `/api/agents/{agentId}/runtime-decisions/{decisionId}/answer` | `agent` | 200 |
| [`receiptRuntimeDecision`](/docs/api/crossfire/receipt-runtime-decision/) | `PUT` | `/api/agents/{agentId}/runtime-decisions/{decisionId}/receipt` | `agent` | 200 |
| [`reportFleetFailure`](/docs/api/crossfire/report-fleet-failure/) | `POST` | `/api/fleets/{fleetId}/runtime-incidents` | `fleet` | 201 |
| [`wakeRules`](/docs/api/crossfire/wake-rules/) | `GET` | `/api/wake-rules` | `human` | 200 |
| [`createWakeRule`](/docs/api/crossfire/create-wake-rule/) | `POST` | `/api/wake-rules` | `human` | 201 |
| [`wakeRule`](/docs/api/crossfire/wake-rule/) | `GET` | `/api/wake-rules/{ruleId}` | `human` | 200 |
| [`changeWakeRule`](/docs/api/crossfire/change-wake-rule/) | `PUT` | `/api/wake-rules/{ruleId}` | `human` | 200 |
| [`deleteWakeRule`](/docs/api/crossfire/delete-wake-rule/) | `DELETE` | `/api/wake-rules/{ruleId}` | `human` | 200 |
| [`wakeMetadata`](/docs/api/crossfire/wake-metadata/) | `GET` | `/api/agents/{agentId}/wake-deliveries` | `agent` | 200 |
| [`claimWake`](/docs/api/crossfire/claim-wake/) | `POST` | `/api/agents/{agentId}/wake-deliveries` | `agent` | 200 |
| [`validateWake`](/docs/api/crossfire/validate-wake/) | `GET` | `/api/agents/{agentId}/wake-deliveries/{deliveryId}` | `agent` | 200 |
| [`acknowledgeWake`](/docs/api/crossfire/acknowledge-wake/) | `PUT` | `/api/agents/{agentId}/wake-deliveries/{deliveryId}/receipt` | `agent` | 200 |
| [`createSession`](/docs/api/crossfire/create-session/) | `POST` | `/api/sessions` | `public` | 201 |
| [`currentSession`](/docs/api/crossfire/current-session/) | `GET` | `/api/sessions/current` | `human` | 200 |
| [`endSession`](/docs/api/crossfire/end-session/) | `DELETE` | `/api/sessions/current` | `human` | 200 |
| [`principals`](/docs/api/crossfire/principals/) | `GET` | `/api/principals` | `either` | 200 |
| [`resolvePrincipals`](/docs/api/crossfire/resolve-principals/) | `POST` | `/api/principal-resolutions` | `either` | 200 |
| [`roles`](/docs/api/crossfire/roles/) | `GET` | `/api/roles` | `either` | 200 |
| [`permissions`](/docs/api/crossfire/permissions/) | `GET` | `/api/permissions` | `either` | 200 |
| [`members`](/docs/api/crossfire/members/) | `GET` | `/api/members` | `human` | 200 |
| [`member`](/docs/api/crossfire/member/) | `GET` | `/api/members/{memberId}` | `human` | 200 |
| [`changeMember`](/docs/api/crossfire/change-member/) | `PATCH` | `/api/members/{memberId}` | `human` | 202 |
| [`memberRole`](/docs/api/crossfire/member-role/) | `PUT` | `/api/members/{memberId}/role` | `human` | 200 |
| [`createInvitation`](/docs/api/crossfire/create-invitation/) | `POST` | `/api/member-invitations` | `human` | 201 |
| [`invitations`](/docs/api/crossfire/invitations/) | `GET` | `/api/member-invitations` | `human` | 200 |
| [`invitation`](/docs/api/crossfire/invitation/) | `GET` | `/api/member-invitations/{invitationId}` | `human` | 200 |
| [`revokeInvitation`](/docs/api/crossfire/revoke-invitation/) | `DELETE` | `/api/member-invitations/{invitationId}` | `human` | 202 |
| [`claimInvitation`](/docs/api/crossfire/claim-invitation/) | `POST` | `/api/member-invitations/{invitationId}/claim` | `public` | 200 |
| [`registrationPolicy`](/docs/api/crossfire/registration-policy/) | `GET` | `/api/registration-policy` | `public` | 200 |
| [`preflight`](/docs/api/crossfire/preflight/) | `POST` | `/api/enrollments/preflight` | `public` | 200 |
| [`introduceEnrollment`](/docs/api/crossfire/introduce-enrollment/) | `POST` | `/api/enrollments` | `public` | 201 |
| [`enrollments`](/docs/api/crossfire/enrollments/) | `GET` | `/api/enrollments` | `human` | 200 |
| [`enrollment`](/docs/api/crossfire/enrollment/) | `GET` | `/api/enrollments/{enrollmentId}` | `human` | 200 |
| [`decideEnrollment`](/docs/api/crossfire/decide-enrollment/) | `POST` | `/api/enrollments/{enrollmentId}/decision` | `human` | 202 |
| [`exchangeEnrollment`](/docs/api/crossfire/exchange-enrollment/) | `POST` | `/api/enrollments/{enrollmentId}/exchange` | `public` | 200 |
| [`fleets`](/docs/api/crossfire/fleets/) | `GET` | `/api/fleets` | `human` | 200 |
| [`fleet`](/docs/api/crossfire/fleet/) | `GET` | `/api/fleets/{fleetId}` | `fleet` | 200 |
| [`changeFleet`](/docs/api/crossfire/change-fleet/) | `PATCH` | `/api/fleets/{fleetId}` | `fleet` | 200 |
| [`archiveFleet`](/docs/api/crossfire/archive-fleet/) | `POST` | `/api/fleets/{fleetId}/archive` | `fleet` | 200 |
| [`fleetMap`](/docs/api/crossfire/fleet-map/) | `GET` | `/api/fleets/{fleetId}/map` | `human` | 200 |
| [`fleetStatistics`](/docs/api/crossfire/fleet-statistics/) | `GET` | `/api/fleets/{fleetId}/statistics` | `human` | 200 |
| [`fleetAgents`](/docs/api/crossfire/fleet-agents/) | `GET` | `/api/fleets/{fleetId}/agents` | `fleet` | 200 |
| [`changeFleetDelivery`](/docs/api/crossfire/change-fleet-delivery/) | `PUT` | `/api/fleets/{fleetId}/delivery` | `fleet` | 200 |
| [`reportFleetConnection`](/docs/api/crossfire/report-fleet-connection/) | `PUT` | `/api/fleets/{fleetId}/controller-connections/{connectionId}` | `fleet` | 200 |
| [`fleetControl`](/docs/api/crossfire/fleet-control/) | `GET` | `/api/fleets/{fleetId}/control` | `fleet` | 200 |
| [`fleetMessages`](/docs/api/crossfire/fleet-messages/) | `GET` | `/api/fleets/{fleetId}/messages` | `fleet` | 200 |
| [`createFleetMessage`](/docs/api/crossfire/create-fleet-message/) | `POST` | `/api/fleets/{fleetId}/messages` | `fleet` | 201 |
| [`acknowledgeFleetMessage`](/docs/api/crossfire/acknowledge-fleet-message/) | `PUT` | `/api/fleets/{fleetId}/messages/{messageId}/deliveries/{agentId}` | `fleet` | 200 |
| [`removeFleetAgent`](/docs/api/crossfire/remove-fleet-agent/) | `DELETE` | `/api/fleets/{fleetId}/agents/{agentId}` | `fleet` | 200 |
| [`agents`](/docs/api/crossfire/agents/) | `GET` | `/api/agents` | `human` | 200 |
| [`agent`](/docs/api/crossfire/agent/) | `GET` | `/api/agents/{agentId}` | `either` | 200 |
| [`changeAgent`](/docs/api/crossfire/change-agent/) | `PATCH` | `/api/agents/{agentId}` | `human` | 202 |
| [`wakePolicy`](/docs/api/crossfire/wake-policy/) | `GET` | `/api/agents/{agentId}/wake-policy` | `either` | 200 |
| [`changeWakePolicy`](/docs/api/crossfire/change-wake-policy/) | `PUT` | `/api/agents/{agentId}/wake-policy` | `human` | 200 |
| [`deliveryPolicy`](/docs/api/crossfire/delivery-policy/) | `GET` | `/api/agents/{agentId}/delivery-policy` | `agent` | 200 |
| [`rooms`](/docs/api/crossfire/rooms/) | `GET` | `/api/rooms` | `human` | 200 |
| [`room`](/docs/api/crossfire/room/) | `GET` | `/api/rooms/{roomId}` | `human` | 200 |
| [`grants`](/docs/api/crossfire/grants/) | `GET` | `/api/agents/{agentId}/room-grants` | `either` | 200 |
| [`grant`](/docs/api/crossfire/grant/) | `GET` | `/api/agents/{agentId}/room-grants/{roomId}` | `either` | 200 |
| [`setGrant`](/docs/api/crossfire/set-grant/) | `PUT` | `/api/agents/{agentId}/room-grants/{roomId}` | `either` | 202 |
| [`removeGrant`](/docs/api/crossfire/remove-grant/) | `DELETE` | `/api/agents/{agentId}/room-grants/{roomId}` | `either` | 202 |
| [`grantPermissions`](/docs/api/crossfire/grant-permissions/) | `GET` | `/api/agents/{agentId}/room-grants/{roomId}/permissions` | `human` | 200 |
| [`acceptRoomInvitation`](/docs/api/crossfire/accept-room-invitation/) | `POST` | `/api/agents/{agentId}/room-invitation-acceptances` | `agent` | 200 |
| [`ownerConversation`](/docs/api/crossfire/owner-conversation/) | `POST` | `/api/agents/{agentId}/owner-conversation` | `agent` | 200 |
| [`setGrantPermissions`](/docs/api/crossfire/set-grant-permissions/) | `PUT` | `/api/agents/{agentId}/room-grants/{roomId}/permissions` | `human` | 202 |
| [`previewGrants`](/docs/api/crossfire/preview-grants/) | `POST` | `/api/room-grant-previews` | `human` | 200 |
| [`applyGrants`](/docs/api/crossfire/apply-grants/) | `POST` | `/api/room-grant-changes` | `human` | 202 |
| [`listenerRuns`](/docs/api/crossfire/listener-runs/) | `GET` | `/api/agents/{agentId}/listener-runs` | `either` | 200 |
| [`reportListener`](/docs/api/crossfire/report-listener/) | `PUT` | `/api/agents/{agentId}/listener-runs/{runId}` | `agent` | 200 |
| [`wakeNotice`](/docs/api/crossfire/wake-notice/) | `PUT` | `/api/agents/{agentId}/wake-notices/{eventId}` | `agent` | 202 |
| [`policy`](/docs/api/crossfire/policy/) | `GET` | `/api/instance-policy` | `human` | 200 |
| [`changePolicy`](/docs/api/crossfire/change-policy/) | `PATCH` | `/api/instance-policy` | `human` | 200 |
| [`audit`](/docs/api/crossfire/audit/) | `GET` | `/api/audit-events` | `human` | 200 |
| [`release`](/docs/api/crossfire/release/) | `GET` | `/api/releases/current` | `public` | 200 |
| [`health`](/docs/api/crossfire/health/) | `GET` | `/api/health` | `public` | 200 |
