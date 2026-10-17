---
title: "crossfire/node/packages/kernel/src/fleet-map.ts"
linkTitle: "fleet-map"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/kernel/src/fleet-map.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## FLEET_MAP_LIMITS {#FLEET_MAP_LIMITS}

```typescript
FLEET_MAP_LIMITS = { agents: 1000, connections: 10000, rooms: 2000, principals: 2000 } as const
```
