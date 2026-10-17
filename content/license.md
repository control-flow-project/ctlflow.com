---
title: Licensing
description: Canonical product licenses, third-party notices and separate package-publication policy.
---

## Product licenses

The authoritative terms are the licenses in the canonical product repositories. This website does not amend those terms or turn an unmerged license proposal into a released product change.

- [ctlflow canonical LICENSE](https://github.com/control-flow-project/ctlflow/blob/main/LICENSE)
- [Toolsmith canonical LICENSE](https://github.com/control-flow-project/toolsmith/blob/main/LICENSE)
- [Website LICENSE](https://github.com/control-flow-project/ctlflow.com/blob/main/LICENSE)

## Third-party material

Dependency and specification licenses remain owned by their upstream projects. The Matrix catalog is derived from pinned Matrix Client-Server inputs; the source product retains the Matrix specification license with its intentional tool distribution.

- [Matrix specification license](source:ctlflow:services/crossfire/node/packages/agent-tools/assets/matrix-spec-LICENSE.txt)
- [Hugo license](https://github.com/gohugoio/hugo/blob/master/LICENSE)

The website's CSS, layouts and diagrams are authored here. The Tsonic site is a visual reference; no external fonts, third-party theme, remote diagram renderer or copied brand artwork is required at runtime.

## Publication is separate

Only `@ctlflow/fleet` and `@ctlflow/fleetd` are eligible public npm products. The server, root and internal workspaces stay package-private. License terms do not change the publication flags, credentials, enrollment approval or authorization policy.
