# ctlflow.com

Hugo technical documentation for the ctlflow monorepo and its crossfire server,
fleetd controller and fleet CLI. Node, C# and Rust are documented under those
product owners. Toolsmith is a separate optional Python library/CLI project.

The site contains Markdown product guides, exact HTTP operation references,
transitive parser definitions, native HTTP protocols, static architecture diagrams
and a local browser search index. It uses one authored theme with no client-side
framework, external fonts, analytics or remote diagram rendering.

- [Local verification record](docs/verification/20261017-site.md)

## Requirements

- Hugo **0.168.0**, standard edition.
- Node.js 24+ for build/test/source maintenance scripts.
- A Chromium executable for browser tests (`BROWSER_EXECUTABLE`, or Google Chrome
  at `/usr/bin/google-chrome`). No browser installation runs automatically.

Install development dependencies inside the repository:

```sh
npm ci --ignore-scripts --cache .temp/npm
```

Use `HUGO_BINARY=/absolute/path/to/hugo` to select the pinned executable. A local
`.temp/tools/hugo` is used when present; otherwise the build invokes `hugo` on
PATH and verifies its exact version. The build never downloads Hugo.

## Build and preview

All delegated build/test commands run under finite process-group limits. Example
for Linux (replace the absolute checkout directory with your own):

```sh
systemd-run --user --scope --quiet \
  --property=MemoryMax=8G --property=MemorySwapMax=0 --property=TasksMax=256 \
  --working-directory=/absolute/ctlflow.com npm run check
```

Individual commands are `npm run build`, `npm test` and `npm run test:browser`.
The build verifies checked-in generated references before invoking Hugo and writes
only `public/`, `resources/` and ignored `.temp/` caches. Test output remains in
`.temp/`. Preserve source and concise verification evidence; remove regenerated
fixtures/output after their last required use.

For a local preview, build first and run `npm run serve` under the same scope.
It binds `http://127.0.0.1:4321` only. `PORT` may select another local port.
The preview applies the checked-in Netlify response headers so browser tests
exercise the real site's CSP rather than an unrestricted development page.
It is development tooling, not a service shipped with ctlflow or Toolsmith.

## Netlify

Connect this repository to a Netlify project and select the intended production
branch. `netlify.toml` declares:

- Build: `node scripts/build.mjs`.
- Publish directory: `public`.
- Hugo 0.168.0 and Node 24.
- No functions, plugins, external build service or GitHub Actions.
- Strict self-hosted CSP, no framing, no sensitive browser permissions and
  immutable caching only for content-fingerprinted assets.

Production canonical URLs use `https://ctlflow.com/`. A nonproduction Netlify
`CONTEXT` uses its validated exact HTTPS `DEPLOY_PRIME_URL`; the production domain
is not hardcoded into preview canonical/sitemap URLs. DNS, TLS, repository access
and Netlify account configuration remain operator-owned. A local build does not
deploy or mutate a hosting account.

Official hosting references:

- [Hugo on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/hugo/)
- [Hugo installation](https://gohugo.io/installation/)

## Update source references

Select explicit source checkouts. The generator reads exact committed Git bytes
at each captured HEAD; it does not publish dirty working-tree data under a false
commit link and does not pull, build or edit those repositories.

```sh
npm run docs:sync -- \
  --ctlflow /absolute/ctlflow \
  --toolsmith /absolute/toolsmith
npm run docs:check -- \
  --ctlflow /absolute/ctlflow \
  --toolsmith /absolute/toolsmith
```

These commands also require the finite scope. Only the maintainer-facing sync
step needs sibling repositories; a Netlify/site build uses this repository alone.

- `scripts/docs/sources.mjs` maps product guides to canonical website paths.
- `scripts/docs/model.mjs` parses TypeScript syntax without running product code.
- `scripts/docs/fields.mjs` expands structured fields and retains custom checks.
- `scripts/docs/api-pages.mjs` renders exact operation and definition references.
- `scripts/docs/snapshot.mjs` reads immutable Git source snapshots.
- `data/sources.json` centralizes verified repository URLs, versions and commits.
- `data/reference-manifest.json` records source/generator/output hashes and counts.
- `data/operations.json` records exact method/path/audience/status/limit facts.

Generated pages include a source marker. Do not edit them directly; update their
source mapping/generator or the actual owning product. Synchronization removes
superseded generated pages only after proving they still match their prior
recorded bytes, and rejects unrecorded extras. Authored source is never cleaned
to hide a conflict.

Raw parser source supplements expanded fields. This is not OpenAPI/JSON Schema
generation, a public language SDK or a claim that every Matrix catalog entry is
admitted by the agent dispatcher. `fleetd` routes remain private to the user-owned
Unix socket even though their internal catalog uses `auth: public`.

## Content and licensing

Use direct technical language, exact prerequisites and explicit limitations.
Do not import domain-fleet instructions, private data, credentials or machine
details. Product source links follow exact revisions; canonical LICENSE links
remain authoritative for current terms. Third-party licenses are separate.
