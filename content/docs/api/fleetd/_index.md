---
title: "fleetd private API"
description: "20 HTTP operations with request fields, responses and validation."
weight: 40
operationCount: 20
generated: true
noCards: true
---


fleet calls this **private Unix-socket API** locally or over SSH. Every operation requires the OS-user controller credential in `Authorization: Bearer <authenticationKey>`, in addition to private socket ownership. fleetd initializes the key; fleet reads it from the same private OS-native configuration. There are no anonymous endpoints. See [controller authentication](/docs/fleetd/authentication/) for paths, remote access and recovery.

These pages are generated from the operation definitions and validation functions. Each page includes field limits and custom validation code.

| Operation | Method | Path | Authentication | Success |
| --- | --- | --- | --- | --- |
| [`diagnostics`](/docs/api/fleetd/diagnostics/) | `GET` | `/api/diagnostics` | `controller` | 200 |
| [`setup`](/docs/api/fleetd/setup/) | `POST` | `/api/setup` | `controller` | 200 |
| [`status`](/docs/api/fleetd/status/) | `GET` | `/api/status` | `controller` | 200 |
| [`fleets`](/docs/api/fleetd/fleets/) | `GET` | `/api/fleets` | `controller` | 200 |
| [`addFleet`](/docs/api/fleetd/add-fleet/) | `POST` | `/api/fleets` | `controller` | 201 |
| [`fleet`](/docs/api/fleetd/fleet/) | `GET` | `/api/fleets/{fleetId}` | `controller` | 200 |
| [`readiness`](/docs/api/fleetd/readiness/) | `GET` | `/api/fleets/{fleetId}/readiness` | `controller` | 200 |
| [`changeFleet`](/docs/api/fleetd/change-fleet/) | `PATCH` | `/api/fleets/{fleetId}` | `controller` | 200 |
| [`removeFleet`](/docs/api/fleetd/remove-fleet/) | `DELETE` | `/api/fleets/{fleetId}` | `controller` | 200 |
| [`changeFleetDelivery`](/docs/api/fleetd/change-fleet-delivery/) | `PUT` | `/api/fleets/{fleetId}/delivery` | `controller` | 200 |
| [`createFleetMessage`](/docs/api/fleetd/create-fleet-message/) | `POST` | `/api/fleets/{fleetId}/messages` | `controller` | 201 |
| [`agents`](/docs/api/fleetd/agents/) | `GET` | `/api/fleets/{fleetId}/agents` | `controller` | 200 |
| [`addAgent`](/docs/api/fleetd/add-agent/) | `POST` | `/api/fleets/{fleetId}/agents` | `controller` | 201 |
| [`agent`](/docs/api/fleetd/agent/) | `GET` | `/api/fleets/{fleetId}/agents/{instanceKey}` | `controller` | 200 |
| [`contexts`](/docs/api/fleetd/contexts/) | `GET` | `/api/fleets/{fleetId}/agents/{instanceKey}/contexts` | `controller` | 200 |
| [`attachment`](/docs/api/fleetd/attachment/) | `GET` | `/api/fleets/{fleetId}/agents/{instanceKey}/attachment` | `controller` | 200 |
| [`changeAgent`](/docs/api/fleetd/change-agent/) | `PATCH` | `/api/fleets/{fleetId}/agents/{instanceKey}` | `controller` | 200 |
| [`removeAgent`](/docs/api/fleetd/remove-agent/) | `DELETE` | `/api/fleets/{fleetId}/agents/{instanceKey}` | `controller` | 200 |
| [`operate`](/docs/api/fleetd/operate/) | `POST` | `/api/operations` | `controller` | 202 |
| [`operation`](/docs/api/fleetd/operation/) | `GET` | `/api/operations/{operationId}` | `controller` | 200 |
