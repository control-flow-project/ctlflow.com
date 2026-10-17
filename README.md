# ctlflow.com

Hugo technical documentation for running agent fleets with ctlflow's crossfire
server, fleetd controller and fleet CLI. Node, C# and Rust are documented under
those components. Toolsmith provides optional Python functions and commands for
files, downloads, archives and search.

The site contains edited Markdown guides, generated API references, architecture
diagrams and browser-based search. Layouts and assets are maintained here. It
uses no external fonts, analytics or remote diagram rendering.

- [Local verification record](docs/verification/20261017-site.md)
- [Theme, typography and code-example verification](docs/verification/20261017-theme-typography.md)
- [fleet-street integration and homepage verification](docs/verification/20261017-fleet-street.md)
- [Agent fleet terminology verification](docs/verification/20261017-agent-fleet-wording.md)
- [Documentation copy review](docs/verification/20261017-reader-copy-review.md)

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

Run build and test commands under finite process-group limits. Example
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

## Presentation and code examples

The site defaults to a white background. Readers can select a green-based dark
theme; that preference is saved locally and retained across pages. With no
JavaScript or no saved preference, the site stays light.

Markdown code fences must declare a language, such as `sh`, `typescript` or
`python`. Use `text` for directory trees and other plain-text material. Missing
or unsupported languages fail the build rather than being guessed. The shared
`layouts/partials/code-block.html` renders both Markdown examples and homepage
examples from `assets/examples/`. Syntax colors come from the shared stylesheet,
not inline styles or browser-side highlighting. Copy buttons retain literal
source text.

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

- `scripts/docs/sources.mjs` records source references for edited product guides.
- `scripts/docs/model.mjs` parses TypeScript syntax without running product code.
- `scripts/docs/fields.mjs` expands structured fields and retains custom checks.
- `scripts/docs/api-pages.mjs` renders exact operation and definition references.
- `scripts/docs/snapshot.mjs` reads immutable Git source snapshots.
- `data/sources.json` centralizes verified repository URLs, versions and commits.
- `data/reference-manifest.json` records source/generator/output hashes and counts.
- `data/operations.json` records exact method/path/audience/status/limit facts.

Product guides are edited in `content/`. Source synchronization records their
references but does not replace their prose. Review those guides when updating
the recorded product revision.

API operations, validation definitions and the Matrix catalog are generated.
Edit their generator or product definition, not the generated Markdown.
Synchronization removes stale generated pages only if they still match their
recorded contents. Shared edits and unrecorded outputs require review.

Field tables are supplemented by validation source for custom checks. This is
not an OpenAPI generator or SDK. Matrix catalog entries include restricted and
unsupported operations. fleetd routes are private to its Unix socket even when
their authentication field is `public`.

## fleet-street examples

The site includes a ten-agent theatre walkthrough and examples in the setup,
configuration, messaging, history, session and publication guides. The sample is
an ordinary optional fleet, not another ctlflow product. All source links use
the exact commit recorded in `data/fleetstreet.json`.

Refresh those examples from an explicit fleet-street checkout:

```sh
npm run example:sync -- --source /absolute/fleet-street
npm run example:sync -- --source /absolute/fleet-street --check
```

Run source maintenance under the same finite scope. It requires Python 3.11+
because it executes the committed sample's offline report tool in a disposable
snapshot. It reads exact committed Git bytes, not working-tree edits. It records
seven code examples and the five generated report files, their source inputs,
revision and output hashes. Edited snapshot output is protected from overwrite.

Normal site builds need no sample checkout, Python, model, Matrix account or
network access. They verify the checked-in example inventory before rendering.
The public report preview contains only fictional inputs and local static assets;
it is not a crossfire publication. Review all outputs before changing its inputs.

## Content and licensing

Use direct technical language, exact prerequisites and explicit limitations.
Explain a component before discussing its repository or implementation. The
homepage describes use and message flow; framework and migration details belong
in technical guides. Avoid slogans, dot-separated claims and internal project
history in reader-facing prose.
Describe agents by the work their instructions and tools allow, not as limited
to software development. Runtime guides name the implemented adapters; exact
package names and generated contract source remain unchanged.
Do not import domain-fleet instructions, private data, credentials or machine
details. Product source links follow exact revisions; canonical LICENSE links
remain authoritative for current terms. Third-party licenses are separate.
