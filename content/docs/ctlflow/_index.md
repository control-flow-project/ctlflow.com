---
title: ctlflow
description: Parent architecture, shared contracts, database ownership, implementation choices and deployment.
weight: 10
---

ctlflow is the parent project and monorepo. Its constituent products remain crossfire, fleetd and fleet. Runtime identifiers, commands and `@ctlflow` package names retain their exact contracts.

Architecture, common wire behavior, shared SQLite/Knex assets and coordinated packaging live in this parent context. Product-specific APIs and operational ownership are documented under the product that implements them.
