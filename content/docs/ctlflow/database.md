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
        schema.json
        migrations/
          00_initial.mjs
          assets/
            sqlite.mjs
        seeds/
          README.md
```

Each database has a named directory, a backend subdirectory and a knexfile.
`@ctlflow/crossfire-data` is package-private.

Management SQLite is the application database. Conduit uses RocksDB, while
fleetd and the native runtimes keep file-based state. Knex does not manage those
stores.

## Current contract

The store uses application ID 1129465426 and the sole current schema, numbered 1.
It has 57 singular STRICT application tables, 101 foreign-key relations,
87 explicit indexes and 20 triggers, with normalized relations.
Knex owns its tracking/locking tables separately.
Roles and permissions are reference data created by the initial migration,
not development demo seeds.

- [Migration contract](source:ctlflow:services/crossfire/database/management/sqlite/contract.json)
- [Current schema](source:ctlflow:services/crossfire/database/management/sqlite/schema.json)

The completed Knex migration list is part of runtime validation. Initialization
creates the current model directly; there is no historical schema, converter,
adoption branch or alternate reader. Update the contract, generated EF/Diesel
metadata and affected queries/tests together. EF and Diesel do not create or
migrate tables.

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

The one initial migration creates tables, constraints, indexes, triggers and
reference data transactionally. Repeating it is idempotent. No application
silently converts or resets a database. A fresh-state operation requires explicit
authorization and never includes credentials or saved native histories by default.

## Upgrade order

Use the same Compose project and state throughout. Stop crossfire writers, remove
the completed migrate job, then run up with the matching runtime/migration
images. The success dependency gates runtime activation on a fresh Knex job.
Dependency order alone does not quiesce a previous runtime or replace a completed
job. A failure blocks activation. Backups are optional and operator-managed;
SQLite backups must include committed WAL state. Never delete state or volumes
to recover a failed migration or force-unlock while a writer might remain.

All implementations open the same file. Fixtures also use the actual Knex
migration, including the EF model generator's input. Acceptance checks current
constraints and values, rollback, repeated execution, startup validation,
same-file access and actual migration-container behavior.

- [Operations](/docs/crossfire/operations/)
- [Logging and current recovery records](/docs/crossfire/retention/)
