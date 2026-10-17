---
title: "fleetd private API"
description: "19 exact fleetd operation contracts, with nested fields, custom predicates and source definitions."
weight: 40
operationCount: 19
generated: true
noCards: true
---


This is a **private Unix-socket API**, not an Internet-exposed service. fleet uses it locally or over authenticated SSH. Catalog `auth: public` means no separate human/agent cookie or bearer requirement inside that private transport boundary.

The reference is generated from the executable operation catalog and its transitive parser definitions. Nested objects, array items, optional/null fields, scalar bounds and custom predicates are retained. This is not a generated OpenAPI/JSON Schema claim.

| Operation | Method | Path | Audience | Success |
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
