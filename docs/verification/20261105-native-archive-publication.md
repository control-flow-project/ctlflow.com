# Native archive availability — 5 November 2026

The release inventory, three target installation guides and Docker quickstart
now describe the public ctlflow 0.1.26 archives and SHA256SUMS. The source
snapshot is ctlflow `5a4fda8eae701a13a3212eb2df3b668a95f88fac`; Toolsmith remains
at its existing `c27d8d9c90a66aae16fa99ae836d6c30ee7cd24e` snapshot.

- [Published native release](https://github.com/control-flow-project/ctlflow/releases/tag/v0.1.26)

The product publisher downloaded all four complete assets anonymously and
verified their byte counts and SHA256 values against the previously tested
files. No archives were rebuilt. These publication checks transferred
252397506 bytes in 95.51 seconds; application deployment is separate.

| Website verification | Result |
| --- | --- |
| Source synchronization check | No drift: 94 crossfire, 20 fleetd and 157 Matrix operations; 42 schema modules and 50 guides |
| Production Hugo 0.168.0 build | Passed; 233 pages; 4.033 seconds |
| Website unit tests | 47 passed; zero failed, skipped or cancelled; 0.355 seconds |
| Docker/setup/release browser test | Passed at 1440 px and 390 px; zero page errors or overflow; 2.241 seconds including runner |
| Three target guides in real Chrome | Six desktop/mobile page checks passed; publication, checksum commands and no page errors/overflow; 0.827 seconds |

The release inventory screenshots were visually reviewed at both viewport
widths. The first unit run correctly rejected the previous pinned source
revision; its exact expectation was updated to the newly synchronized source
commit, and all 47 tests passed on rerun. Other browser suites were not rerun
for this availability-text update. These checks do not certify changed runtime
code or a new deployment. Netlify publishes these guides after the maintainer
merges this website branch.
