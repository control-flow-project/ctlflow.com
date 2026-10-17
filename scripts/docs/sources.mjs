export const guideSources = [
  ["ctlflow", "docs/specification.md", "docs/ctlflow/specification.md", "Architecture contract", "Component ownership, authorization, lifecycle, input, storage and verification invariants.", 40],
  ["ctlflow", "docs/architecture/native-implementations.md", "docs/ctlflow/implementations.md", "Implementation boundaries", "Node, C# and Rust ownership, dependencies and explicit verification limits.", 20],
  ["ctlflow", "docs/architecture/native-layout.md", "docs/ctlflow/source-layout.md", "Source layout", "Service-local packages, shared assets and equivalent ownership across implementation languages.", 25],
  ["ctlflow", "docs/development.md", "docs/ctlflow/development.md", "Development and verification", "Build, typecheck, test, packaging and shared external contract gates.", 60],
  ["ctlflow", "services/crossfire/database/README.md", "docs/ctlflow/database.md", "SQLite and Knex", "One management schema, one migration owner and directly interchangeable databases.", 35],
  ["ctlflow", "docs/distributions/README.md", "docs/ctlflow/distributions/_index.md", "Implementations and packaging", "Explicit Node, managed C#, NativeAOT and Rust build and installation choices.", 45],
  ["ctlflow", "docs/distributions/node.md", "docs/ctlflow/distributions/node.md", "Node", "Node prerequisites, package installation, server operation and fleet setup.", 10],
  ["ctlflow", "docs/distributions/csharp-managed.md", "docs/ctlflow/distributions/csharp-managed.md", "C# managed", "Self-contained .NET 11 apphosts, build-time SDK requirements and installed runtime dependencies.", 20],
  ["ctlflow", "docs/distributions/csharp-nativeaot.md", "docs/ctlflow/distributions/csharp-nativeaot.md", "C# NativeAOT", "Native .NET 11 outputs, visible EF/AOT limitations and Linux x64 packaging.", 30],
  ["ctlflow", "docs/distributions/rust.md", "docs/ctlflow/distributions/rust.md", "Rust", "Native Rust distribution layout, requirements, packaging and operating procedures.", 40],
  ["ctlflow", "services/crossfire/docs/container-packages.md", "docs/ctlflow/containers.md", "Container packages", "Transferable runtime/migration images, explicit backend selection and ownership-fenced deployment.", 50],
  ["ctlflow", "services/crossfire/docs/getting-started.md", "docs/crossfire/installation.md", "Install the server", "Initialize private instance state and start a selected server implementation.", 10],
  ["ctlflow", "services/crossfire/docs/configuration.md", "docs/crossfire/configuration.md", "Instance configuration", "Origins, trusted ingress, request quotas, administrative policy and private server configuration.", 20],
  ["ctlflow", "services/crossfire/docs/management.md", "docs/crossfire/management.md", "Management UI", "Durable views, status interpretation, access controls, confirmations and native human decisions.", 30],
  ["ctlflow", "services/crossfire/docs/publications.md", "docs/crossfire/publications.md", "Static report publication", "Manifest, upload and commit protocol; public report limits, sandbox and deletion.", 40],
  ["ctlflow", "services/crossfire/docs/statistics.md", "docs/crossfire/statistics.md", "Traffic and usage", "Approximate fleet traffic, optional native token measurements and periodic summary semantics.", 50],
  ["ctlflow", "services/crossfire/docs/logging.md", "docs/crossfire/retention.md", "Logging and retention", "Seven-day default retention, pinned live evidence and bounded cleanup.", 60],
  ["ctlflow", "services/crossfire/docs/operations.md", "docs/crossfire/operations.md", "Server operations", "Backup, forward migration, upgrade, persistent data and diagnosis.", 70],
  ["ctlflow", "services/crossfire/docs/onboarding/README.md", "docs/crossfire/enrollment.md", "Enrollment and setup authority", "Human approval, exact identities, private claim exchange and fleet setup boundaries.", 25],
  ["ctlflow", "services/crossfire/docs/reports.md", "docs/crossfire/reports-ui.md", "Manage published reports", "Owner/admin report inspection and deletion without executing report scripts in management.", 45],
  ["ctlflow", "services/crossfire/docs/matrix-api.md", "docs/crossfire/matrix.md", "Matrix integration", "Native Matrix HTTP, catalog safety policy, real mentions, media and history.", 35],
  ["ctlflow", "services/fleetd/docs/operations.md", "docs/fleetd/operations.md", "Controller operations", "Shared listener ownership, desired intent, wake, stop, restart and recovery.", 10],
  ["ctlflow", "services/fleetd/docs/setup.md", "docs/fleetd/setup.md", "Controller-owned setup", "Noninteractive setup, persisted defaults, enrollment and readiness.", 15],
  ["ctlflow", "services/fleetd/docs/storage.md", "docs/fleetd/storage.md", "Private state and histories", "Native context registries, exact identity, writer locks and retained receipts.", 30],
  ["ctlflow", "services/fleetd/docs/coordination.md", "docs/fleetd/coordination.md", "Wake and room coordination", "Sender selections, owner approval, invitation provenance and delivery boundaries.", 25],
  ["ctlflow", "services/crossfire/docs/runtime.md", "docs/fleetd/runtime.md", "Native runtime adapters", "Native settings, interruption, receipt uncertainty, output, human decisions and terminal attachment.", 20],
  ["ctlflow", "services/crossfire/docs/history.md", "docs/fleetd/history.md", "Input and history", "Opaque unread cursors, complete large-message files, shared/per-room histories and explicit reset.", 35],
  ["ctlflow", "services/fleet/docs/getting-started.md", "docs/fleet/setup.md", "Set up a fleet", "Personalized setup instructions for a separate managed fleet, including one-agent fleets.", 10],
  ["ctlflow", "services/fleet/docs/configuration.md", "docs/fleet/configuration.md", "Fleet configuration", "Runtime roster, role definitions, native overrides, workareas, skills and room plans.", 20],
  ["ctlflow", "services/fleet/docs/commands.md", "docs/fleet/commands.md", "CLI commands", "Local controller selection, fleet/agent commands, lifecycle operations and direct messaging.", 30],
  ["ctlflow", "services/fleet/docs/operations.md", "docs/fleet/updates.md", "Updates and diagnosis", "Explicit package update, selected histories, controller restart and status diagnosis.", 55],
  ["ctlflow", "services/fleet/docs/sessions.md", "docs/fleet/sessions.md", "Stop, resume and reset", "Exact histories, saved active selections, account refresh and intentional fresh-history confirmation.", 40],
  ["ctlflow", "services/fleet/docs/remote.md", "docs/fleet/remote.md", "SSH control", "The same private controller API over authenticated SSH; no exposed controller port.", 50],
  ["ctlflow", "services/fleet/docs/pi.md", "docs/fleet/pi.md", "Earendil Pi", "Pi 1.0.0 RPC, model options, native sessions and explicit differences from Codex.", 60],
  ["ctlflow", "services/crossfire/node/packages/agent-tools/assets/SKILL.md", "docs/fleet/agent-tools.md", "Agent tool instructions", "The actual shipped coordination tool instructions, explicit destinations and native metadata.", 70],
  ["toolsmith", "docs/installation.md", "docs/toolsmith/installation.md", "Installation", "Optional Python library/CLI installation, extras and native vector packaging.", 10],
  ["toolsmith", "docs/library.md", "docs/toolsmith/library.md", "Library API", "Generic public Python interfaces for files, acquisition, archives and retrieval.", 20],
  ["toolsmith", "docs/cli.md", "docs/toolsmith/cli.md", "CLI", "Explicit foreground commands and bounded input/output examples.", 30],
  ["toolsmith", "docs/tools.md", "docs/toolsmith/capabilities.md", "Capability reference", "Generic acquisition, file, reader, archive, indexing and operations capabilities.", 40],
  ["toolsmith", "docs/semantic.md", "docs/toolsmith/semantic.md", "Semantic retrieval", "Optional offline embeddings, native SQLite exact search and caller-owned corpus scopes.", 50],
  ["toolsmith", "docs/limits.md", "docs/toolsmith/limits.md", "Capacity and bounds", "Complete-corpus search, explicit resource bounds and measured capacity evidence.", 60],
  ["toolsmith", "docs/operations.md", "docs/toolsmith/operations.md", "Archive operations", "Explicit migrations, streamed backup, restore and integrity checks.", 70],
  ["toolsmith", "docs/security.md", "docs/toolsmith/security.md", "Security boundaries", "URL, path, budgets, archive and local model safety boundaries.", 80],
  ["toolsmith", "docs/specification.md", "docs/toolsmith/specification.md", "Toolsmith contract", "Generic optional libraries and CLI commands; no hosted service or daemon.", 90],
  ["toolsmith", "docs/architecture.md", "docs/toolsmith/architecture.md", "Library architecture", "Independent module owners, extension boundaries and consumer-owned domain meaning.", 100],
];

export const catalogSources = {
  crossfire: "services/crossfire/node/packages/contracts/src/rest/operations.ts",
  fleetd: "services/fleetd/node/packages/contracts/src/api.ts",
};

export function frontmatter(values) {
  return `---\n${Object.entries(values).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n")}\n---\n\n`;
}

export function pageUrl(path) {
  return `/${path.replace(/(?:_index)?\.md$/u, "").replace(/\/$/u, "")}/`;
}
