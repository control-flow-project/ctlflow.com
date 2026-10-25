---
title: Capacity and limits
description: Search corpus size, result limits and budgets for individual operations.
weight: 60
sourceProject: toolsmith
sourcePath: docs/limits.md
---

## Corpus size and returned results

An entry is one application-assigned reference and its selected text. It can
represent an article, a summary or a document page. Indexing an article body and
its summary under separate references creates two entries.

Lexical and semantic search have no entry-count ceiling. A semantic query over
one million eligible entries compares their vectors in native SQLite code; it
does not send those entries to an LLM. The query is encoded once. A request for
twenty hits searches the eligible corpus, not its first twenty or ten thousand
entries.

`SearchReport.candidates` counts selected scope entries, including entries with
missing or stale indexes. It is a coverage count, not a candidate cutoff.
Missing and stale derivatives are excluded before ranking and reported separately.

## Operation limits

Input and output limits apply to individual operations, not to the total number
of stored entries.

| Surface | Bound and reason |
| --- | --- |
| Semantic query | 16 KiB input, 256 tokens: the selected MiniLM model's actual input capacity; fail instead of truncating |
| Semantic entry | 4 MiB text, 20,000 complete chunks: foreground preparation and individual-record validation budgets |
| Encoder batch | Sixteen chunks: bounded native tensor memory; repeat batches explicitly |
| Semantic output | 1..100 entries, default twenty; this limits returned hits, never eligible input |
| Lexical entry/output | 8 MiB entry; 1..1,000 returned hits, with offset; corpus remains uncapped |
| Lexical expression | 2,048 bytes and at most 32 literal terms/phrases; explicit FTS5 syntax remains distinct |
| Buffered file/retained artifact | 128 MiB; avoid an unbounded response or one retained object in memory; database/index files are not artifacts |
| Streaming IO | Explicit byte budget, 64 KiB transfer buffers; no automatic unbounded read |
| Backup/restore | Default/max 20 GiB aggregate database + artifact bytes; no object-count cutoff |
| Backup manifest | 128 MiB bounded metadata input; writer streams records and enforces the same bound as restore |
| ZIP | 128 MiB/member, 1 GiB aggregate, 10,000 members, 4 MiB central directory, depth 64; bounded untrusted archive expansion/metadata |
| Plain text / JSON | Configurable to 128 MiB; JSON rejects duplicate keys and nonfinite numbers |
| HTML | 4 MiB, 50,000 nodes, depth 128; meaningful text only, with table/dynamic-content warnings |
| Feed | 2 MiB, two million nodes, depth 32; all distinct entries, without an item-count ceiling; declared next URL is explicit |
| XML / JSONL | Default 32 MiB input; XML has explicit node/depth/field bounds and rejects DTD/entities; invalid JSONL never drops a line silently |
| PDF | 32 MiB input; twenty pages by default with explicit continuation; rendering checks DPI, pixels and output bytes |
| Download batch | 32 MiB manifest; all caller-defined groups concurrent by default, optional explicit network ceiling, bounded total deadline and unfinished outcomes; no item-count cap |
| Batch search | 32 MiB query input; per-query expression/model/output bounds, without a corpus-count or query-count sample |
| CSV | 32 MiB compressed / 64 MiB expanded, 256 columns; row budget is explicit and configurable |
| Tree inventory | Default 10,000 / maximum 100,000 returned entries, explicit byte budget, depth 64; a bounded materialized tree report |
| Journal | 64 KiB event / 32 MiB journal; caller owns retention, no automatic deletion or replacement |
| Optional archive import | 4 MiB combined text / 1,000 parts per immutable import, with explicit citation paging; not a corpus limit |
| Optional archive list | At most 100 returned records per page; offset does not cap total retained records |
| Public HTTP | At most 128 MiB per response, 100 requests, ten redirects and sixty-second total deadline; separate reviewed quotas apply |
| Shared quota metadata | 4 MiB durable state; caller-configured allowances, periods, spacing and cooldowns remain authoritative |


Network allowlists, TLS and DNS validation, private file checks, digests and
atomic publication still apply when a caller increases a configurable budget.

HTML, PDF and image table interpretation belongs to the caller or model.
Toolsmith does not provide deterministic HTML-table extraction. CSV and JSON
reading parse declared formats rather than interpreting their meaning.

## Search cost

The vector engine uses exact flat search. It compares every eligible vector, so
work grows with the corpus. It is not a constant-time or approximate-nearest-
neighbor index.

The product's `accept_corpus.py` checks synthetic million-entry capacity,
late-position matches and filtering. `accept_semantic.py` checks the actual model.
These are different tests; synthetic capacity does not establish real-document
retrieval quality or production latency. See the
[verification record](source:toolsmith:docs/verification.md).
