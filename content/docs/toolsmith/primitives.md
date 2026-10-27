---
title: Acquisition and reading recipes
description: Complete file outputs, selected downloads, PDF pages and batch indexed queries.
weight: 35
sourceProject: toolsmith
sourcePath: docs/primitives.md
---

Use these commands on files and URLs selected by your application. Toolsmith
parses, downloads and searches; the application decides relevance, publication
eligibility, permissions and whether two documents contain equivalent facts.
It does not follow a discovery frontier or make generative model calls.

## Keep complete results in files

The operator supplies an existing private working directory and input files.
Global `--output` writes the complete successful JSON result to a new absolute
path and prints only a path/byte-count receipt. Its parent must already exist;
directory traversal follows no symlinks and the new file has private permissions.
These are local paths, not public report URLs.

```sh
toolsmith --output "$PWD/inspection.json" read html-links "$PWD/page.html"
toolsmith --output "$PWD/feed.json" read feed "$PWD/feed.xml" --source-url https://example.com/feed
toolsmith --output "$PWD/tree.json" read xml "$PWD/sitemap.xml"
toolsmith --output "$PWD/records.json" read jsonl "$PWD/records.jsonl"
```

HTML inspection returns cleaned text, literal links and metadata together.
Scripts and styles are excluded from prose; literal JSON/JSON-LD remains separate
untrusted data. Ordinary form-wrapped content stays readable, while interactive
controls and their values do not become prose. Use retained text and metadata
when interpreting links; a short link label does not represent all nearby context.

XML preserves expanded namespace names, in-scope prefix bindings, attributes,
text and tail ordering. The pure library `read_xml_records` converter can select
one exact name or multiple distinct names in one bounded pass. Selected records
cannot nest, and a malformed tail fails the complete read. Explicit XML input
can reach 144 MiB/eight million nodes; defaults remain 32 MiB/two million.
HTML byte/node budgets are separately selectable to 8 MiB/500,000 nodes with
4 MiB/50,000-node defaults, retaining depth, access and extracted-output limits.
RSS/Atom returns every distinct entry within its byte/structure limits and a
publisher-declared next URL when present. The caller authorizes each next page
and detects repeated URLs. An absent next link does not establish that discovery
is complete.

## Resolve URLs and read formats

The caller writes `relative-urls.json` as an array of URL strings. Resolution
returns an input index and validation outcome for each; it grants no HTTP access.
The other commands inspect a supplied ZIP, read one named member, and expand a
supplied gzip file into a new destination with an explicit byte ceiling.

```sh
toolsmith --output "$PWD/urls.json" url resolve https://example.com/index --file "$PWD/relative-urls.json"
toolsmith --output "$PWD/members.json" archive list "$PWD/input.zip"
toolsmith archive read "$PWD/input.zip" folder/report.csv --destination "$PWD/report.csv"
toolsmith decompress gzip "$PWD/input.xml.gz" --destination "$PWD/input.xml" --maximum-bytes 33554432
```

Unsafe names, encrypted ZIP members and special files fail validation. Nothing
executes an archive member or selects every member for extraction automatically.

## Download a selected cohort

Install the `http` extra. The operator writes approved HTTP and budget policies
to `profiles.json`. This illustrative profile permits only `example.com`; its
allowances must be replaced with the operator's actual reviewed limits.

```json
{
  "documents": {
    "http": {"hosts": ["example.com"]},
    "budget": {
      "group": "documents", "period_seconds": 86400,
      "group_requests": 10000, "group_bytes": 1073741824,
      "task_requests": 50000, "task_bytes": 4294967296,
      "minimum_interval_seconds": 10
    }
  }
}
```

The application writes selected requests to `requests.json` for the tool. Each has a unique
ID, approved profile, URL and absolute new destination. For example:

```json
[
  {"id":"document-1","url":"https://example.com/report","profile":"documents","destination":"/absolute/private/document-1.html"}
]
```

All profiles share period/task limits and each group has one budget policy.
When the network-state root has reviewed configuration, each profile also needs
its inspected current `configuration_digest`; missing or stale approval fails
before HTTP. Source/retention rights remain the operator's responsibility.

The caller supplies the existing working directory, approved manifests, shared
network-state root and stable task identity. The command returns per-input
outcomes in `downloads.json`; successful bodies go to their selected files.

```sh
toolsmith --output "$PWD/downloads.json" http batch --profiles "$PWD/profiles.json" --requests "$PWD/requests.json" --network-state "$PWD/network-state" --task assignment --deadline-seconds 300
```

By default every caller-defined group runs concurrently, with sequential requests
inside each group. Optional `--concurrency` imposes an explicit network ceiling.
Cooperating invocations share persistent slots, spacing, quotas and cooldowns.
Existing destinations cause no HTTP request. Local spacing/slot waits consume
the current deadline; upstream cooldowns and exhausted quotas defer immediately.
Cancellation retains conservative usage and reports unfinished inputs. A complete
batch means its supplied inputs completed, not that discovery or an assignment ended.

An application owning asynchronous acquisition can use
`Bucket(id, items, minimum_interval_seconds)` and `run_buckets_async` from
`toolsmith.acquisition.buckets`. It supplies the operation and owns its effects,
authorization, time bounds and durable outcomes. The same finite scheduler runs
all buckets concurrently, sequentially spaces their items, preserves result
order, and cancels and joins peers on cancellation or unexpected producer failure.
It starts no thread or process. Local spacing never replaces shared upstream controls.

## Read selected PDF pages

Install the `pdf` extra. Supply an existing PDF of at most 32 MiB. Page positions
are zero-based. Text results include total pages and `next_page`; explicitly
continue until it is absent. Rendering writes a selected page into a new PNG.

```sh
toolsmith --output "$PWD/pages.json" read pdf "$PWD/document.pdf" --start 0 --limit 20
toolsmith render pdf "$PWD/document.pdf" --page 0 --dpi 144 --destination "$PWD/page-0.png"
```

PDFium/Pillow run in process, with native handles closed after each call and
pixel budgets checked before rendering. There is no OCR. A native parser is not
an OS sandbox; callers own process-level controls and extraction-quality checks.

## Query an existing index in bulk

The application creates `queries.json` as an array such as
`[{"id":"query-1","text":"Supplied document title"}]`. It supplies an existing
SQLite database and authorized scope exposing `reference` and `text_digest`.
These commands return coverage and a result for each query without resupplying
the source corpus. Semantic search additionally needs prepared local model assets.

```sh
toolsmith --output "$PWD/matches.json" search lexical batch --database "$PWD/app.sqlite3" --scope permitted_text --queries "$PWD/queries.json"
toolsmith --output "$PWD/semantic-matches.json" search semantic batch --database "$PWD/app.sqlite3" --scope permitted_text --queries "$PWD/queries.json" --model-directory "$MODEL_DIRECTORY"
```

The Python APIs are `lexical.search_batch` and `semantic.search_batch` with
`SearchQuery(id, text)`. They read scope coverage once per batch. Input is bounded
to 32 MiB; existing per-query expression, model and output limits apply. There
is no corpus-count sample or automatic duplicate verdict. The application
interprets matches and owns authorization and source-date eligibility.
