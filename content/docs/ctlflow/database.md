---
title: "SQLite and Knex"
description: "SQLite schema, Knex migrations and upgrade order for every server implementation."
weight: 35
sourceProject: "ctlflow"
sourcePath: "services/crossfire/database/README.md"
---

Knex creates and migrates every owned SQL database, independent of application
language. Node uses Tinqer, C# uses EF and Rust uses Diesel for application queries.
No application creates tables, seeds reference data or migrates on open.

## Layout

```text
services/crossfire/
  knexfile.management.mjs
  database/
    package.json
    management/
      sqlite/
        configuration.mjs
        configuration.d.mts
        contract.json
        migrations/
          20261014000000_initial_schema.mjs
          20261014000001_initial_data.mjs
          20261018000000_listener_activity_index.mjs
          assets/
            schema-17.json
            sqlite.mjs
            deployed-schema.mjs
            enrollment.mjs
        seeds/
          README.md
```

Each database has a named directory, a backend subdirectory and a knexfile.
`@ctlflow/crossfire-data` is package-private.

Management SQLite is the application database. Conduit uses RocksDB, while
fleetd and the native runtimes keep file-based state. Knex does not manage those
stores.

## Current contract

The store uses application ID 1129465426 and schema 18.
Its baseline has 63 singular STRICT application tables with normalized relations.
Knex owns its tracking/locking tables separately.
Roles and permissions are versioned reference data, not development demo seeds.

- [Migration contract](source:ctlflow:services/crossfire/database/management/sqlite/contract.json)
- [Baseline schema](source:ctlflow:services/crossfire/database/management/sqlite/migrations/assets/schema-17.json)

The applied migration filenames are part of runtime admission.
Append a forward migration for a new release; do not edit released migration
bytes. Update the current contract, generated EF/Diesel metadata and affected queries/tests
together. EF and Diesel do not create or migrate tables.

## Commands

```sh
CROSSFIRE_DATA_DIR=/absolute/private/runtime \
  npm run migrate:latest:management:sqlite --workspace=@ctlflow/crossfire
CROSSFIRE_DATA_DIR=/absolute/private/runtime \
  npm run migrate:status:management:sqlite --workspace=@ctlflow/crossfire
```

The migration-make script creates the next ESM migration.
Runtime deployment uses the same one-shot migration image for Node, both C#
outputs and Rust. It needs no provider/model work or Matrix credentials.

Supported deployed versions 13–16 convert transactionally to 17.
A separate append-only Knex migration then adds the current listener activity
index and advances to schema 18. The schema-17 baseline asset remains immutable.
A current schema without Knex history is adopted without changing application
rows. Foreign, future and unsupported older stores are rejected before mutation.
Rollback/reset is not an upgrade strategy.

## Upgrade order

Acquire exclusive instance ownership, stop/confirm owned writers, verify the
required private backup, run Knex, then start the selected application.
Failure blocks later phases. Current migrated stores do not accumulate redundant
upgrade backups. Never force-unlock a Knex migration while a writer might remain.

All implementations open the same file. Fixtures also use actual Knex migrations,
including the EF model generator's input. Acceptance checks historical values,
rollback, repeated execution, startup refusal, same-file access and actual
migration-container behavior.

- [Operations](/docs/crossfire/operations/)
- [Logging and current recovery records](/docs/crossfire/retention/)
