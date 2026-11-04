# Native-only 0.1.26 release documentation

The website records ctlflow source
`3501d2c30a6350018cd534047731425f057ced17` and Toolsmith
`1627d931e87cc9fea9de055bbeefa65c84e79fb3`. Generated inventory remains
94 crossfire operations, 20 private fleetd operations, 157 Matrix entries,
42 validation modules and 50 edited product guides.

The current container inventory records all four published public GHCR images,
their immutable digests and actual anonymous Docker pulls from the product
release receipt. All four complete-image pulls passed using a new empty client
configuration with no login or credential helpers; overall duration was 28.0 s.
The quickstart pulls the immutable NativeAOT and Knex pair directly, requiring
no GitHub account, host Node.js or jq. Transferred archive kits retain their
separate trusted package-verification procedure.
Build source is `50347261a3c4fc7e5ffd2dcf4f530b76f144acab`; its source digest is
`48ca3827203b2f11e46b1c829a937876e7334eebbd413e8bad622692e9012009`.
The site separates those images from the three locally built native archives:
GitHub archive publication is blocked and the guides say their download commands
are not usable yet. No archive download or completed release is claimed.

Current guides use native fleet/fleetd, Linux x64 and the patched .NET/EF RC3
pins. The remaining npm/Node commands belong to approved UI, Knex, build,
maintenance, test and messaging tools. Old npm service installation claims and
the removed Matrix-generation npm command are corrected. Performance guidance
records complete workloads, request success and absolute latency/throughput;
there is no comparative speed threshold.

## Verification

On Linux amd64, Node 26.8.1, Hugo 0.168.0, Playwright 1.63.0 and Chrome
156.0.8078.79, the complete `npm run check` passed:

| Check | Result |
| --- | --- |
| Production Hugo build | 233 pages, 30 processed images, no warnings |
| Unit tests | 45 passed; no failures, cancellations or skips; 299.466 ms |
| Real-browser tests | 17 passed; no failures, cancellations or skips; 16.047 s |
| Resource group | 8 GiB memory, zero swap, 1024 tasks; desktop D-Bus disabled |
| Desktop/mobile release inventory | Four image rows, three archive rows, exact digests, anonymous access and blocked archive status |
| Generated HTML | Internal links, anchors, code examples, responsive layout, source links and local-only CSP checked |

The release inventory was visually reviewed at 1440 px and 390 px. Both views
retain the separate publication states and legible wrapped tables without
page-level overflow. Controlled local browser checks do not establish a Netlify
deployment or native product certification.

At the initial production observation on 4 November, Netlify served the preceding
merged website, whose source page recorded ctlflow `eeb8e621`. These new website
changes require the maintainer's merge; Netlify automatically builds that merge.
No direct Netlify deployment or hosting-account change was performed.
