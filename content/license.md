---
title: Licensing
description: MIT licenses and third-party notices.
---

## First-party code

ctlflow, Toolsmith and this website use the MIT license.

- [ctlflow license](https://github.com/control-flow-project/ctlflow/blob/main/LICENSE)
- [Toolsmith license](https://github.com/control-flow-project/toolsmith/blob/main/LICENSE)
- [Website license](https://github.com/control-flow-project/ctlflow.com/blob/main/LICENSE)

## Dependencies

Third-party code and specifications retain their own licenses and notices.
The Matrix operation catalog is derived from Matrix Client-Server specification
inputs. Its license ships with the agent tools.

- [Matrix specification license](source:ctlflow:services/crossfire/node/packages/agent-tools/assets/messaging-LICENSE.txt)
- [Hugo license](https://github.com/gohugoio/hugo/blob/master/LICENSE)

## npm publication

Only `@ctlflow/fleet` and `@ctlflow/fleetd` are public npm packages. The server
and internal workspaces are package-private. Package visibility does not change
the MIT license.
