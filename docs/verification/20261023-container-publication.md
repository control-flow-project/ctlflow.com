# Current container publication documentation — 2026-10-23

## Sources and changes

The website now records ctlflow 0.1.24 at commit
`38c859ebca9d32071a43f481edf8171c7e8c601f` and Toolsmith 0.4.2 at
`08704c92e647ce8d901d7dca2232ef420dee1760`. The synchronizer reads committed
Git snapshots, not dirty sibling source. It reports 94 crossfire operations,
20 fleetd operations, 157 Matrix operations, 43 schema modules and 50 edited
guide references. Generated API contracts are unchanged; their source records
and the new release-guide input are updated.

The edited Docker quickstart now selects the actual published NativeAOT 0.1.24
and matching Knex manifest digests, with a five-image release inventory for
Node, managed C#, NativeAOT C# and Rust. It documents current registry access
instead of claiming unpublished 0.1.23 images or providing digest placeholders.
The container/distribution guides link that inventory. The specification summary
and repository instructions require documentation/publication verification as
part of the coordinated release.

The example walkthrough previously instructed readers to install an old
example-specific fleet CLI. It now uses the server's personalized, release-pinned
host setup with the prepared `--config` path. The optional fleet-street repository,
its frozen source snapshot and recorded development dependency are unchanged.
No second installation workflow, fleet image, container relay or credential
mount was introduced.

- [Product publication verification](https://github.com/control-flow-project/ctlflow/blob/38c859ebca9d32071a43f481edf8171c7e8c601f/docs/verification/20261023-complete-publication.md)

## Verification

| Check | Result |
| --- | --- |
| Pinned tools | Hugo 0.168.0, current locked npm dependencies; no global installation |
| Source synchronization check | No drift against the selected committed ctlflow/Toolsmith snapshots |
| Production Hugo build | Passed, including artwork/output checks |
| Static tests | 44 pass; zero failures, skips, cancellations or TODOs |
| Browser tests | 16 pass; zero failures, skips, cancellations or TODOs |
| Current image references | All five inventory/test-fixture digests equal actual registry receipts |
| Desktop/mobile Docker walkthrough | 1440px and 390px checks pass |
| Desktop/mobile release inventory | Exact five manifests render; no page-level overflow or page errors |
| Existing behavior | CSP, search, themes, code copy, API links, no-JavaScript navigation and example reports pass |
| Whitespace and private notes | Checked; `.analysis` remains untracked/ignored |

The new static assertions verify the exact current registry digests and guide
source mapping. Browser assertions navigate from the quickstart to the inventory
and check all five images, current commands and access statements on desktop and
mobile. The mobile release screenshot was also inspected manually.

Earlier local attempts failed on expectations that the new inventory invalidated:
49 instead of 50 guides, the now-wrapped clone command, and an unscoped setup-link
locator that became ambiguous after adding a useful inline link. The corrected
tests retain exact command equality and select the intended navigation region;
no assertion was skipped or relaxed into accepting either version.

## Deployment boundary

This record does not claim a production website deployment. The local environment
has no Netlify deployment credential, login, linked project or connected Netlify
tool. The owner has been asked for the credential path; account/hosting settings
were not changed. A read-only production check still found the old 0.1.23 Docker
guide and HTTP 404 at the new inventory path.

The source branch is ready for manual PR creation. A real Netlify publication,
either by an authorized deploy credential or the operator's configured Git
deployment, must be followed by checks of the production quickstart, inventory,
source references and response headers. A local build or Git push is not that
verification.

The image publisher verified all five authenticated pulls. GitHub package
visibility remains an independent owner action before anonymous pulls can pass;
the guides explicitly describe private registry access. No deployed site,
execution host, provider login or active fleet was modified by this website work.
