---
title: "Library API"
description: "Python modules, result handling and examples for archives and caller-owned indexes."
weight: 20
sourceProject: "toolsmith"
sourcePath: "docs/library.md"
---

Toolsmith functions return typed results. File handling, readers, search, journals
and HTTP downloads can be used with your own data store. The optional text archive
combines these functions with versioned storage and citations.

The tables below list public modules. Use their functions rather than querying
Toolsmith's private index tables.

When correcting indexed text, update the original text and invalidate both
indexes in the same application transaction. Use `unwrap` inside the transaction
so a failed invalidation rolls back the text change. Compute embeddings outside
the transaction; recheck the text and previous digest before publishing them.
Toolsmith leaves the caller's schema version and row factory unchanged.

`lexical.find_text` preserves punctuation and caller-owned regions.
`lexical.search` performs explicit indexed FTS matching over authorized database scopes.
These are distinct query semantics, never fallback paths. Semantic `inspect_index`
is cheap bulk metadata; full vector/source validation is a separate explicit audit.

Generic journal payloads are bounded arbitrary JSON; event schemas, authority and
retention stay with the caller. One ASCII-escaped canonical hash format preserves
the reviewed generic record framing. No record is automatically discarded, and an
incomplete tail fails for explicit operator review rather than silently deleting it.

Distribution: `ctlflow-toolsmith`; import: `toolsmith`; command: `toolsmith`.
Public modules/functions are named exports. There is no dynamic plugin registry,
HTTP client for a Toolsmith service, skill installation or fleet integration.

| Module | Public operations |
| --- | --- |
| `toolsmith.result` | `Success`, `Failure`, `Result` |
| `toolsmith.files` | `read_bytes`, `write_new_bytes`, `replace_bytes`, `hash_file`, `copy_file`, `file_stamp`, `FileDigest`, `FileStamp`; explicit private descriptors and locks |
| `toolsmith.paths` | `relative_components`, `relative_parent`, `relative_file`; descriptor-pinned relative paths |
| `toolsmith.filesystem` | `inventory`, `sync_directory_tree`, `publish_directory`, `FileEntry` |
| `toolsmith.archives` | `list_archive`, `pack_files`, `unpack_files`, `read_archive_member`, `ArchiveEntry`, `MemberSource`, `MemberDigest`, `ArchiveReport` |
| `toolsmith.readers` | `Document`, `TextPart`, `read_text`, `normalize_text`, `read_json`, `read_json_lines`, `read_xml`, `XmlDocument`, `XmlElement`, `XmlLimits`, `read_pdf`, `PdfText`, `PdfPageText`, `render_pdf_page`, `PdfImage`, `read_html`, `inspect_html`, `HtmlInspection`, `HtmlLink`, `HtmlMetadata`, `HtmlStructuredData`, `read_feed`, `Feed`, `FeedEntry`, `decode_table`, `iter_table_rows`, `project_table` |
| `toolsmith.readers.content` | `validate_content`; PDF signature only, not extraction |
| `toolsmith.lexical` | `Source`, `Scope`, `initialize_index`, `inspect_index`, `indexed_scope`, `matching_scope`, `index_source`, `invalidate_source`, `search`, `search_batch`, `check_index`, `compile_query`, `Region`, `find_text` |
| `toolsmith.semantic` | `load_model`, `inspect_model`, `Source`, `Scope`, `prepare_connection`, `prepare_embedding`, `encode_query`, `initialize_index`, `inspect_index`, `inspect_coverage`, `indexed_scope`, `pending_references`, `publish_embedding`, `invalidate_embedding`, `relocate_embedding`, `clear_index`, `search_embeddings`, `search_batch`, `search_embeddings_batch`, `check_index`, `indexed_digest` |
| `toolsmith.acquisition.client` | `HttpPolicy`, `FetchResponse`, `fetch_http`, `fetch_http_async` without an archive |
| `toolsmith.acquisition.config` | `read_http_policy`, `read_budget_policy` |
| `toolsmith.acquisition.budgets` | `BudgetPolicy`, `Reservation`, `BudgetStatus`, `inspect_budget`, `reserve_budget`, `reserve_budget_async`, `settle_budget` |
| `toolsmith.acquisition.configuration` | `Configuration`, `inspect_configuration`, `configure_budget`, `check_budget` |
| `toolsmith.acquisition.budget_import` | `BudgetSnapshot`, `GroupUsage`, `Usage`, `import_budget` for reviewed quiesced counters |
| `toolsmith.compression` | `expand_gzip` with an explicit expanded-byte ceiling |
| `toolsmith.search_batch` | `SearchQuery`, `EmbeddingQuery`, `QueryResult`, `SearchBatch`, `read_queries` |
| `toolsmith.acquisition.urls` | `resolve_url`, `resolve_urls`, `ResolvedUrl`; resolution grants no HTTP authority |
| `toolsmith.acquisition.batch` | `DownloadRequest`, `DownloadedFile`, `DownloadOutcome`, `DownloadBatch`, `download_batch`, `download_batch_async` |
| `toolsmith.acquisition.buckets` | `Bucket`, `BucketResult`, `run_buckets_async`; finite caller-selected operations and spacing |
| `toolsmith.acquisition.transport` | `NativeResolver`, `NativeTransport`, `request_pinned`, `request_pinned_async` |
| `toolsmith.journal` | `Record`, `read_journal`, `append_record` |

The following modules compose the **optional text archive**, not a generic storage
backend for consumer applications. Its parsing and indexing still use the same
libraries listed above.

| Module | Archive operations |
| --- | --- |
| `toolsmith.storage.models` | `TextReference`, `FileReference`; archive document validation |
| `toolsmith.storage.database` | `initialize_store`, `inspect_store`, `StoreInfo` |
| `toolsmith.storage.text` | `put_text`, `inspect_text`, `list_text` |
| `toolsmith.storage.artifacts` | `put_file`, `inspect_file`, `read_file`, `export_file` |
| `toolsmith.storage.operations` | `operation_status`, `OperationStatus` |
| `toolsmith.retrieval` | `search_text`, `read_citation`, `SearchHit`, `Citation` |
| `toolsmith.acquisition.policy` | `read_policy`, `SourcePolicy` |
| `toolsmith.acquisition.limits` | `inspect_limits`, `LimitStatus` |
| `toolsmith.acquisition.http` | `acquire_http`, `resume_http`, `Acquisition` |
| `toolsmith.operations.backup` | `backup_store`, `restore_store`, `BackupReport` |
| `toolsmith.operations.integrity` | `check_integrity`, `rebuild_index`, `IntegrityReport` |
| `toolsmith.operations.cleanup` | `preview_cleanup`, `apply_cleanup`, `CleanupPlan` |

Operations validate boundaries and return typed `Result[T]`. `unwrap` and internal
`ToolsmithError` are composition helpers used by the CLI/implementation, not an
exception-based alternative public API. Do not bypass invariants with internal
`Store`/connection helpers or direct SQL/file writes.

The following application code creates a new `local-store` archive and constructs
a `Document` from literal sample text before saving it. `Document` and `TextPart`
are Python values created by the caller, not JSON someone must send in a room.
For an existing text file, a reader can create the document instead; this example
does not extract text from a PDF:

```python
from pathlib import Path
from toolsmith.result import Failure
from toolsmith.storage.database import initialize_store
from toolsmith.readers.models import Document, TextPart
from toolsmith.storage.text import put_text

root = Path.cwd() / "local-store"
initialized = initialize_store(root, "sample")
if isinstance(initialized, Failure):
    raise RuntimeError(initialized.message)
document = Document("Report", (TextPart("Physical page 1", "Retained source words", 1),))
result = put_text(root, "sample", "report", document, "import-report-1")
if isinstance(result, Failure):
    print(result.code, result.message)
else:
    version = result.value.version
```

Stored physical pages and warnings describe supplied extraction, not certification
that the original was complete. Citation offsets count Unicode characters, not
UTF-8 bytes. Old versions remain exact; searches intentionally cover current
versions only. Request identities are collection-wide across text, files and HTTP.

The optional HTTP boundary accepts `Clock`, `Resolver` and `Transport` protocols
for deterministic integration/tests. The shipping composition uses bounded native
DNS/TLS/HTTPS. These interfaces allow deterministic tests and custom composition. DNS approval and byte/deadline checks remain in acquisition;
custom callers remain responsible for their own transport's actual network behavior.

Raw `HttpPolicy` and archive `SourcePolicy` accept one to 32 exact public DNS
hosts. Typed and JSON policies normalize case, sort hosts and reject duplicates
after normalization. The raw HTTP CLI rejects existing or relative destinations
before fetching; final publication is atomic and never replaces an existing file.

`inspect_html` returns literal `HtmlLink` values and metadata alongside cleaned
text. Targets remain untrusted; resolution and source approval precede HTTP.
`read_feed` returns every distinct entry within its bounds and an explicit
`next_url` for declared Atom pagination, honoring inherited `xml:base`.
Conflicting next links fail. Neither reader follows links or certifies that a
publisher exposed every relevant document.

The [primitive recipes](/docs/toolsmith/primitives/) show complete batch outputs,
caller-owned acquisition callbacks, PDF pages and indexed batch queries.

Importing the HTTP module does not import its optional DNS dependency. Missing
dependency fails on selected network acquisition, not on text/storage import.

## Caller-owned lexical index

This self-contained Python example creates an in-memory SQLite index, supplies
the literal text `Exact source words`, then queries it. The caller creates the
permitted-reference table; Toolsmith does not discover documents or infer who
may read them. `matches` receives the search result:

```python
import hashlib
import sqlite3
from toolsmith import lexical
from toolsmith.result import unwrap

with sqlite3.connect(":memory:") as connection:
    connection.execute("PRAGMA foreign_keys = ON")
    unwrap(lexical.initialize_index(connection))
    source = lexical.Source("opaque-reference", "Exact source words", "Source")
    unwrap(lexical.index_source(connection, source, expected_digest=None))
    connection.execute("CREATE TABLE permitted_text (reference TEXT PRIMARY KEY, text_digest TEXT NOT NULL)")
    connection.execute("INSERT INTO permitted_text VALUES (?, ?)", (source.reference, hashlib.sha256(source.text.encode()).hexdigest()))
    matches = unwrap(lexical.search(connection, '"source words"', lexical.Scope("permitted_text")))
```

Initialization owns only derivative relations, not the application's canonical
tables or schema version. Both index initializers reject existing or partial
schemas rather than silently adopting or repairing them. The selected database table/view is caller-owned authorization;
digests exclude stale derivatives before ranking and limits. BM25 uses DB-wide
statistics, so separate room/tenant databases remain necessary for statistical
isolation. Cheap bulk status does not perform a full integrity audit.

Low-level descriptor/lock and SQLite transaction context managers are composition
primitives: they raise `ToolsmithError` on expected failures within an enclosing
public `Result` boundary. They do not start a process.

`lexical.matching_scope` returns matching references and digests as a database
relation. Both index modules expose `indexed_scope` for complete derivatives.
Intersect those relations with the application's current authorized sources
before counts, ordering and pagination. Index readiness is not permission, and
these calls do not copy source bodies into a bounded Python candidate list.

`semantic.prepare_connection` loads the packaged extension without creating an
index, changing the row factory or committing the caller's transaction. Coverage
reports include indexed chunks and vector bytes. Feed results retain their RSS/
Atom format and original links separately from canonical article URLs.

`toolsmith.semantic` exports the optional encoder and generic SQLite API;
`toolsmith.semantic.store` composes those functions with exact retained citations.
Importing either loads no optional native package or model. See
[semantic contracts](/docs/toolsmith/semantic/) and [fleet integration](source:toolsmith:docs/fleet-recipes.md).
