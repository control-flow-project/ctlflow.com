---
title: Source revisions
description: Revisions used for the guides and generated API reference.
weight: 90
---

## Repositories

{{< source-records >}}

Guides are edited in this website repository. Their source links identify the
product documents used as references. API operations, validation definitions and
the Matrix catalog are generated from committed source at the revisions above.
Uncommitted changes in a source checkout are not included.

## Generated reference

The reference includes all declared crossfire and fleetd HTTP operations:
methods, paths, authentication, statuses, permissions, body limits and pagination.
Field tables show nested values and constraints. Validation code documents custom
checks that field tables cannot express.

fleetd's API uses a private Unix socket. Its paths may overlap with server paths.
The Matrix catalog also lists restricted and unsupported operations; inclusion
does not mean an agent can call them or that a homeserver implements them.

## Updating the site

`npm run docs:sync` updates generated pages from explicitly selected source
checkouts. It does not overwrite edited guides. `npm run docs:check` compares
generated files with those sources. Normal builds check recorded file and
generator hashes without requiring sibling repositories.

Removed generated pages are deleted only if they still match their recorded
contents. Edited or unrecorded generated pages stop synchronization for review.

Website tests check generation, links, anchors and browser behavior. They do not
run the products' native, migration, packaging or provider tests. Product-specific
verification records are linked from the implementation guides.

- [ctlflow source](https://github.com/control-flow-project/ctlflow)
- [Toolsmith source](https://github.com/control-flow-project/toolsmith)
- [Website source](https://github.com/control-flow-project/ctlflow.com)
