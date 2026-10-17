---
title: "fleetd private API"
description: "19 HTTP operations with request fields, responses and validation."
weight: 40
operationCount: 19
generated: true
noCards: true
---


fleet calls this **private Unix-socket API** locally or over SSH. Socket ownership restricts access. `auth: public` means no additional session cookie or bearer token is required.

These pages are generated from the operation definitions and validation functions. Each page includes field limits and custom validation code.

| Operation | Method | Path | Authentication | Success |
| --- | --- | --- | --- | --- |
| [`setup`](/docs/api/fleetd/setup/) | `POST` | `/api/setup` | `public` | 200 |
| [`status`](/docs/api/fleetd/status/) | `GET` | `/api/status` | `public` | 200 |
| [`fleets`](/docs/api/fleetd/fleets/) | `GET` | `/api/fleets` | `public` | 200 |
| [`addFleet`](/docs/api/fleetd/add-fleet/) | `POST` | `/api/fleets` | `public` | 201 |
| [`fleet`](/docs/api/fleetd/fleet/) | `GET` | `/api/fleets/{fleetId}` | `public` | 200 |
| [`readiness`](/docs/api/fleetd/readiness/) | `GET` | `/api/fleets/{fleetId}/readiness` | `public` | 200 |
| [`changeFleet`](/docs/api/fleetd/change-fleet/) | `PATCH` | `/api/fleets/{fleetId}` | `public` | 200 |
| [`removeFleet`](/docs/api/fleetd/remove-fleet/) | `DELETE` | `/api/fleets/{fleetId}` | `public` | 200 |
| [`changeFleetDelivery`](/docs/api/fleetd/change-fleet-delivery/) | `PUT` | `/api/fleets/{fleetId}/delivery` | `public` | 200 |
| [`createFleetMessage`](/docs/api/fleetd/create-fleet-message/) | `POST` | `/api/fleets/{fleetId}/messages` | `public` | 201 |
| [`agents`](/docs/api/fleetd/agents/) | `GET` | `/api/fleets/{fleetId}/agents` | `public` | 200 |
| [`addAgent`](/docs/api/fleetd/add-agent/) | `POST` | `/api/fleets/{fleetId}/agents` | `public` | 201 |
| [`agent`](/docs/api/fleetd/agent/) | `GET` | `/api/fleets/{fleetId}/agents/{instanceKey}` | `public` | 200 |
| [`contexts`](/docs/api/fleetd/contexts/) | `GET` | `/api/fleets/{fleetId}/agents/{instanceKey}/contexts` | `public` | 200 |
| [`attachment`](/docs/api/fleetd/attachment/) | `GET` | `/api/fleets/{fleetId}/agents/{instanceKey}/attachment` | `public` | 200 |
| [`changeAgent`](/docs/api/fleetd/change-agent/) | `PATCH` | `/api/fleets/{fleetId}/agents/{instanceKey}` | `public` | 200 |
| [`removeAgent`](/docs/api/fleetd/remove-agent/) | `DELETE` | `/api/fleets/{fleetId}/agents/{instanceKey}` | `public` | 200 |
| [`operate`](/docs/api/fleetd/operate/) | `POST` | `/api/operations` | `public` | 202 |
| [`operation`](/docs/api/fleetd/operation/) | `GET` | `/api/operations/{operationId}` | `public` | 200 |
