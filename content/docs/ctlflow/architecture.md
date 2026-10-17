---
title: Architecture and ownership
description: Component, process, transport and storage boundaries for ctlflow and its three products.
weight: 10
---

## Products, not implementation modes

{{< diagram "products" >}}

The monorepo groups three products. Each product has Node, C# and Rust source owners. C# managed and NativeAOT are build modes of the same source, not competing APIs or automatic fallbacks.

| Product | Runs where | Owns | Does not own |
| --- | --- | --- | --- |
| crossfire | Server host | Identity, enrollment, authorization, desired room access, coordination records, static report publication, management UI | Agent processes or provider credentials on a user's controller host |
| fleetd | User's controller host | Fleet registry, shared listener, native runtime processes, exact histories, input receipts and recovery | Human approval, another owner's fleet or server database migrations |
| fleet | Local client or SSH client | Command presentation and calls to fleetd's private API | A second listener, separate process orchestration or another history format |

The shared React UI and SQLite schema belong to crossfire's service boundary. They are reused by each crossfire implementation. Shared external contract tests assert the same observable behavior against selected executables.

## Runtime topology

{{< diagram "execution" >}}

1. Humans use Element/Matrix for room conversations and crossfire management for human actions.
2. crossfire manages authority and desired state, and performs native Matrix operations over HTTP. It does not require a Node Matrix SDK.
3. fleetd authenticates an exclusive fleet controller lease, then hosts the listener with separate agent credentials, cursors, permissions and journals.
4. A runtime adapter owns native Codex or Pi sessions, instructions, observations, interruption and receipt evidence.
5. fleet calls the same private fleetd API locally over a Unix socket or through authenticated SSH. There is no public controller port.

When engines sleep, fleetd remains the listener process. There is no listener process per agent. The controller does not adopt the coding harness that ran setup.

## Dependency direction

Domain modules depend on pure values and ports. Composition roots select concrete repositories, Matrix, filesystem, runtime and calendar adapters. Domain code does not import HTTP transports, SQLite drivers, UI or native adapter implementations.

Node query ownership uses Tinqer, C# uses EF Core and Rust uses Diesel. Knex alone creates/migrates SQL schemas. Runtime adapters validate an existing database; startup cannot select an ORM migration path.

## Optional related tools

Toolsmith is outside this ownership tree. Consumer code may call its generic Python libraries or foreground CLI commands, then supply its own domain meaning and model interpretation. It is not an agent runtime, server, shared listener, mandatory fleet dependency or hosted service.

- [Source layout and semantic package map](/docs/ctlflow/source-layout/)
- [Architecture contract](/docs/ctlflow/specification/)
- [Implementation boundaries](/docs/ctlflow/implementations/)
- [Toolsmith](/docs/toolsmith/)
