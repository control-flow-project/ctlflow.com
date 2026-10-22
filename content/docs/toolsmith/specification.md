---
title: Toolsmith behavior
description: Library and CLI behavior, persistence, search and supported operations.
weight: 90
sourceProject: toolsmith
sourcePath: docs/specification.md
---

Toolsmith provides Python functions and commands for files, readers, HTTP
downloads, journals and search. It also offers an optional local text archive.
Each command completes its work and returns. Importing or installing the package
does not start a process or select a storage root.

The CLI calls the same library functions. Public operations validate input and
return typed success or failure values. Applications supply their own source
permissions, summaries, agent instructions and domain-specific logic.

## Available operations

- Read UTF-8, JSON, static HTML, RSS, Atom and CSV.
- Read, hash and copy regular files; inventory trees; create or extract selected ZIP members.
- Download approved public HTTPS URLs with explicit request and byte budgets.
- Append and verify generic JSON journals.
- Add lexical and semantic indexes to caller-owned SQLite databases.
- Optionally retain immutable text and file versions with citations.
- Back up, restore, inspect, rebuild or migrate the optional archive.

Browser automation, PDF extraction, OCR, generative summaries and public hosting
are not implemented. HTML table markup is retained for interpretation rather
than converted into inferred rows and columns. CSV and JSON readers parse their
declared formats.

HTML inspection reports markup signals; it does not compute CSS visibility.
Document-title access screens and unresolved access dialogs remain failures.
A caller that owns a browser validates its computed-visible DOM through the same
text reader. Toolsmith does not run a browser or bypass access gates.

## Installation and platforms

The package is MIT-licensed. Its base installation has no third-party runtime
dependencies. HTTP and semantic encoding use optional extras. Model weights are
not redistributed or downloaded automatically.

Python 3.13+ is required. Secure persistence requires Linux filesystem primitives
and SQLite with FTS5. Readers that operate on supplied bytes do not require a
store or network access.

- [Installation](/docs/toolsmith/installation/)
- [Module reference](/docs/toolsmith/library/)
- [Commands](/docs/toolsmith/cli/)

## Persistent data

Applications can use readers, files, HTTP and search with their own databases.
Index initialization creates derivative tables, not application records or a
new application schema version. Corrections invalidate indexes in the same
transaction as the source change.

The optional archive has one collection per private root, a SQLite database,
immutable objects and temporary staging files. It retains source versions and
operation results. Its collection label prevents accidental cross-selection,
but does not isolate hostile processes using the same OS account.

Network quotas live in an explicitly selected shared directory. Cooperating
callers using the same upstream allowance share that state. Reservations are
recorded before requests; unknown usage remains charged. Clock rollback, reboot
and policy changes do not reset an allowance.

Journals have explicit roots, caller-defined event schemas and caller-managed
retention. Nothing expires automatically unless an operation documents that
behavior.

## File and network checks

File operations reject symlinks, special files and unsafe parent paths. Private
state requires owned directories, private modes and single-link files. Atomic
writes and fsync protect normal crash recovery. Locks coordinate cooperating
callers; they do not sandbox arbitrary same-user code.

HTTP permits approved DNS hosts over HTTPS port 443. It rejects credentials,
secret-like query keys, fragments and control characters. DNS answers must all
be public unicast addresses. The connection uses a validated numeric address,
while TLS verifies the original hostname. Every redirect repeats these checks.

Requests do not inherit proxy settings or forward cookies or authorization.
Wire bytes, expanded bytes, redirects and total time have explicit limits.
`Retry-After`, spacing and quota exhaustion return deferrals rather than sleeping
or automatically retrying.

An interrupted GET may have reached the publisher. Explicit resume states that
it may repeat the request and retains the original allowance and policy.

- [Security checks and limitations](/docs/toolsmith/security/)
- [HTTP recovery](/docs/toolsmith/operations/#status-and-explicit-http-resume)

## Search

Lexical search uses SQLite FTS5. Literal passage search preserves punctuation and
is a different operation.

Semantic search uses a pinned English MiniLM model locally. It creates
384-dimensional float32 vectors with mask-mean pooling and L2 normalization.
Queries must fit 256 model tokens; longer sources are split into complete chunks
with 32-token overlap.

The packaged vec1 extension compares eligible vectors in native SQLite code.
It uses exact flat search, not approximate nearest neighbors. Search covers the
entire authorized relation and returns bounded results. Work therefore grows with
the eligible vector corpus.

Applications supply a table or view containing authorized references and current
text digests. Filtering happens before ranking and result limits. Missing or stale
index entries are reported. Semantic similarity locates text; it does not establish
that a source is true.

Encoding happens outside the source transaction. Publication rechecks source text
and the previous digest. Index changes participate in the caller's SQLite
transaction. Clearing an index removes derivatives, not original text.

- [Semantic model and index API](/docs/toolsmith/semantic/)
- [Limits](/docs/toolsmith/limits/)

## Archive maintenance

Backup takes a consistent SQLite snapshot and copies referenced objects to a new
private destination. Restore verifies the complete backup before publishing a
new store. Neither operation overwrites an existing destination.

The archive has one current schema. Initialization creates it directly; access
and restore validate its structure. No historical schema converter or alternate
reader exists. Verified restore copies current state into a new destination.

Integrity checks and index rebuilds are explicit maintenance. They do not repair
lost originals or change supplied provenance. Cleanup requires a preview and
rechecks every selected inactive staging file before deletion.

Databases and indexes have no Toolsmith byte ceiling. Backup and restore have a
20 GiB aggregate limit; individual retained files have a 128 MiB limit.

- [Maintenance procedures](/docs/toolsmith/operations/)
