---
title: API reference
description: Product-owned HTTP operations, shared envelopes, exact parser definitions and native HTTP protocols.
weight: 50
---

There are two separate product catalogs:

- **crossfire:** HTTP coordination routes under the application origin's `/api` namespace.
- **fleetd:** private controller HTTP carried over the owning user's Unix socket, locally or through SSH.

Their catalog paths overlap because they are different services. Do not send a controller operation to the crossfire origin or expose the private socket through a public HTTP server.

The reference retains scalar limits, nested object/array fields, optional/null distinctions, exact query parsers, custom branches and refinement predicates. Parser source is part of the contract; this site does not assert that arbitrary TypeScript runtime functions are JSON Schema.

Native Matrix forwarding, signup fallback, onboarding assets, management/Element static assets and public report reads use separate protocols described alongside the catalogs.
