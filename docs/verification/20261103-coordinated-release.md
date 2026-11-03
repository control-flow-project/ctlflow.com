# ctlflow 0.1.25 documentation verification

On 3 November 2026 the site was synchronized against ctlflow source
368a871c0f4eb072b08cd7abf83cac16bc478419 and Toolsmith
1627d931e87cc9fea9de055bbeefa65c84e79fb3 (version 0.5.0). The latter differs
from the earlier source pin only by a test lint correction; no library API
or publication changed.

Current guides describe listener-only startup and genuine-input wake behavior,
retained histories, explicit decisions and quiet collection output. The release
inventory and quickstart use the five actual 0.1.25 registry manifest digests.
Authenticated pulls and public npm archive downloads were verified separately;
all five GHCR packages remain private, with anonymous authorization returning 401.

Generated-source synchronization and check, Hugo build, 45 unit tests and 17
browser tests pass. Browser checks cover desktop/mobile rendering, navigation,
search, local-only CSP, exact anchors, code copying and release/setup guides.
Stale source-pin and pre-publication test expectations were corrected without
removing their assertions. No product service implementation was removed here.

This is local verification. Production publication occurs when the maintainer
merges this branch and Netlify deploys it; inspect the live pages afterward.
