---
title: Toolsmith
artwork: toolsmith
description: Optional Python libraries and commands for HTTP downloads, files, text readers and local search.
weight: 60
---

Toolsmith provides Python functions and command-line tools for HTTP downloads,
file handling, text reading, journals and search. A fleet can use them with its
own files and SQLite databases. Your application supplies source permissions,
summaries, interpretation and domain-specific workflows.

It is a separate project from ctlflow and is not required to run a fleet. It
runs no server or background worker; a fleet may use it or omit it completely.

For example, an agent can download an approved article, extract its text, and
add that text to an index in the fleet's own SQLite database. Lexical search
finds words and phrases. Semantic search uses a local model to convert text into
numeric vectors and compare them for similarity. It does not generate answers.

## Capabilities

| Task | What Toolsmith does | Interface |
| --- | --- | --- |
| Download selected URLs | Fetch approved HTTPS sources in concurrent, serially paced groups with shared quotas and explicit outcomes | Python / CLI |
| Handle files | Hash, copy and inventory files; pack or extract selected ZIP entries | Python / CLI |
| Track request allowances | Reserve and settle shared request and byte budgets | Python / CLI |
| Keep a JSON journal | Append and verify caller-defined records | Python |
| Read supplied content | Decode UTF-8, JSON/JSONL, XML, static HTML, RSS, Atom and CSV; inspect literal links and metadata | Python / CLI |
| Read PDF pages | Extract paged text or render a selected page to PNG in process | Python / CLI; optional PDF dependencies |
| Find words | Search literal passages or an SQLite FTS5 index | Python / CLI |
| Find similar passages | Encode English text locally and query vectors in SQLite, individually or in batches | Python / CLI; optional model dependencies |
| Keep a text archive | Retain versions of text and files with references to source passages | Python / CLI; optional archive |
| Maintain an archive | Back up, restore, audit and rebuild its indexes | Python / CLI; optional archive |

HTML readers preserve table markup for a model or caller to interpret. They do
not infer a table's meaning. The optional PDF reader extracts text and renders
pages; it performs no OCR. Toolsmith does not run a browser or follow discovered
links automatically. A completed batch covers its supplied inputs, not an entire
website or collection assignment.

The base installation has no third-party runtime dependencies. HTTP, PDF and
semantic search have optional dependencies. Semantic search compares the query vector
with every vector in the requested corpus using a native SQLite extension.

The optional archive stores immutable imports. A citation identifies the retained
version, text part and character range. Physical page numbers are supplied by
the caller; they are not inferred by the archive. Applications with their own
stores can use the file and search libraries without adopting this archive.

## Use from any controller implementation

A fleet can invoke Toolsmith commands regardless of which controller
implementation it uses. Python programs can import the library directly.
Installing it for a fleet does not add Python to the crossfire server.

- [Installation and optional extras](/docs/toolsmith/installation/)
- [Python API](/docs/toolsmith/library/)
- [CLI](/docs/toolsmith/cli/)
- [Acquisition and reading recipes](/docs/toolsmith/primitives/)
- [Toolsmith source](source:toolsmith:README.md)
