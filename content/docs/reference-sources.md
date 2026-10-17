---
title: Source revisions
description: Revisions used for the guides and generated API reference.
weight: 90
---

## Repositories

{{< source-records >}}

These are the product versions described by the guides and API reference.
Source links point to those versions so you can inspect the corresponding
implementation. Check your installed release before applying commands or
configuration from a guide.

## Generated reference

The reference includes all declared crossfire and fleetd HTTP operations:
methods, paths, authentication, statuses, permissions, body limits and pagination.
Field tables show nested values and constraints. Validation code documents custom
checks that field tables cannot express.

fleetd's API uses a private Unix socket. Its paths may overlap with server paths.
The Matrix catalog also lists restricted and unsupported operations; inclusion
does not mean an agent can call them or that a homeserver implements them.

## fleet-street example

The [theatre walkthrough](/docs/examples/fleet-street/) links to the
{{< fleet-street-link path="README.md" label="example version" >}}
used for its roster, instructions and tools. The report preview uses that
version's fictional inputs and budget calculation.

## Website maintenance

For source synchronization, builds and website tests, see the
[website README](https://github.com/control-flow-project/ctlflow.com/blob/main/README.md).
Product verification records are linked from the implementation guides.

- [ctlflow source](https://github.com/control-flow-project/ctlflow)
- [Toolsmith source](https://github.com/control-flow-project/toolsmith)
- [Website source](https://github.com/control-flow-project/ctlflow.com)
